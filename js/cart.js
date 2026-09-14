/**
 * SRI LAKSHMI BAKERY - Shopping Cart State Manager
 * Key: slb_cart
 */

window.BakeryCart = (function () {
  const STORAGE_KEY = 'slb_cart';
  let cartItems = [];

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
    const item = cartItems.find(i => i.id === cartItemId);
    if (!item) return cartItems;

    item.quantity += delta;
    if (item.quantity <= 0) {
      cartItems = cartItems.filter(i => i.id !== cartItemId);
    }

    saveCart();
    return cartItems;
  }

  function removeItem(cartItemId) {
    loadCart();
    cartItems = cartItems.filter(i => i.id !== cartItemId);
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

  function getDeliveryFee(orderType) {
    if (orderType === 'delivery') return 50;
    return 0; // Store pickup is free
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

  // Load initial cart
  loadCart();

  return {
    getCart,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    getSubtotal,
    getDeliveryFee,
    getDiscount,
    getTotal
  };
})();
