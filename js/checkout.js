/**
 * SRI LAKSHMI BAKERY - Checkout Stepper Controller & Form Handler
 * Handles 6-step ordering checkout flow:
 * 1: CART (Review Items)
 * 2: CUSTOMER (Name, Mobile, Email)
 * 3: FULFILLMENT (Delivery vs Store Pickup)
 * 4: PAYMENT (UPI / Cards / NetBanking / COD + Welcome Card)
 * 5: CONFIRMATION (Order Receipt & WhatsApp Trigger)
 * 6: TRACKING (Live Order Timeline)
 */

window.SLBCheckout = (function () {
    let currentStep = 1; // 1 to 6
    let checkoutState = {
        fulfillmentType: 'delivery', // 'delivery' | 'pickup'
        customer: {
            name: '',
            mobile: '',
            email: ''
        },
        delivery: {
            houseNo: '',
            street: '',
            area: '',
            city: 'Visakhapatnam',
            pincode: '',
            notes: ''
        },
        pickup: {
            date: new Date().toISOString().split('T')[0],
            timeSlot: '10:00 AM - 12:00 PM'
        },
        paymentMethod: 'upi',
        createdOrder: null
    };

    /**
     * Initialize Checkout State from LocalStorage if customer details exist
     */
    function init() {
        const savedCustomer = SLBOrders.getCustomerDetails();
        if (savedCustomer) {
            checkoutState.customer = { ...checkoutState.customer, ...savedCustomer };
        }
    }

    /**
     * Get Current Step Number
     */
    function getCurrentStep() {
        return currentStep;
    }

    /**
     * Get Current Checkout State
     */
    function getCheckoutState() {
        return checkoutState;
    }

    /**
     * Set Fulfillment Type (delivery or pickup)
     */
    function setFulfillmentType(type) {
        if (type !== 'delivery' && type !== 'pickup') return;
        checkoutState.fulfillmentType = type;
        SLBCart.setDeliveryFee(type === 'delivery' ? 50 : 0);
        updateFulfillmentUI();
    }

    /**
     * Update UI based on Fulfillment Type
     */
    function updateFulfillmentUI() {
        const deliveryContainer = document.getElementById('delivery-fields-container');
        const pickupContainer = document.getElementById('pickup-fields-container');
        const deliveryTabBtn = document.getElementById('tab-delivery-btn');
        const pickupTabBtn = document.getElementById('tab-pickup-btn');

        if (deliveryContainer && pickupContainer) {
            if (checkoutState.fulfillmentType === 'delivery') {
                deliveryContainer.classList.remove('hidden');
                pickupContainer.classList.add('hidden');
                if (deliveryTabBtn) deliveryTabBtn.classList.add('active-tab');
                if (pickupTabBtn) pickupTabBtn.classList.remove('active-tab');
            } else {
                deliveryContainer.classList.add('hidden');
                pickupContainer.classList.remove('hidden');
                if (pickupTabBtn) pickupTabBtn.classList.add('active-tab');
                if (deliveryTabBtn) deliveryTabBtn.classList.remove('active-tab');
            }
        }

        // Render preview card
        renderFulfillmentPreview();
    }

    /**
     * Render Address / Pickup Preview Card
     */
    function renderFulfillmentPreview() {
        const previewContainer = document.getElementById('fulfillment-preview-card');
        if (!previewContainer) return;

        if (checkoutState.fulfillmentType === 'delivery') {
            const d = checkoutState.delivery;
            const fullAddr = [d.houseNo, d.street, d.area, d.city, d.pincode].filter(Boolean).join(', ');
            previewContainer.innerHTML = `
                <div class="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-sm text-amber-950">
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-bold flex items-center gap-2 text-amber-900">
                            <i class="fas me-1 fa-truck text-amber-600"></i> Home Delivery Address
                        </span>
                        <span class="text-xs bg-amber-200 text-amber-900 font-semibold px-2 py-0.5 rounded-full">₹50 Fee</span>
                    </div>
                    <p class="font-medium text-amber-900">${checkoutState.customer.name || 'Valued Customer'}</p>
                    <p class="text-amber-800 text-xs mt-1">${fullAddr || 'Please enter full address details below.'}</p>
                    <p class="text-amber-700 text-xs mt-1"><i class="fas fa-phone-alt me-1"></i> ${checkoutState.customer.mobile || 'No phone provided'}</p>
                </div>
            `;
        } else {
            const p = checkoutState.pickup;
            previewContainer.innerHTML = `
                <div class="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-950">
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-bold flex items-center gap-2 text-emerald-900">
                            <i class="fas me-1 fa-store text-emerald-600"></i> Store Pickup Details
                        </span>
                        <span class="text-xs bg-emerald-200 text-emerald-900 font-semibold px-2 py-0.5 rounded-full">FREE (₹0 Fee)</span>
                    </div>
                    <p class="font-medium text-emerald-900">Store: Sri Lakshmi Bakery Main Store</p>
                    <p class="text-emerald-800 text-xs mt-1"><i class="far fa-calendar-alt me-1"></i> Date: ${p.date || 'Today'}</p>
                    <p class="text-emerald-800 text-xs mt-1"><i class="far fa-clock me-1"></i> Time Slot: ${p.timeSlot}</p>
                    <p class="text-emerald-700 text-xs mt-1"><i class="fas fa-map-marker-alt me-1"></i> Main Road, Gajuwaka, Visakhapatnam</p>
                </div>
            `;
        }
    }

    /**
     * Validate current step before proceeding to next step
     */
    function validateStep(step) {
        const errorEl = document.getElementById(`checkout-step-${step}-error`);
        if (errorEl) {
            errorEl.innerText = '';
            errorEl.classList.add('hidden');
        }

        const showError = (msg) => {
            if (errorEl) {
                errorEl.innerText = msg;
                errorEl.classList.remove('hidden');
            }
        };

        if (step === 1) { // CART
            const cart = SLBCart.getCart();
            if (!cart || cart.length === 0) {
                showError('Your cart is empty! Please add items before proceeding to checkout.');
                return false;
            }
            return true;
        }

        if (step === 2) { // CUSTOMER
            const name = (document.getElementById('input-cust-name')?.value || checkoutState.customer.name).trim();
            const mobile = (document.getElementById('input-cust-mobile')?.value || checkoutState.customer.mobile).trim();
            const email = (document.getElementById('input-cust-email')?.value || checkoutState.customer.email).trim();

            if (!name || name.length < 2) {
                showError('Please enter your full name (at least 2 characters).');
                return false;
            }

            if (!SLBOrders.validateMobile(mobile)) {
                showError('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
                return false;
            }

            checkoutState.customer = { name, mobile, email };
            SLBOrders.saveCustomerDetails(checkoutState.customer);
            return true;
        }

        if (step === 3) { // FULFILLMENT (Delivery / Pickup)
            if (checkoutState.fulfillmentType === 'delivery') {
                const houseNo = (document.getElementById('input-del-house')?.value || '').trim();
                const street = (document.getElementById('input-del-street')?.value || '').trim();
                const area = (document.getElementById('input-del-area')?.value || '').trim();
                const city = (document.getElementById('input-del-city')?.value || 'Visakhapatnam').trim();
                const pincode = (document.getElementById('input-del-pincode')?.value || '').trim();
                const notes = (document.getElementById('input-del-notes')?.value || '').trim();

                if (!houseNo) {
                    showError('Please enter Flat / House / Door Number.');
                    return false;
                }
                if (!street) {
                    showError('Please enter Street / Apartment / Building Name.');
                    return false;
                }
                if (!area) {
                    showError('Please enter Locality / Area / Landmark.');
                    return false;
                }
                if (!SLBOrders.validatePinCode(pincode)) {
                    showError('Please enter a valid 6-digit PIN code (e.g. 530026).');
                    return false;
                }

                checkoutState.delivery = { houseNo, street, area, city, pincode, notes };
            } else {
                const date = (document.getElementById('input-pickup-date')?.value || '').trim();
                const timeSlot = (document.getElementById('input-pickup-time')?.value || '10:00 AM - 12:00 PM').trim();

                if (!date) {
                    showError('Please select a pickup date.');
                    return false;
                }

                checkoutState.pickup = { date, timeSlot };
            }
            return true;
        }

        if (step === 4) { // PAYMENT
            // Validate selected payment method
            const selectedMethodEl = document.querySelector('input[name="payment_method"]:checked');
            if (selectedMethodEl) {
                checkoutState.paymentMethod = selectedMethodEl.value;
            }
            return true;
        }

        return true;
    }

    /**
     * Navigate to next step
     */
    function nextStep() {
        if (!validateStep(currentStep)) return false;

        if (currentStep === 3) { // Moving from Fulfillment to Payment step
            // Save order draft or prepare payment welcome card
            const cartSummary = SLBCart.getCartSummary();
            const orderPayload = {
                customer: checkoutState.customer,
                fulfillmentType: checkoutState.fulfillmentType,
                deliveryAddress: checkoutState.fulfillmentType === 'delivery' ? checkoutState.delivery : null,
                pickupDetails: checkoutState.fulfillmentType === 'pickup' ? checkoutState.pickup : null,
                items: cartSummary.items,
                subtotal: cartSummary.subtotal,
                discount: cartSummary.discount,
                coupon: cartSummary.couponCode,
                deliveryFee: cartSummary.deliveryFee,
                grandTotal: cartSummary.grandTotal,
                paymentMethod: checkoutState.paymentMethod,
                paymentStatus: 'Pending Payment Verification'
            };

            // Create Order
            const newOrder = SLBOrders.createOrder(orderPayload);
            checkoutState.createdOrder = newOrder;

            // Render Payment Welcome Card
            SLBPayment.renderPaymentWelcomeCard('payment-welcome-container', newOrder);
        }

        if (currentStep < 6) {
            goToStep(currentStep + 1);
        }
        return true;
    }

    /**
     * Navigate to previous step
     */
    function prevStep() {
        if (currentStep > 1) {
            goToStep(currentStep - 1);
        }
    }

    /**
     * Directly jump to a specific step
     */
    function goToStep(stepNum) {
        if (stepNum < 1 || stepNum > 6) return;

        currentStep = stepNum;

        // Hide all step panels
        for (let i = 1; i <= 6; i++) {
            const panel = document.getElementById(`checkout-step-panel-${i}`);
            const indicator = document.getElementById(`stepper-dot-${i}`);
            const label = document.getElementById(`stepper-label-${i}`);

            if (panel) {
                if (i === currentStep) {
                    panel.classList.remove('hidden');
                } else {
                    panel.classList.add('hidden');
                }
            }

            if (indicator) {
                if (i === currentStep) {
                    indicator.className = 'w-8 h-8 rounded-full flex items-center justify-center font-bold bg-amber-600 text-white shadow-md ring-4 ring-amber-100 transition-all';
                } else if (i < currentStep) {
                    indicator.className = 'w-8 h-8 rounded-full flex items-center justify-center font-bold bg-emerald-500 text-white transition-all';
                    indicator.innerHTML = '<i class="fas fa-check text-xs"></i>';
                } else {
                    indicator.className = 'w-8 h-8 rounded-full flex items-center justify-center font-bold bg-amber-100 text-amber-800 transition-all';
                    indicator.innerText = i;
                }
            }

            if (label) {
                if (i === currentStep) {
                    label.className = 'text-xs font-bold text-amber-900 hidden md:block';
                } else if (i < currentStep) {
                    label.className = 'text-xs font-medium text-emerald-700 hidden md:block';
                } else {
                    label.className = 'text-xs font-medium text-stone-400 hidden md:block';
                }
            }
        }

        // Action when reaching Confirmation Step (Step 5)
        if (currentStep === 5 && checkoutState.createdOrder) {
            renderConfirmationStep();
        }

        // Action when reaching Tracking Step (Step 6)
        if (currentStep === 6 && checkoutState.createdOrder) {
            if (window.SLBTracking) {
                SLBTracking.renderTrackingView('tracking-container', checkoutState.createdOrder.orderId);
            }
        }
    }

    /**
     * Render Confirmation Step UI
     */
    function renderConfirmationStep() {
        const order = checkoutState.createdOrder;
        const confirmContainer = document.getElementById('confirmation-summary-container');
        if (!order || !confirmContainer) return;

        const waUrl = SLBWhatsApp.generateOrderWhatsAppUrl(order);

        confirmContainer.innerHTML = `
            <div class="text-center py-6">
                <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner animate-bounce">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3 class="text-2xl font-black text-amber-950">Order Placed Successfully!</h3>
                <p class="text-amber-800 text-sm mt-1">Thank you for choosing Sri Lakshmi Bakery.</p>
                <div class="mt-4 inline-block bg-amber-50 border border-amber-200 text-amber-900 font-bold px-4 py-2 rounded-xl text-lg tracking-wider">
                    Order ID: <span class="text-amber-700">${order.orderId}</span>
                </div>
            </div>

            <div class="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 mb-6 text-amber-950 text-sm space-y-3">
                <div class="flex justify-between border-b border-amber-200/60 pb-2">
                    <span class="text-amber-800">Customer Name:</span>
                    <span class="font-semibold">${order.customer.name}</span>
                </div>
                <div class="flex justify-between border-b border-amber-200/60 pb-2">
                    <span class="text-amber-800">Mobile Number:</span>
                    <span class="font-semibold">${order.customer.mobile}</span>
                </div>
                <div class="flex justify-between border-b border-amber-200/60 pb-2">
                    <span class="text-amber-800">Fulfillment:</span>
                    <span class="font-semibold uppercase text-amber-700">${order.fulfillmentType}</span>
                </div>
                <div class="flex justify-between border-b border-amber-200/60 pb-2">
                    <span class="text-amber-800">Total Amount:</span>
                    <span class="font-bold text-amber-900 text-base">₹${order.grandTotal}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-amber-800">Payment Status:</span>
                    <span class="font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-xs">${order.paymentStatus}</span>
                </div>
            </div>

            <!-- WhatsApp Direct Confirmation Banner -->
            <div class="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-5 text-white text-center shadow-lg mb-6">
                <i class="fab fa-whatsapp text-4xl mb-2 text-emerald-200"></i>
                <h4 class="font-bold text-lg">Send Order Details on WhatsApp</h4>
                <p class="text-emerald-100 text-xs mt-1 mb-4 leading-relaxed">
                    Click below to open WhatsApp with your pre-filled Order ID <strong>${order.orderId}</strong> to get real-time delivery status updates from our bakery staff!
                </p>
                <a href="${waUrl}" target="_blank" rel="noopener noreferrer"
                   class="inline-flex items-center justify-center gap-2 bg-white text-emerald-800 hover:bg-emerald-50 font-bold px-6 py-3 rounded-xl shadow-md transition-transform hover:scale-105">
                    <i class="fab fa-whatsapp text-emerald-600 text-xl"></i>
                    <span>CONTINUE ON WHATSAPP (9668569974)</span>
                </a>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <button onclick="SLBCheckout.goToStep(6)" class="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-xl shadow transition flex items-center justify-center gap-2">
                    <i class="fas fa-truck-fast"></i> Track My Order Now
                </button>
                <button onclick="window.location.reload()" class="bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold px-6 py-3 rounded-xl transition flex items-center justify-center gap-2">
                    <i class="fas fa-store"></i> Back to Bakery Home
                </button>
            </div>
        `;

        // Clear cart after placement
        SLBCart.clearCart();
    }

    return {
        init,
        getCurrentStep,
        getCheckoutState,
        setFulfillmentType,
        renderFulfillmentPreview,
        validateStep,
        nextStep,
        prevStep,
        goToStep
    };
})();
