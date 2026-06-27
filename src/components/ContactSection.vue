<script setup>
// ─────────────────────────────────────────────────────────────
// ContactSection.vue — Sección de contacto
// Links rápidos a redes + formulario de contacto básico
// ─────────────────────────────────────────────────────────────

import { ref } from 'vue'

// Links de contacto rápido
const contactLinks = [
  {
    id: 'email',
    label: 'Email',
    value: 'sototomas.nf@gmail.com',
    href: 'mailto:sototomas.nf@gmail.com',
    external: false,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: '/in/tomas-agustin-soto',
    href: 'https://www.linkedin.com/in/tomas-agustin-soto-11721b284/',
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/SotoTomas',
    href: 'https://github.com/SotoTomas',
    external: true,
  },
  {
    id: 'behance',
    label: 'Behance',
    value: 'behance.net/sototomas',
    href: 'https://www.behance.net/sototomas',
    external: true,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '+54 11 2522-6514',
    href: 'https://wa.me/541125226514',
    external: true,
  },
]

// Estado del formulario
const form = ref({ name: '', email: '', message: '' })
const sent = ref(false)
const sending = ref(false)

// Envío del formulario via mailto (sin backend)
function handleSubmit() {
  if (!form.value.name || !form.value.email || !form.value.message) return
  sending.value = true

  const subject = encodeURIComponent(`Portfolio — Contacto de ${form.value.name}`)
  const body = encodeURIComponent(
    `Nombre: ${form.value.name}\nEmail: ${form.value.email}\n\n${form.value.message}`
  )
  window.location.href = `mailto:sototomas.nf@gmail.com?subject=${subject}&body=${body}`

  setTimeout(() => {
    sent.value = true
    sending.value = false
    form.value = { name: '', email: '', message: '' }
  }, 600)
}
</script>

<template>
  <section
    id="contacto"
    class="section contact"
    data-section="contacto"
    aria-labelledby="contact-title"
  >
    <div class="container contact__inner">

      <!-- Columna izquierda: CTA + links -->
      <div class="contact__left">
        <span class="section-label" data-reveal>Contacto</span>
        <span class="divider" data-reveal data-delay="50" aria-hidden="true"></span>
        <h2 id="contact-title" class="section-title" data-reveal data-delay="100">
          ¿Trabajamos juntos?
        </h2>
        <p class="contact__description" data-reveal data-delay="150">
          Estoy disponible para proyectos freelance, colaboraciones y oportunidades
          laborales. No dudes en escribirme.
        </p>

        <!-- Links rápidos -->
        <nav class="contact__links" aria-label="Redes sociales y contacto" data-reveal data-delay="200">
          <a
            v-for="link in contactLinks"
            :key="link.id"
            :href="link.href"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener noreferrer' : undefined"
            class="contact__link"
            :aria-label="`Contactar por ${link.label}`"
          >
            <div class="contact__link-left">
              <span class="contact__link-label">{{ link.label }}</span>
              <span class="contact__link-value">{{ link.value }}</span>
            </div>
            <!-- Flecha -->
            <svg class="contact__link-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </nav>
      </div>

      <!-- Columna derecha: Formulario -->
      <div class="contact__right" data-reveal data-delay="100">
        <div class="contact__form-wrapper">

          <!-- Estado de éxito -->
          <div v-if="sent" class="contact__success" role="alert">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="var(--color-accent)" stroke-width="1.5"/>
              <path d="M8 12l3 3 5-5" stroke="var(--color-accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>¡Mensaje enviado! Te respondo pronto.</p>
            <button class="contact__success-reset" @click="sent = false">Enviar otro</button>
          </div>

          <!-- Formulario -->
          <form v-else class="contact__form" @submit.prevent="handleSubmit" novalidate>
            <h3 class="contact__form-title">Enviame un mensaje</h3>

            <div class="form-field">
              <label for="contact-name" class="form-label">Nombre</label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                class="form-input"
                placeholder="Tu nombre"
                required
                autocomplete="name"
              />
            </div>

            <div class="form-field">
              <label for="contact-email" class="form-label">Email</label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                class="form-input"
                placeholder="tu@email.com"
                required
                autocomplete="email"
              />
            </div>

            <div class="form-field">
              <label for="contact-message" class="form-label">Mensaje</label>
              <textarea
                id="contact-message"
                v-model="form.message"
                class="form-input form-textarea"
                placeholder="Contame sobre tu proyecto..."
                rows="5"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              class="contact__submit"
              :disabled="sending || !form.name || !form.email || !form.message"
            >
              <span v-if="!sending">Enviar mensaje</span>
              <span v-else>Enviando…</span>
              <svg v-if="!sending" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </form>

        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ── Contact ────────────────────────────────────────────── */
.contact__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: start;
}

.contact__description {
  font-size: var(--text-base);
  color: var(--color-muted);
  font-weight: 300;
  line-height: 1.7;
  margin-bottom: var(--space-10);
  max-width: 400px;
}

/* ── Links rápidos ──────────────────────────────────────── */
.contact__links {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.contact__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--color-border);
  text-decoration: none;
  transition: background var(--duration-fast) var(--ease-out);
  gap: var(--space-4);
}
.contact__link:last-child { border-bottom: none; }
.contact__link:hover { background: var(--color-surface); }
.contact__link:hover .contact__link-arrow {
  color: var(--color-accent);
  transform: translateX(4px);
}

.contact__link-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.contact__link-label {
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
}
.contact__link-value {
  font-size: var(--text-sm);
  color: var(--color-muted);
  font-weight: 300;
}

.contact__link-arrow {
  color: var(--color-border);
  flex-shrink: 0;
  transition: color var(--duration-fast) var(--ease-out),
              transform var(--duration-fast) var(--ease-spring);
}

/* ── Formulario ─────────────────────────────────────────── */
.contact__form-wrapper {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-8);
}

.contact__form-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 400;
  color: var(--color-text);
  margin-bottom: var(--space-8);
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.form-field { display: flex; flex-direction: column; gap: var(--space-2); }

.form-label {
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.form-input {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 300;
  padding: var(--space-3) var(--space-4);
  width: 100%;
  transition: border-color var(--duration-fast) var(--ease-out);
  outline: none;
}
.form-input::placeholder { color: var(--color-border); }
.form-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-dim);
}
.form-textarea { resize: vertical; min-height: 120px; }

.contact__submit {
  background: var(--color-accent);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
  padding: var(--space-3) var(--space-6);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  transition: background var(--duration-fast) var(--ease-out),
              transform var(--duration-fast) var(--ease-out),
              opacity var(--duration-fast);
  align-self: flex-start;
}
.contact__submit:hover:not(:disabled) {
  background: #d4560a;
  transform: translateY(-1px);
}
.contact__submit:disabled { opacity: 0.4; cursor: not-allowed; }

/* ── Éxito ──────────────────────────────────────────────── */
.contact__success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  padding: var(--space-16) var(--space-8);
  text-align: center;
}
.contact__success p {
  font-size: var(--text-base);
  color: var(--color-muted);
}
.contact__success-reset {
  background: none;
  border: 1px solid var(--color-border);
  color: var(--color-muted);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: border-color var(--duration-fast), color var(--duration-fast);
}
.contact__success-reset:hover { border-color: var(--color-text); color: var(--color-text); }

/* ── Reveal ─────────────────────────────────────────────── */
[data-reveal] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--duration-reveal) var(--ease-out),
              transform var(--duration-reveal) var(--ease-out);
}
[data-reveal].is-visible { opacity: 1; transform: translateY(0); }

/* ── Responsive ─────────────────────────────────────────── */
@media (max-width: 900px) {
  .contact__inner { grid-template-columns: 1fr; gap: var(--space-12); }
}
</style>
