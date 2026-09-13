/**
 * DESIGN 04 — ORGANIC PREMIUM / SAGE
 * Botanical fine dining aesthetic with sage green, cream, organic curves, and farm-to-table timeline.
 */

window.RenderDesign4 = function (container, data) {
  const { restaurant, menuItems, farmToTableTimeline } = data;

  container.className = "design-scope-4 bg-[#f7f5f0] text-[#19241b] font-sans selection:bg-[#4a5d4e] selection:text-white transition-opacity duration-700";
  container.style.fontFamily = "'Playfair Display', serif";

  container.innerHTML = `
    <!-- ORGANIC BOTANICAL HERO -->
    <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24">
      <!-- Soft Gradient Backdrop -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#e0d8c3]/40 via-[#f7f5f0] to-[#f7f5f0] pointer-events-none"></div>

      <!-- Botanical 3D Leaf Canvas -->
      <div id="d4-hero-canvas" class="absolute inset-0 z-0 pointer-events-none"></div>

      <!-- Hero Content -->
      <div class="relative z-10 max-w-4xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#4a5d4e]/10 border border-[#4a5d4e]/30 text-[#4a5d4e] text-xs uppercase tracking-[0.3em] font-sans font-bold mb-8">
          <i data-lucide="sprout" class="w-4 h-4"></i>
          <span>Biodynamic Estate Dining</span>
        </div>

        <h1 class="text-6xl md:text-8xl lg:text-9xl tracking-tight leading-none font-normal mb-8 text-[#19241b]">
          ROOTED IN <span class="italic text-[#4a5d4e]">FLAVOR.</span>
        </h1>

        <p class="font-sans max-w-xl mx-auto text-base md:text-xl text-[#19241b]/70 font-light leading-relaxed mb-10">
          Seasonal ingredients. Thoughtful cooking. Naturally unforgettable gastronomy nurtured by coastal fog.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-4 font-sans">
          <a href="#farm-to-table" class="px-8 py-4 bg-[#4a5d4e] text-white font-bold uppercase tracking-widest text-xs rounded-full shadow-lg hover:bg-[#394a3d] transition-colors">
            Explore Farm Journey
          </a>
          <button onclick="window.App.openReservationModal()" class="px-8 py-4 border border-[#4a5d4e] text-[#19241b] font-bold uppercase tracking-widest text-xs rounded-full hover:bg-[#4a5d4e]/10 transition-colors">
            Your Table, Naturally
          </button>
        </div>
      </div>
    </section>

    <!-- FARM TO TABLE INTERACTIVE TIMELINE -->
    <section id="farm-to-table" class="py-28 px-6 max-w-7xl mx-auto border-t border-[#4a5d4e]/15">
      <div class="text-center mb-20">
        <span class="text-xs uppercase tracking-[0.4em] text-[#4a5d4e] font-sans font-bold block mb-3">Daily Lifecycle</span>
        <h2 class="text-4xl md:text-6xl font-normal">FARM TO TABLE TIMELINE</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 font-sans">
        ${farmToTableTimeline.map((item, idx) => `
          <div class="group bg-white p-8 rounded-3xl border border-[#e0d8c3] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div class="w-12 h-12 rounded-2xl bg-[#4a5d4e]/10 flex items-center justify-center text-[#4a5d4e] font-bold mb-6 group-hover:bg-[#4a5d4e] group-hover:text-white transition-colors">
              <i data-lucide="${item.icon}" class="w-6 h-6"></i>
            </div>
            <span class="text-xs font-mono font-bold text-[#606c38] block mb-1">${item.time} — ${item.stage}</span>
            <h3 class="font-serif text-xl font-bold text-[#19241b] mb-3">${item.title}</h3>
            <p class="text-xs text-[#19241b]/70 leading-relaxed">${item.desc}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- ORGANIC MAGAZINE MENU -->
    <section id="menu" class="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#4a5d4e]/15">
      <div class="flex justify-between items-end mb-16">
        <div>
          <span class="text-xs uppercase tracking-[0.4em] text-[#4a5d4e] font-sans font-bold block mb-2">Botanical Collection</span>
          <h2 class="text-4xl md:text-6xl font-normal">HARVEST MENU</h2>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans">
        ${menuItems.map(dish => `
          <div onclick="window.App.openDishModal('${dish.id}')" class="group cursor-pointer flex flex-col md:flex-row items-center gap-8 bg-white p-6 rounded-3xl border border-[#e0d8c3] shadow-sm hover:shadow-2xl transition-all duration-500">
            <div class="w-full md:w-1/2 aspect-square overflow-hidden rounded-2xl relative">
              <img src="${dish.image}" alt="${dish.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div class="w-full md:w-1/2 space-y-3">
              <div class="flex justify-between items-start">
                <h3 class="font-serif text-xl text-[#19241b] group-hover:text-[#4a5d4e] transition-colors">${dish.name}</h3>
                <span class="font-serif text-lg text-[#4a5d4e] font-bold">${dish.price}</span>
              </div>
              <p class="text-xs text-[#19241b]/70 leading-relaxed">${dish.shortDesc}</p>
              <div class="pt-2">
                <span class="inline-flex items-center gap-1 text-xs text-[#606c38] font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  View Harvest Details
                  <i data-lucide="leaf" class="w-3.5 h-3.5"></i>
                </span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- CREAM RESERVATION PANEL -->
    <section id="reservation" class="py-28 px-6 bg-[#e0d8c3]/40 border-t border-[#4a5d4e]/15">
      <div class="max-w-3xl mx-auto text-center bg-white p-12 md:p-16 rounded-3xl shadow-xl border border-[#e0d8c3]">
        <span class="text-xs uppercase tracking-[0.4em] text-[#4a5d4e] font-sans font-bold block mb-3">GARDEN DINING</span>
        <h2 class="text-4xl md:text-6xl font-normal mb-6 text-[#19241b]">YOUR TABLE, NATURALLY.</h2>
        <p class="font-sans text-sm text-[#19241b]/70 mb-10">Reserve your place in our glass greenhouse dining room surrounded by coastal sage and olive trees.</p>
        <button onclick="window.App.openReservationModal()" class="px-10 py-5 bg-[#4a5d4e] text-white font-bold font-sans uppercase tracking-widest text-xs rounded-full hover:bg-[#394a3d] transition-colors shadow-lg">
          RESERVE GREENHOUSE SEATING
        </button>
      </div>
    </section>
  `;

  // Init Organic Sage Leaf Scene
  window.ThreeScenesManager.initOrganicSageScene("d4-hero-canvas");

  if (window.lucide) window.lucide.createIcons();
};
