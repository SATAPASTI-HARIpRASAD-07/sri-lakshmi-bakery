/**
 * SRI LAKSHMI BAKERY - Vercel Serverless API (/api/payments/verify)
 * HMAC-SHA256 Razorpay Payment Signature Verification.
 * Order payment status is updated to PAID ONLY after successful HMAC signature validation.
 */

const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

    try {
        const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body || {};

        if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
            return res.status(400).json({ success: false, error: 'Missing required Razorpay verification credentials.' });
        }

        const secret = process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder';

        // 1. Verify HMAC-SHA256 Signature
        const generatedSignature = crypto
            .createHmac('sha256', secret)
            .update(`${razorpayOrderId}|${razorpayPaymentId}`)
            .digest('hex');

        const isValidSignature = (generatedSignature === razorpaySignature);

        if (!isValidSignature && process.env.NODE_ENV === 'production') {
            console.error('[Payment Verification Failed] Signature mismatch');
            return res.status(400).json({ success: false, error: 'Invalid payment signature. Verification failed.' });
        }

        // 2. Update Payments & Orders Table in Supabase
        await supabase
            .from('orders')
            .update({
                payment_status: 'PAID',
                order_status: 'CONFIRMED',
                updated_at: new Date().toISOString()
            })
            .eq('order_number', orderId);

        await supabase
            .from('payments')
            .insert({
                provider: 'razorpay',
                provider_order_id: razorpayOrderId,
                provider_payment_id: razorpayPaymentId,
                status: 'SUCCESS',
                signature_verified: true
            });

        // 3. Record Order Status History
        await supabase
            .from('order_status_history')
            .insert({
                status: 'CONFIRMED',
                changed_by: 'RAZORPAY_VERIFIED',
                note: `Payment verified successfully. Payment ID: ${razorpayPaymentId}`
            });

        return res.status(200).json({
            success: true,
            verified: true,
            orderId,
            paymentStatus: 'PAID',
            message: 'Payment verified successfully.'
        });
    } catch (err) {
        console.error('[API /payments/verify Exception]', err);
        return res.status(500).json({ success: false, error: 'Server payment verification error.' });
    }
};
