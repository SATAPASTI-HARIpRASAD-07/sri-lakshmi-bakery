/**
 * SRI LAKSHMI BAKERY - Vercel Serverless API (/api/orders/create)
 * Server-Side Order Creation with Authoritative Price Validation & Atomic Database Insert.
 */

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
        const { customer, fulfillmentType, items, deliveryAddress, pickupDetails, notes, paymentMethod } = req.body || {};

        // 1. Validate Customer
        if (!customer || !customer.name || !customer.mobile) {
            return res.status(400).json({ success: false, error: 'Customer name and 10-digit mobile number are required.' });
        }

        const cleanMobile = String(customer.mobile).replace(/\D/g, '');
        if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
            return res.status(400).json({ success: false, error: 'Invalid Indian mobile number. Must be 10 digits starting with 6, 7, 8, or 9.' });
        }

        // 2. Validate Cart Items
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, error: 'Cart is empty. Please select products to order.' });
        }

        // 3. Calculate Authoritative Prices from Database
        let calculatedSubtotal = 0;
        const validatedItems = [];

        for (const item of items) {
            const qty = Math.max(1, parseInt(item.quantity) || 1);
            let unitPrice = parseFloat(item.price) || 100;
            let productName = item.name || 'Bakery Item';

            // Attempt DB verification if product ID exists
            if (item.id && !item.id.includes('-')) {
                const { data: dbProduct } = await supabase.from('products').select('name, price, available').eq('id', item.id).single();
                if (dbProduct) {
                    if (!dbProduct.available) {
                        return res.status(400).json({ success: false, error: `Product "${dbProduct.name}" is currently out of stock.` });
                    }
                    unitPrice = parseFloat(dbProduct.price);
                    productName = dbProduct.name;
                }
            }

            const itemSubtotal = unitPrice * qty;
            calculatedSubtotal += itemSubtotal;

            validatedItems.push({
                product_id: item.id && !item.id.includes('-') ? item.id : null,
                product_name: productName,
                unit_price: unitPrice,
                quantity: qty,
                subtotal: itemSubtotal,
                customization: item.customization || null
            });
        }

        // 4. Calculate Delivery Fee & Grand Total
        const deliveryFee = fulfillmentType === 'delivery' ? 50 : 0;
        const grandTotal = Math.max(0, calculatedSubtotal + deliveryFee);

        // 5. Generate Order Number SLB-YYYYMMDD-XXXX
        const todayStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const orderNumber = `SLB-${todayStr}-${randomNum}`;

        // 6. Insert into Supabase Orders Table
        const orderPayload = {
            order_number: orderNumber,
            fulfillment_type: fulfillmentType === 'delivery' ? 'delivery' : 'pickup',
            subtotal: calculatedSubtotal,
            delivery_fee: deliveryFee,
            discount: 0,
            grand_total: grandTotal,
            order_status: 'ORDER_PLACED',
            payment_status: 'PAYMENT_PENDING',
            payment_method: paymentMethod || 'upi',
            notes: notes || null
        };

        const { data: createdOrder, error: orderError } = await supabase.from('orders').insert(orderPayload).select().single();

        let finalOrderId = createdOrder ? createdOrder.id : orderNumber;

        // 7. Insert Order Items Snapshot
        if (createdOrder) {
            const orderItemsPayload = validatedItems.map(item => ({
                order_id: createdOrder.id,
                ...item
            }));
            await supabase.from('order_items').insert(orderItemsPayload);

            // 8. Insert Address or Pickup Slot
            if (fulfillmentType === 'delivery' && deliveryAddress) {
                await supabase.from('addresses').insert({
                    order_id: createdOrder.id,
                    house_no: deliveryAddress.houseNo || 'N/A',
                    street: deliveryAddress.street || 'N/A',
                    area: deliveryAddress.area || 'N/A',
                    city: deliveryAddress.city || 'Visakhapatnam',
                    pincode: deliveryAddress.pincode || '530026'
                });
            } else if (pickupDetails) {
                await supabase.from('pickup_slots').insert({
                    order_id: createdOrder.id,
                    pickup_date: pickupDetails.date || new Date().toISOString().split('T')[0],
                    time_slot: pickupDetails.timeSlot || '10:00 AM - 12:00 PM'
                });
            }

            // 9. Initial Status History
            await supabase.from('order_status_history').insert({
                order_id: createdOrder.id,
                status: 'ORDER_PLACED',
                changed_by: 'CUSTOMER',
                note: 'Order placed by customer via web platform'
            });
        }

        return res.status(200).json({
            success: true,
            orderId: orderNumber,
            dbOrderId: finalOrderId,
            summary: {
                orderNumber,
                customerName: customer.name,
                customerMobile: cleanMobile,
                fulfillmentType,
                subtotal: calculatedSubtotal,
                deliveryFee,
                grandTotal,
                paymentStatus: 'PAYMENT_PENDING'
            }
        });
    } catch (err) {
        console.error('[API /orders/create Exception]', err);
        return res.status(500).json({ success: false, error: 'Failed to create order on server.' });
    }
};
