<script setup>
// ─────────────────────────────────────────────────────────────
// PortfolioSection.vue — Grilla de proyectos con preview GIF
//
// Cada proyecto puede tener:
//   gif:    ruta al archivo GIF en /public/gifs/nombre.gif
//           Si no tiene GIF, muestra un placeholder con gradiente.
//   github: URL al repositorio
//   live:   URL al deploy (Vercel, Netlify, etc.)
//
// El GIF se monta en el DOM desde el inicio pero permanece
// invisible (opacity: 0). Al hacer hover sobre la card,
// hace fade-in. Esto evita el delay de carga la primera vez.
// ─────────────────────────────────────────────────────────────

import { ref } from 'vue'

const projects = [
  {
    id: 1,
    number: '01',
    title: 'TVLaravel — E-Commerce Full Stack',
    description:
      'Tienda virtual completa con panel administrativo, CRUD de productos, ' +
      'carrito de compras e integración de APIs de pago. Arquitectura MVC con ' +
      'autenticación, roles de usuario y dashboard de gestión.',
    stack: ['Laravel', 'Vue.js', 'TailwindCSS', 'Inertia.js', 'MySQL'],
    status: 'En curso',
    gif: null,                                        // → Reemplazá con '/gifs/tvlaravel.gif'
    github: 'https://github.com/SotoTomas/TVLaravel',
    live: null,                                       // → Reemplazá con tu URL de deploy
  },
  {
    id: 2,
    number: '02',
    title: 'Mapa 3D Interactivo — Three.js',
    description:
      'Visualización de un mapa 3D interactivo con Three.js, ' +
      'donde el usuario puede rotar, hacer zoom y explorar ' +
      'puntos de interés con información emergente. '+
      'Hecho para ayudarme a estudiar para una evaluación de Historia del Arte.',
    stack: ['Vue.js', 'HTML5', 'TailwindCSS', 'CSS3'],
    status: 'En proceso de desarrollo',
    gif: null,                                        // → Reemplazá con '/gifs/mapa-3d.gif'
    github: 'https://github.com/SotoTomas/art-history-map',
    live: 'https://sototomas.github.io/art-history-map/',
  },
]

// Rastrear qué card está en hover para el GIF
const hoveredId = ref(null)
</script>

<template>
  <section
    id="portfolio"
    class="section portfolio"
    data-section="portfolio"
    aria-labelledby="portfolio-title"
  >
    <div class="container">

      <!-- Header -->
      <div class="portfolio__header">
        <div>
          <span class="section-label" data-reveal>Portfolio</span>
          <span class="divider" data-reveal data-delay="50" aria-hidden="true"></span>
          <h2 id="portfolio-title" class="section-title" data-reveal data-delay="100">
            Proyectos seleccionados.
          </h2>
        </div>
        <p class="portfolio__subtitle" data-reveal data-delay="150">
          Trabajo en proyectos que resuelven problemas reales con diseño limpio
          y código de calidad.
        </p>
      </div>

      <!-- Grilla -->
      <div class="portfolio__grid" role="list">
        <article
          v-for="(project, i) in projects"
          :key="project.id"
          class="project-card"
          data-reveal
          :data-delay="i * 100"
          role="listitem"
          @mouseenter="hoveredId = project.id"
          @mouseleave="hoveredId = null"
        >

          <!-- ── Preview GIF ── -->
          <!--
            El bloque de preview ocupa la parte superior de la card.
            Si el proyecto tiene un GIF asignado, se muestra la imagen.
            Si no, se muestra un placeholder con patrón y las iniciales del proyecto.
            En ambos casos el contenido aparece con fade al hacer hover.
          -->
          <div
            class="project-card__preview"
            :class="{ 'project-card__preview--hovered': hoveredId === project.id }"
            aria-hidden="true"
          >
            <!-- GIF real (cuando lo tenés) -->
            <img
              v-if="project.gif"
              :src="project.gif"
              :alt="`Preview animado de ${project.title}`"
              class="project-card__gif"
              loading="lazy"
              decoding="async"
            />

            <!-- Placeholder sin GIF -->
            <div v-else class="project-card__gif-placeholder">
              <span class="project-card__gif-number">{{ project.number }}</span>
              <span class="project-card__gif-label">Preview</span>
            </div>

            <!-- Overlay con título que aparece en hover -->
            <div class="project-card__preview-overlay">
              <span class="project-card__preview-title">{{ project.title }}</span>
            </div>
          </div>

          <!-- ── Cuerpo de la card ── -->
          <div class="project-card__body">

            <!-- Número + estado -->
            <div class="project-card__top">
              <span class="project-card__number-label" aria-hidden="true">{{ project.number }}</span>
              <span
                class="project-card__status"
                :class="project.status === 'En curso' ? 'project-card__status--active' : ''"
              >
                {{ project.status }}
              </span>
            </div>

            <h3 class="project-card__title">{{ project.title }}</h3>
            <p class="project-card__description">{{ project.description }}</p>

            <!-- Stack -->
            <div class="project-card__stack" aria-label="Tecnologías utilizadas">
              <span v-for="tech in project.stack" :key="tech" class="project-card__tech">
                {{ tech }}
              </span>
            </div>

          </div>

          <!-- ── Links ── -->
          <div class="project-card__links">

            <!-- GitHub -->
            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="project-card__link"
              :aria-label="`Ver código de ${project.title} en GitHub`"
            >
              <!-- Ícono GitHub -->
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>

            <!-- Deploy / Live -->
            <a
              v-if="project.live"
              :href="project.live"
              target="_blank"
              rel="noopener noreferrer"
              class="project-card__link project-card__link--live"
              :aria-label="`Ver deploy de ${project.title}`"
            >
              <!-- Ícono external link -->
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Ver deploy
            </a>

            <!-- Spacer: si no hay ningún link, mostrar un mensaje -->
            <span
              v-if="!project.github && !project.live"
              class="project-card__no-links"
            >
              Próximamente
            </span>

          </div>

          <!-- Línea naranja superior en hover -->
          <div class="project-card__accent" aria-hidden="true"></div>

        </article>
      </div>

      <!-- Nota de uso (solo visible en desarrollo, podés borrarla)
      <p class="portfolio__gif-note" data-reveal data-delay="200">
        Los GIFs se agregan en <code>/public/gifs/</code> y se referencian en el array
        <code>projects</code> dentro de este componente.
      </p> -->

    </div>
  </section>
</template>

<style scoped>
/* ── Portfolio header ───────────────────────────────────── */
.portfolio__header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  align-items: end;
  margin-bottom: var(--space-16);
}

.portfolio__subtitle {
  font-size: var(--text-base);
  color: var(--color-muted);
  font-weight: 300;
  line-height: 1.7;
  padding-bottom: var(--space-2);
}

/* Nota de uso */
.portfolio__gif-note {
  margin-top: var(--space-8);
  font-size: var(--text-xs);
  color: var(--color-muted);
  opacity: 0.5;
  line-height: 1.6;
}
.portfolio__gif-note code {
  font-family: monospace;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 0.9em;
}

/* ── Grid ───────────────────────────────────────────────── */
.portfolio__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

/* ── Project Card ───────────────────────────────────────── */
.project-card {
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition:
    border-color var(--duration-base) var(--ease-out),
    transform    var(--duration-base) var(--ease-out),
    background   var(--duration-base) var(--ease-out);
}

.project-card:hover {
  border-color: rgba(232, 97, 10, 0.35);
  transform: translateY(-4px);
  background: #202020;
}

/* Línea naranja superior */
.project-card__accent {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--duration-base) var(--ease-out);
  z-index: 2;
}
.project-card:hover .project-card__accent { transform: scaleX(1); }

/* ── Preview GIF ────────────────────────────────────────── */
.project-card__preview {
  position: relative;
  width: 100%;
  height: 200px;           /* altura fija del área de preview */
  overflow: hidden;
  background: var(--color-bg);
  flex-shrink: 0;
}

/* GIF real */
.project-card__gif {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  /* El GIF siempre está cargado; solo cambia opacidad */
  opacity: 0;
  transform: scale(1.04);
  transition:
    opacity   var(--duration-base) var(--ease-out),
    transform var(--duration-slow) var(--ease-out);
}

/* Placeholder sin GIF */
.project-card__gif-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  /* Patrón de líneas diagonales sutil */
  background-image:
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 8px,
      rgba(255,255,255,0.015) 8px,
      rgba(255,255,255,0.015) 9px
    );
  opacity: 1;
  transition: opacity var(--duration-base) var(--ease-out);
}

.project-card__gif-number {
  font-family: var(--font-display);
  font-size: 3.5rem;
  font-style: italic;
  color: var(--color-border);
  line-height: 1;
  transition: color var(--duration-base) var(--ease-out);
}

.project-card__gif-label {
  font-size: var(--text-xs);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-border);
  transition: color var(--duration-base) var(--ease-out);
}

/* Overlay con título que aparece en hover */
.project-card__preview-overlay {
  position: absolute;
  inset: 0;
  background: rgba(22, 22, 22, 0.7);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: flex-end;
  padding: var(--space-4);
  opacity: 0;
  transition: opacity var(--duration-base) var(--ease-out);
}

.project-card__preview-title {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  color: var(--color-text);
  line-height: 1.3;
}

/* ── Estados en hover ───────────────────────────────────── */

/* Si hay GIF: mostrarlo */
.project-card__preview--hovered .project-card__gif {
  opacity: 1;
  transform: scale(1);
}

/* Si hay placeholder: animar los textos y mostrar overlay */
.project-card__preview--hovered .project-card__gif-placeholder {
  opacity: 0.4;
}
.project-card__preview--hovered .project-card__gif-number {
  color: var(--color-accent);
}
.project-card__preview--hovered .project-card__gif-label {
  color: var(--color-muted);
}
.project-card__preview--hovered .project-card__preview-overlay {
  opacity: 1;
}

/* ── Cuerpo de la card ──────────────────────────────────── */
.project-card__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-6) var(--space-6) var(--space-4);
  flex-grow: 1;
}

.project-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.project-card__number-label {
  font-family: var(--font-display);
  font-size: var(--text-xs);
  color: var(--color-accent);
  letter-spacing: 0.1em;
  font-style: italic;
}

.project-card__status {
  font-size: var(--text-xs);
  font-weight: 400;
  color: var(--color-muted);
  border: 1px solid var(--color-border);
  padding: 2px var(--space-2);
  border-radius: 100px;
  letter-spacing: 0.05em;
}
.project-card__status--active {
  color: #4ade80;
  border-color: rgba(74, 222, 128, 0.2);
  background: rgba(74, 222, 128, 0.05);
}

.project-card__title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 400;
  color: var(--color-text);
  line-height: 1.25;
}

.project-card__description {
  font-size: var(--text-sm);
  color: var(--color-muted);
  line-height: 1.7;
  font-weight: 300;
  flex-grow: 1;
}

/* Stack tags */
.project-card__stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-2);
}
.project-card__tech {
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-accent);
  letter-spacing: 0.05em;
  background: var(--color-accent-dim);
  padding: 2px var(--space-2);
  border-radius: var(--radius-sm);
}

/* ── Links ──────────────────────────────────────────────── */
.project-card__links {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--color-border);
  flex-shrink: 0;
}

.project-card__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 400;
  color: var(--color-muted);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
  white-space: nowrap;
}
.project-card__link:hover { color: var(--color-text); }

/* Botón de deploy — estilo primario naranja */
.project-card__link--live {
  margin-left: auto;           /* empuja el deploy hacia la derecha */
  color: var(--color-accent);
  border: 1px solid rgba(232, 97, 10, 0.25);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-sm);
  background: var(--color-accent-dim);
  transition:
    color       var(--duration-fast) var(--ease-out),
    background  var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out);
}
.project-card__link--live:hover {
  color: #fff;
  background: var(--color-accent);
  border-color: var(--color-accent);
}

/* Si solo existe el botón de deploy (sin GitHub), no usar margin-left: auto */
.project-card__links > .project-card__link--live:first-child {
  margin-left: 0;
}

.project-card__no-links {
  font-size: var(--text-xs);
  color: var(--color-border);
  letter-spacing: 0.05em;
}

/* ── Reveal ─────────────────────────────────────────────── */
[data-reveal] {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity   var(--duration-reveal) var(--ease-out),
    transform var(--duration-reveal) var(--ease-out);
}
[data-reveal].is-visible { opacity: 1; transform: translateY(0); }

/* ── Responsive ─────────────────────────────────────────── */
@media (max-width: 900px) {
  .portfolio__header { grid-template-columns: 1fr; }
  .portfolio__grid   { grid-template-columns: 1fr; }
  .project-card__preview { height: 180px; }
}

@media (max-width: 480px) {
  .project-card__preview { height: 150px; }
  .project-card__body    { padding: var(--space-4); }
  .project-card__links   { padding: var(--space-3) var(--space-4); flex-wrap: wrap; }
}
</style>