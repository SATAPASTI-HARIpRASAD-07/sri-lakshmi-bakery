/**
 * SRI LAKSHMI BAKERY - Shopping Cart State Manager
 * Key: slb_cart
 */

window.SLBCart = (function () {
  const STORAGE_KEY = 'slb_cart';
  let cartItems = [];
  let currentDeliveryFee = 50; // Default delivery fee ₹50

  function loadCart() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) cartItems = JSON.parse(saved);
      else cartItems = [];
    } catch (e) {
      cartItems = [];
    }
    return cartItems;
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {}
  }

  function getCart() {
    loadCart();
    return cartItems;
  }

  function addItem(product, customization = null) {
    loadCart();

    const cartItemId = customization ? `${product.id}-${Date.now()}` : product.id;
    const price = customization ? customization.finalPrice : product.price;

    const existing = !customization ? cartItems.find(item => item.id === product.id && !item.customization) : null;

    if (existing) {
      existing.quantity += 1;
    } else {
      cartItems.push({
        id: cartItemId,
        cartItemId: cartItemId,
        productId: product.id,
        name: customization && product.isCake ? `${product.name} (${customization.weight})` : product.name,
        category: product.category,
        price: price,
        rawPrice: price,
        quantity: 1,
        image: product.image,
        customization: customization,
        isCake: product.isCake || false
      });
    }

    saveCart();
    return cartItems;
  }

  function updateQuantity(cartItemId, delta) {
    loadCart();
    const item = cartItems.find(i => i.id === cartItemId || i.cartItemId === cartItemId);
    if (!item) return cartItems;

    const change = typeof delta === 'number' ? delta : 0;
    item.quantity += change;

    if (item.quantity <= 0) {
      cartItems = cartItems.filter(i => i.id !== cartItemId && i.cartItemId !== cartItemId);
    }

    saveCart();
    return cartItems;
  }

  function removeItem(cartItemId) {
    loadCart();
    cartItems = cartItems.filter(i => i.id !== cartItemId && i.cartItemId !== cartItemId);
    saveCart();
    return cartItems;
  }

  function clearCart() {
    cartItems = [];
    saveCart();
    return cartItems;
  }

  function getSubtotal() {
    loadCart();
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  function setDeliveryFee(fee) {
    currentDeliveryFee = typeof fee === 'number' ? fee : 50;
  }

  function getDeliveryFee(orderType) {
    if (orderType === 'pickup') return 0;
    if (orderType === 'delivery') return 50;
    return currentDeliveryFee;
  }

  function getDiscount(couponCode, subtotal) {
    if (couponCode && couponCode.toUpperCase() === 'FRESH10') {
      return Math.round(subtotal * 0.10);
    }
    return 0;
  }

  function getTotal(orderType, couponCode) {
    const subtotal = getSubtotal();
    const delivery = getDeliveryFee(orderType);
    const discount = getDiscount(couponCode, subtotal);
    return Math.max(0, subtotal + delivery - discount);
  }

  function getCartSummary(couponCode = null, orderType = 'delivery') {
    loadCart();
    const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = getSubtotal();
    const deliveryFee = subtotal > 0 ? getDeliveryFee(orderType) : 0;
    const discount = getDiscount(couponCode, subtotal);
    const grandTotal = Math.max(0, subtotal + deliveryFee - discount);

    return {
      items: cartItems,
      totalCount,
      subtotal,
      discount,
      deliveryFee,
      grandTotal,
      couponCode
    };
  }

  // Load initial cart
  loadCart();

  return {
    getCart,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    getSubtotal,
    setDeliveryFee,
    getDeliveryFee,
    getDiscount,
    getTotal,
    getCartSummary
  };
})();

// Alias window.BakeryCart for absolute backwards compatibility
window.BakeryCart = window.SLBCart;
