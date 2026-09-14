/**
 * SRI LAKSHMI BAKERY - Vercel Serverless API (/api/admin/orders)
 * Admin order management: List orders, search/filter, update status.
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        if (req.method === 'GET') {
            const { status, payment_status, search } = req.query;

            let query = supabase
                .from('orders')
                .select(`
                    *,
                    order_items (*),
                    addresses (*),
                    pickup_slots (*)
                `)
                .order('created_at', { ascending: false });

            if (status) query = query.eq('order_status', status);
            if (payment_status) query = query.eq('payment_status', payment_status);
            if (search) query = query.ilike('order_number', `%${search}%`);

            const { data, error } = await query;
            if (error) throw error;

            return res.status(200).json({ success: true, count: data.length, orders: data });
        }

        if (req.method === 'PATCH') {
            const { orderId, newStatus, note } = req.body || {};

            if (!orderId || !newStatus) {
                return res.status(400).json({ success: false, error: 'Order ID and new status required.' });
            }

            const { data, error } = await supabase
                .from('orders')
                .update({ order_status: newStatus, updated_at: new Date().toISOString() })
                .eq('order_number', orderId)
                .select()
                .single();

            if (error) throw error;

            await supabase.from('order_status_history').insert({
                order_id: data.id,
                status: newStatus,
                changed_by: 'ADMIN',
                note: note || `Status updated to ${newStatus} by admin`
            });

            return res.status(200).json({ success: true, order: data });
        }

        return res.status(405).json({ success: false, error: 'Method not allowed' });
    } catch (err) {
        console.error('[API /admin/orders Exception]', err);
        return res.status(500).json({ success: false, error: 'Admin orders API error' });
    }
};
