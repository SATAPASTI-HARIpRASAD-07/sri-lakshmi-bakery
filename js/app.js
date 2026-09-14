/**
 * SRI LAKSHMI BAKERY - Master Application Logic (Updated with E-Commerce, Custom Cake Builder, Pre-Orders, Events & Owner Admin Dashboard)
 */

window.App = (function () {
  let cart = [];
  let selectedCategory = 'all';
  let searchQuery = '';

  // Customization state for currently viewed cake
  let currentCustomization = {
    weight: '0.5kg',
    type: 'eggless',
    flavour: 'Belgian Dark Chocolate',
    message: '',
    instructions: ''
  };

  // Checkout pre-order state
  let checkoutState = {
    pickupDate: new Date().toISOString().split('T')[0],
    pickupSlot: '05:00 PM',
    paymentMethod: 'upi',
    couponCode: '',
    discountAmount: 0
  };

  function init() {
    loadCartFromStorage();
    initAdminStorage();
    initPreloader();
    initStickyNav();
    renderCategories();
    renderProducts();
    renderSeatingAreas();
    renderReviews();
    renderGallery();
    renderQualityFeatures();
    initStatsCounter();
    updateCartUI();

    if (window.Bakery3DEngine) {
      window.Bakery3DEngine.initHeroScene('hero-3d-canvas');
    }

    if (window.lucide) window.lucide.createIcons();
  }

  function initAdminStorage() {
    try {
      if (!localStorage.getItem('sri_lakshmi_admin_orders')) {
        localStorage.setItem('sri_lakshmi_admin_orders', JSON.stringify(window.BAKERY_DATA.initialAdminData.orders));
      }
      if (!localStorage.getItem('sri_lakshmi_custom_requests')) {
        localStorage.setItem('sri_lakshmi_custom_requests', JSON.stringify(window.BAKERY_DATA.initialAdminData.customRequests));
      }
      if (!localStorage.getItem('sri_lakshmi_event_bookings')) {
        localStorage.setItem('sri_lakshmi_event_bookings', JSON.stringify(window.BAKERY_DATA.initialAdminData.eventBookings));
      }
    } catch (e) {}
  }

  function initPreloader() {
    const preloader = document.getElementById('bakery-preloader');
    if (!preloader) return;
    setTimeout(() => {
      preloader.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => preloader.remove(), 600);
    }, 1200);
  }

  function initStickyNav() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.classList.add('py-3', 'bg-[#FFF9F2]/95', 'backdrop-blur-md', 'shadow-md', 'border-b', 'border-[#A94F20]/15');
        nav.classList.remove('py-5');
      } else {
        nav.classList.remove('py-3', 'bg-[#FFF9F2]/95', 'backdrop-blur-md', 'shadow-md', 'border-b', 'border-[#A94F20]/15');
        nav.classList.add('py-5');
      }
    });
  }

  function renderCategories() {
    const strip = document.getElementById('category-strip-container');
    if (!strip || !window.BAKERY_DATA) return;

    const cats = window.BAKERY_DATA.categories;
    strip.innerHTML = cats.map(cat => `
      <button onclick="window.App.setCategory('${cat.id}')" data-cat="${cat.id}" class="category-btn group flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl bg-white border border-[#A94F20]/15 shadow-sm hover:shadow-xl hover:border-[#D9823B] hover:-translate-y-1 transition-all duration-300 ${selectedCategory === cat.id ? 'bg-[#5A2D1A] text-white border-[#5A2D1A]' : 'text-[#241812]'}">
        <div class="w-10 h-10 rounded-xl bg-[#FFF9F2] flex items-center justify-center text-[#A94F20] group-hover:bg-[#D9823B] group-hover:text-white transition-colors">
          <i data-lucide="${cat.icon}" class="w-5 h-5"></i>
        </div>
        <div class="text-left">
          <span class="block text-sm font-bold tracking-tight">${cat.name}</span>
          <span class="block text-[11px] opacity-70">${cat.subtitle}</span>
        </div>
      </button>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function setCategory(catId) {
    selectedCategory = catId;
    renderCategories();
    renderProducts();

    const menuElem = document.getElementById('products-section');
    if (menuElem) {
      menuElem.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid || !window.BAKERY_DATA) return;

    let items = window.BAKERY_DATA.products;

    if (selectedCategory !== 'all') {
      items = items.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      items = items.filter(p => p.name.toLowerCase().includes(q) || p.shortDesc.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-16 space-y-3">
          <i data-lucide="cookie" class="w-12 h-12 text-[#A94F20] mx-auto opacity-40"></i>
          <h4 class="text-lg font-bold text-[#5A2D1A]">No items found</h4>
          <p class="text-sm text-[#75655D]">Try searching for something else like "Rasmalai", "Badam Milk", or "Pastry".</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    grid.innerHTML = items.map(p => `
      <div class="bakery-card group overflow-hidden flex flex-col justify-between">
        <div>
          <div class="relative aspect-square overflow-hidden bg-[#FFF9F2]">
            <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            ${p.bestseller ? `
              <span class="absolute top-4 left-4 bg-[#A94F20] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-md">
                Bestseller
              </span>
            ` : ''}
            <button onclick="window.App.openQuickView('${p.id}')" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 text-[#5A2D1A] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-[#5A2D1A] hover:text-white">
              <i data-lucide="eye" class="w-4 h-4"></i>
            </button>
          </div>

          <div class="p-6 space-y-2">
            <div class="flex justify-between items-start">
              <span class="text-[11px] uppercase tracking-wider text-[#A94F20] font-bold">${p.category}</span>
              <div class="flex items-center gap-1 text-xs font-bold text-[#D9823B]">
                <i data-lucide="star" class="w-3.5 h-3.5 fill-[#D9823B]"></i>
                <span>${p.rating}</span>
              </div>
            </div>

            <h3 onclick="window.App.openQuickView('${p.id}')" class="font-serif text-xl font-bold text-[#241812] group-hover:text-[#A94F20] transition-colors cursor-pointer">${p.name}</h3>
            <p class="text-xs text-[#75655D] leading-relaxed line-clamp-2">${p.shortDesc}</p>
          </div>
        </div>

        <div class="p-6 pt-0 flex items-center justify-between border-t border-[#A94F20]/10 mt-4">
          <div>
            <span class="text-xs text-[#75655D] block">${p.unit}</span>
            <span class="font-display text-xl font-extrabold text-[#5A2D1A]">${p.price}</span>
          </div>

          <button onclick="window.App.openQuickView('${p.id}')" class="px-4 py-2.5 bg-[#A94F20] text-white rounded-full text-xs font-bold hover:bg-[#5A2D1A] transition-colors flex items-center gap-1.5 shadow-md">
            <i data-lucide="sliders" class="w-3.5 h-3.5"></i>
            <span>${p.isCake ? 'Customize' : 'Order'}</span>
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function handleSearch(query) {
    searchQuery = query;
    renderProducts();
  }

  function renderSeatingAreas() {
    const container = document.getElementById('seating-areas-grid');
    if (!container || !window.BAKERY_DATA) return;

    const areas = window.BAKERY_DATA.seatingAreas;
    container.innerHTML = areas.map(a => `
      <div class="bakery-card group overflow-hidden flex flex-col justify-between">
        <div>
          <div class="relative aspect-video overflow-hidden">
            <img src="${a.image}" alt="${a.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <span class="absolute top-4 left-4 bg-[#5A2D1A] text-white text-[11px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-lg">
              ${a.badge}
            </span>
          </div>
          <div class="p-6 space-y-3">
            <h3 class="font-serif text-2xl font-bold text-[#5A2D1A]">${a.title}</h3>
            <p class="text-xs text-[#75655D] leading-relaxed">${a.desc}</p>
          </div>
        </div>

        <div class="p-6 pt-0">
          <button onclick="window.App.openEventModal()" class="w-full py-3 bg-[#FFF9F2] border border-[#A94F20]/30 text-[#A94F20] font-bold rounded-xl text-xs hover:bg-[#A94F20] hover:text-white transition-colors flex items-center justify-center gap-2">
            <i data-lucide="party-popper" class="w-4 h-4 text-[#D9823B]"></i>
            <span>Reserve Party Space</span>
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  /**
   * ENHANCED QUICK VIEW & CAKE CUSTOMIZER
   */
  function openQuickView(productId) {
    const product = window.BAKERY_DATA.products.find(p => p.id === productId);
    const modal = document.getElementById('quick-view-modal');
    const content = document.getElementById('quick-view-content');
    if (!product || !modal || !content) return;

    // Reset customization state
    currentCustomization = {
      weight: '0.5kg',
      type: 'eggless',
      flavour: window.BAKERY_DATA.cakeCustomizer.flavours[0],
      message: '',
      instructions: ''
    };

    renderQuickViewContent(product);

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.lucide) window.lucide.createIcons();
  }

  function renderQuickViewContent(product) {
    const content = document.getElementById('quick-view-content');
    if (!content) return;

    const weights = window.BAKERY_DATA.cakeCustomizer.weights;
    const types = window.BAKERY_DATA.cakeCustomizer.types;

    // Calculate dynamic price based on weight & eggless option
    const selectedWeightObj = weights.find(w => w.id === currentCustomization.weight) || weights[0];
    const selectedTypeObj = types.find(t => t.id === currentCustomization.type) || types[0];

    const basePrice = product.rawPrice;
    let finalPrice = Math.round(basePrice * selectedWeightObj.multiplier) + selectedTypeObj.extraPrice;
    if (!product.isCake) finalPrice = basePrice;

    content.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 max-h-[80vh] overflow-y-auto pr-2">
        <div class="md:col-span-5 relative aspect-square overflow-hidden rounded-2xl border border-[#A94F20]/20">
          <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover" />
          <span class="absolute top-4 left-4 bg-[#5A2D1A] text-white text-xs font-bold px-3 py-1 rounded-full">
            ${product.isCake ? selectedWeightObj.label : product.unit}
          </span>
        </div>

        <div class="md:col-span-7 flex flex-col justify-between space-y-4">
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs uppercase tracking-widest text-[#A94F20] font-bold">${product.category}</span>
              <div class="flex items-center gap-1 text-xs font-bold text-[#D9823B]">
                <i data-lucide="star" class="w-4 h-4 fill-[#D9823B]"></i>
                <span>${product.rating} (${product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h3 class="font-serif text-2xl md:text-3xl font-bold text-[#5A2D1A] mb-2">${product.name}</h3>
            <p class="text-xs text-[#75655D] leading-relaxed mb-4">${product.fullDesc}</p>

            ${product.isCake ? `
              <!-- CAKE CUSTOMIZER CONTROLS -->
              <div class="space-y-4 p-4 bg-[#FFF9F2] rounded-2xl border border-[#A94F20]/15 mb-4 text-xs">
                <!-- Weight Selection -->
                <div>
                  <label class="font-bold text-[#5A2D1A] block mb-2">1. Select Cake Size / Weight</label>
                  <div class="grid grid-cols-4 gap-2">
                    ${weights.map(w => `
                      <button onclick="window.App.updateCakeCustomization('weight', '${w.id}', '${product.id}')" class="py-2 px-1 rounded-xl text-xs font-bold border transition-all ${currentCustomization.weight === w.id ? 'bg-[#5A2D1A] text-white border-[#5A2D1A]' : 'bg-white text-[#241812] border-[#A94F20]/20 hover:border-[#D9823B]'}">
                        ${w.label}
                      </button>
                    `).join('')}
                  </div>
                </div>

                <!-- Type Selection (Egg / Eggless) -->
                <div>
                  <label class="font-bold text-[#5A2D1A] block mb-2">2. Cake Preparation Type</label>
                  <div class="grid grid-cols-2 gap-2">
                    ${types.map(t => `
                      <button onclick="window.App.updateCakeCustomization('type', '${t.id}', '${product.id}')" class="py-2 px-2 rounded-xl text-xs font-bold border transition-all ${currentCustomization.type === t.id ? 'bg-[#A94F20] text-white border-[#A94F20]' : 'bg-white text-[#241812] border-[#A94F20]/20 hover:border-[#D9823B]'}">
                        ${t.label}
                      </button>
                    `).join('')}
                  </div>
                </div>

                <!-- Custom Message on Cake -->
                <div>
                  <label class="font-bold text-[#5A2D1A] block mb-1">3. Message Written on Cake</label>
                  <input type="text" value="${currentCustomization.message}" onchange="window.App.updateCakeCustomization('message', this.value, '${product.id}')" placeholder="e.g. Happy Birthday Ananya!" class="w-full bg-white border border-[#A94F20]/20 rounded-xl p-2.5 outline-none focus:border-[#D9823B]" />
                </div>

                <!-- Special Baking Instructions -->
                <div>
                  <label class="font-bold text-[#5A2D1A] block mb-1">4. Special Custom Instructions</label>
                  <textarea rows="2" onchange="window.App.updateCakeCustomization('instructions', this.value, '${product.id}')" placeholder="e.g. Less sugar, extra chocolate curls..." class="w-full bg-white border border-[#A94F20]/20 rounded-xl p-2.5 outline-none focus:border-[#D9823B]">${currentCustomization.instructions}</textarea>
                </div>
              </div>
            ` : ''}

            <!-- Price Display -->
            <div class="flex items-baseline gap-2">
              <span class="text-xs text-[#75655D]">Calculated Price:</span>
              <span class="text-2xl font-extrabold text-[#5A2D1A] font-display">₹${finalPrice}</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#A94F20]/15">
            <button onclick="window.App.addCustomizedToCart('${product.id}', ${finalPrice}); window.App.closeQuickView();" class="btn-primary flex-1 justify-center text-xs">
              <i data-lucide="shopping-bag" class="w-4 h-4"></i>
              <span>Add Customized Item to Cart</span>
            </button>
            <button onclick="window.App.addCustomizedToCart('${product.id}', ${finalPrice}); window.App.closeQuickView(); window.App.openCartDrawer();" class="btn-secondary flex-1 justify-center text-xs">
              <i data-lucide="check-circle" class="w-4 h-4"></i>
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  function updateCakeCustomization(field, val, productId) {
    currentCustomization[field] = val;
    const product = window.BAKERY_DATA.products.find(p => p.id === productId);
    if (product) renderQuickViewContent(product);
  }

  function closeQuickView() {
    const modal = document.getElementById('quick-view-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  function addCustomizedToCart(productId, finalPrice) {
    const product = window.BAKERY_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const customizedItem = {
      ...product,
      id: `${product.id}-${Date.now()}`,
      originalId: product.id,
      name: product.isCake ? `${product.name} (${currentCustomization.weight})` : product.name,
      rawPrice: finalPrice,
      customization: product.isCake ? { ...currentCustomization } : null,
      quantity: 1
    };

    cart.push(customizedItem);
    saveCartToStorage();
    updateCartUI();
    showToast(`Added ${customizedItem.name} to Cart`);
  }

  function loadCartFromStorage() {
    try {
      const saved = localStorage.getItem('sri_lakshmi_cart');
      if (saved) cart = JSON.parse(saved);
    } catch (e) {
      cart = [];
    }
  }

  function saveCartToStorage() {
    try {
      localStorage.setItem('sri_lakshmi_cart', JSON.stringify(cart));
    } catch (e) {}
  }

  function addToCart(productId) {
    const product = window.BAKERY_DATA.products.find(p => p.id === productId);
    if (!product) return;

    if (product.isCake) {
      openQuickView(productId);
      return;
    }

    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    saveCartToStorage();
    updateCartUI();
    showToast(`Added ${product.name} to Cart`);
  }

  function updateQuantity(cartItemId, delta) {
    const item = cart.find(i => i.id === cartItemId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== cartItemId);
    }

    saveCartToStorage();
    updateCartUI();
  }

  function removeFromCart(cartItemId) {
    cart = cart.filter(i => i.id !== cartItemId);
    saveCartToStorage();
    updateCartUI();
  }

  function applyCoupon(code) {
    checkoutState.couponCode = code.trim().toUpperCase();
    if (checkoutState.couponCode === 'FRESH10') {
      showToast('Coupon FRESH10 Applied! 10% Discount Saved.');
    } else {
      checkoutState.couponCode = '';
      showToast('Invalid Coupon Code');
    }
    updateCartUI();
  }

  function updateCheckoutState(key, val) {
    checkoutState[key] = val;
    updateCartUI();
  }

  function updateCartUI() {
    const badge = document.getElementById('cart-badge');
    const totalCount = cart.reduce((acc, i) => acc + i.quantity, 0);
    if (badge) {
      badge.innerText = totalCount;
      if (totalCount > 0) badge.classList.remove('hidden');
      else badge.classList.add('hidden');
    }

    const container = document.getElementById('cart-drawer-items');
    const subtotalElem = document.getElementById('cart-subtotal');
    const discountElem = document.getElementById('cart-discount');
    const totalElem = document.getElementById('cart-total');

    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="text-center py-16 space-y-3">
          <i data-lucide="shopping-bag" class="w-12 h-12 text-[#A94F20] mx-auto opacity-30"></i>
          <p class="text-sm font-bold text-[#5A2D1A]">Your shopping cart is empty.</p>
          <p class="text-xs text-[#75655D]">Add fresh cakes, badam milk, or pastries to get started!</p>
        </div>
      `;
      if (subtotalElem) subtotalElem.innerText = '₹0';
      if (discountElem) discountElem.innerText = '₹0';
      if (totalElem) totalElem.innerText = '₹0';
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    const subtotal = cart.reduce((acc, item) => acc + (item.rawPrice * item.quantity), 0);
    let discount = 0;
    if (checkoutState.couponCode === 'FRESH10') {
      discount = Math.round(subtotal * 0.10);
    }
    const finalTotal = subtotal - discount;

    const pickupSlots = window.BAKERY_DATA.pickupSlots;

    container.innerHTML = `
      <div class="space-y-3">
        ${cart.map(item => `
          <div class="flex items-center justify-between p-4 bg-white rounded-2xl border border-[#A94F20]/15 shadow-sm">
            <div class="flex items-center gap-3">
              <img src="${item.image}" alt="${item.name}" class="w-14 h-14 rounded-xl object-cover" />
              <div>
                <h4 class="text-xs font-bold text-[#5A2D1A] line-clamp-1">${item.name}</h4>
                ${item.customization ? `
                  <span class="text-[10px] text-[#A94F20] block font-semibold">${item.customization.type === 'eggless' ? '🌱 Eggless' : '🥚 With Egg'} ${item.customization.message ? '| Msg: "' + item.customization.message + '"' : ''}</span>
                ` : ''}
                <span class="text-xs text-[#A94F20] font-bold">₹${item.rawPrice * item.quantity}</span>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button onclick="window.App.updateQuantity('${item.id}', -1)" class="w-7 h-7 rounded-lg bg-[#FFF9F2] text-[#5A2D1A] font-bold hover:bg-[#A94F20] hover:text-white transition-colors">-</button>
              <span class="text-xs font-bold px-1">${item.quantity}</span>
              <button onclick="window.App.updateQuantity('${item.id}', 1)" class="w-7 h-7 rounded-lg bg-[#FFF9F2] text-[#5A2D1A] font-bold hover:bg-[#A94F20] hover:text-white transition-colors">+</button>
              <button onclick="window.App.removeFromCart('${item.id}')" class="ml-2 text-[#75655D] hover:text-red-500">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        `).join('')}

        <!-- PRE-ORDER PICKUP SLOT SELECTOR -->
        <div class="p-4 bg-white rounded-2xl border border-[#A94F20]/15 space-y-3 text-xs">
          <span class="font-bold text-[#5A2D1A] block">📅 Select Pre-Order Pickup Slot</span>
          
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-[10px] text-[#75655D] block mb-1">Pickup Date</label>
              <input type="date" value="${checkoutState.pickupDate}" onchange="window.App.updateCheckoutState('pickupDate', this.value)" class="w-full bg-[#FFF9F2] border border-[#A94F20]/20 rounded-xl p-2 outline-none font-bold text-[#5A2D1A]" />
            </div>

            <div>
              <label class="text-[10px] text-[#75655D] block mb-1">Pickup Time Slot</label>
              <select onchange="window.App.updateCheckoutState('pickupSlot', this.value)" class="w-full bg-[#FFF9F2] border border-[#A94F20]/20 rounded-xl p-2 outline-none font-bold text-[#5A2D1A]">
                ${pickupSlots.map(s => `<option value="${s.time}" ${checkoutState.pickupSlot === s.time ? 'selected' : ''}>${s.time}</option>`).join('')}
              </select>
            </div>
          </div>

          <!-- MULTI-PAYMENT METHOD SELECTION -->
          <div class="pt-2 border-t border-[#A94F20]/10">
            <span class="font-bold text-[#5A2D1A] block mb-2">💳 Payment Method</span>
            <div class="space-y-1.5 font-bold">
              <label class="flex items-center gap-2 p-2 rounded-xl border ${checkoutState.paymentMethod === 'upi' ? 'bg-[#5A2D1A] text-white border-[#5A2D1A]' : 'bg-[#FFF9F2] text-[#241812] border-[#A94F20]/15'}">
                <input type="radio" name="paymentMethod" value="upi" ${checkoutState.paymentMethod === 'upi' ? 'checked' : ''} onchange="window.App.updateCheckoutState('paymentMethod', 'upi')" class="accent-[#D9823B]" />
                <span>📱 Instant UPI (Google Pay, PhonePe, Paytm)</span>
              </label>

              <label class="flex items-center gap-2 p-2 rounded-xl border ${checkoutState.paymentMethod === 'card' ? 'bg-[#5A2D1A] text-white border-[#5A2D1A]' : 'bg-[#FFF9F2] text-[#241812] border-[#A94F20]/15'}">
                <input type="radio" name="paymentMethod" value="card" ${checkoutState.paymentMethod === 'card' ? 'checked' : ''} onchange="window.App.updateCheckoutState('paymentMethod', 'card')" class="accent-[#D9823B]" />
                <span>💳 Credit / Debit Card (Razorpay)</span>
              </label>

              <label class="flex items-center gap-2 p-2 rounded-xl border ${checkoutState.paymentMethod === 'cod' ? 'bg-[#5A2D1A] text-white border-[#5A2D1A]' : 'bg-[#FFF9F2] text-[#241812] border-[#A94F20]/15'}">
                <input type="radio" name="paymentMethod" value="cod" ${checkoutState.paymentMethod === 'cod' ? 'checked' : ''} onchange="window.App.updateCheckoutState('paymentMethod', 'cod')" class="accent-[#D9823B]" />
                <span>💵 Pay Cash on Pickup</span>
              </label>
            </div>
          </div>

          <!-- COUPON CODE FIELD -->
          <div class="pt-2 flex gap-2">
            <input type="text" id="coupon-input-field" placeholder="Promo code (e.g. FRESH10)" value="${checkoutState.couponCode}" class="flex-1 bg-[#FFF9F2] border border-[#A94F20]/20 rounded-xl px-3 py-2 text-xs uppercase outline-none font-mono" />
            <button onclick="window.App.applyCoupon(document.getElementById('coupon-input-field').value)" class="px-4 py-2 bg-[#5A2D1A] text-white font-bold rounded-xl text-xs hover:bg-[#A94F20]">
              Apply
            </button>
          </div>
        </div>
      </div>
    `;

    if (subtotalElem) subtotalElem.innerText = `₹${subtotal}`;
    if (discountElem) discountElem.innerText = `-₹${discount}`;
    if (totalElem) totalElem.innerText = `₹${finalTotal}`;

    if (window.lucide) window.lucide.createIcons();
  }

  function openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) {
      drawer.classList.remove('hidden');
      drawer.classList.add('flex');
    }
  }

  function closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) {
      drawer.classList.add('hidden');
      drawer.classList.remove('flex');
    }
  }

  /**
   * TRIGGER ORDER SUCCESS & SAVE TO ADMIN DASHBOARD
   */
  function triggerOrderSuccess() {
    if (cart.length === 0) {
      showToast('Your cart is empty');
      return;
    }

    closeQuickView();
    closeCartDrawer();

    const subtotal = cart.reduce((acc, item) => acc + (item.rawPrice * item.quantity), 0);
    let discount = 0;
    if (checkoutState.couponCode === 'FRESH10') discount = Math.round(subtotal * 0.10);
    const finalTotal = subtotal - discount;

    const orderId = `SLB-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: orderId,
      customerName: "Customer Order",
      phone: "+91 98765 43210",
      items: cart.map(i => ({ name: i.name, quantity: i.quantity, price: i.rawPrice * i.quantity })),
      total: finalTotal,
      status: "Preparing",
      pickupDate: checkoutState.pickupDate,
      pickupSlot: checkoutState.pickupSlot,
      paymentMethod: checkoutState.paymentMethod.toUpperCase(),
      createdAt: new Date().toLocaleString()
    };

    // Save to Admin Orders in LocalStorage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('sri_lakshmi_admin_orders') || '[]');
      existingOrders.unshift(newOrder);
      localStorage.setItem('sri_lakshmi_admin_orders', JSON.stringify(existingOrders));
    } catch (e) {}

    const modal = document.getElementById('order-success-modal');
    const content = document.getElementById('order-success-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="text-center space-y-6 py-4">
        <div class="w-20 h-20 rounded-full bg-[#25D366]/15 border-2 border-[#25D366] text-[#25D366] flex items-center justify-center mx-auto shadow-xl animate-bounce">
          <i data-lucide="check" class="w-10 h-10"></i>
        </div>

        <div>
          <span class="text-xs uppercase font-bold tracking-[0.25em] text-[#A94F20]">ORDER CONFIRMED</span>
          <h3 class="font-serif text-3xl font-bold text-[#5A2D1A] mt-1">ORDER PLACED SUCCESSFULLY!</h3>
          <p class="text-xs text-[#75655D] max-w-sm mx-auto mt-2 leading-relaxed">
            Your order has been received cleanly by our master bakers. Please wait a few minutes while we freshly prepare & pack your items!
          </p>
        </div>

        <div class="p-6 bg-[#FFF9F2] border border-[#A94F20]/20 rounded-2xl max-w-md mx-auto text-left space-y-3 text-xs">
          <div class="flex justify-between items-center pb-3 border-b border-[#A94F20]/15">
            <span class="text-[#75655D] uppercase font-bold text-[10px]">TRACKING ID</span>
            <span class="font-mono font-bold text-[#5A2D1A]">${orderId}</span>
          </div>

          <div class="flex justify-between items-center pb-3 border-b border-[#A94F20]/15">
            <span class="text-[#75655D] uppercase font-bold text-[10px]">PRE-ORDER PICKUP</span>
            <span class="font-bold text-[#A94F20]">${checkoutState.pickupDate} @ ${checkoutState.pickupSlot}</span>
          </div>

          <div class="space-y-1 pt-1">
            <span class="text-[#75655D] uppercase font-bold text-[10px] block mb-1">ORDERED ITEMS</span>
            ${cart.map(i => `<div class="flex justify-between text-xs"><span>${i.name} x ${i.quantity}</span><span class="font-bold">₹${i.rawPrice * i.quantity}</span></div>`).join('')}
          </div>

          <div class="flex justify-between items-center pt-3 border-t border-[#A94F20]/15 text-sm font-extrabold text-[#5A2D1A]">
            <span>TOTAL AMOUNT PAID</span>
            <span class="text-[#A94F20]">₹${finalTotal}</span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
          <button onclick="window.App.checkoutViaWhatsApp()" class="btn-secondary flex-1 justify-center text-xs">
            <i data-lucide="message-circle" class="w-4 h-4"></i>
            <span>Track on WhatsApp</span>
          </button>
          <button onclick="window.App.closeOrderSuccess();" class="px-6 py-3.5 bg-[#5A2D1A] text-white font-bold rounded-full text-xs hover:bg-[#A94F20] transition-colors">
            Done
          </button>
        </div>
      </div>
    `;

    // Reset cart
    cart = [];
    saveCartToStorage();
    updateCartUI();

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.lucide) window.lucide.createIcons();
  }

  function closeOrderSuccess() {
    const modal = document.getElementById('order-success-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  /**
   * CUSTOM CAKE QUOTE REQUEST FORM SUBMISSION
   */
  function submitCustomCakeRequest(e) {
    e.preventDefault();
    const form = e.target;
    const reqId = `CR-${Math.floor(100 + Math.random() * 900)}`;

    const newReq = {
      id: reqId,
      customerName: form.customerName.value,
      phone: form.phone.value,
      occasion: form.occasion.value,
      cakeType: form.cakeType.value,
      flavour: form.flavour.value,
      weight: form.weight.value,
      eggless: form.eggless.value,
      pickupDate: form.pickupDate.value,
      pickupTime: form.pickupTime.value,
      message: form.cakeMessage.value,
      status: "Pending Quote",
      quotedPrice: null,
      referenceImg: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=400&q=80"
    };

    try {
      const existingReqs = JSON.parse(localStorage.getItem('sri_lakshmi_custom_requests') || '[]');
      existingReqs.unshift(newReq);
      localStorage.setItem('sri_lakshmi_custom_requests', JSON.stringify(existingReqs));
    } catch (err) {}

    showToast(`Custom Cake Request ${reqId} Submitted to Owner!`);
    form.reset();

    // Show Confirmation Alert
    alert(`Thank you ${newReq.customerName}! Your Custom Cake Request (${reqId}) has been sent directly to the Bakery Owner. We will review your design & contact you with the final price quote!`);
  }

  /**
   * EVENT SPACE BOOKING SUBMISSION
   */
  function submitEventBooking(e) {
    e.preventDefault();
    const form = e.target;
    const evId = `EV-${Math.floor(200 + Math.random() * 800)}`;

    const newEv = {
      id: evId,
      customerName: form.customerName.value,
      phone: form.phone.value,
      occasion: form.occasion.value,
      guests: form.guests.value,
      seatingArea: form.seatingArea.value,
      date: form.date.value,
      slot: form.slot.value,
      status: "Confirmed"
    };

    try {
      const existingEvs = JSON.parse(localStorage.getItem('sri_lakshmi_event_bookings') || '[]');
      existingEvs.unshift(newEv);
      localStorage.setItem('sri_lakshmi_event_bookings', JSON.stringify(existingEvs));
    } catch (err) {}

    showToast(`Event Booking ${evId} Confirmed!`);
    form.reset();
    alert(`Congratulations ${newEv.customerName}! Your party reservation for ${newEv.occasion} (${newEv.date}) is registered. See you at Sri Lakshmi Bakery!`);
  }

  /**
   * OWNER ADMIN DASHBOARD ENGINE
   */
  function openAdminDashboard() {
    const modal = document.getElementById('admin-modal');
    if (!modal) return;

    renderAdminOrdersTab();

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.lucide) window.lucide.createIcons();
  }

  function closeAdminDashboard() {
    const modal = document.getElementById('admin-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  function switchAdminTab(tabName) {
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.className = "admin-tab-btn px-4 py-2 rounded-xl text-xs font-bold transition-all text-[#75655D] hover:text-[#5A2D1A]";
    });
    const activeBtn = document.getElementById(`admin-tab-${tabName}`);
    if (activeBtn) activeBtn.className = "admin-tab-btn px-4 py-2 rounded-xl text-xs font-bold transition-all bg-[#5A2D1A] text-white";

    if (tabName === 'orders') renderAdminOrdersTab();
    if (tabName === 'quotes') renderAdminQuotesTab();
    if (tabName === 'events') renderAdminEventsTab();
  }

  function renderAdminOrdersTab() {
    const body = document.getElementById('admin-tab-body');
    if (!body) return;

    let orders = [];
    try {
      orders = JSON.parse(localStorage.getItem('sri_lakshmi_admin_orders') || '[]');
    } catch (e) {}

    body.innerHTML = `
      <div class="space-y-4">
        <div class="flex justify-between items-center pb-2 border-b border-[#A94F20]/15">
          <h4 class="font-serif text-xl font-bold text-[#5A2D1A]">Live Customer Orders (${orders.length})</h4>
        </div>

        ${orders.length === 0 ? '<p class="text-xs text-[#75655D]">No active orders right now.</p>' : `
          <div class="space-y-3">
            ${orders.map(o => `
              <div class="p-4 bg-white rounded-2xl border border-[#A94F20]/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
                <div>
                  <div class="flex items-center gap-3">
                    <span class="font-mono font-bold text-[#5A2D1A]">${o.id}</span>
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${o.status === 'Preparing' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}">${o.status}</span>
                  </div>
                  <p class="font-bold text-[#A94F20] mt-1">${o.customerName} (${o.phone})</p>
                  <p class="text-[11px] text-[#75655D]">Pickup: ${o.pickupDate} @ ${o.pickupSlot} | ${o.paymentMethod}</p>
                </div>

                <div class="flex items-center gap-2">
                  <button onclick="window.App.updateAdminOrderStatus('${o.id}', 'Preparing')" class="px-3 py-1.5 bg-amber-100 text-amber-800 rounded-lg font-bold hover:bg-amber-200">Preparing</button>
                  <button onclick="window.App.updateAdminOrderStatus('${o.id}', 'Ready for Pickup')" class="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg font-bold hover:bg-emerald-200">Ready</button>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  }

  function updateAdminOrderStatus(orderId, newStatus) {
    try {
      let orders = JSON.parse(localStorage.getItem('sri_lakshmi_admin_orders') || '[]');
      const order = orders.find(o => o.id === orderId);
      if (order) {
        order.status = newStatus;
        localStorage.setItem('sri_lakshmi_admin_orders', JSON.stringify(orders));
        renderAdminOrdersTab();
        showToast(`Order ${orderId} updated to ${newStatus}`);
      }
    } catch (e) {}
  }

  function renderAdminQuotesTab() {
    const body = document.getElementById('admin-tab-body');
    if (!body) return;

    let reqs = [];
    try {
      reqs = JSON.parse(localStorage.getItem('sri_lakshmi_custom_requests') || '[]');
    } catch (e) {}

    body.innerHTML = `
      <div class="space-y-4">
        <div class="flex justify-between items-center pb-2 border-b border-[#A94F20]/15">
          <h4 class="font-serif text-xl font-bold text-[#5A2D1A]">Custom Cake Quote Requests (${reqs.length})</h4>
        </div>

        ${reqs.length === 0 ? '<p class="text-xs text-[#75655D]">No custom cake requests pending.</p>' : `
          <div class="space-y-4">
            ${reqs.map(r => `
              <div class="p-4 bg-white rounded-2xl border border-[#A94F20]/20 flex flex-col md:flex-row justify-between items-start gap-4 text-xs">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono font-bold text-[#5A2D1A]">${r.id}</span>
                    <span class="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-bold">${r.status}</span>
                  </div>
                  <h5 class="font-bold text-[#A94F20] text-sm">${r.cakeType} (${r.weight}, ${r.flavour})</h5>
                  <p class="text-[#75655D]">Customer: ${r.customerName} (${r.phone}) | Date: ${r.pickupDate} ${r.pickupTime}</p>
                  <p class="italic text-[#5A2D1A]">Message on cake: "${r.message}"</p>
                </div>

                <div class="flex items-center gap-2">
                  <input type="number" id="quote-input-${r.id}" placeholder="Quote Price (₹)" class="w-32 bg-[#FFF9F2] border border-[#A94F20]/20 rounded-xl p-2 font-bold outline-none" />
                  <button onclick="window.App.approveAdminQuote('${r.id}')" class="px-4 py-2 bg-[#5A2D1A] text-white rounded-xl font-bold hover:bg-[#A94F20]">Approve Quote</button>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }

  function approveAdminQuote(reqId) {
    const input = document.getElementById(`quote-input-${reqId}`);
    if (!input || !input.value) {
      alert('Please enter a quote price in ₹ first!');
      return;
    }

    try {
      let reqs = JSON.parse(localStorage.getItem('sri_lakshmi_custom_requests') || '[]');
      const req = reqs.find(r => r.id === reqId);
      if (req) {
        req.status = `Approved — Quoted ₹${input.value}`;
        req.quotedPrice = input.value;
        localStorage.setItem('sri_lakshmi_custom_requests', JSON.stringify(reqs));
        renderAdminQuotesTab();
        showToast(`Quote for ${reqId} approved at ₹${input.value}`);
      }
    } catch (e) {}
  }

  function renderAdminEventsTab() {
    const body = document.getElementById('admin-tab-body');
    if (!body) return;

    let evs = [];
    try {
      evs = JSON.parse(localStorage.getItem('sri_lakshmi_event_bookings') || '[]');
    } catch (e) {}

    body.innerHTML = `
      <div class="space-y-4">
        <div class="flex justify-between items-center pb-2 border-b border-[#A94F20]/15">
          <h4 class="font-serif text-xl font-bold text-[#5A2D1A]">Event & Birthday Space Bookings (${evs.length})</h4>
        </div>

        ${evs.length === 0 ? '<p class="text-xs text-[#75655D]">No party bookings.</p>' : `
          <div class="space-y-3">
            ${evs.map(e => `
              <div class="p-4 bg-white rounded-2xl border border-[#A94F20]/20 flex justify-between items-center text-xs">
                <div>
                  <span class="font-mono font-bold text-[#5A2D1A]">${e.id}</span>
                  <h5 class="font-bold text-[#A94F20] text-sm">${e.occasion} — ${e.guests}</h5>
                  <p class="text-[#75655D]">Name: ${e.customerName} (${e.phone}) | Date: ${e.date} (${e.slot})</p>
                </div>
                <span class="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">${e.status}</span>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }

  function checkoutViaWhatsApp() {
    let msg = `*ORDER ENQUIRY - SRI LAKSHMI BAKERY*\n\nHi! Please provide live status update for my order. Thank you!`;
    const encodedMsg = encodeURIComponent(msg);
    const waUrl = `https://wa.me/${window.BAKERY_DATA.brand.whatsappNumber}?text=${encodedMsg}`;
    window.open(waUrl, '_blank');
  }

  function renderReviews() {
    const container = document.getElementById('reviews-container');
    if (!container || !window.BAKERY_DATA) return;

    const reviews = window.BAKERY_DATA.reviews;
    container.innerHTML = reviews.map(r => `
      <div class="bakery-card p-8 flex flex-col justify-between flex-shrink-0 w-80 md:w-96">
        <div class="space-y-4">
          <div class="flex items-center gap-1 text-[#D9823B]">
            ${Array(r.rating).fill('<i data-lucide="star" class="w-4 h-4 fill-[#D9823B]"></i>').join('')}
          </div>
          <p class="text-xs text-[#241812] leading-relaxed italic font-serif">"${r.comment}"</p>
        </div>

        <div class="flex items-center gap-3 pt-6 border-t border-[#A94F20]/10 mt-6">
          <img src="${r.avatar}" alt="${r.name}" class="w-10 h-10 rounded-full object-cover border border-[#A94F20]/30" />
          <div>
            <h4 class="text-xs font-bold text-[#5A2D1A]">${r.name}</h4>
            <span class="text-[11px] text-[#75655D]">${r.location}</span>
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid || !window.BAKERY_DATA) return;

    const items = window.BAKERY_DATA.gallery;
    grid.innerHTML = items.map(g => `
      <div onclick="window.App.openLightbox('${g.image}', '${g.title}')" class="group cursor-pointer relative aspect-square overflow-hidden rounded-2xl border border-[#A94F20]/15 shadow-sm">
        <img src="${g.image}" alt="${g.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#5A2D1A]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
          <span class="text-[10px] uppercase font-bold text-[#D9823B]">${g.category}</span>
          <h4 class="font-serif text-lg font-bold">${g.title}</h4>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function openLightbox(imgSrc, title) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    if (!modal || !img) return;

    img.src = imgSrc;
    if (caption) caption.innerText = title;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  function renderQualityFeatures() {
    const container = document.getElementById('quality-features-container');
    if (!container || !window.BAKERY_DATA) return;

    const feats = window.BAKERY_DATA.qualityFeatures;
    container.innerHTML = feats.map(f => `
      <div class="bakery-card p-6 text-center space-y-3">
        <div class="w-12 h-12 rounded-2xl bg-[#FFF9F2] text-[#A94F20] flex items-center justify-center mx-auto border border-[#A94F20]/20">
          <i data-lucide="${f.icon}" class="w-6 h-6"></i>
        </div>
        <h4 class="font-serif text-lg font-bold text-[#5A2D1A]">${f.title}</h4>
        <p class="text-xs text-[#75655D] leading-relaxed">${f.desc}</p>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function initStatsCounter() {
    const statsContainer = document.getElementById('stats-container');
    if (!statsContainer || !window.BAKERY_DATA) return;

    const stats = window.BAKERY_DATA.stats;
    statsContainer.innerHTML = stats.map(s => `
      <div class="text-center space-y-1">
        <div class="font-display text-4xl md:text-5xl font-extrabold text-[#5A2D1A]">
          <span class="counter-num" data-target="${s.value}">${s.value}</span>${s.suffix}
        </div>
        <div class="text-xs font-bold text-[#A94F20] uppercase tracking-wider">${s.label}</div>
      </div>
    `).join('');
  }

  function showToast(msg) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    toast.innerText = msg;
    toast.classList.remove('opacity-0', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');
    setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-4');
    }, 3000);
  }

  function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
  }

  function openEventModal() {
    const elem = document.getElementById('custom-cake-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  }

  return {
    init,
    setCategory,
    handleSearch,
    openQuickView,
    closeQuickView,
    updateCakeCustomization,
    addCustomizedToCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    openCartDrawer,
    closeCartDrawer,
    applyCoupon,
    updateCheckoutState,
    triggerOrderSuccess,
    closeOrderSuccess,
    submitCustomCakeRequest,
    submitEventBooking,
    openAdminDashboard,
    closeAdminDashboard,
    switchAdminTab,
    updateAdminOrderStatus,
    approveAdminQuote,
    checkoutViaWhatsApp,
    openLightbox,
    closeLightbox,
    toggleMobileMenu,
    openEventModal
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  window.App.init();
});
