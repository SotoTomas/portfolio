<script setup>
// ─────────────────────────────────────────────────────────────
// CursorFollower.vue — Cursor personalizado con lerp
// Solo visible en dispositivos con mouse (pointer: fine)
// ─────────────────────────────────────────────────────────────
import { useCursor } from '../composables/useCursor.js'

const { cursorX, cursorY, isHovering, isVisible } = useCursor()
</script>

<template>
  <!-- aria-hidden: el cursor es puramente decorativo -->
  <div
    class="cursor"
    :class="{
      'cursor--visible':  isVisible,
      'cursor--hovering': isHovering,
    }"
    :style="{
      transform: `translate(${cursorX}px, ${cursorY}px)`
    }"
    aria-hidden="true"
  ></div>
</template>

<style scoped>
.cursor {
  position: fixed;
  top: -6px;
  left: -6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-accent);
  pointer-events: none;
  z-index: 9999;
  opacity: 0;
  mix-blend-mode: difference;
  transition:
    opacity    var(--duration-base) var(--ease-out),
    width      var(--duration-base) var(--ease-spring),
    height     var(--duration-base) var(--ease-spring),
    top        var(--duration-base) var(--ease-spring),
    left       var(--duration-base) var(--ease-spring),
    background var(--duration-base) var(--ease-out);
  will-change: transform;
}

.cursor--visible  { opacity: 1; }

/* Expansión al pasar sobre clickables */
.cursor--hovering {
  width: 36px;
  height: 36px;
  top: -18px;
  left: -18px;
  background: rgba(232, 97, 10, 0.35);
  mix-blend-mode: normal;
}

/* Ocultar en touch/tablet */
@media (pointer: coarse) {
  .cursor { display: none; }
}
</style>
