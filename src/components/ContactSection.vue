<script setup>
import SocialIcon from "./SocialIcon.vue";
const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tomas-agustin-soto-11721b284/",
  },
  { label: "GitHub", href: "https://github.com/SotoTomas" },
  { label: "Behance", href: "https://www.behance.net/sototomas" },
  { label: "WhatsApp", href: "https://wa.me/541125226514" },
];
</script>
<template>
  <section
    id="contacto"
    class="section contact theme-ink"
    aria-labelledby="contact-title"
  >
    <div class="container">
      <div class="section-topline">
        <span class="eyebrow">03 / La próxima idea</span
        ><span class="eyebrow muted">Empieza con una conversación</span>
      </div>
      <div class="contact-main" data-reveal>
        <h2 id="contact-title">¿Le damos<br /><em>forma?</em></h2>
        <a
          href="mailto:sototomas.nf@gmail.com"
          class="contact-arrow"
          aria-label="Escribir un email a Tomás Soto"
          >↗</a
        >
      </div>
      <div class="contact-bottom" data-reveal>
        <div>
          <p>
            Proyectos, colaboraciones o una buena idea.<br />Me gustaría
            escucharte.
          </p>
          <a class="contact-email" href="mailto:sototomas.nf@gmail.com"
            >sototomas.nf@gmail.com</a
          >
        </div>
        <nav aria-label="Contacto y redes">
          <a
            v-for="link in links"
            :key="link.label"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            ><span class="social-label"
              ><SocialIcon :name="link.label" />{{ link.label }}</span
            >
            <span aria-hidden="true">↗</span></a
          >
        </nav>
      </div>
    </div>
  </section>
</template>
<style scoped>
.contact {
  padding-bottom: 90px;
}
.contact-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 80px;
}
.contact h2 {
  font-family: var(--font-display);
  font-size: var(--text-contact);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.035em;
}
.contact h2 em {
  font-weight: inherit;
  font-style: normal;
  color: var(--color-accent);
}
.contact-arrow {
  font-size: clamp(64px, 7vw, 104px);
  font-weight: 400;
  line-height: 1;
  transition: transform 0.5s var(--ease);
  padding-right: 30px;
}
.contact-arrow:hover {
  transform: translate(10px, -10px);
  color: var(--color-accent);
}
.contact-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 35px;
}
.contact-bottom p {
  font-size: 16px;
  line-height: 1.5;
  color: var(--color-muted);
}
.contact-email {
  display: inline-block;
  margin-top: 20px;
  font-size: clamp(16px, 1.5vw, 20px);
  border-bottom: 1px solid var(--color-text);
  padding-bottom: 8px;
}
.contact-bottom nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 45px;
}
.contact-bottom nav a {
  font-size: 14px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}
.social-label {
  display: inline-flex;
  align-items: center;
  gap: 9px;
}
.social-label svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
.contact-bottom nav a:hover {
  color: var(--color-accent);
}
@media (max-width: 600px) {
  .contact-bottom {
    display: block;
  }
  .contact-bottom nav {
    margin-top: 40px;
    max-width: 330px;
  }
  .contact-arrow {
    padding: 0;
    font-size: 64px;
  }
  .contact h2 {
    line-height: 1.15;
  }
  .contact-main {
    gap: 10px;
  }
}

@media (max-width: 380px) {
  .contact-arrow {
    font-size: 48px;
  }
}
</style>
