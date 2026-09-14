/**
 * SRI LAKSHMI BAKERY - E-Commerce Order Tracking Timeline Module
 * Renders Courier-Style Order Progress Timeline with Live Status Updates.
 */

window.SLBTracking = (function () {
    const DELIVERY_STAGES = [
        { key: 'placed', title: 'Order Placed', desc: 'Order received & recorded in kitchen system', icon: 'fa-receipt' },
        { key: 'baking', title: 'Freshly Baking', desc: 'Master bakers preparing ingredients & baking', icon: 'fa-fire-burner' },
        { key: 'packed', title: 'Quality Check & Packed', desc: 'Hygienically inspected & gift boxed', icon: 'fa-box-open' },
        { key: 'dispatched', title: 'Out for Delivery', desc: 'Delivery partner on the way to your address', icon: 'fa-motorcycle' },
        { key: 'delivered', title: 'Delivered', desc: 'Enjoy your freshly baked happiness!', icon: 'fa-house-chimney-check' }
    ];

    const PICKUP_STAGES = [
        { key: 'placed', title: 'Order Placed', desc: 'Order received & recorded in kitchen system', icon: 'fa-receipt' },
        { key: 'baking', title: 'Freshly Baking', desc: 'Master bakers preparing ingredients & baking', icon: 'fa-fire-burner' },
        { key: 'packed', title: 'Packed & Boxed', desc: 'Hygienically inspected & held at counter', icon: 'fa-box-open' },
        { key: 'ready', title: 'Ready for Pickup', desc: 'Ready at counter! Please visit store with Order ID', icon: 'fa-store' },
        { key: 'collected', title: 'Collected', desc: 'Order collected. Thank you for visiting!', icon: 'fa-smile-beam' }
    ];

    /**
     * Get Stage Index based on Order Status String
     */
    function getStageIndex(statusStr, fulfillmentType) {
        const status = (statusStr || '').toLowerCase();
        if (status.includes('placed') || status.includes('pending') || status.includes('confirmed')) return 0;
        if (status.includes('baking') || status.includes('preparing')) return 1;
        if (status.includes('packed') || status.includes('inspected')) return 2;
        if (status.includes('dispatched') || status.includes('out for delivery') || status.includes('ready')) return 3;
        if (status.includes('delivered') || status.includes('collected') || status.includes('completed')) return 4;
        return 0; // Default to step 0
    }

    /**
     * Render Order Tracking View into a Container Element
     */
    function renderTrackingView(containerId, orderId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let order = null;
        if (orderId) {
            order = SLBOrders.getOrderById(orderId);
        }
        if (!order) {
            order = SLBOrders.getLastOrder();
        }

        if (!order) {
            container.innerHTML = `
                <div class="text-center py-10 bg-amber-50/60 rounded-3xl border border-amber-200/80 p-8">
                    <i class="fas fa-search-location text-5xl text-amber-400 mb-3"></i>
                    <h4 class="text-xl font-bold text-amber-950">No Recent Order Found</h4>
                    <p class="text-amber-800 text-sm mt-1 mb-6">Enter your Order ID (e.g. SLB-20260914-8921) to track status.</p>
                    <div class="flex max-w-md mx-auto gap-2">
                        <input type="text" id="manual-track-input" placeholder="SLB-YYYYMMDD-XXXX" 
                               class="flex-1 px-4 py-2.5 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 uppercase font-mono text-sm">
                        <button onclick="SLBTracking.searchOrder()" class="bg-amber-600 hover:bg-amber-700 text-white font-bold px-5 py-2.5 rounded-xl transition">
                            Track
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        const stages = order.fulfillmentType === 'pickup' ? PICKUP_STAGES : DELIVERY_STAGES;
        const currentStageIndex = getStageIndex(order.status || 'Order Placed', order.fulfillmentType);
        const waUrl = SLBWhatsApp.generateOrderWhatsAppUrl(order);

        let timelineHtml = stages.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            const isPending = idx > currentStageIndex;

            let dotClass = 'bg-stone-200 text-stone-400 border-stone-300';
            let titleClass = 'text-stone-400';
            let lineClass = 'bg-stone-200';

            if (isCompleted) {
                dotClass = 'bg-emerald-500 text-white border-emerald-500 shadow';
                titleClass = 'text-emerald-800 font-bold';
                lineClass = 'bg-emerald-500';
            } else if (isCurrent) {
                dotClass = 'bg-amber-600 text-white border-amber-600 ring-4 ring-amber-100 animate-pulse shadow-lg';
                titleClass = 'text-amber-950 font-black text-base';
                lineClass = 'bg-amber-200';
            }

            const isLast = idx === stages.length - 1;

            return `
                <div class="relative flex items-start group">
                    ${!isLast ? `<div class="absolute left-6 top-10 bottom-0 w-0.5 ${lineClass} -ml-px transition-colors duration-300"></div>` : ''}
                    <div class="relative flex items-center justify-center w-12 h-12 rounded-full border-2 ${dotClass} z-10 transition-all">
                        <i class="fas ${isCompleted ? 'fa-check text-lg' : stage.icon + ' text-base'}"></i>
                    </div>
                    <div class="ml-4 pb-8">
                        <div class="flex items-center gap-2">
                            <h5 class="${titleClass} text-sm md:text-base">${stage.title}</h5>
                            ${isCurrent ? '<span class="bg-amber-100 text-amber-800 text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full border border-amber-300">In Progress</span>' : ''}
                        </div>
                        <p class="text-xs ${isCurrent ? 'text-amber-900 font-medium' : 'text-stone-500'} mt-0.5">${stage.desc}</p>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="bg-white/90 backdrop-blur-md border border-amber-200 rounded-3xl p-6 md:p-8 shadow-xl">
                <!-- Header Card -->
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-amber-100 pb-6 mb-6 gap-4">
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-lg text-xs tracking-wide">ORDER TIMELINE</span>
                            <span class="text-xs text-amber-700 font-medium"><i class="far fa-clock me-1"></i> ${new Date(order.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <h3 class="text-2xl font-black text-amber-950 mt-1">Order #${order.orderId}</h3>
                        <p class="text-amber-800 text-xs mt-0.5">Customer: <strong>${order.customer.name}</strong> (${order.customer.mobile})</p>
                    </div>
                    <div class="flex items-center gap-3 w-full md:w-auto">
                        <a href="${waUrl}" target="_blank" rel="noopener noreferrer"
                           class="flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition">
                            <i class="fab fa-whatsapp text-lg"></i> Live WhatsApp Status
                        </a>
                        <a href="tel:+919668569974" 
                           class="inline-flex items-center justify-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs px-4 py-2.5 rounded-xl border border-amber-300 transition">
                            <i class="fas fa-phone-alt"></i> Call Bakery
                        </a>
                    </div>
                </div>

                <!-- Fulfillment Summary -->
                <div class="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-4 mb-8 text-xs text-amber-950 flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                        <span class="text-amber-700 font-bold uppercase tracking-wider block text-[10px]">Fulfillment Type</span>
                        <span class="font-bold text-sm text-amber-900 capitalize flex items-center gap-1.5 mt-0.5">
                            <i class="fas ${order.fulfillmentType === 'delivery' ? 'fa-truck text-amber-600' : 'fa-store text-emerald-600'}"></i>
                            ${order.fulfillmentType === 'delivery' ? 'Home Delivery (₹50 Fee)' : 'Store Pickup (FREE)'}
                        </span>
                    </div>
                    <div>
                        <span class="text-amber-700 font-bold uppercase tracking-wider block text-[10px]">${order.fulfillmentType === 'delivery' ? 'Delivery Address' : 'Pickup Slot'}</span>
                        <span class="font-medium text-amber-900 mt-0.5 block">
                            ${order.fulfillmentType === 'delivery' && order.deliveryAddress ?
                                `${order.deliveryAddress.houseNo}, ${order.deliveryAddress.street}, ${order.deliveryAddress.area}, ${order.deliveryAddress.pincode}` :
                                `Date: ${order.pickupDetails?.date || 'Today'} (${order.pickupDetails?.timeSlot || '10:00 AM - 12:00 PM'})`}
                        </span>
                    </div>
                    <div>
                        <span class="text-amber-700 font-bold uppercase tracking-wider block text-[10px]">Grand Total</span>
                        <span class="font-black text-amber-950 text-base mt-0.5 block">₹${order.grandTotal}</span>
                    </div>
                </div>

                <!-- Timeline Progress -->
                <div class="my-4 pl-2">
                    ${timelineHtml}
                </div>

                <!-- Order Items Summary Table -->
                <div class="mt-8 border-t border-amber-100 pt-6">
                    <h4 class="font-bold text-amber-950 text-sm mb-3">Items in this Order</h4>
                    <div class="space-y-2">
                        ${(order.items || []).map(item => `
                            <div class="flex items-center justify-between text-xs py-2 border-b border-dashed border-amber-200/60 text-amber-950">
                                <div class="flex items-center gap-3">
                                    <img src="${item.image}" alt="${item.name}" class="w-10 h-10 object-cover rounded-lg border border-amber-200">
                                    <div>
                                        <p class="font-bold text-amber-900">${item.name}</p>
                                        <p class="text-stone-500 text-[11px]">Qty: ${item.quantity} × ₹${item.price}</p>
                                    </div>
                                </div>
                                <span class="font-bold text-amber-950">₹${item.price * item.quantity}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Search Order manually by input value
     */
    function searchOrder() {
        const input = document.getElementById('manual-track-input');
        if (!input) return;
        const orderId = input.value.trim().toUpperCase();
        if (!orderId) {
            alert('Please enter a valid Order ID.');
            return;
        }
        renderTrackingView('tracking-container', orderId);
    }

    return {
        renderTrackingView,
        searchOrder
    };
})();
