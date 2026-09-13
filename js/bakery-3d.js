/**
 * SRI LAKSHMI BAKERY - Three.js 3D WebGL Graphics Engine
 * Creates a warm 3D hero scene with floating cake, orbiting flour/wheat/strawberries/chocolate particles, and cursor parallax.
 */

window.Bakery3DEngine = (function () {
  let activeScene = null;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initHeroScene(containerId) {
    const container = document.getElementById(containerId);
    if (!container || !window.THREE) return;
    container.innerHTML = '';

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xFFF9F2, 0.05);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 5.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Warm Ambient & Spotlight Setup
    const ambientLight = new THREE.AmbientLight(0xfff3e0, 1.2);
    scene.add(ambientLight);

    const warmSpotlight = new THREE.SpotLight(0xd9823b, 3);
    warmSpotlight.position.set(4, 7, 4);
    warmSpotlight.angle = Math.PI / 4;
    warmSpotlight.penumbra = 0.6;
    warmSpotlight.castShadow = true;
    scene.add(warmSpotlight);

    const chocolateBacklight = new THREE.PointLight(0x5a2d1a, 2, 10);
    chocolateBacklight.position.set(-4, -2, -2);
    scene.add(chocolateBacklight);

    // Master Hero 3D Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 3D Cake Stand (Base)
    const standGeo = new THREE.CylinderGeometry(1.6, 1.2, 0.15, 48);
    const standMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.1,
    });
    const stand = new THREE.Mesh(standGeo, standMat);
    stand.receiveShadow = true;
    stand.castShadow = true;
    masterGroup.add(stand);

    // Golden Rim Accent
    const rimGeo = new THREE.TorusGeometry(1.58, 0.02, 16, 64);
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xd9823b, metalness: 0.8, roughness: 0.2 });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.08;
    masterGroup.add(rim);

    // 3D Celebration Cake - Layer 1 (Bottom Sponge)
    const cakeBottomGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.5, 48);
    const cakeBottomMat = new THREE.MeshStandardMaterial({ color: 0x5a2d1a, roughness: 0.5 }); // Dark chocolate sponge
    const cakeBottom = new THREE.Mesh(cakeBottomGeo, cakeBottomMat);
    cakeBottom.position.y = 0.35;
    cakeBottom.castShadow = true;
    masterGroup.add(cakeBottom);

    // Cream Layer (Middle)
    const creamGeo = new THREE.CylinderGeometry(1.18, 1.18, 0.1, 48);
    const creamMat = new THREE.MeshStandardMaterial({ color: 0xfff9f2, roughness: 0.3 });
    const cream = new THREE.Mesh(creamGeo, creamMat);
    cream.position.y = 0.65;
    masterGroup.add(cream);

    // Cake Layer 2 (Top Sponge with Caramel Drizzle)
    const cakeTopGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.45, 48);
    const cakeTopMat = new THREE.MeshStandardMaterial({ color: 0xa94f20, roughness: 0.4 });
    const cakeTop = new THREE.Mesh(cakeTopGeo, cakeTopMat);
    cakeTop.position.y = 0.92;
    cakeTop.castShadow = true;
    masterGroup.add(cakeTop);

    // Strawberry & Heart Toppers on Cake
    const topperGroup = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const strawGeo = new THREE.ConeGeometry(0.1, 0.2, 16);
      const strawMat = new THREE.MeshStandardMaterial({ color: 0xe63946, roughness: 0.3 });
      const straw = new THREE.Mesh(strawGeo, strawMat);
      straw.position.set(Math.cos(angle) * 0.55, 1.25, Math.sin(angle) * 0.55);
      straw.rotation.x = Math.PI;
      topperGroup.add(straw);
    }
    masterGroup.add(topperGroup);

    // Floating Bakery Ingredient Particles (Wheat, Flour, Chocolate, Strawberries, Hearts)
    const floatingGroup = new THREE.Group();
    masterGroup.add(floatingGroup);

    const particleCount = prefersReducedMotion ? 12 : 30;
    const floatingItems = [];

    for (let i = 0; i < particleCount; i++) {
      let geom;
      let color;
      const type = i % 4;
      if (type === 0) { // Chocolate Chunk
        geom = new THREE.DodecahedronGeometry(0.12, 0);
        color = 0x5a2d1a;
      } else if (type === 1) { // Strawberry
        geom = new THREE.OctahedronGeometry(0.14);
        color = 0xe63946;
      } else if (type === 2) { // Golden Flour Particle / Wheat Grain
        geom = new THREE.IcosahedronGeometry(0.09, 1);
        color = 0xd9823b;
      } else { // Heart / Sugar Sprinkle
        geom = new THREE.TetrahedronGeometry(0.1);
        color = 0xfff9f2;
      }

      const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.1 });
      const mesh = new THREE.Mesh(geom, mat);

      const angle = Math.random() * Math.PI * 2;
      const radius = 1.8 + Math.random() * 1.2;
      const y = -0.5 + Math.random() * 2.5;

      mesh.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      floatingGroup.add(mesh);

      floatingItems.push({
        mesh,
        angle,
        radius,
        speed: 0.005 + Math.random() * 0.008,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        initialY: y
      });
    }

    // Mouse Parallax Interaction
    let targetRotY = 0;
    let targetRotX = 0.2;
    let mouseX = 0, mouseY = 0;

    const onPointerMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRotY = mouseX * 0.4;
      targetRotX = 0.2 - mouseY * 0.2;
    };
    window.addEventListener('pointermove', onPointerMove);

    let reqId;
    const clock = new THREE.Clock();

    function animate() {
      reqId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.05;
        masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.05;
        masterGroup.position.y = Math.sin(time * 1.5) * 0.08;

        // Animate floating ingredient particles
        floatingItems.forEach(item => {
          item.angle += item.speed;
          item.mesh.position.x = Math.cos(item.angle) * item.radius;
          item.mesh.position.z = Math.sin(item.angle) * item.radius;
          item.mesh.position.y = item.initialY + Math.sin(time * 2 + item.angle) * 0.15;
          item.mesh.rotation.x += item.rotSpeed;
          item.mesh.rotation.y += item.rotSpeed;
        });
      }

      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    activeScene = {
      destroy: () => {
        cancelAnimationFrame(reqId);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
      }
    };
  }

  function destroy() {
    if (activeScene) {
      activeScene.destroy();
      activeScene = null;
    }
  }

  return { initHeroScene, destroy };
})();
