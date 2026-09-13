/**
 * SRI LAKSHMI BAKERY - Master Application Logic
 * Updated with Order Confirmation Modal, Seating & Birthday Lounge renderer, Cool Drinks & Indian Cakes filters.
 */

window.App = (function () {
  let cart = [];
  let selectedCategory = 'all';
  let searchQuery = '';

  function init() {
    loadCartFromStorage();
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
    
    // Init 3D Hero Canvas
    if (window.Bakery3DEngine) {
      window.Bakery3DEngine.initHeroScene('hero-3d-canvas');
    }

    if (window.lucide) window.lucide.createIcons();
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

          <button onclick="window.App.addToCart('${p.id}')" class="px-4 py-2.5 bg-[#A94F20] text-white rounded-full text-xs font-bold hover:bg-[#5A2D1A] transition-colors flex items-center gap-1.5 shadow-md">
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Add</span>
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

  /**
   * RENDER DINING & SEATING AREA SECTION
   */
  function renderSeatingAreas() {
    const container = document.getElementById('seating-areas-grid');
    if (!container || !window.BAKERY_DATA) return;

    const areas = window.BAKERY_DATA.seatingAreas;
    container.innerHTML = areas.map(a => `
      <div class="bakery-card group overflow-hidden">
        <div class="relative aspect-video overflow-hidden">
          <img src="${a.image}" alt="${a.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <span class="absolute top-4 left-4 bg-[#5A2D1A] text-white text-[11px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-lg">
            ${a.badge}
          </span>
        </div>
        <div class="p-6 space-y-3">
          <h3 class="font-serif text-2xl font-bold text-[#5A2D1A]">${a.title}</h3>
          <p class="text-xs text-[#75655D] leading-relaxed">${a.desc}</p>
          <div class="pt-2 flex items-center gap-2 text-xs font-bold text-[#A94F20]">
            <i data-lucide="party-popper" class="w-4 h-4 text-[#D9823B]"></i>
            <span>Reserve Table / Birthday Space Available</span>
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function openQuickView(productId) {
    const product = window.BAKERY_DATA.products.find(p => p.id === productId);
    const modal = document.getElementById('quick-view-modal');
    const content = document.getElementById('quick-view-content');
    if (!product || !modal || !content) return;

    content.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div class="md:col-span-6 relative aspect-square overflow-hidden rounded-2xl border border-[#A94F20]/20">
          <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover" />
          <span class="absolute top-4 left-4 bg-[#5A2D1A] text-white text-xs font-bold px-3 py-1 rounded-full">
            ${product.unit}
          </span>
        </div>

        <div class="md:col-span-6 flex flex-col justify-between space-y-4">
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs uppercase tracking-widest text-[#A94F20] font-bold">${product.category}</span>
              <div class="flex items-center gap-1 text-xs font-bold text-[#D9823B]">
                <i data-lucide="star" class="w-4 h-4 fill-[#D9823B]"></i>
                <span>${product.rating} (${product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h3 class="font-serif text-3xl font-bold text-[#5A2D1A] mb-3">${product.name}</h3>
            <p class="text-xs text-[#75655D] leading-relaxed mb-4">${product.fullDesc}</p>

            <div class="mb-4">
              <span class="text-xs font-bold uppercase text-[#5A2D1A] block mb-2">Ingredients</span>
              <div class="flex flex-wrap gap-2">
                ${product.ingredients.map(ing => `<span class="text-xs bg-[#FFF9F2] border border-[#A94F20]/30 text-[#A94F20] px-3 py-1 rounded-lg">${ing}</span>`).join('')}
              </div>
            </div>

            <div class="text-2xl font-extrabold text-[#5A2D1A] font-display">
              ${product.price}
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#A94F20]/15">
            <button onclick="window.App.addToCart('${product.id}'); window.App.closeQuickView();" class="btn-primary flex-1 justify-center">
              <i data-lucide="shopping-bag" class="w-4 h-4"></i>
              <span>Add to Cart</span>
            </button>
            <button onclick="window.App.triggerOrderSuccess('${product.name}', ${product.rawPrice})" class="btn-secondary flex-1 justify-center">
              <i data-lucide="check-circle" class="w-4 h-4"></i>
              <span>Place Instant Order</span>
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.lucide) window.lucide.createIcons();
  }

  function closeQuickView() {
    const modal = document.getElementById('quick-view-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
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

  function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== productId);
    }

    saveCartToStorage();
    updateCartUI();
  }

  function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCartToStorage();
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
      if (totalElem) totalElem.innerText = '₹0';
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    const subtotal = cart.reduce((acc, item) => acc + (item.rawPrice * item.quantity), 0);

    container.innerHTML = cart.map(item => `
      <div class="flex items-center justify-between p-4 bg-white rounded-2xl border border-[#A94F20]/15 shadow-sm">
        <div class="flex items-center gap-3">
          <img src="${item.image}" alt="${item.name}" class="w-14 h-14 rounded-xl object-cover" />
          <div>
            <h4 class="text-xs font-bold text-[#5A2D1A] line-clamp-1">${item.name}</h4>
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
    `).join('');

    if (subtotalElem) subtotalElem.innerText = `₹${subtotal}`;
    if (totalElem) totalElem.innerText = `₹${subtotal}`;

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
   * PROFESSIONAL ORDER SUCCESSFUL CONFIRMATION MODAL
   */
  function triggerOrderSuccess(itemName, itemPrice) {
    closeQuickView();
    closeCartDrawer();

    const orderId = `SLB-${Math.floor(10000 + Math.random() * 90000)}`;
    const modal = document.getElementById('order-success-modal');
    const content = document.getElementById('order-success-content');
    if (!modal || !content) return;

    let itemsList = '';
    let totalAmount = 0;

    if (itemName && itemPrice) {
      itemsList = `<div class="flex justify-between font-bold text-xs"><span>${itemName}</span><span>₹${itemPrice}</span></div>`;
      totalAmount = itemPrice;
    } else if (cart.length > 0) {
      itemsList = cart.map(i => `<div class="flex justify-between text-xs"><span>${i.name} x ${i.quantity}</span><span class="font-bold">₹${i.rawPrice * i.quantity}</span></div>`).join('');
      totalAmount = cart.reduce((acc, item) => acc + (item.rawPrice * item.quantity), 0);
    } else {
      itemsList = `<div class="flex justify-between font-bold text-xs"><span>Fresh Bakery Box</span><span>₹499</span></div>`;
      totalAmount = 499;
    }

    content.innerHTML = `
      <div class="text-center space-y-6 py-4">
        <!-- Animated Success Checkmark Icon -->
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

        <!-- Order Specs Badge Card -->
        <div class="p-6 bg-[#FFF9F2] border border-[#A94F20]/20 rounded-2xl max-w-md mx-auto text-left space-y-3 text-xs">
          <div class="flex justify-between items-center pb-3 border-b border-[#A94F20]/15">
            <span class="text-[#75655D] uppercase font-bold text-[10px]">TRACKING ID</span>
            <span class="font-mono font-bold text-[#5A2D1A]">${orderId}</span>
          </div>

          <div class="flex justify-between items-center pb-3 border-b border-[#A94F20]/15">
            <span class="text-[#75655D] uppercase font-bold text-[10px]">ESTIMATED TIME</span>
            <span class="font-bold text-[#A94F20]">⏱ 15 - 20 Mins</span>
          </div>

          <div class="space-y-1 pt-1">
            <span class="text-[#75655D] uppercase font-bold text-[10px] block mb-1">ORDERED ITEMS</span>
            ${itemsList}
          </div>

          <div class="flex justify-between items-center pt-3 border-t border-[#A94F20]/15 text-sm font-extrabold text-[#5A2D1A]">
            <span>TOTAL AMOUNT PAID</span>
            <span class="text-[#A94F20]">₹${totalAmount}</span>
          </div>
        </div>

        <!-- Action CTAs -->
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

    // Clear cart on successful order
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

  return {
    init,
    setCategory,
    handleSearch,
    openQuickView,
    closeQuickView,
    addToCart,
    updateQuantity,
    removeFromCart,
    openCartDrawer,
    closeCartDrawer,
    triggerOrderSuccess,
    closeOrderSuccess,
    checkoutViaWhatsApp,
    openLightbox,
    closeLightbox,
    toggleMobileMenu
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  window.App.init();
});
