/**
 * SRI LAKSHMI BAKERY - Vercel Serverless API (/api/payments/webhook)
 * Idempotent Razorpay Payment Webhook Handler.
 */

const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'webhook_secret_placeholder';
        const signature = req.headers['x-razorpay-signature'];

        const bodyStr = JSON.stringify(req.body);
        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(bodyStr)
            .digest('hex');

        if (signature !== expectedSignature && process.env.NODE_ENV === 'production') {
            return res.status(400).json({ error: 'Invalid webhook signature' });
        }

        const event = req.body?.event;
        const payload = req.body?.payload?.payment?.entity;

        if (event === 'order.paid' || event === 'payment.captured') {
            const orderId = payload?.notes?.order_id;
            if (orderId) {
                await supabase
                    .from('orders')
                    .update({ payment_status: 'PAID', order_status: 'CONFIRMED' })
                    .eq('order_number', orderId);
            }
        }

        return res.status(200).json({ status: 'ok', event });
    } catch (err) {
        console.error('[API /payments/webhook Exception]', err);
        return res.status(500).json({ error: 'Webhook processing error' });
    }
};
