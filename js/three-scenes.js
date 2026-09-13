/**
 * EMBER & SAGE - Three.js & WebGL 3D Graphics Engine
 * Creates tailored 3D experiences, particle systems, floating elements, and 360° interactive scenes.
 */

window.ThreeScenesManager = (function () {
  let activeCanvases = {};

  // Check if reduced motion is requested
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * DESIGN 01 — CINEMATIC LUXURY 3D HERO
   * Floating luxury dish with steam particles, dramatic lighting & cursor parallax
   */
  function initCinematicHeroScene(canvasContainerId) {
    const container = document.getElementById(canvasContainerId);
    if (!container || !window.THREE) return;
    container.innerHTML = '';

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0908, 0.08);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.6);
    scene.add(ambientLight);

    const spotlight = new THREE.SpotLight(0xd4af37, 4);
    spotlight.position.set(3, 8, 4);
    spotlight.angle = Math.PI / 4;
    spotlight.penumbra = 0.8;
    spotlight.castShadow = true;
    scene.add(spotlight);

    const warmRimLight = new THREE.PointLight(0xff4500, 2.5, 10);
    warmRimLight.position.set(-3, -1, -2);
    scene.add(warmRimLight);

    // Dish Group
    const dishGroup = new THREE.Group();
    scene.add(dishGroup);

    // Luxury Plate (Base)
    const plateGeo = new THREE.CylinderGeometry(1.6, 1.2, 0.12, 64);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x141312,
      roughness: 0.25,
      metalness: 0.8,
      clearcoat: 0.6,
    });
    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.receiveShadow = true;
    plate.castShadow = true;
    dishGroup.add(plate);

    // Inner Rim Gold Inlay
    const rimGeo = new THREE.TorusGeometry(1.45, 0.02, 16, 64);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.1,
      metalness: 0.9,
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.06;
    dishGroup.add(rim);

    // Steak / Central Dish Element
    const steakGeo = new THREE.DodecahedronGeometry(0.6, 2);
    steakGeo.scale(1.2, 0.45, 0.85);
    const steakMat = new THREE.MeshStandardMaterial({
      color: 0x2b170e,
      roughness: 0.4,
      metalness: 0.1,
      bumpScale: 0.05,
    });
    const steak = new THREE.Mesh(steakGeo, steakMat);
    steak.position.set(0, 0.3, 0);
    steak.castShadow = true;
    dishGroup.add(steak);

    // Truffle / Garnish Accents
    const truffleGroup = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const g = new THREE.IcosahedronGeometry(0.12, 1);
      const m = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set((Math.random() - 0.5) * 0.7, 0.55 + Math.random() * 0.08, (Math.random() - 0.5) * 0.5);
      mesh.rotation.set(Math.random(), Math.random(), Math.random());
      mesh.castShadow = true;
      truffleGroup.add(mesh);
    }
    dishGroup.add(truffleGroup);

    // Steam Particle System
    const particleCount = prefersReducedMotion ? 20 : 70;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pVelocities = [];

    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 0.8;
      pPositions[i * 3 + 1] = 0.4 + Math.random() * 1.5;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
      pVelocities.push({
        x: (Math.random() - 0.5) * 0.003,
        y: 0.005 + Math.random() * 0.008,
        z: (Math.random() - 0.5) * 0.003,
      });
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    // Particle texture canvas
    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(244, 239, 230, 0.35)');
    grad.addColorStop(1, 'rgba(244, 239, 230, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const particleTex = new THREE.CanvasTexture(canvas);

    const pMat = new THREE.PointsMaterial({
      size: 0.35,
      map: particleTex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const steamParticles = new THREE.Points(pGeo, pMat);
    dishGroup.add(steamParticles);

    // Cursor Parallax Interaction
    let targetRotX = 0.3;
    let targetRotY = 0;
    let mouseX = 0, mouseY = 0;

    const onPointerMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRotY = mouseX * 0.35;
      targetRotX = 0.3 - mouseY * 0.2;
    };
    window.addEventListener('pointermove', onPointerMove);

    let reqId;
    let clock = new THREE.Clock();

    function animate() {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        dishGroup.rotation.y += (targetRotY - dishGroup.rotation.y) * 0.05;
        dishGroup.rotation.x += (targetRotX - dishGroup.rotation.x) * 0.05;
        dishGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.06;

        // Animate steam particles
        const pos = pGeo.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          pos[i * 3 + 1] += pVelocities[i].y;
          pos[i * 3] += Math.sin(elapsedTime + i) * 0.001;
          if (pos[i * 3 + 1] > 2.2) {
            pos[i * 3 + 1] = 0.3;
            pos[i * 3] = (Math.random() - 0.5) * 0.6;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
          }
        }
        pGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    activeCanvases[canvasContainerId] = {
      destroy: () => {
        cancelAnimationFrame(reqId);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
      }
    };
  }

  /**
   * DESIGN 02 — FUTURISTIC 3D HERO & 360 FLAVOR EXPLORER
   * Floating spatial plate with glowing energy rings and interactive rotation
   */
  function initFuturisticScene(canvasContainerId, isExplorer = false) {
    const container = document.getElementById(canvasContainerId);
    if (!container || !window.THREE) return;
    container.innerHTML = '';

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 4.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const amberLight = new THREE.PointLight(0xff9e00, 4, 10);
    amberLight.position.set(3, 4, 3);
    scene.add(amberLight);

    const violetLight = new THREE.PointLight(0x9d4edd, 3, 10);
    violetLight.position.set(-3, -2, -2);
    scene.add(violetLight);

    // Master Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Cyber Plate
    const plateGeo = new THREE.CylinderGeometry(1.5, 1.1, 0.1, 32);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x0f0f14,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: false,
    });
    const plate = new THREE.Mesh(plateGeo, plateMat);
    masterGroup.add(plate);

    // Glowing Neon Rings
    const ring1Geo = new THREE.TorusGeometry(1.8, 0.015, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xff9e00 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2;
    masterGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.1, 0.01, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x7b2cbf });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 2.2;
    masterGroup.add(ring2);

    // Orbiting Floating Holographic Ingredients
    const orbitGroup = new THREE.Group();
    masterGroup.add(orbitGroup);

    const ingredientsCount = 8;
    const ingredientMeshes = [];
    for (let i = 0; i < ingredientsCount; i++) {
      const angle = (i / ingredientsCount) * Math.PI * 2;
      const radius = 1.6 + Math.random() * 0.4;
      const geom = (i % 2 === 0) ? new THREE.OctahedronGeometry(0.15) : new THREE.TetrahedronGeometry(0.18);
      const mat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0xff9e00 : 0xe0aaff,
        wireframe: true,
        roughness: 0.2,
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 0.6, Math.sin(angle) * radius);
      orbitGroup.add(mesh);
      ingredientMeshes.push({ mesh, angle, radius, speed: 0.008 + Math.random() * 0.005 });
    }

    // Central Futuristic Dish Object
    const centerDishGeo = new THREE.IcosahedronGeometry(0.65, 2);
    const centerDishMat = new THREE.MeshStandardMaterial({
      color: 0x1f1a24,
      metalness: 0.7,
      roughness: 0.2,
    });
    const centerDish = new THREE.Mesh(centerDishGeo, centerDishMat);
    centerDish.position.y = 0.35;
    masterGroup.add(centerDish);

    // Interactive Drag / Touch 360 Rotation for Flavor Explorer
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };
      masterGroup.rotation.y += deltaMove.x * 0.01;
      masterGroup.rotation.x += deltaMove.y * 0.005;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => { isDragging = false; };

    if (isExplorer) {
      const elem = renderer.domElement;
      elem.style.cursor = 'grab';
      elem.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }

    let reqId;
    let clock = new THREE.Clock();

    function animate() {
      reqId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        if (!isDragging) {
          masterGroup.rotation.y += 0.006;
          masterGroup.position.y = Math.sin(time * 1.8) * 0.08;
        }

        ring1.rotation.z = time * 0.3;
        ring2.rotation.z = -time * 0.2;

        ingredientMeshes.forEach((item) => {
          item.angle += item.speed;
          item.mesh.position.x = Math.cos(item.angle) * item.radius;
          item.mesh.position.z = Math.sin(item.angle) * item.radius;
          item.mesh.rotation.x += 0.02;
          item.mesh.rotation.y += 0.02;
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

    activeCanvases[canvasContainerId] = {
      destroy: () => {
        cancelAnimationFrame(reqId);
        window.removeEventListener('resize', onResize);
        if (isExplorer) {
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mouseup', onMouseUp);
        }
        renderer.dispose();
      }
    };
  }

  /**
   * DESIGN 03 — DARK FIRE & EMBER PARTICLE ENGINE
   * Intense open kitchen flame particle system & ember smoke backdrop
   */
  function initDarkFireScene(canvasContainerId) {
    const container = document.getElementById(canvasContainerId);
    if (!container || !window.THREE) return;
    container.innerHTML = '';

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Glowing Embers
    const emberCount = prefersReducedMotion ? 50 : 250;
    const eGeo = new THREE.BufferGeometry();
    const ePositions = new Float32Array(emberCount * 3);
    const eScales = new Float32Array(emberCount);
    const eVelocities = [];

    for (let i = 0; i < emberCount; i++) {
      ePositions[i * 3] = (Math.random() - 0.5) * 12;
      ePositions[i * 3 + 1] = -4 + Math.random() * 8;
      ePositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      eScales[i] = Math.random() * 0.15 + 0.05;
      eVelocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: 0.02 + Math.random() * 0.035,
        z: (Math.random() - 0.5) * 0.01,
      });
    }

    eGeo.setAttribute('position', new THREE.BufferAttribute(ePositions, 3));

    // Ember canvas texture
    const canvas = document.createElement('canvas');
    canvas.width = 32; canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, '#ff9e00');
    grad.addColorStop(0.4, '#ff3300');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    const emberTex = new THREE.CanvasTexture(canvas);

    const eMat = new THREE.PointsMaterial({
      size: 0.25,
      map: emberTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const embers = new THREE.Points(eGeo, eMat);
    scene.add(embers);

    let reqId;
    let clock = new THREE.Clock();

    function animate() {
      reqId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        const pos = eGeo.attributes.position.array;
        for (let i = 0; i < emberCount; i++) {
          pos[i * 3 + 1] += eVelocities[i].y;
          pos[i * 3] += Math.sin(time * 2 + i) * 0.005;
          if (pos[i * 3 + 1] > 6) {
            pos[i * 3 + 1] = -4;
            pos[i * 3] = (Math.random() - 0.5) * 10;
          }
        }
        eGeo.attributes.position.needsUpdate = true;
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

    activeCanvases[canvasContainerId] = {
      destroy: () => {
        cancelAnimationFrame(reqId);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
      }
    };
  }

  /**
   * DESIGN 04 — ORGANIC BOTANICAL PARALLAX 3D
   * Floating sage leaves & herbs in natural depth
   */
  function initOrganicSageScene(canvasContainerId) {
    const container = document.getElementById(canvasContainerId);
    if (!container || !window.THREE) return;
    container.innerHTML = '';

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0x8a9a86, 1.5);
    sunLight.position.set(2, 5, 3);
    scene.add(sunLight);

    // Leaf meshes group
    const leafGroup = new THREE.Group();
    scene.add(leafGroup);

    const leafCount = prefersReducedMotion ? 15 : 35;
    const leaves = [];

    // Create leaf shape
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.2, 0.3, 0.3, 0.6, 0, 1.0);
    shape.bezierCurveTo(-0.3, 0.6, -0.2, 0.3, 0, 0);

    const leafGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.01, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.01 });
    leafGeo.scale(0.3, 0.3, 0.3);

    const leafMat1 = new THREE.MeshStandardMaterial({ color: 0x4a5d4e, roughness: 0.5 });
    const leafMat2 = new THREE.MeshStandardMaterial({ color: 0x606c38, roughness: 0.6 });

    for (let i = 0; i < leafCount; i++) {
      const mat = (i % 2 === 0) ? leafMat1 : leafMat2;
      const leaf = new THREE.Mesh(leafGeo, mat);
      leaf.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 4);
      leaf.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      leafGroup.add(leaf);
      leaves.push({
        mesh: leaf,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        floatSpeed: 0.003 + Math.random() * 0.004,
        initialY: leaf.position.y
      });
    }

    let reqId;
    let clock = new THREE.Clock();

    function animate() {
      reqId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        leaves.forEach((item) => {
          item.mesh.rotation.x += item.rotSpeed;
          item.mesh.rotation.y += item.rotSpeed * 1.5;
          item.mesh.position.y = item.initialY + Math.sin(time * 1.2 + item.initialY) * 0.3;
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

    activeCanvases[canvasContainerId] = {
      destroy: () => {
        cancelAnimationFrame(reqId);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
      }
    };
  }

  /**
   * DESIGN 05 — IMMERSIVE DECONSTRUCTING ART DISH 3D
   * Deconstructs into floating sculptural layers on scroll
   */
  function initArtDishScene(canvasContainerId) {
    const container = document.getElementById(canvasContainerId);
    if (!container || !window.THREE) return;
    container.innerHTML = '';

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2, 5.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // High Contrast Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 8, 4);
    scene.add(keyLight);

    const redAccentLight = new THREE.PointLight(0xe63946, 3, 10);
    redAccentLight.position.set(-4, -1, 2);
    scene.add(redAccentLight);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Layer 1: Art Pedestal Base
    const baseGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.08, 64);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.1, metalness: 0.9 });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    masterGroup.add(baseMesh);

    // Layer 2: Red Sauce Ring (Artistic Splash)
    const ringGeo = new THREE.TorusGeometry(1.1, 0.06, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xe63946, roughness: 0.2, metalness: 0.3 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.2;
    masterGroup.add(ringMesh);

    // Layer 3: Central Sculptural Dish Core
    const coreGeo = new THREE.DodecahedronGeometry(0.7, 1);
    const coreMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f7, roughness: 0.3, metalness: 0.1 });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 0.55;
    masterGroup.add(coreMesh);

    // Layer 4: Floating Metallic Garnish Shards
    const shardGroup = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const g = new THREE.ConeGeometry(0.08, 0.4, 4);
      const m = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.1 });
      const shard = new THREE.Mesh(g, m);
      shard.position.set((Math.random() - 0.5) * 0.8, 0.95 + Math.random() * 0.4, (Math.random() - 0.5) * 0.8);
      shard.rotation.set(Math.random(), Math.random(), Math.random());
      shardGroup.add(shard);
    }
    masterGroup.add(shardGroup);

    // Scroll-triggered deconstruction target position calculation
    let scrollDeconstructFactor = 0;
    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      scrollDeconstructFactor = Math.min(Math.max(scrollY / (maxScroll * 0.3), 0), 1);
    };
    window.addEventListener('scroll', onScroll);

    let reqId;
    let clock = new THREE.Clock();

    function animate() {
      reqId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        masterGroup.rotation.y = time * 0.2;

        // Deconstruction effect based on scroll
        ringMesh.position.y = 0.2 + scrollDeconstructFactor * 0.5;
        coreMesh.position.y = 0.55 + scrollDeconstructFactor * 0.9;
        shardGroup.position.y = scrollDeconstructFactor * 1.4;
        shardGroup.rotation.y = time * 0.5;
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

    activeCanvases[canvasContainerId] = {
      destroy: () => {
        cancelAnimationFrame(reqId);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
      }
    };
  }

  function destroyScene(containerId) {
    if (activeCanvases[containerId]) {
      activeCanvases[containerId].destroy();
      delete activeCanvases[containerId];
    }
  }

  return {
    initCinematicHeroScene,
    initFuturisticScene,
    initDarkFireScene,
    initOrganicSageScene,
    initArtDishScene,
    destroyScene
  };
})();
