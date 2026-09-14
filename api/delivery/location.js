/**
 * SRI LAKSHMI BAKERY - Vercel Serverless API (/api/delivery/location)
 * Delivery Agent Real GPS Location Tracking API.
 * Active ONLY when an order status is OUT_FOR_DELIVERY.
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        if (req.method === 'POST') {
            const { orderNumber, latitude, longitude, accuracy, agentId } = req.body || {};

            if (!orderNumber || latitude === undefined || longitude === undefined) {
                return res.status(400).json({ success: false, error: 'Order Number, latitude, and longitude required.' });
            }

            // Verify order exists & is active OUT_FOR_DELIVERY
            const { data: order } = await supabase.from('orders').select('id, order_status').eq('order_number', orderNumber).single();
            if (!order) {
                return res.status(404).json({ success: false, error: 'Order not found.' });
            }

            if (order.order_status !== 'OUT_FOR_DELIVERY') {
                return res.status(400).json({ success: false, error: 'GPS tracking is active ONLY when order is OUT_FOR_DELIVERY.' });
            }

            const { data, error } = await supabase.from('delivery_locations').insert({
                order_id: order.id,
                agent_id: agentId || null,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                accuracy: accuracy ? parseFloat(accuracy) : null,
                recorded_at: new Date().toISOString()
            }).select().single();

            if (error) throw error;
            return res.status(201).json({ success: true, location: data });
        }

        if (req.method === 'GET') {
            const { orderNumber } = req.query;
            if (!orderNumber) {
                return res.status(400).json({ success: false, error: 'Order Number required.' });
            }

            const { data: order } = await supabase.from('orders').select('id, order_status').eq('order_number', orderNumber).single();
            if (!order) return res.status(404).json({ success: false, error: 'Order not found.' });

            const { data: locations, error } = await supabase
                .from('delivery_locations')
                .select('*')
                .eq('order_id', order.id)
                .order('recorded_at', { ascending: false })
                .limit(1);

            if (error) throw error;

            return res.status(200).json({
                success: true,
                orderStatus: order.order_status,
                latestLocation: locations?.[0] || null
            });
        }

        return res.status(405).json({ success: false, error: 'Method not allowed' });
    } catch (err) {
        console.error('[API /delivery/location Exception]', err);
        return res.status(500).json({ success: false, error: 'Delivery location API error' });
    }
};
