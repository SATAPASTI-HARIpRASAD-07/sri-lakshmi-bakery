/**
 * DESIGN 03 — DARK FIRE / CHEF'S TABLE
 * Dramatic open kitchen, charcoal, open flames, and ember-tinted storytelling.
 */

window.RenderDesign3 = function (container, data) {
  const { restaurant, menuItems, chef, story, gallery } = data;

  container.className = "design-scope-3 bg-[#050505] text-[#faf8f5] font-sans selection:bg-[#ff5500] selection:text-white transition-opacity duration-700";
  container.style.fontFamily = "'Cinzel', serif";

  container.innerHTML = `
    <!-- DARK FIRE HERO -->
    <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24">
      <!-- Dark Vignette & Fire Gradient -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent z-10 pointer-events-none"></div>

      <!-- Background Open Kitchen Hero Image -->
      <div class="absolute inset-0 z-0 opacity-40 mix-blend-luminosity scale-105">
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1800&q=80" alt="Open Kitchen Fire" class="w-full h-full object-cover" />
      </div>

      <!-- Three.js Ember Particle Canvas -->
      <div id="d3-hero-canvas" class="absolute inset-0 z-10 pointer-events-none"></div>

      <!-- Hero Overlay Content -->
      <div class="relative z-20 max-w-4xl mx-auto text-center">
        <div class="inline-flex items-center gap-3 px-5 py-2 border border-[#ff5500]/60 bg-black/80 backdrop-blur-md mb-8">
          <i data-lucide="flame" class="w-4 h-4 text-[#ff5500] animate-pulse"></i>
          <span class="text-xs uppercase tracking-[0.35em] text-[#ff5500] font-sans font-bold">Open Hearth Dining</span>
        </div>

        <h1 class="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight uppercase leading-none mb-6 text-[#faf8f5] drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
          BORN FROM <span class="text-[#ff5500]">FIRE.</span>
        </h1>

        <p class="max-w-xl mx-auto font-sans text-base md:text-xl text-[#faf8f5]/80 font-light leading-relaxed mb-10 tracking-wide">
          Slow flames. Bold flavors. Unforgettable nights around our 12-seat binchotan hearth.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-5 font-sans">
          <button onclick="window.App.openReservationModal()" class="px-9 py-4 bg-[#ff5500] text-white font-bold uppercase tracking-widest text-xs hover:bg-[#e04b00] transition-colors shadow-[0_0_40px_rgba(255,85,0,0.5)]">
            BOOK CHEF'S TABLE
          </button>
          <a href="#fire-scroll" class="px-9 py-4 border border-[#b87333] text-[#faf8f5] font-bold uppercase tracking-widest text-xs hover:bg-[#b87333]/20 transition-colors">
            THE FIRE JOURNEY
          </a>
        </div>
      </div>
    </section>

    <!-- FIRE SCROLL EXPERIENCE JOURNEY -->
    <section id="fire-scroll" class="py-28 px-6 bg-[#0c0c0c] border-y border-[#ff5500]/20">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-20">
          <span class="text-xs uppercase tracking-[0.4em] text-[#ff5500] font-sans font-bold block mb-3">5-ACT EMBER TRANSITION</span>
          <h2 class="text-4xl md:text-6xl font-bold uppercase">THE ELEMENTAL JOURNEY</h2>
        </div>

        <div class="space-y-16">
          ${story.map((act, idx) => `
            <div class="group grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 bg-[#141414] border-l-4 ${idx % 2 === 0 ? 'border-[#ff5500]' : 'border-[#b87333]'} transition-transform duration-500 hover:scale-[1.01]">
              <div class="md:col-span-3 text-center md:text-left">
                <span class="font-sans text-xs font-bold uppercase text-[#ff5500] tracking-widest block mb-1">ACT ${act.step}</span>
                <h3 class="text-2xl md:text-3xl font-bold text-white">${act.title}</h3>
              </div>
              <div class="md:col-span-9 font-sans">
                <h4 class="text-lg text-[#b87333] font-semibold mb-2">${act.heading}</h4>
                <p class="text-sm text-[#faf8f5]/70 leading-relaxed">${act.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- HORIZONTAL CHEF'S TABLE EXPERIENCE SHOWCASE -->
    <section id="chefs-table" class="py-28 px-6 max-w-7xl mx-auto">
      <div class="flex justify-between items-end mb-12">
        <div>
          <span class="text-xs uppercase tracking-[0.4em] text-[#ff5500] font-sans font-bold block mb-2">Live Kitchen Counter</span>
          <h2 class="text-4xl md:text-6xl font-bold uppercase">CHEF'S TABLE GALLERY</h2>
        </div>
      </div>

      <div class="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#ff5500]">
        ${gallery.map(item => `
          <div class="snap-center shrink-0 w-80 md:w-96 group relative aspect-[4/5] overflow-hidden bg-[#141414] border border-white/10">
            <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6 font-sans">
              <span class="text-[10px] uppercase tracking-widest text-[#ff5500] font-bold block mb-1">${item.category}</span>
              <h3 class="text-xl font-bold font-serif text-white">${item.title}</h3>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- DARK EDITORIAL MENU -->
    <section id="menu" class="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      <div class="text-center mb-16">
        <span class="text-xs uppercase tracking-[0.4em] text-[#ff5500] font-sans font-bold block mb-3">Fire-Kissed Catalog</span>
        <h2 class="text-4xl md:text-6xl font-bold uppercase">OPEN HEARTH MENU</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 font-sans">
        ${menuItems.map(dish => `
          <div onclick="window.App.openDishModal('${dish.id}')" class="group cursor-pointer bg-[#0f0f0f] border border-[#ff5500]/20 p-6 flex flex-col sm:flex-row gap-6 transition-all duration-500 hover:border-[#ff5500] hover:bg-[#171717]">
            <div class="sm:w-2/5 aspect-square overflow-hidden relative">
              <img src="${dish.image}" alt="${dish.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div class="sm:w-3/5 flex flex-col justify-between">
              <div>
                <div class="flex justify-between items-start mb-2">
                  <h3 class="font-serif text-lg font-bold text-white group-hover:text-[#ff5500] transition-colors">${dish.name}</h3>
                  <span class="font-mono text-base text-[#ff5500] font-bold">${dish.price}</span>
                </div>
                <p class="text-xs text-white/60 mb-4 leading-relaxed">${dish.shortDesc}</p>
              </div>
              <div class="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#b87333] group-hover:text-[#ff5500]">
                <span>VIEW SPECS</span>
                <i data-lucide="flame" class="w-3.5 h-3.5"></i>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- CHEF'S TABLE RESERVATION -->
    <section id="reservation" class="py-28 px-6 bg-gradient-to-t from-[#000000] to-[#120a05] border-t border-[#ff5500]/30 text-center">
      <div class="max-w-3xl mx-auto">
        <span class="text-xs uppercase tracking-[0.4em] text-[#ff5500] font-sans font-bold block mb-3">HEARTH SEATING</span>
        <h2 class="text-4xl md:text-6xl font-bold uppercase mb-6">TAKE A SEAT BY THE FIRE</h2>
        <p class="font-sans text-sm text-white/70 mb-10">Limited to 12 guests per seating. Watch Chef Arjun Rao compose your dinner over binchotan coals.</p>
        <button onclick="window.App.openReservationModal()" class="px-10 py-5 bg-[#ff5500] text-white font-bold font-sans uppercase tracking-widest text-xs hover:bg-[#e04b00] transition-colors shadow-2xl">
          SECURE HEARTH SEATS
        </button>
      </div>
    </section>
  `;

  // Init 3D Dark Fire Particle Scene
  window.ThreeScenesManager.initDarkFireScene("d3-hero-canvas");

  if (window.lucide) window.lucide.createIcons();
};
