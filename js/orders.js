/**
 * SRI LAKSHMI BAKERY - Order Storage & Generation Engine
 * Format: SLB-YYYYMMDD-XXXX (e.g. SLB-20260914-4827)
 * Keys: slb_orders, slb_last_order, slb_customer
 */

window.BakeryOrders = (function () {
  const ORDERS_KEY = 'slb_orders';
  const LAST_ORDER_KEY = 'slb_last_order';
  const CUSTOMER_KEY = 'slb_customer';

  function generateOrderId() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `SLB-${yyyy}${mm}${dd}-${rand}`;
  }

  function normalizeMobile(mobileStr) {
    if (!mobileStr) return "";
    let clean = mobileStr.replace(/\D/g, "");
    if (clean.length > 10) {
      clean = clean.slice(-10);
    }
    return clean;
  }

  function validateMobile(mobileStr) {
    const clean = normalizeMobile(mobileStr);
    return /^[6-9]\d{9}$/.test(clean);
  }

  function validatePin(pinStr) {
    if (!pinStr) return false;
    const clean = pinStr.replace(/\D/g, "");
    return /^\d{6}$/.test(clean);
  }

  function createOrder(orderPayload) {
    const orderId = generateOrderId();
    const normalizedMobile = normalizeMobile(orderPayload.customer.mobile);

    const order = {
      orderId: orderId,
      customer: {
        fullName: orderPayload.customer.fullName,
        mobile: normalizedMobile,
        email: orderPayload.customer.email || "",
        instructions: orderPayload.customer.instructions || "",
        prefs: orderPayload.customer.prefs || { whatsapp: true, sms: false, email: false }
      },
      items: orderPayload.items,
      subtotal: orderPayload.subtotal,
      deliveryFee: orderPayload.deliveryFee,
      discount: orderPayload.discount,
      total: orderPayload.total,
      orderType: orderPayload.orderType, // 'delivery' or 'pickup'
      address: orderPayload.orderType === 'delivery' ? orderPayload.address : null,
      pickupDate: orderPayload.orderType === 'pickup' ? orderPayload.pickupDate : null,
      pickupSlot: orderPayload.orderType === 'pickup' ? orderPayload.pickupSlot : null,
      paymentMethod: orderPayload.paymentMethod,
      paymentStatus: orderPayload.paymentStatus || 'PAYMENT_PENDING',
      orderStatus: 'ORDER_PLACED',
      createdAt: new Date().toISOString()
    };

    saveOrder(order);
    return order;
  }

  function saveOrder(order) {
    try {
      const orders = getOrders();
      orders.unshift(order);
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
      localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
      localStorage.setItem(CUSTOMER_KEY, JSON.stringify(order.customer));
    } catch (e) {}
  }

  function getOrders() {
    try {
      const saved = localStorage.getItem(ORDERS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  function getLastOrder() {
    try {
      const saved = localStorage.getItem(LAST_ORDER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  function getSavedCustomer() {
    try {
      const saved = localStorage.getItem(CUSTOMER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  function getOrderById(orderId) {
    const orders = getOrders();
    return orders.find(o => o.orderId.toUpperCase() === orderId.trim().toUpperCase());
  }

  return {
    generateOrderId,
    normalizeMobile,
    validateMobile,
    validatePin,
    createOrder,
    getOrders,
    getLastOrder,
    getSavedCustomer,
    getOrderById
  };
})();
