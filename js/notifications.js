/**
 * SRI LAKSHMI BAKERY - Notification Architecture Module
 * Handles customer order notifications: SMS, Email, Toast Alerts & WhatsApp Dispatch.
 */

window.SLBNotifications = (function () {
    /**
     * Show UI Toast Alert
     */
    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container') || createToastContainer();
        const toast = document.createElement('div');

        let bgColor = 'bg-emerald-600 text-white';
        let icon = 'fa-check-circle';
        if (type === 'error') {
            bgColor = 'bg-rose-600 text-white';
            icon = 'fa-exclamation-circle';
        } else if (type === 'warning') {
            bgColor = 'bg-amber-600 text-white';
            icon = 'fa-triangle-exclamation';
        } else if (type === 'info') {
            bgColor = 'bg-sky-600 text-white';
            icon = 'fa-info-circle';
        }

        toast.className = `flex items-center gap-3 ${bgColor} px-4 py-3 rounded-2xl shadow-xl border border-white/20 transform translate-y-4 opacity-0 transition-all duration-300 pointer-events-auto text-sm font-medium max-w-md`;
        toast.innerHTML = `
            <i class="fas ${icon} text-lg"></i>
            <span class="flex-1">${message}</span>
            <button onclick="this.parentElement.remove()" class="text-white/80 hover:text-white"><i class="fas fa-times text-xs"></i></button>
        `;

        container.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-4', 'opacity-0');
        });

        // Auto remove
        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-2');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    function createToastContainer() {
        const el = document.createElement('div');
        el.id = 'toast-container';
        el.className = 'fixed bottom-20 right-4 md:bottom-6 md:right-6 z-[9999] flex flex-col gap-2 pointer-events-none';
        document.body.appendChild(el);
        return el;
    }

    /**
     * Send Order Confirmation Email (Simulation/Webhook hook)
     */
    function sendOrderConfirmationEmail(order) {
        if (!order || !order.customer.email) return;
        console.log(`[SLB Notification Engine] Dispatching Order Confirmation Email to ${order.customer.email} for Order ${order.orderId}...`);
    }

    /**
     * Send Order Confirmation SMS (Simulation/Webhook hook)
     */
    function sendOrderConfirmationSMS(order) {
        if (!order || !order.customer.mobile) return;
        console.log(`[SLB Notification Engine] Dispatching SMS Alert to +91${order.customer.mobile} for Order ${order.orderId}...`);
    }

    return {
        showToast,
        sendOrderConfirmationEmail,
        sendOrderConfirmationSMS
    };
})();
