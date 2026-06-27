<script setup>
// ─────────────────────────────────────────────────────────────
// NavBar.vue — Navegación fija con indicador de sección activa
// y efecto de blur al scrollear hacia abajo
// ─────────────────────────────────────────────────────────────

import { ref, onMounted, onBeforeUnmount } from 'vue'

const isScrolled = ref(false)
const activeSection = ref('hero')

// Links de navegación
const navLinks = [
  { id: 'sobre-mi',  label: 'Sobre mí'  },
  { id: 'portfolio', label: 'Portfolio'  },
  { id: 'educacion', label: 'Educación'  },
  { id: 'skills',    label: 'Skills'     },
  { id: 'contacto',  label: 'Contacto'   },
]

// Detectar scroll para el efecto de fondo
function onScroll() {
  isScrolled.value = window.scrollY > 40

  // Detectar sección activa con IntersectionObserver sería más eficiente,
  // pero para simplicidad usamos getBoundingClientRect
  const sections = document.querySelectorAll('[data-section]')
  sections.forEach(section => {
    const rect = section.getBoundingClientRect()
    if (rect.top <= 120 && rect.bottom >= 120) {
      activeSection.value = section.dataset.section
    }
  })
}

// Navegación suave al hacer clic
function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <!-- aria-label en el nav para accesibilidad WCAG -->
  <header class="navbar" :class="{ 'navbar--scrolled': isScrolled }" role="banner">
    <div class="container navbar__inner">

      <!-- Logo / marca -->
      <button
        class="navbar__logo"
        @click="scrollTo('hero')"
        aria-label="Ir al inicio"
      >
        TS<span class="navbar__logo-dot">.</span>
      </button>

      <!-- Links principales -->
      <nav class="navbar__nav" aria-label="Navegación principal">
        <button
          v-for="link in navLinks"
          :key="link.id"
          class="navbar__link"
          :class="{ 'navbar__link--active': activeSection === link.id }"
          @click="scrollTo(link.id)"
          :aria-current="activeSection === link.id ? 'true' : undefined"
        >
          {{ link.label }}
        </button>
      </nav>

      <!-- CTA -->
      <a
        href="mailto:sototomas.nf@gmail.com"
        class="navbar__cta"
        aria-label="Contactar a Tomás por email"
      >
        Contactar
      </a>

    </div>
  </header>
</template>

<style scoped>
/* ── NavBar ─────────────────────────────────────────────── */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding-block: var(--space-4);
  transition: background var(--duration-base) var(--ease-out),
              border-color var(--duration-base) var(--ease-out);
  border-bottom: 1px solid transparent;
}

/* Fondo con blur al scrollear */
.navbar--scrolled {
  background: rgba(22, 22, 22, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom-color: var(--color-border);
}

.navbar__inner {
  display: flex;
  align-items: center;
  gap: var(--space-8);
}

/* Logo */
.navbar__logo {
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-display);
  font-size: var(--text-xl);
  color: var(--color-text);
  letter-spacing: -0.02em;
  transition: opacity var(--duration-fast) var(--ease-out);
  padding: 0;
  flex-shrink: 0;
}
.navbar__logo:hover { opacity: 0.7; }
.navbar__logo-dot { color: var(--color-accent); }

/* Links */
.navbar__nav {
  display: flex;
  gap: var(--space-6);
  margin-left: auto;       /* empuja el nav a la derecha */
}

.navbar__link {
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 400;
  color: var(--color-muted);
  padding: var(--space-1) 0;
  position: relative;
  transition: color var(--duration-fast) var(--ease-out);
  letter-spacing: 0.01em;
}

/* Línea activa debajo del link */
.navbar__link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--duration-base) var(--ease-out);
}

.navbar__link:hover,
.navbar__link--active {
  color: var(--color-text);
}
.navbar__link--active::after,
.navbar__link:hover::after {
  transform: scaleX(1);
}

/* CTA button */
.navbar__cta {
  background: none;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 400;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-sm);
  text-decoration: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: border-color var(--duration-fast) var(--ease-out),
              background var(--duration-fast) var(--ease-out),
              color var(--duration-fast) var(--ease-out);
}
.navbar__cta:hover {
  border-color: var(--color-accent);
  background: var(--color-accent-dim);
  color: var(--color-accent);
}

/* ── Responsive ─────────────────────────────────────────── */
@media (max-width: 768px) {
  .navbar__nav { display: none; }   /* Ocultamos links en móvil (se navega por scroll) */
}
@media (max-width: 480px) {
  .navbar__cta { display: none; }
}
</style>
