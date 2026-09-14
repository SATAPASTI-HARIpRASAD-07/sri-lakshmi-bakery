/**
 * SRI LAKSHMI BAKERY - Master Application Logic
 * Product Search, Category Filter, Sorting Engine, 6-Step Checkout Stepper,
 * Real-Time Order Tracking, Payment Welcome Card, Cake Customizer, Admin Dashboard.
 */

window.App = (function () {
  let selectedCategory = 'all';
  let searchQuery = '';
  let selectedSort = 'popular';

  let currentCustomization = {
    weight: '0.5kg',
    type: 'eggless',
    flavour: 'Belgian Dark Chocolate',
    message: '',
    instructions: ''
  };

  /**
   * Main App Initialization
   */
  function init() {
    initPreloader();
    initStickyNav();

    // Check URL Query Parameters for deep linking (e.g. ?category=cakes&search=chocolate)
    parseUrlQueryParams();

    // Initialize Checkout Stepper
    if (window.SLBCheckout) window.SLBCheckout.init();

    renderCategories();
    renderProducts();
    renderSeatingAreas();
    renderReviews();
    renderGallery();
    renderQualityFeatures();
    initStatsCounter();

    // Sync Cart UI
    updateCartUI();

    // Initialize Three.js 3D Hero Canvas
    if (window.Bakery3DEngine) {
      window.Bakery3DEngine.initHeroScene('hero-3d-canvas');
    }

    if (window.lucide) window.lucide.createIcons();
  }

  function parseUrlQueryParams() {
    try {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      const searchParam = params.get('search');
      const sortParam = params.get('sort');

      if (catParam) selectedCategory = catParam.toLowerCase();
      if (searchParam) searchQuery = searchParam;
      if (sortParam) selectedSort = sortParam;

      const searchInput = document.getElementById('product-search-input');
      if (searchInput && searchQuery) {
        searchInput.value = searchQuery;
      }
    } catch (e) {}
  }

  function initPreloader() {
    const preloader = document.getElementById('bakery-preloader');
    if (!preloader) return;
    setTimeout(() => {
      preloader.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => preloader.remove(), 600);
    }, 1000);
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

  /**
   * Category Filter Strip Renderer
   */
  function renderCategories() {
    const strip = document.getElementById('category-strip-container');
    if (!strip) return;

    const categories = [
      { id: 'all', name: 'All Items', icon: 'cookie', subtitle: '60+ items' },
      { id: 'cakes', name: 'Celebration Cakes', icon: 'cake', subtitle: '20+ Fresh Cakes' },
      { id: 'bakery', name: 'Bakery & Snacks', icon: 'sandwich', subtitle: 'Fresh Breads & Snacks' },
      { id: 'pastries', name: 'Pastries & Desserts', icon: 'sparkles', subtitle: 'Brownies & Donuts' },
      { id: 'drinks', name: 'Cool Drinks & Milk', icon: 'cup-soda', subtitle: 'Badam Milk & Drinks' }
    ];

    strip.innerHTML = categories.map(cat => `
      <button onclick="window.App.setCategory('${cat.id}')" data-cat="${cat.id}" 
              class="category-btn group flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 ${selectedCategory === cat.id ? 'bg-[#5A2D1A] text-white border-[#5A2D1A]' : 'bg-white text-[#241812] border-[#A94F20]/15 hover:border-[#D9823B]'}">
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

  function handleSearch(query) {
    searchQuery = query || '';
    
    // Toggle Clear Search [X] Button Visibility
    const clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) {
      if (searchQuery.trim().length > 0) {
        clearBtn.classList.remove('hidden');
      } else {
        clearBtn.classList.add('hidden');
      }
    }

    renderProducts();
  }

  function clearSearch() {
    searchQuery = '';
    const input = document.getElementById('product-search-input');
    if (input) input.value = '';

    const clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) clearBtn.classList.add('hidden');

    renderProducts();
  }

  function clearAllFilters() {
    searchQuery = '';
    selectedCategory = 'all';
    
    const input = document.getElementById('product-search-input');
    if (input) input.value = '';

    const clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) clearBtn.classList.add('hidden');

    renderCategories();
    renderProducts();
  }

  function handleSort(sortType) {
    selectedSort = sortType;
    renderProducts();
  }

  /**
   * Render Products Grid with Search & Category Combination Filter
   */
  function renderProducts() {
    const grid = document.getElementById('products-grid');
    const countEl = document.getElementById('product-result-count');
    if (!grid) return;

    let items = [];
    if (window.SLBProducts) {
      items = window.SLBProducts.getFilteredProducts(selectedCategory, searchQuery, selectedSort);
    } else if (window.BakeryProducts) {
      items = window.BakeryProducts.filterProducts(selectedCategory, searchQuery, selectedSort);
    }

    // Update Result Count Text
    if (countEl) {
      if (items.length === 1) {
        countEl.innerText = '1 product found';
      } else if (items.length > 1) {
        countEl.innerText = `${items.length} products found`;
      } else {
        countEl.innerText = 'No products found';
      }
    }

    // Handle Empty State (No Products Found)
    if (items.length === 0) {
      const cleanSearch = searchQuery.trim();
      grid.innerHTML = `
        <div class="col-span-full text-center py-16 space-y-4 bg-white/80 rounded-3xl border border-[#A94F20]/20 p-8 shadow-sm">
          <div class="w-16 h-16 bg-amber-100 text-[#A94F20] rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
            <i class="fas fa-search"></i>
          </div>
          <h4 class="text-2xl font-serif font-bold text-[#5A2D1A]">No products found</h4>
          <p class="text-xs md:text-sm text-[#75655D] max-w-md mx-auto leading-relaxed">
            ${cleanSearch ? `No bakery products found matching "<strong>${cleanSearch}</strong>" in <strong>${selectedCategory.toUpperCase()}</strong>.` : 'No products available under this category.'}
          </p>
          <div class="pt-2">
            <button onclick="window.App.clearAllFilters()" class="btn-primary text-xs py-3 px-6 shadow-md hover:scale-105 transition-all">
              <i class="fas fa-redo me-1"></i> VIEW ALL PRODUCTS
            </button>
          </div>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(p => `
      <div class="bakery-card group overflow-hidden flex flex-col justify-between">
        <div>
          <div class="relative aspect-square overflow-hidden bg-[#FFF9F2]">
            <img src="${p.image}" alt="${p.name}" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            ${p.bestseller ? `
              <span class="absolute top-4 left-4 bg-[#A94F20] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-md">
                Bestseller
              </span>
            ` : ''}
            <button onclick="window.App.openQuickView('${p.id}')" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 text-[#5A2D1A] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-[#5A2D1A] hover:text-white">
              <i data-lucide="eye" class="w-4 h-4"></i>
            </button>
          </div>

          <div class="p-5 space-y-2">
            <div class="flex justify-between items-start">
              <span class="text-[11px] uppercase tracking-wider text-[#A94F20] font-bold">${p.category}</span>
              <div class="flex items-center gap-1 text-xs font-bold text-[#D9823B]">
                <i data-lucide="star" class="w-3.5 h-3.5 fill-[#D9823B]"></i>
                <span>${p.rating || '4.8'}</span>
              </div>
            </div>

            <h3 onclick="window.App.openQuickView('${p.id}')" class="font-serif text-lg font-bold text-[#241812] group-hover:text-[#A94F20] transition-colors cursor-pointer">${p.name}</h3>
            <p class="text-xs text-[#75655D] leading-relaxed line-clamp-2">${p.description || p.shortDesc || ''}</p>
          </div>
        </div>

        <div class="p-5 pt-0 flex items-center justify-between border-t border-[#A94F20]/10 mt-3">
          <div>
            <span class="text-[11px] text-[#75655D] block">${p.unit || '1 Unit'}</span>
            <span class="font-display text-lg font-extrabold text-[#5A2D1A]">₹${p.price}</span>
          </div>

          <button onclick="window.App.addToCartDirect('${p.id}')" class="px-4 py-2 bg-[#A94F20] text-white rounded-full text-xs font-bold hover:bg-[#5A2D1A] transition-colors flex items-center gap-1.5 shadow-md">
            <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
            <span>Add</span>
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function addToCartDirect(productId) {
    let product = null;
    if (window.SLBProducts) product = window.SLBProducts.getProductById(productId);
    if (!product && window.BakeryProducts) product = window.BakeryProducts.getProductById(productId);

    if (!product) return;

    SLBCart.addItem(product);
    updateCartUI();
    if (window.SLBNotifications) {
      SLBNotifications.showToast(`Added "${product.name}" to Cart!`, 'success');
    }
  }

  function updateCartUI() {
    const summary = SLBCart.getCartSummary();
    const badge = document.getElementById('cart-badge');
    const drawerItems = document.getElementById('cart-drawer-items');
    const subtotalEl = document.getElementById('cart-subtotal');
    const discountEl = document.getElementById('cart-discount');
    const totalEl = document.getElementById('cart-total');

    if (badge) {
      if (summary.totalCount > 0) {
        badge.innerText = summary.totalCount;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }

    if (subtotalEl) subtotalEl.innerText = `₹${summary.subtotal}`;
    if (discountEl) discountEl.innerText = `-₹${summary.discount}`;
    if (totalEl) totalEl.innerText = `₹${summary.grandTotal}`;

    if (drawerItems) {
      if (summary.items.length === 0) {
        drawerItems.innerHTML = `
          <div class="text-center py-12 space-y-3">
            <i data-lucide="shopping-bag" class="w-12 h-12 text-[#A94F20] mx-auto opacity-30"></i>
            <h4 class="font-bold text-[#5A2D1A] text-base">Your Cart is Empty</h4>
            <p class="text-xs text-[#75655D]">Explore our delicious cakes, pastries & cool drinks!</p>
          </div>
        `;
      } else {
        drawerItems.innerHTML = summary.items.map(item => `
          <div class="flex items-center justify-between p-3 bg-white rounded-2xl border border-[#A94F20]/15 shadow-sm text-xs">
            <div class="flex items-center gap-3">
              <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded-xl border border-[#A94F20]/20" />
              <div>
                <h5 class="font-bold text-[#5A2D1A]">${item.name}</h5>
                <span class="text-xs text-[#A94F20] font-semibold">₹${item.price}</span>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button onclick="window.App.updateCartQty('${item.cartItemId || item.id}', ${item.quantity - 1})" class="w-6 h-6 rounded-lg bg-[#FFF9F2] border border-[#A94F20]/20 font-bold text-[#5A2D1A] hover:bg-[#A94F20] hover:text-white transition-colors">-</button>
              <span class="font-bold text-xs px-1">${item.quantity}</span>
              <button onclick="window.App.updateCartQty('${item.cartItemId || item.id}', ${item.quantity + 1})" class="w-6 h-6 rounded-lg bg-[#FFF9F2] border border-[#A94F20]/20 font-bold text-[#5A2D1A] hover:bg-[#A94F20] hover:text-white transition-colors">+</button>
            </div>
          </div>
        `).join('');
      }
    }

    if (window.lucide) window.lucide.createIcons();
  }

  function updateCartQty(cartItemId, newQty) {
    SLBCart.updateQuantity(cartItemId, newQty);
    updateCartUI();
  }

  function openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) {
      updateCartUI();
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

  function openCheckoutStepper() {
    closeCartDrawer();
    const modal = document.getElementById('checkout-stepper-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      if (window.SLBCheckout) {
        window.SLBCheckout.goToStep(1);
      }
    }
  }

  function closeCheckoutStepper() {
    const modal = document.getElementById('checkout-stepper-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  function openQuickView(productId) {
    let product = null;
    if (window.SLBProducts) product = window.SLBProducts.getProductById(productId);
    if (!product && window.BakeryProducts) product = window.BakeryProducts.getProductById(productId);

    const modal = document.getElementById('quick-view-modal');
    if (!product || !modal) return;

    currentCustomization = {
      weight: '0.5kg',
      type: 'eggless',
      flavour: 'Belgian Dark Chocolate',
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

    const weights = [
      { id: '0.5kg', label: '0.5 kg (Half Kg)', multiplier: 1.0 },
      { id: '1.0kg', label: '1.0 kg (1 Kg)', multiplier: 1.9 },
      { id: '2.0kg', label: '2.0 kg (2 Tier)', multiplier: 3.6 }
    ];

    const selectedWeightObj = weights.find(w => w.id === currentCustomization.weight) || weights[0];
    const basePrice = product.price || 400;
    const finalPrice = Math.round(basePrice * selectedWeightObj.multiplier);

    content.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 max-h-[80vh] overflow-y-auto pr-1">
        <div class="md:col-span-5 relative aspect-square overflow-hidden rounded-2xl border border-[#A94F20]/20">
          <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover" />
          <span class="absolute top-4 left-4 bg-[#5A2D1A] text-white text-xs font-bold px-3 py-1 rounded-full">
            ${product.isCake ? selectedWeightObj.label : (product.unit || '1 Unit')}
          </span>
        </div>

        <div class="md:col-span-7 flex flex-col justify-between space-y-4 text-xs">
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="uppercase tracking-widest text-[#A94F20] font-bold text-[11px]">${product.category}</span>
              <div class="flex items-center gap-1 text-xs font-bold text-[#D9823B]">
                <i data-lucide="star" class="w-3.5 h-3.5 fill-[#D9823B]"></i>
                <span>${product.rating || '4.8'}</span>
              </div>
            </div>

            <h3 class="font-serif text-2xl font-bold text-[#5A2D1A] mb-2">${product.name}</h3>
            <p class="text-[#75655D] leading-relaxed mb-4">${product.description || product.fullDesc || ''}</p>

            ${product.isCake ? `
              <div class="space-y-3 p-4 bg-[#FFF9F2] rounded-2xl border border-[#A94F20]/15 mb-4">
                <div>
                  <label class="font-bold text-[#5A2D1A] block mb-1">Select Weight</label>
                  <div class="grid grid-cols-3 gap-2">
                    ${weights.map(w => `
                      <button onclick="window.App.updateCakeCustomization('weight', '${w.id}', '${product.id}')" class="py-2 rounded-xl font-bold border ${currentCustomization.weight === w.id ? 'bg-[#5A2D1A] text-white border-[#5A2D1A]' : 'bg-white text-[#241812] border-[#A94F20]/20'}">
                        ${w.label}
                      </button>
                    `).join('')}
                  </div>
                </div>

                <div>
                  <label class="font-bold text-[#5A2D1A] block mb-1">Text Written on Cake</label>
                  <input type="text" value="${currentCustomization.message}" onchange="window.App.updateCakeCustomization('message', this.value, '${product.id}')" placeholder="e.g. Happy Birthday Ananya!" class="w-full bg-white border border-[#A94F20]/20 rounded-xl p-2 outline-none focus:border-[#D9823B]" />
                </div>
              </div>
            ` : ''}

            <div class="flex items-baseline gap-2 mt-2">
              <span class="text-[#75655D]">Price:</span>
              <span class="text-2xl font-extrabold text-[#5A2D1A] font-display">₹${finalPrice}</span>
            </div>
          </div>

          <div class="flex gap-3 pt-3 border-t border-[#A94F20]/15">
            <button onclick="window.App.addCustomizedToCart('${product.id}', ${finalPrice}); window.App.closeQuickView();" class="btn-primary flex-1 justify-center">
              <i data-lucide="shopping-bag" class="w-4 h-4"></i>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  function updateCakeCustomization(field, val, productId) {
    currentCustomization[field] = val;
    let product = null;
    if (window.SLBProducts) product = window.SLBProducts.getProductById(productId);
    if (!product && window.BakeryProducts) product = window.BakeryProducts.getProductById(productId);

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
    let product = null;
    if (window.SLBProducts) product = window.SLBProducts.getProductById(productId);
    if (!product && window.BakeryProducts) product = window.BakeryProducts.getProductById(productId);

    if (!product) return;

    const customizedItem = {
      ...product,
      name: product.isCake ? `${product.name} (${currentCustomization.weight})` : product.name,
      price: finalPrice
    };

    SLBCart.addItem(customizedItem);
    updateCartUI();
    if (window.SLBNotifications) {
      SLBNotifications.showToast(`Added ${customizedItem.name} to Cart`, 'success');
    }
  }

  function renderSeatingAreas() {
    const container = document.getElementById('seating-areas-grid');
    if (!container) return;

    const areas = [
      {
        id: 'party-lounge',
        title: 'AC Birthday Celebration Zone',
        desc: 'Private air-conditioned party area with balloon decor hooks, ambient LED lights, sound system & cake cutting table for up to 35 guests.',
        badge: 'Popular for Birthdays',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'family-dining',
        title: 'Family & Couples Dining Tables',
        desc: 'Comfortable plush seating for families to enjoy hot samosas, badam milk, pastries, burgers, and cool drinks together.',
        badge: 'Comfort Dining',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'snack-counter',
        title: 'Express Snack & Beverage Bar',
        desc: 'Quick bite seating for fresh puff pastry, badam milk bottles, iced cold coffees, and snack combos on the go.',
        badge: 'Express Snacks',
        image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80'
      }
    ];

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
          <a href="https://wa.me/919668569974?text=${encodeURIComponent('Hello Sri Lakshmi Bakery! I want to reserve the ' + a.title + ' for a celebration.')}" target="_blank" rel="noopener noreferrer" 
             class="w-full py-3 bg-[#FFF9F2] border border-[#A94F20]/30 text-[#A94F20] font-bold rounded-xl text-xs hover:bg-[#A94F20] hover:text-white transition-colors flex items-center justify-center gap-2">
            <i data-lucide="party-popper" class="w-4 h-4 text-[#D9823B]"></i>
            <span>Reserve Space on WhatsApp</span>
          </a>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function renderReviews() {
    const container = document.getElementById('reviews-container');
    if (!container) return;

    const reviews = [
      { name: 'K. Ramesh', role: 'Local Guide', comment: 'Best rasmalai cake and badam milk in Srikakulam! Staff is very friendly and delivery was right on time.', rating: 5 },
      { name: 'S. Ananya', role: 'Verified Customer', comment: 'Ordered a 2-tier custom theme cake for my son’s 5th birthday. The design was identical to my photo and tasted heavenly!', rating: 5 },
      { name: 'P. Suresh', role: 'Regular Customer', comment: 'Their evening puff pastries and cold badam milk are an absolute daily ritual. Highly recommended!', rating: 5 }
    ];

    container.innerHTML = reviews.map(r => `
      <div class="flex-shrink-0 w-80 bg-[#FFF9F2]/10 border border-white/10 rounded-2xl p-6 text-white space-y-3">
        <div class="flex gap-1 text-[#D9823B]">
          ${Array(r.rating).fill('<i data-lucide="star" class="w-4 h-4 fill-[#D9823B]"></i>').join('')}
        </div>
        <p class="text-xs text-white/90 leading-relaxed font-light">"${r.comment}"</p>
        <div class="pt-2 border-t border-white/10">
          <h5 class="font-bold text-sm text-white">${r.name}</h5>
          <span class="text-[11px] text-[#D9823B]">${r.role}</span>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function renderGallery() {
    const container = document.getElementById('gallery-grid');
    if (!container) return;

    const images = [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80'
    ];

    container.innerHTML = images.map(img => `
      <div class="aspect-square rounded-2xl overflow-hidden border border-[#A94F20]/20 shadow-md group">
        <img src="${img}" alt="Bakery Gallery" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      </div>
    `).join('');
  }

  function renderQualityFeatures() {
    const container = document.getElementById('quality-features-container');
    if (!container) return;

    const feats = [
      { title: '100% Eggless Options', desc: 'Separate pure veg baking facility & utensils.', icon: 'leaf' },
      { title: 'Pure Butter & Cream', desc: 'No artificial palm oil or hydrogenated fats.', icon: 'award' },
      { title: 'Same Day Delivery', desc: 'Hot & fresh delivery within 45 minutes.', icon: 'clock' },
      { title: 'Hygiene Certified', desc: 'FSSAI certified kitchen & regular audits.', icon: 'shield-check' }
    ];

    container.innerHTML = feats.map(f => `
      <div class="bg-white rounded-2xl p-6 border border-[#A94F20]/15 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-[#FFF9F2] text-[#A94F20] flex items-center justify-center flex-shrink-0">
          <i data-lucide="${f.icon}" class="w-6 h-6"></i>
        </div>
        <div>
          <h4 class="font-bold text-[#5A2D1A] text-sm">${f.title}</h4>
          <p class="text-xs text-[#75655D] mt-0.5">${f.desc}</p>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function initStatsCounter() {
    const container = document.getElementById('stats-container');
    if (!container) return;

    container.innerHTML = `
      <div>
        <span class="block font-display text-3xl font-extrabold text-[#5A2D1A]">15+</span>
        <span class="block text-xs text-[#75655D]">Years Experience</span>
      </div>
      <div>
        <span class="block font-display text-3xl font-extrabold text-[#5A2D1A]">50k+</span>
        <span class="block text-xs text-[#75655D]">Happy Customers</span>
      </div>
      <div>
        <span class="block font-display text-3xl font-extrabold text-[#5A2D1A]">60+</span>
        <span class="block text-xs text-[#75655D]">Bakery Products</span>
      </div>
    `;
  }

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

  function renderAdminOrdersTab() {
    const body = document.getElementById('admin-tab-body');
    if (!body) return;

    const orders = SLBOrders.getAllOrders();

    if (orders.length === 0) {
      body.innerHTML = `
        <div class="text-center py-12 text-[#75655D]">
          <i data-lucide="receipt" class="w-12 h-12 mx-auto mb-2 opacity-40 text-[#A94F20]"></i>
          <p class="font-bold">No live customer orders stored yet.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    body.innerHTML = `
      <div class="space-y-4 text-xs">
        <h4 class="font-bold text-[#5A2D1A] text-sm">Live Store Orders (${orders.length})</h4>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse border border-[#A94F20]/20 rounded-xl overflow-hidden">
            <thead class="bg-[#5A2D1A] text-white">
              <tr>
                <th class="p-3">Order ID</th>
                <th class="p-3">Customer</th>
                <th class="p-3">Mobile</th>
                <th class="p-3">Fulfillment</th>
                <th class="p-3">Amount</th>
                <th class="p-3">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#A94F20]/10 bg-white">
              ${orders.map(o => `
                <tr class="hover:bg-[#FFF9F2]">
                  <td class="p-3 font-mono font-bold text-[#A94F20]">${o.orderId}</td>
                  <td class="p-3 font-semibold text-[#5A2D1A]">${o.customer.name}</td>
                  <td class="p-3">${o.customer.mobile}</td>
                  <td class="p-3 uppercase font-bold text-[10px] text-stone-600">${o.fulfillmentType}</td>
                  <td class="p-3 font-extrabold text-[#5A2D1A]">₹${o.grandTotal}</td>
                  <td class="p-3">
                    <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">${o.status}</span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  }

  function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
  }

  return {
    init,
    setCategory,
    handleSearch,
    clearSearch,
    clearAllFilters,
    handleSort,
    addToCartDirect,
    updateCartQty,
    openCartDrawer,
    closeCartDrawer,
    openCheckoutStepper,
    closeCheckoutStepper,
    openQuickView,
    closeQuickView,
    updateCakeCustomization,
    addCustomizedToCart,
    openAdminDashboard,
    closeAdminDashboard,
    toggleMobileMenu
  };
})();

// Auto Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.App.init();
});
