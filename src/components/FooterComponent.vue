<script setup>
// ─────────────────────────────────────────────────────────────
// FooterComponent.vue — Footer minimalista
// ─────────────────────────────────────────────────────────────
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer" role="contentinfo">
    <div class="container footer__inner">
      <span class="footer__brand">
        Tomás Soto<span class="footer__dot">.</span>
      </span>
      <p class="footer__copy">
        © {{ year }} — Diseñado y desarrollado en Buenos Aires, Argentina.
      </p>
      <p class="footer__made">
        Hecho con Vue.js &amp; CSS puro.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  padding-block: var(--space-8);
}
.footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}
.footer__brand {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  color: var(--color-text);
}
.footer__dot { color: var(--color-accent); }

.footer__copy,
.footer__made {
  font-size: var(--text-xs);
  color: var(--color-muted);
  font-weight: 300;
}

@media (max-width: 600px) {
  .footer__inner { flex-direction: column; align-items: flex-start; gap: var(--space-2); }
}
</style>
