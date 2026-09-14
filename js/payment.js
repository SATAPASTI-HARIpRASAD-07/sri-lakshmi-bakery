/**
 * SRI LAKSHMI BAKERY - Payment Engine & Razorpay Gateway Integration
 * Handles server-side Razorpay Order Creation & HMAC-SHA256 Signature Verification.
 * Renders Payment Welcome Card automatically on reaching Payment step.
 * IMPORTANT: WhatsApp NEVER opens automatically; it ONLY opens on explicit customer click!
 */

window.SLBPayment = (function () {
    /**
     * Dynamically load Razorpay Checkout JS SDK if not present
     */
    function loadRazorpaySdk() {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    }

    /**
     * Render Payment Welcome Card
     */
    function renderPaymentWelcomeCard(containerId, order) {
        const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
        if (!container || !order) return;

        const waUrl = SLBWhatsApp.generateOrderWhatsAppUrl(order);

        container.innerHTML = `
            <div class="bg-gradient-to-br from-amber-900 via-amber-950 to-stone-900 text-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden border border-amber-500/30 mb-6">
                <!-- Background ambient glow -->
                <div class="absolute -top-16 -right-16 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
                
                <div class="relative z-10">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-amber-500/20 pb-4 mb-5 gap-3">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xl border border-amber-400/30">
                                <i class="fas fa-[#A94F20] fa-receipt text-amber-400"></i>
                            </div>
                            <div>
                                <span class="text-xs uppercase font-extrabold tracking-widest text-amber-400 block">Payment Summary</span>
                                <h3 class="font-mono text-xl md:text-2xl font-black text-amber-100 mt-0.5">Order #${order.orderId}</h3>
                            </div>
                        </div>
                        <span class="bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            ${order.fulfillmentType === 'delivery' ? 'Home Delivery' : 'Store Pickup'}
                        </span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-xs text-amber-200">
                        <div class="bg-black/30 p-3.5 rounded-2xl border border-amber-500/10">
                            <span class="text-amber-400 font-bold block mb-0.5">Customer Name</span>
                            <span class="text-white font-semibold text-sm">${order.customer.name}</span>
                            <span class="block text-amber-300/80 text-[11px] mt-0.5"><i class="fas fa-phone-alt me-1"></i> ${order.customer.mobile}</span>
                        </div>
                        <div class="bg-black/30 p-3.5 rounded-2xl border border-amber-500/10">
                            <span class="text-amber-400 font-bold block mb-0.5">Total Payable Amount</span>
                            <span class="text-amber-300 font-black text-2xl font-display">₹${order.grandTotal}</span>
                            <span class="block text-amber-300/80 text-[11px] mt-0.5">Includes GST & Delivery Fees</span>
                        </div>
                    </div>

                    <!-- Explicit WhatsApp Button -->
                    <div class="bg-amber-900/40 border border-amber-500/30 rounded-2xl p-4 text-center">
                        <p class="text-amber-200 text-xs mb-3 font-medium">
                            Click below to open WhatsApp with your pre-filled Order ID <strong>${order.orderId}</strong> for direct bakery assistance.
                        </p>
                        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" 
                           class="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1eb956] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg transition-transform hover:scale-105">
                            <i class="fab fa-whatsapp text-lg"></i>
                            <span>CONTINUE ON WHATSAPP (9668569974)</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Initiate Razorpay Payment Flow
     */
    async function launchRazorpayCheckout(order, onSuccess, onError) {
        const isLoaded = await loadRazorpaySdk();

        if (!isLoaded || !window.Razorpay) {
            console.warn('[Razorpay SDK] SDK load failed. Utilizing backend verification fallback.');
        }

        try {
            // 1. Create Razorpay Order on Vercel Serverless Backend
            const res = await fetch('/api/payments/create-razorpay-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: order.orderId,
                    amount: order.grandTotal
                })
            });

            const data = await res.json();

            if (!data.success) {
                if (onError) onError(data.error || 'Failed to create payment order');
                return;
            }

            const options = {
                key: data.keyId,
                amount: data.amount,
                currency: data.currency || 'INR',
                name: 'Sri Lakshmi Bakery',
                description: `Bakery Order #${order.orderId}`,
                image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=200&q=80',
                order_id: data.razorpayOrderId,
                handler: async function (response) {
                    // 2. Verify HMAC-SHA256 Signature Server-Side
                    const verifyRes = await fetch('/api/payments/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            orderId: order.orderId,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature
                        })
                    });

                    const verifyData = await verifyRes.json();
                    if (verifyData.success && verifyData.verified) {
                        if (onSuccess) onSuccess(verifyData);
                    } else {
                        if (onError) onError(verifyData.error || 'Payment signature verification failed.');
                    }
                },
                prefill: {
                    name: order.customer.name,
                    contact: order.customer.mobile,
                    email: order.customer.email || ''
                },
                theme: {
                    color: '#5A2D1A'
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (e) {
            console.error('[Razorpay Launch Error]', e);
            if (onError) onError('Failed to open payment gateway.');
        }
    }

    return {
        renderPaymentWelcomeCard,
        launchRazorpayCheckout
    };
})();
