/**
 * SRI LAKSHMI BAKERY - Vercel Serverless API (/api/orders/track)
 * Returns Order Timeline Status, Items Snapshot, and Fulfillment details.
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
        const { orderNumber, mobile } = req.query;

        if (!orderNumber) {
            return res.status(400).json({ success: false, error: 'Order Number (e.g. SLB-20260914-8921) is required.' });
        }

        const cleanOrderNo = orderNumber.trim().toUpperCase();

        const { data: order, error: orderErr } = await supabase
            .from('orders')
            .select(`
                *,
                order_items (*),
                addresses (*),
                pickup_slots (*),
                order_status_history (*)
            `)
            .eq('order_number', cleanOrderNo)
            .single();

        if (orderErr || !order) {
            return res.status(404).json({ success: false, error: `Order #${cleanOrderNo} not found in database.` });
        }

        return res.status(200).json({
            success: true,
            order: {
                orderId: order.order_number,
                fulfillmentType: order.fulfillment_type,
                status: order.order_status,
                paymentStatus: order.payment_status,
                paymentMethod: order.payment_method,
                subtotal: order.subtotal,
                deliveryFee: order.delivery_fee,
                grandTotal: order.grand_total,
                createdAt: order.created_at,
                items: order.order_items || [],
                address: order.addresses?.[0] || null,
                pickup: order.pickup_slots?.[0] || null,
                history: order.order_status_history || []
            }
        });
    } catch (err) {
        console.error('[API /orders/track Exception]', err);
        return res.status(500).json({ success: false, error: 'Failed to retrieve order tracking information.' });
    }
};
