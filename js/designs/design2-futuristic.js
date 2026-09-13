/**
 * DESIGN 02 — FUTURISTIC 3D
 * Digital food laboratory aesthetic with obsidian, electric amber & spatial WebGL interactive scenes.
 */

window.RenderDesign2 = function (container, data) {
  const { restaurant, menuItems } = data;

  container.className = "design-scope-2 bg-[#08080a] text-white font-sans selection:bg-[#ff9e00] selection:text-black transition-opacity duration-700";
  container.style.fontFamily = "'Space Grotesk', sans-serif";

  container.innerHTML = `
    <!-- FUTURISTIC 3D HERO -->
    <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
      <!-- Neon Grid Backdrop -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#1f1a2415_1px,transparent_1px),linear-gradient(to_bottom,#1f1a2415_1px,transparent_1px)] [background-size:4rem_4rem] pointer-events-none"></div>
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#ff9e00]/20 to-[#7b2cbf]/30 rounded-full blur-[140px] pointer-events-none"></div>

      <!-- 3D Canvas -->
      <div id="d2-hero-canvas" class="absolute inset-0 w-full h-full z-0 cursor-crosshair"></div>

      <!-- Hero Overlay Content -->
      <div class="relative z-10 max-w-5xl mx-auto text-center pointer-events-none">
        <div class="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#ff9e00]/50 bg-[#08080a]/80 backdrop-blur-md mb-6 pointer-events-auto">
          <span class="w-2.5 h-2.5 rounded-full bg-[#ff9e00] animate-ping"></span>
          <span class="text-xs uppercase tracking-[0.3em] text-[#ff9e00] font-bold">Spatial Culinary Lab</span>
        </div>

        <h1 class="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter uppercase mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-[#f0f0f5] to-[#ff9e00]">
          TASTE, <span class="text-stroke-amber text-transparent">REIMAGINED.</span>
        </h1>

        <p class="max-w-2xl mx-auto text-base md:text-lg text-white/70 font-light mb-10 tracking-wide pointer-events-auto">
          Molecular flavor pairings, infrared binchotan searing, and spatial gastronomy at Ember & Sage.
        </p>

        <div class="flex flex-wrap justify-center gap-4 pointer-events-auto">
          <a href="#explorer" class="px-8 py-4 bg-[#ff9e00] text-black font-bold uppercase tracking-widest text-xs rounded-none shadow-[0_0_30px_rgba(255,158,0,0.5)] hover:scale-105 transition-transform">
            Launch 3D Explorer
          </a>
          <button onclick="window.App.openReservationModal()" class="px-8 py-4 border border-[#7b2cbf] text-white font-bold uppercase tracking-widest text-xs rounded-none backdrop-blur-md hover:bg-[#7b2cbf]/20 transition-colors">
            Reserve Glass Table
          </button>
        </div>
      </div>
    </section>

    <!-- 360° INTERACTIVE FLAVOR EXPLORER -->
    <section id="explorer" class="py-24 px-6 max-w-7xl mx-auto relative border-t border-white/10">
      <div class="text-center mb-12">
        <span class="text-xs uppercase tracking-[0.4em] text-[#ff9e00] font-bold block mb-2">Interactive Hologram</span>
        <h2 class="text-4xl md:text-6xl font-bold uppercase tracking-tight">EXPLORE THE FLAVOR</h2>
        <p class="text-xs text-white/60 mt-2">Click & drag the 3D model below to rotate 360°. Click hotspots to inspect ingredients.</p>
      </div>

      <div class="relative w-full h-[550px] bg-[#0d0c12] border border-[#ff9e00]/30 rounded-2xl overflow-hidden shadow-2xl">
        <!-- 3D Explorer Canvas -->
        <div id="d2-explorer-canvas" class="w-full h-full"></div>

        <!-- Dynamic Hotspot Info Card Overlay -->
        <div id="d2-hotspot-card" class="absolute bottom-6 left-6 right-6 md:right-auto md:w-96 p-6 bg-[#08080a]/90 backdrop-blur-xl border border-[#ff9e00] rounded-xl transition-all duration-300 transform translate-y-4 opacity-0 pointer-events-none">
          <div class="flex justify-between items-start mb-2">
            <h4 id="d2-hotspot-title" class="text-lg font-bold text-[#ff9e00]">Périgord Truffle</h4>
            <span class="text-[10px] uppercase tracking-widest bg-[#ff9e00]/20 text-[#ff9e00] px-2 py-0.5 rounded">Hotspot</span>
          </div>
          <p id="d2-hotspot-text" class="text-xs text-white/80 leading-relaxed">Hand-harvested winter truffles shaved tableside.</p>
        </div>

        <!-- Hotspot Trigger Buttons -->
        <div class="absolute top-6 left-6 flex flex-wrap gap-2">
          ${menuItems[0].hotspots.map((hs, i) => `
            <button onclick="window.D2ShowHotspot(${i})" class="px-3 py-1.5 bg-black/60 border border-[#ff9e00]/50 hover:border-[#ff9e00] text-xs text-[#ff9e00] font-mono rounded-lg backdrop-blur-md transition-all">
              ◉ ${hs.name}
            </button>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- SPATIAL HOLOGRAPHIC MENU -->
    <section id="menu" class="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      <div class="flex justify-between items-end mb-16">
        <div>
          <span class="text-xs uppercase tracking-[0.4em] text-[#7b2cbf] font-bold block mb-2">Lab Catalog</span>
          <h2 class="text-4xl md:text-6xl font-bold uppercase">HOLOGRAPHIC MENU</h2>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${menuItems.map(dish => `
          <div onclick="window.App.openDishModal('${dish.id}')" class="group cursor-pointer relative bg-gradient-to-b from-[#13121a] to-[#0a090f] p-6 border border-white/10 hover:border-[#ff9e00] rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,158,0,0.2)]">
            <div class="aspect-video w-full overflow-hidden rounded-xl mb-6 relative">
              <img src="${dish.image}" alt="${dish.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div class="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 text-xs font-mono text-[#ff9e00] border border-[#ff9e00]/40 rounded-full">
                ${dish.calories}
              </div>
            </div>
            <div class="flex justify-between items-start mb-3">
              <h3 class="text-lg font-bold text-white group-hover:text-[#ff9e00] transition-colors">${dish.name}</h3>
              <span class="text-lg font-mono text-[#ff9e00] font-bold">${dish.price}</span>
            </div>
            <p class="text-xs text-white/60 mb-4 line-clamp-2">${dish.shortDesc}</p>
            <div class="flex justify-between items-center text-xs font-mono text-[#7b2cbf] border-t border-white/10 pt-4">
              <span>EXPLORE MOLECULES</span>
              <i data-lucide="zap" class="w-4 h-4 text-[#ff9e00] group-hover:rotate-12 transition-transform"></i>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- FUTURISTIC GLASS RESERVATION -->
    <section id="reservation" class="py-24 px-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#190c2e] via-[#08080a] to-[#08080a]">
      <div class="max-w-4xl mx-auto p-10 md:p-16 bg-[#120e1a]/80 backdrop-blur-2xl border border-[#ff9e00]/40 rounded-3xl text-center shadow-[0_0_50px_rgba(123,44,191,0.3)]">
        <span class="text-xs uppercase tracking-[0.4em] text-[#ff9e00] font-mono block mb-3">CYBERNETIC BOOKING</span>
        <h2 class="text-4xl md:text-6xl font-bold uppercase mb-6">ENTER THE DINING EXPERIENCE</h2>
        <p class="text-sm text-white/70 max-w-lg mx-auto mb-10">Lock in your multi-sensory table reservation with integrated LED illumination.</p>
        <button onclick="window.App.openReservationModal()" class="px-10 py-5 bg-gradient-to-r from-[#ff9e00] to-[#ff5500] text-black font-bold uppercase tracking-widest text-xs rounded-xl shadow-xl hover:scale-105 transition-transform">
          INITIALIZE RESERVATION
        </button>
      </div>
    </section>
  `;

  // Init 3D Scenes
  window.ThreeScenesManager.initFuturisticScene("d2-hero-canvas", false);
  window.ThreeScenesManager.initFuturisticScene("d2-explorer-canvas", true);

  // Hotspot Interactivity Handler
  window.D2ShowHotspot = function (index) {
    const hs = menuItems[0].hotspots[index];
    const card = document.getElementById("d2-hotspot-card");
    const title = document.getElementById("d2-hotspot-title");
    const text = document.getElementById("d2-hotspot-text");
    if (!card || !hs) return;

    title.innerText = hs.name;
    text.innerText = hs.text;
    card.classList.remove("opacity-0", "translate-y-4", "pointer-events-none");
    card.classList.add("opacity-100", "translate-y-0", "pointer-events-auto");
  };

  if (window.lucide) window.lucide.createIcons();
};
