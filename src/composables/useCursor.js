// composables/useCursor.js
// ─────────────────────────────────────────────────────────────
// Cursor personalizado: un punto pequeño que sigue al mouse
// con un lag suave (lerp). Se expande sobre elementos clicables.
// ─────────────────────────────────────────────────────────────

import { onMounted, onBeforeUnmount, ref } from 'vue'

export function useCursor() {
  const cursorX = ref(-100)
  const cursorY = ref(-100)
  const isHovering = ref(false)
  const isVisible = ref(false)

  let animFrame = null
  let targetX = -100
  let targetY = -100
  let currentX = -100
  let currentY = -100

  const LERP = 0.12 // velocidad de seguimiento (0–1)

  function onMouseMove(e) {
    targetX = e.clientX
    targetY = e.clientY
    if (!isVisible.value) isVisible.value = true
  }

  function onMouseEnterClickable() { isHovering.value = true  }
  function onMouseLeaveClickable() { isHovering.value = false }

  function loop() {
    // Interpolación suave
    currentX += (targetX - currentX) * LERP
    currentY += (targetY - currentY) * LERP
    cursorX.value = Math.round(currentX * 100) / 100
    cursorY.value = Math.round(currentY * 100) / 100
    animFrame = requestAnimationFrame(loop)
  }

  onMounted(() => {
    // Solo en dispositivos con mouse
    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('mousemove', onMouseMove)

      // Observar elementos clicables con delegación
      document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, [data-cursor-hover]')) {
          onMouseEnterClickable()
        }
      })
      document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a, button, [data-cursor-hover]')) {
          onMouseLeaveClickable()
        }
      })

      loop()
    }
  })

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', onMouseMove)
    if (animFrame) cancelAnimationFrame(animFrame)
  })

  return { cursorX, cursorY, isHovering, isVisible }
}
