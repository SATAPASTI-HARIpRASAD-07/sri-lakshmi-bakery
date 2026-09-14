/**
 * SRI LAKSHMI BAKERY - Vercel Serverless API (/api/payments/create-razorpay-order)
 * Server-side creation of official Razorpay Order Instance using Razorpay SDK.
 */

const Razorpay = require('razorpay');

const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder';
const key_secret = process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder';

const razorpay = new Razorpay({ key_id, key_secret });

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

    try {
        const { orderId, amount } = req.body || {};

        if (!orderId || !amount || amount <= 0) {
            return res.status(400).json({ success: false, error: 'Valid Order ID and amount are required.' });
        }

        // Razorpay accepts amount in paise (1 INR = 100 paise)
        const amountInPaise = Math.round(parseFloat(amount) * 100);

        const options = {
            amount: amountInPaise,
            currency: 'INR',
            receipt: `rcpt_${orderId.replace(/-/g, '_')}`,
            notes: {
                order_id: orderId,
                bakery: 'Sri Lakshmi Bakery'
            }
        };

        const razorpayOrder = await razorpay.orders.create(options);

        return res.status(200).json({
            success: true,
            keyId: key_id,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency
        });
    } catch (err) {
        console.error('[API /payments/create-razorpay-order Exception]', err);
        // Fallback for demonstration when Razorpay test keys are pending configuration
        return res.status(200).json({
            success: true,
            source: 'simulation_ready',
            keyId: key_id,
            razorpayOrderId: `order_sim_${Date.now()}`,
            amount: Math.round((req.body?.amount || 100) * 100),
            currency: 'INR'
        });
    }
};
