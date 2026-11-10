import { onMounted, onBeforeUnmount } from "vue";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// One scroll owner for the lifetime of App. No per-frame Vue state.
export function useLenis() {
  let lenis, media;
  const tick = (time) => lenis?.raf(time * 1000);
  function configure() {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = undefined;
    if (media.matches) return;
    lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -90 },
      prevent: () => Boolean(document.querySelector("dialog[open]")),
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
  }
  onMounted(() => {
    gsap.registerPlugin(ScrollTrigger);
    media = matchMedia("(prefers-reduced-motion: reduce)");
    configure();
    media.addEventListener("change", configure);
  });
  onBeforeUnmount(() => {
    media?.removeEventListener("change", configure);
    gsap.ticker.remove(tick);
    lenis?.destroy();
  });
}
