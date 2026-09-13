/**
 * DESIGN 05 — IMMERSIVE FOOD ART
 * Digital gallery aesthetic treating dishes as sculptural masterpieces with deconstructing 3D scroll animations.
 */

window.RenderDesign5 = function (container, data) {
  const { menuItems, story } = data;

  container.className = "design-scope-5 bg-black text-white font-sans selection:bg-[#e63946] selection:text-white transition-opacity duration-700";
  container.style.fontFamily = "'Syne', sans-serif";

  container.innerHTML = `
    <!-- IMMERSIVE ART HERO -->
    <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#111111] via-black to-black pointer-events-none"></div>

      <!-- Deconstructing 3D Art Dish Canvas -->
      <div id="d5-hero-canvas" class="absolute inset-0 z-0 cursor-pointer"></div>

      <!-- Hero Overlay Content -->
      <div class="relative z-10 max-w-5xl mx-auto text-center pointer-events-none">
        <div class="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#e63946]/50 bg-black/80 backdrop-blur-md mb-8 pointer-events-auto">
          <span class="w-2.5 h-2.5 rounded-full bg-[#e63946] animate-ping"></span>
          <span class="text-xs uppercase tracking-[0.4em] text-[#e63946] font-bold">Culinary Gallery Pavilion</span>
        </div>

        <h1 class="text-6xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tighter leading-none mb-8 text-white">
          FOOD IS AN <span class="text-[#e63946] underline decoration-white/30 underline-offset-8">ART FORM.</span>
        </h1>

        <p class="max-w-xl mx-auto text-sm md:text-base text-white/70 font-light tracking-widest uppercase mb-12 pointer-events-auto">
          Sculptural plating, deconstructing flavors, and gallery-level sensory compositions.
        </p>

        <div class="flex flex-wrap justify-center gap-6 pointer-events-auto">
          <a href="#art-gallery" class="px-10 py-5 bg-[#e63946] text-white font-bold uppercase tracking-widest text-xs hover:bg-[#c92a37] transition-all shadow-[0_0_40px_rgba(230,57,70,0.5)]">
            Explore Gallery Pavilion
          </a>
          <button onclick="window.App.openReservationModal()" class="px-10 py-5 border border-white/40 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors">
            Reserve Gallery Table
          </button>
        </div>
      </div>
    </section>

    <!-- FOOD ART GALLERY -->
    <section id="art-gallery" class="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      <div class="text-center mb-20">
        <span class="text-xs uppercase tracking-[0.4em] text-[#e63946] font-bold block mb-3">SCULPTURAL EXHIBITS</span>
        <h2 class="text-4xl md:text-7xl font-extrabold uppercase">SIGNATURE ART DISHES</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        ${menuItems.map((dish, i) => `
          <div onclick="window.App.openDishModal('${dish.id}')" class="group cursor-pointer bg-[#0a0a0a] border border-white/10 p-8 flex flex-col justify-between transition-all duration-700 hover:border-[#e63946] hover:-translate-y-2">
            <div>
              <div class="flex justify-between items-start mb-6">
                <span class="font-mono text-xs text-[#e63946] font-bold">EXHIBIT // 0${i + 1}</span>
                <span class="font-mono text-lg text-white font-bold">${dish.price}</span>
              </div>
              <div class="aspect-square w-full overflow-hidden mb-6 bg-black">
                <img src="${dish.image}" alt="${dish.name}" class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              </div>
              <h3 class="text-2xl font-bold uppercase tracking-tight text-white mb-3 group-hover:text-[#e63946] transition-colors">${dish.name}</h3>
              <p class="text-xs text-white/60 leading-relaxed mb-6 font-light">${dish.fullDesc}</p>
            </div>
            <div class="flex justify-between items-center text-xs font-mono text-[#e63946] border-t border-white/10 pt-4">
              <span>DISCOVER DISH ARTWORK</span>
              <i data-lucide="arrow-up-right" class="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- 5-ACT CINEMATIC HORIZONTAL STORYTELLING -->
    <section id="art-story" class="py-28 px-6 bg-[#080808] border-y border-white/10">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <span class="text-xs uppercase tracking-[0.4em] text-[#e63946] font-bold block mb-3">CURATED SCENARIO</span>
          <h2 class="text-4xl md:text-6xl font-extrabold uppercase">THE 5-ACT ARTWORK</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
          ${story.map(act => `
            <div class="p-6 bg-[#111111] border border-white/10 hover:border-[#e63946] transition-colors">
              <span class="text-xs font-mono text-[#e63946] block mb-2">SCENE 0${act.step}</span>
              <h3 class="text-xl font-bold uppercase mb-2">${act.title}</h3>
              <p class="text-xs text-white/60 leading-relaxed">${act.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- FINAL BOLD CTA -->
    <section id="reservation" class="py-36 px-6 text-center bg-black border-t border-white/10 relative overflow-hidden">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-5xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tighter leading-none mb-10 text-white">
          COME HUNGRY.<br />
          <span class="text-[#e63946]">LEAVE INSPIRED.</span>
        </h2>
        <button onclick="window.App.openReservationModal()" class="px-12 py-6 bg-white text-black font-extrabold uppercase tracking-widest text-xs hover:bg-[#e63946] hover:text-white transition-colors shadow-2xl">
          RESERVE YOUR TABLE
        </button>
      </div>
    </section>
  `;

  // Init Deconstructing 3D Art Scene
  window.ThreeScenesManager.initArtDishScene("d5-hero-canvas");

  if (window.lucide) window.lucide.createIcons();
};
