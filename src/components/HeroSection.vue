<script setup>
// ─────────────────────────────────────────────────────────────
// HeroSection.vue — Layout de dos columnas: texto | foto
// La foto es un placeholder SVG. Para reemplazarla:
//   1. Poné tu imagen en /public/foto-perfil.jpg (o .webp)
//   2. Cambiá el <div class="hero__photo-placeholder"> por:
//      <img src="/foto-perfil.jpg" alt="Tomás Soto" class="hero__photo-img" />
// ─────────────────────────────────────────────────────────────

import { ref, onMounted } from 'vue'

const FULL_NAME = 'Tomás Soto.'
const displayName = ref('')
const showCursor = ref(true)
const nameRevealed = ref(false)
const subtitleVisible = ref(false)
const ctaVisible = ref(false)

const TYPING_SPEED = 90

onMounted(() => {
  setTimeout(() => {
    let i = 0
    const interval = setInterval(() => {
      displayName.value = FULL_NAME.slice(0, ++i)
      if (i === FULL_NAME.length) {
        clearInterval(interval)
        nameRevealed.value = true
        setTimeout(() => { showCursor.value = false }, 800)
        setTimeout(() => { subtitleVisible.value = true }, 500)
        setTimeout(() => { ctaVisible.value = true }, 900)
      }
    }, TYPING_SPEED)
  }, 600)
})
</script>

<template>
  <section
    id="hero"
    class="hero"
    data-section="hero"
    aria-label="Presentación de Tomás Soto"
  >
    <div class="container hero__inner">

      <!-- ── Columna izquierda: texto ── -->
      <div class="hero__content">

        <!-- Badge disponibilidad -->
        <div class="hero__badge" :class="{ 'is-visible': subtitleVisible }">
          <span class="hero__badge-dot" aria-hidden="true"></span>
          Disponible para proyectos
        </div>

        <!-- Nombre -->
        <h1 class="hero__name" aria-label="Tomás Soto">
          <span class="hero__name-text">{{ displayName }}</span>
          <span
            class="hero__cursor"
            :class="{ 'hero__cursor--blink': nameRevealed, 'hero__cursor--hidden': !showCursor }"
            aria-hidden="true"
          >|</span>
        </h1>

        <!-- Rol -->
        <p class="hero__role" :class="{ 'is-visible': subtitleVisible }">
          <span class="hero__role-highlight">Diseñador Gráfico</span>
          &amp;
          <span>Frontend Developer</span>
        </p>

        <!-- Descripción -->
        <p class="hero__description" :class="{ 'is-visible': subtitleVisible }">
          Construyo experiencias web que combinan diseño visual de calidad
          con código limpio y performante. Buenos Aires, Argentina.
        </p>

        <!-- CTAs -->
        <div class="hero__ctas" :class="{ 'is-visible': ctaVisible }">
          <a href="#portfolio" class="btn btn--primary">
            Ver proyectos
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a href="#contacto" class="btn btn--ghost">Contactar</a>
        </div>

      </div>

      <!-- ── Columna derecha: foto ── -->
      <div class="hero__photo-col" :class="{ 'is-visible': ctaVisible }" aria-hidden="true">
        <div class="hero__photo-frame">

          <!--
            PLACEHOLDER — Reemplazá este bloque por tu foto:
            <img src="/foto-perfil.jpg" alt="Tomás Soto" class="hero__photo-img" />
          -->
          <img src="/yo.jpg" alt="Tomás Soto" class="hero__photo-img" />
          

          <!-- Decoración: línea naranja lateral -->
          <div class="hero__photo-accent" aria-hidden="true"></div>
          <!-- Decoración: esquina -->
          <div class="hero__photo-corner" aria-hidden="true"></div>
        </div>
      </div>

    </div>

    <!-- Scroll indicator -->
    <div class="hero__scroll-hint" :class="{ 'is-visible': ctaVisible }" aria-hidden="true">
      <div class="hero__scroll-line"></div>
      <span>scroll</span>
    </div>

  </section>
</template>

<style scoped>
/* ── Hero layout ────────────────────────────────────────── */
.hero {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding-top: 80px;
  background-image: radial-gradient(
    ellipse 80% 60% at 50% -10%,
    rgba(232, 97, 10, 0.06) 0%,
    transparent 70%
  );
}

/* Grid de dos columnas: texto 55% | foto 45% */
.hero__inner {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: var(--space-16);
  align-items: center;
}

/* ── Columna texto ──────────────────────────────────────── */
.hero__content {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* Badge "disponible" */
.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-muted);
  font-weight: 400;
  margin-bottom: var(--space-6);
  opacity: 0;
  transform: translateY(8px);
  transition: opacity var(--duration-slow) var(--ease-out),
              transform var(--duration-slow) var(--ease-out);
}
.hero__badge.is-visible { opacity: 1; transform: translateY(0); }

.hero__badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.25);
  animation: pulse-green 2s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes pulse-green {
  0%, 100% { box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.25); }
  50%       { box-shadow: 0 0 0 5px rgba(74, 222, 128, 0.08); }
}

/* Nombre */
.hero__name {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: 400;
  line-height: 1.0;
  letter-spacing: -0.03em;
  color: var(--color-text);
  margin-bottom: var(--space-6);
  min-height: 1.1em;
}

.hero__cursor {
  display: inline-block;
  color: var(--color-accent);
  font-weight: 300;
  margin-left: 1px;
  transition: opacity var(--duration-fast);
}
.hero__cursor--blink { animation: blink 0.9s step-end infinite; }
.hero__cursor--hidden { opacity: 0; }
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

/* Rol */
.hero__role {
  font-family: var(--font-body);
  font-size: clamp(var(--text-lg), 2.5vw, var(--text-2xl));
  font-weight: 300;
  color: var(--color-muted);
  margin-bottom: var(--space-6);
  opacity: 0;
  transform: translateY(12px);
  transition: opacity var(--duration-slow) var(--ease-out) 100ms,
              transform var(--duration-slow) var(--ease-out) 100ms;
}
.hero__role.is-visible { opacity: 1; transform: translateY(0); }
.hero__role-highlight  { color: var(--color-accent); }

/* Descripción */
.hero__description {
  font-size: 15px;
  font-weight: 300;
  color: var(--color-muted);
  max-width: 480px;
  line-height: 1.7;
  margin-bottom: var(--space-10);
  padding-bottom: var(--space-4);
  opacity: 0;
  transform: translateY(12px);
  transition: opacity var(--duration-slow) var(--ease-out) 200ms,
              transform var(--duration-slow) var(--ease-out) 200ms;
}
.hero__description.is-visible { opacity: 1; transform: translateY(0); }

/* CTAs */
.hero__ctas {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity var(--duration-slow) var(--ease-out) 300ms,
              transform var(--duration-slow) var(--ease-out) 300ms;
}
.hero__ctas.is-visible { opacity: 1; transform: translateY(0); }

.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
  text-decoration: none;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--duration-base) var(--ease-out);
  letter-spacing: 0.01em;
}
.btn--primary {
  background: var(--color-accent);
  color: #fff;
  border: 1px solid var(--color-accent);
}
.btn--primary:hover {
  background: #d4560a;
  border-color: #d4560a;
  transform: translateY(-1px);
}
.btn--primary svg { transition: transform var(--duration-fast) var(--ease-spring); }
.btn--primary:hover svg { transform: translateX(3px); }
.btn--ghost {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
.btn--ghost:hover {
  border-color: var(--color-muted);
  transform: translateY(-1px);
}

/* ── Columna foto ───────────────────────────────────────── */
.hero__photo-col {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: translateX(20px);
  transition: opacity var(--duration-reveal) var(--ease-out) 400ms,
              transform var(--duration-reveal) var(--ease-out) 400ms;
}
.hero__photo-col.is-visible { opacity: 1; transform: translateX(0); }

/* Marco de la foto */
.hero__photo-frame {
  position: relative;
  width: 100%;
  max-width: 380px;
  aspect-ratio: 3 / 4;   /* proporción retrato */
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
}

/* Imagen real (cuando la reemplaces) */
.hero__photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top; /* enfoca la cara */
  display: block;
}

/* ── Placeholder ────────────────────────────────────────── */
.hero__photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  background: var(--color-surface);
  /* Patrón de puntos sutil */
  background-image: radial-gradient(circle, var(--color-border) 1px, transparent 1px);
  background-size: 24px 24px;
}

.hero__photo-svg {
  width: 120px;
  height: 120px;
  opacity: 0.6;
}

.hero__photo-hint {
  font-size: var(--text-xs);
  color: var(--color-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.5;
}

/* Línea naranja lateral izquierda */
.hero__photo-accent {
  position: absolute;
  left: 0;
  top: 15%;
  bottom: 15%;
  width: 2px;
  background: var(--color-accent);
  border-radius: 1px;
}

/* Esquina decorativa inferior derecha */
.hero__photo-corner {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 28px;
  height: 28px;
  border-right: 1px solid var(--color-accent);
  border-bottom: 1px solid var(--color-accent);
  opacity: 0.5;
}

/* ── Scroll hint ─────────────────────────────────────────── */
.hero__scroll-hint {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  opacity: 0;
  transition: opacity var(--duration-slow) var(--ease-out) 600ms;
}
.hero__scroll-hint.is-visible { opacity: 0.3; }
.hero__scroll-hint span {
  font-size: var(--text-xs);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-muted);
}
.hero__scroll-line {
  width: 1px;
  height: 40px;
  background: var(--color-muted);
  animation: scroll-line 1.8s ease-in-out infinite;
}
@keyframes scroll-line {
  0%   { transform: scaleY(0); transform-origin: top; }
  50%  { transform: scaleY(1); transform-origin: top; }
  51%  { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

/* ── Responsive ─────────────────────────────────────────── */

/* Tablet: foto más pequeña */
@media (max-width: 1024px) {
  .hero__inner {
    grid-template-columns: 1fr 320px;
    gap: var(--space-10);
  }
}

/* Mobile: stack vertical, foto arriba del texto */
@media (max-width: 768px) {
  .hero__inner {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    gap: var(--space-10);
    padding-top: var(--space-6);
  }

  /* La foto va arriba en mobile */
  .hero__photo-col {
    order: -1;
    transform: translateX(0);
    opacity: 0;
    /* En mobile: fade desde arriba */
    transform: translateY(-12px);
    transition: opacity var(--duration-reveal) var(--ease-out) 200ms,
                transform var(--duration-reveal) var(--ease-out) 200ms;
  }
  .hero__photo-col.is-visible { opacity: 1; transform: translateY(0); }

  .hero__photo-frame {
    max-width: 220px;
    aspect-ratio: 1 / 1;  /* cuadrada en mobile */
    border-radius: 50%;   /* circular en mobile — más dinámico */
    border-width: 2px;
  }

  /* Ocultar decoraciones en el círculo */
  .hero__photo-accent,
  .hero__photo-corner { display: none; }
}

@media (max-width: 480px) {
  .hero__ctas { flex-direction: column; }
  .btn { justify-content: center; }
  .hero__photo-frame { max-width: 160px; }
}
</style>