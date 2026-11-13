<script setup>
const year = new Date().getFullYear();
</script>
<template>
  <footer class="footer theme-ink">
    <div class="container footer-inner">
      <a href="#hero" class="footer-brand">Tomás Soto.</a>
      <p>© {{ year }} · Diseño y código desde Buenos Aires.</p>
      <a href="#hero" class="back-top">Volver al inicio ↑</a>
    </div>
  </footer>
</template>
<style scoped>
.footer-inner {
  padding-block: 24px;
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.footer-brand {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.04em;
}
.footer p,
.back-top {
  font-size: 12px;
  color: var(--color-muted);
}
@media (max-width: 600px) {
  .footer-inner {
    flex-wrap: wrap;
  }
  .footer p {
    order: 3;
    width: 100%;
  }
}
</style>
