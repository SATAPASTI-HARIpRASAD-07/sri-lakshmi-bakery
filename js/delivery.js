/**
 * SRI LAKSHMI BAKERY - Delivery Agent GPS Controller (js/delivery.js)
 * Manages active order delivery assignment, status transitions, and real-time GPS tracking via navigator.geolocation.watchPosition().
 */

window.SLBDelivery = (function () {
    let activeWatchId = null;
    let currentActiveOrder = null;

    function init() {
        refreshOrders();
    }

    async function refreshOrders() {
        const container = document.getElementById('delivery-orders-list');
        if (!container) return;

        try {
            const res = await fetch('/api/admin/orders?status=OUT_FOR_DELIVERY');
            const data = await res.json();

            const orders = data.orders || [];

            if (orders.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-10 text-stone-500">
                        <i class="fas fa-box-open text-4xl text-amber-300 mb-2"></i>
                        <p class="font-bold text-amber-950">No active OUT_FOR_DELIVERY orders assigned right now.</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = orders.map(o => `
                <div class="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 text-xs text-amber-950 space-y-3">
                    <div class="flex justify-between items-start">
                        <div>
                            <span class="bg-amber-200 text-amber-900 font-extrabold px-2.5 py-0.5 rounded text-[10px]">ORDER ID</span>
                            <h4 class="font-mono text-lg font-bold text-amber-900 mt-1">#${o.order_number}</h4>
                            <p class="font-semibold text-stone-700">Customer: ${o.addresses?.[0]?.house_no || 'N/A'}, ${o.addresses?.[0]?.street || 'N/A'}</p>
                            <p class="text-stone-600">Area: ${o.addresses?.[0]?.area || 'N/A'}, PIN: ${o.addresses?.[0]?.pincode || '530026'}</p>
                        </div>
                        <span class="bg-amber-600 text-white font-bold px-3 py-1 rounded-full text-[10px] uppercase">OUT FOR DELIVERY</span>
                    </div>

                    <div class="flex flex-wrap gap-2 pt-2 border-t border-amber-200">
                        <button onclick="SLBDelivery.startGPSTracking('${o.order_number}')" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5">
                            <i class="fas fa-location-arrow"></i> Start Live GPS Tracking
                        </button>
                        <button onclick="SLBDelivery.markDelivered('${o.order_number}')" class="bg-amber-800 hover:bg-amber-900 text-white font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5">
                            <i class="fas fa-check-double"></i> Mark Delivered
                        </button>
                        <a href="https://maps.google.com/?q=${encodeURIComponent((o.addresses?.[0]?.house_no || '') + ' ' + (o.addresses?.[0]?.street || '') + ' ' + (o.addresses?.[0]?.area || 'Visakhapatnam'))}" target="_blank" class="bg-stone-200 text-stone-800 font-bold px-4 py-2 rounded-xl transition flex items-center gap-1">
                            <i class="fas fa-map-marked-alt"></i> Navigate Maps
                        </a>
                    </div>
                </div>
            `).join('');
        } catch (e) {
            container.innerHTML = '<p class="text-rose-600 text-xs font-bold">Failed to load delivery orders.</p>';
        }
    }

    function startGPSTracking(orderNumber) {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser.');
            return;
        }

        currentActiveOrder = orderNumber;

        if (activeWatchId !== null) {
            navigator.geolocation.clearWatch(activeWatchId);
        }

        activeWatchId = navigator.geolocation.watchPosition(
            async (pos) => {
                const { latitude, longitude, accuracy } = pos.coords;

                try {
                    await fetch('/api/delivery/location', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            orderNumber,
                            latitude,
                            longitude,
                            accuracy
                        })
                    });
                } catch (e) {
                    console.error('[GPS Upload Error]', e);
                }
            },
            (err) => {
                console.warn('[GPS Watch Error]', err);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 5000,
                timeout: 10000
            }
        );

        alert(`Live GPS tracking started for Order #${orderNumber}! Coordinates streaming to customer tracking view.`);
    }

    async function markDelivered(orderNumber) {
        if (!confirm(`Confirm order #${orderNumber} delivered to customer?`)) return;

        if (activeWatchId !== null) {
            navigator.geolocation.clearWatch(activeWatchId);
            activeWatchId = null;
        }

        try {
            await fetch('/api/admin/orders', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: orderNumber,
                    newStatus: 'DELIVERED',
                    note: 'Order delivered by delivery partner'
                })
            });

            alert(`Order #${orderNumber} marked as DELIVERED successfully!`);
            refreshOrders();
        } catch (e) {
            alert('Failed to update status.');
        }
    }

    return {
        init,
        refreshOrders,
        startGPSTracking,
        markDelivered
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    if (window.SLBDelivery) window.SLBDelivery.init();
});
