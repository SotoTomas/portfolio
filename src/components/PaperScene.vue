<script setup>
import { ref } from "vue";
import { usePaperScene } from "../composables/usePaperScene";
const host = ref(null);
const ready = ref(false);
const { paused, toggle } = usePaperScene(host, ready);
</script>
<template>
  <div ref="host" class="paper-scene" :class="{ 'is-ready': ready }">
    <svg
      class="paper-fallback"
      viewBox="0 0 600 580"
      fill="none"
      aria-hidden="true"
    >
      <path d="m90 355 140-240 235 47-90 310Z" fill="#d6d0c2" />
      <path d="m130 372 122-260 218 82-90 285Z" fill="#e8610a" />
      <path d="m145 329 170-225 156 170-161 207Z" fill="#e5dfd1" />
      <path d="m145 329 170-225-5 377Z" fill="#faf7ee" />
      <path d="m185 267 190-150 88 225-214 102Z" fill="#ded8ca" />
      <path d="m185 267 190-150-126 327Z" fill="#fffaf0" />
    </svg>
    <button
      v-if="ready"
      class="motion-toggle"
      @click="toggle"
      :aria-pressed="paused"
    >
      {{ paused ? "Reanudar movimiento" : "Pausar movimiento" }}
    </button>
  </div>
</template>
<style scoped>
.paper-scene {
  position: absolute;
  top: 215px;
  right: 5.3%;
  width: 43%;
  height: 490px;
  z-index: 1;
  pointer-events: none;
}
.paper-fallback {
  width: 100%;
  height: 100%;
  transition: opacity 0.5s;
}
.is-ready .paper-fallback {
  opacity: 0;
}
.paper-scene :deep(canvas) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.6s;
}
.is-ready :deep(canvas) {
  opacity: 1;
}
@media (max-width: 600px) {
  .paper-scene {
    top: 650px;
    right: 8%;
    width: 84%;
    height: 320px;
  }
}

.motion-toggle {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 3;
  pointer-events: auto;
  background: var(--color-bg);
  padding: 8px;
  font-size: 9px;
  color: var(--color-muted);
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
