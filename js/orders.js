/**
 * SRI LAKSHMI BAKERY - Order Storage & Generation Engine
 * Format: SLB-YYYYMMDD-XXXX (e.g. SLB-20260914-4827)
 * Keys: slb_orders, slb_last_order, slb_customer
 */

window.SLBOrders = (function () {
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

  function saveCustomerDetails(customerObj) {
    try {
      if (!customerObj) return;
      localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customerObj));
    } catch (e) {}
  }

  function getSavedCustomer() {
    try {
      const saved = localStorage.getItem(CUSTOMER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  function createOrder(orderPayload) {
    const orderId = generateOrderId();
    const cust = orderPayload.customer || {};
    const normalizedMobile = normalizeMobile(cust.mobile);

    const order = {
      orderId: orderId,
      customer: {
        name: cust.name || cust.fullName || "Valued Customer",
        fullName: cust.fullName || cust.name || "Valued Customer",
        mobile: normalizedMobile,
        email: cust.email || "",
        instructions: cust.instructions || "",
        prefs: cust.prefs || { whatsapp: true, sms: false, email: false }
      },
      items: orderPayload.items || [],
      subtotal: orderPayload.subtotal || 0,
      deliveryFee: typeof orderPayload.deliveryFee === 'number' ? orderPayload.deliveryFee : 50,
      discount: orderPayload.discount || 0,
      total: orderPayload.grandTotal || orderPayload.total || 0,
      grandTotal: orderPayload.grandTotal || orderPayload.total || 0,
      fulfillmentType: orderPayload.fulfillmentType || orderPayload.orderType || 'delivery',
      orderType: orderPayload.orderType || orderPayload.fulfillmentType || 'delivery',
      deliveryAddress: orderPayload.deliveryAddress || orderPayload.address || null,
      pickupDetails: orderPayload.pickupDetails || null,
      paymentMethod: orderPayload.paymentMethod || 'upi',
      paymentStatus: orderPayload.paymentStatus || 'Pending Payment Verification',
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

  function getOrderById(orderId) {
    if (!orderId) return null;
    const orders = getOrders();
    return orders.find(o => o.orderId && o.orderId.toUpperCase() === orderId.trim().toUpperCase());
  }

  return {
    generateOrderId,
    normalizeMobile,
    validateMobile,
    validatePin,
    validatePinCode: validatePin,
    saveCustomerDetails,
    getCustomerDetails: getSavedCustomer,
    getSavedCustomer,
    createOrder,
    getOrders,
    getAllOrders: getOrders,
    getLastOrder,
    getOrderById
  };
})();

// Alias BakeryOrders for absolute compatibility
window.BakeryOrders = window.SLBOrders;
