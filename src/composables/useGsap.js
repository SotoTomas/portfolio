import { onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useGsap(scope) {
  let context,
    media,
    disposed = false;
  onMounted(() => {
    gsap.registerPlugin(ScrollTrigger);
    context = gsap.context(() => {
      media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-intro]", {
          y: 26,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        });
        gsap.utils.toArray("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 34,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          });
        });
      });
    }, scope.value);
    document.fonts.ready.then(() => {
      if (!disposed) ScrollTrigger.refresh();
    });
  });
  onBeforeUnmount(() => {
    disposed = true;
    media?.revert();
    context?.revert();
  });
}
