import { ref, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GPU resources stay in this closure, outside Vue's deep reactivity.
export function usePaperScene(host, ready) {
  const paused = ref(false);
  let destroyed = false,
    renderer,
    geometry,
    trigger,
    resize,
    visibility,
    media;
  let group,
    scene,
    camera,
    anchor,
    ticking = false,
    inView = false;
  let fold = 0,
    pointerX = 0,
    pointerY = 0,
    slowFrames = 0,
    samples = 0;
  const materials = [],
    sheets = [];
  const render = () => renderer?.render(scene, camera);
  function tick(time, delta) {
    if (!renderer || document.hidden) return;
    const ease = 1 - Math.exp(-Math.min(delta, 50) / 170);
    group.rotation.y +=
      (pointerX * 0.24 + fold * 0.45 - group.rotation.y) * ease;
    group.rotation.x += (pointerY * 0.15 - 0.13 - group.rotation.x) * ease;
    group.position.y = Math.sin(time * 0.55) * 0.035;
    for (let i = 0; i < sheets.length; i++) {
      sheets[i].rotation.z = (i - 3) * (0.14 - fold * 0.09) - 0.23;
      sheets[i].position.z = (i - 3) * (0.11 - fold * 0.065);
    }
    materials.forEach((material) => {
      material.uniforms.uFold.value = fold;
    });
    render();
    // Degrade once when sustained frame delivery exceeds the budget.
    if (samples < 120) {
      samples++;
      if (delta > 24) slowFrames++;
      if (samples === 120 && slowFrames > 35 && renderer.getPixelRatio() > 1) {
        renderer.setPixelRatio(1);
        measure();
      }
    }
  }
  function syncLoop() {
    const shouldTick =
      inView && !document.hidden && !media?.matches && !paused.value;
    if (shouldTick && !ticking) {
      gsap.ticker.add(tick);
      ticking = true;
    }
    if (!shouldTick && ticking) {
      gsap.ticker.remove(tick);
      ticking = false;
    }
    if (renderer && media?.matches) {
      group.rotation.set(-0.13, 0, 0);
      group.position.y = 0;
      render();
    }
  }
  function measure() {
    if (!anchor || !host.value) return;
    const rect = anchor.getBoundingClientRect();
    Object.assign(host.value.style, {
      left: `${rect.left}px`,
      right: "auto",
      top: `${rect.top + window.scrollY + 25}px`,
      width: `${rect.width}px`,
      height: `${Math.max(1, rect.height - 65)}px`,
    });
    if (!renderer) return;
    const width = Math.max(1, rect.width),
      height = Math.max(1, rect.height - 65);
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.position.z = camera.aspect < 1 ? 7 : 6.3;
    camera.updateProjectionMatrix();
    render();
  }
  function pointer(event) {
    const rect = anchor.getBoundingClientRect();
    pointerX = Math.max(
      -1,
      Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1),
    );
    pointerY = Math.max(
      -1,
      Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1),
    );
  }
  function contextLost(event) {
    event.preventDefault();
    inView = false;
    syncLoop();
    ready.value = false;
  }
  function contextRestored() {
    measure();
    ready.value = true;
    inView = anchor.getBoundingClientRect().bottom > 0;
    syncLoop();
  }
  onMounted(async () => {
    anchor = document.querySelector(".art-space");
    if (!anchor) return;
    media = matchMedia("(prefers-reduced-motion: reduce)");
    resize = new ResizeObserver(measure);
    resize.observe(anchor);
    measure();
    document.fonts.ready.then(() => {
      if (!destroyed) measure();
    });
    // The vector composition is the complete low-data / reduced-motion version.
    if (navigator.connection?.saveData || media.matches) return;
    try {
      const THREE = await import("three");
      if (destroyed) return;
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, innerWidth < 700 ? 1.25 : 1.6),
      );
      renderer.setClearColor(0x000000, 0);
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(36, 1, 0.1, 30);
      camera.position.z = 6.3;
      group = new THREE.Group();
      group.rotation.x = -0.13;
      scene.add(group);
      geometry = new THREE.PlaneGeometry(1.9, 2.8, 32, 40);
      const positions = geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i),
          y = positions.getY(i);
        positions.setZ(
          i,
          Math.sin(x * 2.1 + y * 0.6) * 0.38 + Math.abs(x) * 0.23,
        );
      }
      geometry.computeVertexNormals();
      const vertexShader = `
        uniform float uFold;
        varying vec3 vNormal;
        varying vec2 vUv;
        void main(){
          vUv=uv;
          float flatten=1.0-uFold*0.6;
          vec3 p=position;
          p.z*=flatten;
          vNormal=normalize(normalMatrix*vec3(normal.xy,normal.z/flatten));
          gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
        }`;
      const fragmentShader = `
        uniform vec3 uColor;
        varying vec3 vNormal;
        varying vec2 vUv;
        void main(){
          vec3 n=normalize(vNormal)*(gl_FrontFacing?1.0:-1.0);
          float light=0.65+0.35*max(dot(n,normalize(vec3(-0.7,1.0,1.8))),0.0);
          float grain=fract(sin(dot(vUv*900.0,vec2(12.9898,78.233)))*43758.5453);
          vec3 color=uColor*light+(grain-0.5)*0.022;
          gl_FragColor=vec4(color,1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`;
      for (const color of ["#f4efe2", "#e8610a", "#d8d0be"]) {
        materials.push(
          new THREE.ShaderMaterial({
            uniforms: {
              uFold: { value: 0 },
              uColor: { value: new THREE.Color(color) },
            },
            vertexShader,
            fragmentShader,
            side: THREE.DoubleSide,
          }),
        );
      }
      for (let i = 0; i < 7; i++) {
        const mesh = new THREE.Mesh(
          geometry,
          materials[i === 2 ? 1 : i === 0 ? 2 : 0],
        );
        mesh.position.set((i - 3) * 0.15, (i - 3) * 0.045, (i - 3) * 0.11);
        mesh.rotation.set(0, (i - 3) * 0.09, (i - 3) * 0.14 - 0.23);
        sheets.push(mesh);
        group.add(mesh);
      }
      host.value.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-hidden", "true");
      renderer.domElement.addEventListener("webglcontextlost", contextLost);
      renderer.domElement.addEventListener(
        "webglcontextrestored",
        contextRestored,
      );
      measure();
      ready.value = true;
      gsap.registerPlugin(ScrollTrigger);
      trigger = ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          fold = media.matches ? 0 : self.progress;
        },
      });
      visibility = new IntersectionObserver((entries) => {
        inView = entries[0].isIntersecting;
        syncLoop();
      });
      visibility.observe(anchor);
      document.addEventListener("visibilitychange", syncLoop);
      window.addEventListener("pointermove", pointer, { passive: true });
      media.addEventListener("change", syncLoop);
    } catch (error) {
      ready.value = false;
      renderer?.dispose();
      renderer?.domElement.remove();
      renderer = undefined;
      console.warn("La composición estática reemplaza WebGL:", error.message);
    }
  });
  onBeforeUnmount(() => {
    destroyed = true;
    gsap.ticker.remove(tick);
    trigger?.kill();
    resize?.disconnect();
    visibility?.disconnect();
    document.removeEventListener("visibilitychange", syncLoop);
    window.removeEventListener("pointermove", pointer);
    media?.removeEventListener("change", syncLoop);
    renderer?.domElement.removeEventListener("webglcontextlost", contextLost);
    renderer?.domElement.removeEventListener(
      "webglcontextrestored",
      contextRestored,
    );
    geometry?.dispose();
    materials.forEach((material) => material.dispose());
    scene?.clear();
    renderer?.dispose();
    renderer?.forceContextLoss();
    renderer?.domElement.remove();
  });
  return {
    paused,
    toggle: () => {
      paused.value = !paused.value;
      syncLoop();
    },
  };
}
