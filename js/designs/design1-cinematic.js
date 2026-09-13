/**
 * DESIGN 01 — CINEMATIC LUXURY
 * Michelin-level luxury fashion aesthetic with dark gold palette & editorial typography.
 */

window.RenderDesign1 = function (container, data) {
  const { restaurant, menuCategories, menuItems, chef, story } = data;

  container.className = "design-scope-1 bg-[#0a0908] text-[#f4efe6] font-sans selection:bg-[#d4af37] selection:text-black transition-opacity duration-700";
  container.style.fontFamily = "'Plus Jakarta Sans', sans-serif";

  container.innerHTML = `
    <!-- CINEMATIC HERO -->
    <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24 pb-12">
      <!-- Background Ambient Glow & Vignette -->
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1c1917]/60 via-[#0a0908] to-[#050504] pointer-events-none"></div>
      <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none"></div>

      <!-- 3D Canvas Canvas Container -->
      <div id="d1-hero-canvas" class="absolute inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing"></div>

      <!-- Hero Overlay Content -->
      <div class="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        <!-- Luxury Badge -->
        <div class="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#1c1917]/70 backdrop-blur-md mb-8 animate-fade-down">
          <span class="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
          <span class="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold">Michelin 3-Star Experience</span>
        </div>

        <!-- Headline -->
        <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.08] mb-6 text-[#f4efe6] font-normal drop-shadow-2xl">
          WHERE FIRE MEETS <span class="italic font-light text-[#d4af37] underline decoration-[#d4af37]/40 underline-offset-8">FLAVOR.</span>
        </h1>

        <!-- Subheading -->
        <p class="max-w-2xl text-base md:text-xl text-[#f4efe6]/75 font-light leading-relaxed mb-10 tracking-wide">
          ${restaurant.subheading}
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center gap-5">
          <a href="#menu" class="group relative inline-flex items-center justify-center px-8 py-4 bg-[#d4af37] text-[#0a0908] font-semibold tracking-widest text-xs uppercase overflow-hidden rounded-none transition-all duration-300 hover:bg-[#ebd58b] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
            <span class="relative z-10 flex items-center gap-2">
              Explore Menu
              <i data-lucide="arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-1"></i>
            </span>
          </a>
          <button onclick="window.App.openReservationModal()" class="group inline-flex items-center justify-center px-8 py-4 border border-[#d4af37]/50 text-[#f4efe6] font-semibold tracking-widest text-xs uppercase backdrop-blur-sm transition-all duration-300 hover:bg-[#d4af37]/10 hover:border-[#d4af37]">
            <span>Reserve a Table</span>
          </button>
        </div>

        <!-- Scroll Indicator -->
        <div class="mt-16 animate-bounce flex flex-col items-center gap-2 text-[#d4af37]/60 text-xs tracking-widest uppercase">
          <span>Scroll To Discover</span>
          <i data-lucide="chevron-down" class="w-4 h-4 text-[#d4af37]"></i>
        </div>
      </div>
    </section>

    <!-- EDITORIAL MENU -->
    <section id="menu" class="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#d4af37]/15">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span class="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold block mb-3">Seasonal Offering</span>
          <h2 class="font-serif text-4xl md:text-6xl text-[#f4efe6]">Culinary Masterpieces</h2>
        </div>

        <!-- Menu Category Selector Pills -->
        <div class="flex flex-wrap gap-2 border-b border-[#d4af37]/20 pb-3" id="d1-category-bar">
          ${menuCategories.map((cat, idx) => `
            <button data-cat="${cat.id}" class="d1-cat-btn px-5 py-2 text-xs uppercase tracking-widest transition-all ${idx === 0 ? 'bg-[#d4af37] text-black font-bold' : 'text-[#f4efe6]/60 hover:text-[#d4af37]'}">
              ${cat.name}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Menu Grid -->
      <div id="d1-menu-grid" class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <!-- Rendered via JS -->
      </div>
    </section>

    <!-- STORY SECTION: CRAFTED BY FIRE -->
    <section id="story" class="py-28 px-6 bg-[#0e0c0a] border-y border-[#d4af37]/15 relative overflow-hidden">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-20">
          <span class="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold block mb-3">Our Culinary Philosophy</span>
          <h2 class="font-serif text-4xl md:text-6xl text-[#f4efe6]">CRAFTED BY FIRE.</h2>
        </div>

        <!-- Story Journey Cards -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
          ${story.map((item) => `
            <div class="group p-6 bg-[#161411] border border-[#d4af37]/20 transition-all duration-500 hover:border-[#d4af37] hover:-translate-y-2">
              <span class="font-serif text-3xl text-[#d4af37] block mb-4">${item.step}</span>
              <h3 class="text-xs uppercase tracking-widest font-bold text-[#d4af37] mb-2">${item.title}</h3>
              <h4 class="font-serif text-lg text-[#f4efe6] mb-3">${item.heading}</h4>
              <p class="text-xs text-[#f4efe6]/60 leading-relaxed">${item.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CHEF SECTION -->
    <section id="chef" class="py-28 px-6 md:px-12 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-5 relative group">
          <div class="absolute -inset-4 bg-gradient-to-r from-[#d4af37]/20 to-[#4a0e17]/30 blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div class="relative overflow-hidden border border-[#d4af37]/30 aspect-[3/4]">
            <img src="${chef.image}" alt="${chef.name}" class="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105" />
          </div>
        </div>

        <div class="lg:col-span-7 space-y-6">
          <span class="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold">The Culinary Director</span>
          <h2 class="font-serif text-4xl md:text-6xl text-[#f4efe6]">${chef.name}</h2>
          <p class="font-serif italic text-xl md:text-2xl text-[#d4af37] border-l-2 border-[#d4af37] pl-6 py-2">
            "${chef.quote}"
          </p>
          <p class="text-sm md:text-base text-[#f4efe6]/70 leading-relaxed font-light">
            ${chef.bio}
          </p>
          <p class="text-xs uppercase tracking-widest text-[#d4af37]/80 font-bold pt-4">
            — ${chef.philosophy}
          </p>
        </div>
      </div>
    </section>

    <!-- RESERVATION SECTION -->
    <section id="reservation" class="py-28 px-6 bg-gradient-to-b from-[#0a0908] via-[#141210] to-[#0a0908] border-t border-[#d4af37]/15">
      <div class="max-w-3xl mx-auto text-center">
        <span class="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold block mb-3">Table Reservation</span>
        <h2 class="font-serif text-4xl md:text-6xl text-[#f4efe6] mb-6">RESERVE YOUR EXPERIENCE</h2>
        <p class="text-sm text-[#f4efe6]/70 mb-10">Select your preferred date and seating time to join us at Ember & Sage.</p>
        <button onclick="window.App.openReservationModal()" class="px-10 py-5 bg-[#d4af37] text-black font-bold uppercase tracking-widest text-xs hover:bg-[#ebd58b] transition-colors shadow-2xl">
          Begin Reservation
        </button>
      </div>
    </section>
  `;

  // Init 3D Hero Scene
  window.ThreeScenesManager.initCinematicHeroScene("d1-hero-canvas");

  // Render Menu Grid
  function renderMenu(categoryId) {
    const items = categoryId === 'all' ? menuItems : menuItems.filter(i => i.category === categoryId);
    const grid = document.getElementById('d1-menu-grid');
    if (!grid) return;

    grid.innerHTML = items.map(dish => `
      <div data-[#dish-id]="${dish.id}" onclick="window.App.openDishModal('${dish.id}')" class="group cursor-pointer bg-[#12100d] border border-[#d4af37]/20 overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:border-[#d4af37] hover:-translate-y-1">
        <div class="md:w-5/12 aspect-square overflow-hidden relative">
          <img src="${dish.image}" alt="${dish.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div class="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors"></div>
        </div>
        <div class="p-6 md:w-7/12 flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-serif text-lg md:text-xl text-[#f4efe6] group-hover:text-[#d4af37] transition-colors">${dish.name}</h3>
              <span class="font-serif text-lg text-[#d4af37] font-semibold">${dish.price}</span>
            </div>
            <p class="text-xs text-[#f4efe6]/60 leading-relaxed mb-4">${dish.shortDesc}</p>
            <div class="flex flex-wrap gap-1.5 mb-4">
              ${dish.ingredients.slice(0, 3).map(ing => `<span class="text-[10px] uppercase tracking-wider text-[#d4af37]/70 bg-[#d4af37]/10 px-2 py-0.5">${ing}</span>`).join('')}
            </div>
          </div>
          <div class="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold group-hover:translate-x-1 transition-transform">
            <span>Explore Dish</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  renderMenu('signatures');

  // Category Pills listener
  container.querySelectorAll('.d1-cat-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      container.querySelectorAll('.d1-cat-btn').forEach(b => {
        b.className = "d1-cat-btn px-5 py-2 text-xs uppercase tracking-widest transition-all text-[#f4efe6]/60 hover:text-[#d4af37]";
      });
      e.target.className = "d1-cat-btn px-5 py-2 text-xs uppercase tracking-widest transition-all bg-[#d4af37] text-black font-bold";
      renderMenu(e.target.dataset.cat);
    });
  });

  if (window.lucide) window.lucide.createIcons();
};
