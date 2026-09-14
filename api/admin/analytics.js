/**
 * SRI LAKSHMI BAKERY - Vercel Serverless API (/api/admin/analytics)
 * Real-time business analytics calculated from database.
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const { data: orders, error } = await supabase.from('orders').select('grand_total, payment_status, order_status, created_at');

        if (error) throw error;

        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, o) => o.payment_status === 'PAID' ? sum + Number(o.grand_total) : sum, 0);
        const pendingPayments = orders.filter(o => o.payment_status === 'PAYMENT_PENDING').length;

        const statusCounts = {
            ORDER_PLACED: orders.filter(o => o.order_status === 'ORDER_PLACED').length,
            CONFIRMED: orders.filter(o => o.order_status === 'CONFIRMED').length,
            PREPARING: orders.filter(o => o.order_status === 'PREPARING').length,
            READY: orders.filter(o => o.order_status === 'READY' || o.order_status === 'READY_FOR_PICKUP').length,
            OUT_FOR_DELIVERY: orders.filter(o => o.order_status === 'OUT_FOR_DELIVERY').length,
            DELIVERED: orders.filter(o => o.order_status === 'DELIVERED' || o.order_status === 'PICKED_UP').length
        };

        return res.status(200).json({
            success: true,
            analytics: {
                totalOrders,
                totalRevenue,
                pendingPayments,
                statusCounts
            }
        });
    } catch (err) {
        console.error('[API /admin/analytics Exception]', err);
        return res.status(500).json({ success: false, error: 'Analytics error' });
    }
};
