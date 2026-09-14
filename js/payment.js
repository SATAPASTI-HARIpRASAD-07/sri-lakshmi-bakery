/**
 * SRI LAKSHMI BAKERY - Payment Service & Welcome Card
 * Session Key: slb_payment_welcome_shown
 */

window.BakeryPayment = (function () {
  const SESSION_WELCOME_KEY = 'slb_payment_welcome_shown';

  const PAYMENT_STATUS = {
    PENDING: 'PAYMENT_PENDING',
    PROCESSING: 'PAYMENT_PROCESSING',
    SUCCESS: 'PAYMENT_SUCCESS',
    FAILED: 'PAYMENT_FAILED',
    CANCELLED: 'PAYMENT_CANCELLED'
  };

  function hasShownWelcome() {
    try {
      return sessionStorage.getItem(SESSION_WELCOME_KEY) === 'true';
    } catch (e) {
      return false;
    }
  }

  function markWelcomeShown() {
    try {
      sessionStorage.setItem(SESSION_WELCOME_KEY, 'true');
    } catch (e) {}
  }

  function renderWelcomeCard(order, containerId) {
    const container = document.getElementById(containerId);
    if (!container || !order) return;

    markWelcomeShown();

    const maskedMobile = order.customer.mobile ? `******${order.customer.mobile.slice(-4)}` : '******9974';

    container.innerHTML = `
      <div class="p-6 bg-gradient-to-br from-[#FFF3E6] via-white to-[#FFF9F2] rounded-3xl border-2 border-[#A94F20]/30 shadow-xl space-y-4 font-sans text-xs">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-[#5A2D1A] text-[#D9823B] flex items-center justify-center font-bold text-lg">
            🎂
          </div>
          <div>
            <h3 class="font-serif text-lg font-extrabold text-[#5A2D1A]">WELCOME TO SRI LAKSHMI BAKERY</h3>
            <span class="text-[11px] text-[#A94F20] font-bold">Hi ${order.customer.fullName} 👋</span>
          </div>
        </div>

        <p class="text-[#75655D] leading-relaxed">
          Thank you for choosing Sri Lakshmi Bakery! Your order details have been saved and your order is almost complete.
        </p>

        <div class="grid grid-cols-2 gap-3 p-3 bg-white rounded-2xl border border-[#A94F20]/15 font-mono">
          <div>
            <span class="text-[10px] text-[#75655D] block font-bold">ORDER ID</span>
            <span class="font-bold text-[#5A2D1A]">${order.orderId}</span>
          </div>
          <div>
            <span class="text-[10px] text-[#75655D] block font-bold">TOTAL AMOUNT</span>
            <span class="font-bold text-[#A94F20] text-sm">₹${order.total}</span>
          </div>
          <div>
            <span class="text-[10px] text-[#75655D] block font-bold">CUSTOMER MOBILE</span>
            <span class="font-bold text-[#5A2D1A]">${maskedMobile}</span>
          </div>
          <div>
            <span class="text-[10px] text-[#75655D] block font-bold">ORDER TYPE</span>
            <span class="font-bold text-[#5A2D1A] uppercase">${order.orderType === 'delivery' ? 'Home Delivery' : 'Store Pickup'}</span>
          </div>
        </div>

        <div class="pt-2">
          <span class="text-[11px] text-[#75655D] block mb-2 font-bold">Need help or live order updates?</span>
          <button onclick="window.BakeryWhatsApp.openWhatsApp(window.BakeryWhatsApp.formatPaymentWelcomeMessage(window.currentCheckoutOrder))" class="btn-secondary w-full justify-center text-xs uppercase tracking-widest shadow-md">
            <i data-lucide="message-circle" class="w-4 h-4"></i>
            <span>💬 CONTINUE ON WHATSAPP</span>
          </button>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  function initializePayment(order, paymentMethod) {
    order.paymentMethod = paymentMethod;
    order.paymentStatus = PAYMENT_STATUS.PENDING;
    return order;
  }

  function processPayment(order, callback) {
    order.paymentStatus = PAYMENT_STATUS.PROCESSING;

    // Simulate payment processing step
    setTimeout(() => {
      // In static frontend, payment is confirmed or marked pending bakery verification
      order.paymentStatus = PAYMENT_STATUS.SUCCESS;
      order.orderStatus = 'ORDER_PLACED';
      callback(null, order);
    }, 1000);
  }

  return {
    PAYMENT_STATUS,
    hasShownWelcome,
    markWelcomeShown,
    renderWelcomeCard,
    initializePayment,
    processPayment
  };
})();
