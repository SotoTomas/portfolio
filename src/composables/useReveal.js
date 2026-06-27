// composables/useReveal.js
// ─────────────────────────────────────────────────────────────
// Composable que observa elementos del DOM y les agrega la clase
// 'is-visible' cuando entran al viewport.
// Cada elemento puede tener delay personalizado via data-delay.
// ─────────────────────────────────────────────────────────────

import { onMounted, onBeforeUnmount } from 'vue'

export function useReveal(selector = '[data-reveal]') {
  let observer = null

  onMounted(() => {
    // Preferencia de movimiento reducido: no animar
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      document.querySelectorAll(selector).forEach(el => el.classList.add('is-visible'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0
            setTimeout(() => {
              entry.target.classList.add('is-visible')
            }, Number(delay))
            // Una vez visible, dejar de observar
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,       // 10% visible para disparar
        rootMargin: '0px 0px -60px 0px' // offset inferior para elegancia
      }
    )

    document.querySelectorAll(selector).forEach(el => observer.observe(el))
  })

  onBeforeUnmount(() => {
    if (observer) observer.disconnect()
  })
}
