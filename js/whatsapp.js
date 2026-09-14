/**
 * SRI LAKSHMI BAKERY - WhatsApp & Phone Call Service
 * Official Business Number: 9668569974
 * Destination URL: https://wa.me/919668569974
 * Call URL: tel:+919668569974
 */

window.BakeryWhatsApp = (function () {
  const BAKERY_PHONE = "9668569974";
  const BAKERY_WA_NUM = "919668569974";
  const CALL_URL = "tel:+919668569974";

  function getBakeryPhone() {
    return BAKERY_PHONE;
  }

  function getCallUrl() {
    return CALL_URL;
  }

  function makePhoneCall() {
    window.location.href = CALL_URL;
  }

  function getWhatsAppUrl(messageText) {
    const encoded = encodeURIComponent(messageText);
    return `https://wa.me/${BAKERY_WA_NUM}?text=${encoded}`;
  }

  function openWhatsApp(messageText) {
    const url = getWhatsAppUrl(messageText);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function formatPaymentWelcomeMessage(order) {
    return `Hello Sri Lakshmi Bakery 👋\n\nI am placing an order.\n\nOrder ID: ${order.orderId}\n\nCustomer:\n${order.customer.fullName}\n\nMobile:\n${order.customer.mobile}\n\nOrder Total:\n₹${order.total}\n\nOrder Type:\n${order.orderType === 'delivery' ? 'Home Delivery' : 'Store Pickup'}\n\nI have reached the payment section. Please assist me with my order.\n\nThank you! 🎂`;
  }

  function formatOrderConfirmationMessage(order) {
    let itemsText = order.items.map(i => `${i.quantity} × ${i.name}`).join('\n');
    return `Hello Sri Lakshmi Bakery 👋\n\nI want to confirm my order.\n\nOrder ID:\n${order.orderId}\n\nCustomer:\n${order.customer.fullName}\n\nMobile:\n${order.customer.mobile}\n\nOrder Type:\n${order.orderType === 'delivery' ? 'Home Delivery' : 'Store Pickup'}\n\nTotal:\n₹${order.total}\n\nItems:\n${itemsText}\n\nPlease confirm my order. Thank you!`;
  }

  function formatTrackingMessage(orderId, customerName) {
    return `Hello Sri Lakshmi Bakery 👋\n\nI want to track my order.\n\nOrder ID:\n${orderId}\n\nCustomer:\n${customerName || 'Customer'}\n\nPlease provide my current order status. Thank you!`;
  }

  return {
    getBakeryPhone,
    getCallUrl,
    makePhoneCall,
    getWhatsAppUrl,
    openWhatsApp,
    formatPaymentWelcomeMessage,
    formatOrderConfirmationMessage,
    formatTrackingMessage
  };
})();
