<script setup>
// ─────────────────────────────────────────────────────────────
// PortfolioSection.vue — Grilla de proyectos destacados
// Cada card tiene hover con overlay, stack de tecnologías y links
// ─────────────────────────────────────────────────────────────

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
    github: 'https://github.com/SotoTomas/TVLaravel',
    live: null,
    featured: true,
  },
  {
    id: 2,
    number: '02',
    title: 'Sitio Web ONG',
    description:
      'Rediseño completo de sitio institucional con enfoque en experiencia de usuario, ' +
      'diseño moderno, accesibilidad WCAG y performance. Layout responsivo ' +
      'con identidad visual renovada.',
    stack: ['Vue.js', 'HTML5', 'TailwindCSS', 'CSS3'],
    status: 'Finalizado',
    github: null,
    live: null,
    featured: false,
  },
]
</script>

<template>
  <section
    id="portfolio"
    class="section portfolio"
    data-section="portfolio"
    aria-labelledby="portfolio-title"
  >
    <div class="container">

      <!-- Header de sección -->
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

      <!-- Grilla de proyectos -->
      <div class="portfolio__grid" role="list">
        <article
          v-for="(project, i) in projects"
          :key="project.id"
          class="project-card"
          :class="{ 'project-card--featured': project.featured }"
          data-reveal
          :data-delay="i * 100"
          role="listitem"
        >
          <!-- Número decorativo -->
          <span class="project-card__number" aria-hidden="true">
            {{ project.number }}
          </span>

          <!-- Contenido -->
          <div class="project-card__content">
            <!-- Badge de estado -->
            <div class="project-card__meta">
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
              <span
                v-for="tech in project.stack"
                :key="tech"
                class="project-card__tech"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Links -->
          <div class="project-card__links">
            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="project-card__link"
              :aria-label="`Ver código de ${project.title} en GitHub`"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a
              v-if="project.live"
              :href="project.live"
              target="_blank"
              rel="noopener noreferrer"
              class="project-card__link project-card__link--primary"
              :aria-label="`Ver ${project.title} en vivo`"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
              Ver proyecto
            </a>
          </div>

          <!-- Línea decorativa superior -->
          <div class="project-card__accent" aria-hidden="true"></div>
        </article>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ── Portfolio ──────────────────────────────────────────── */
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
  padding-bottom: var(--space-2); /* alinea con el baseline del título */
}

/* ── Grid de proyectos ──────────────────────────────────── */
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
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  overflow: hidden;
  transition: border-color var(--duration-base) var(--ease-out),
              transform var(--duration-base) var(--ease-out),
              background var(--duration-base) var(--ease-out);
}

.project-card:hover {
  border-color: rgba(232, 97, 10, 0.3);
  transform: translateY(-3px);
  background: #222222;
}

/* Línea naranja superior que aparece en hover */
.project-card__accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--duration-base) var(--ease-out);
}
.project-card:hover .project-card__accent { transform: scaleX(1); }

/* Número decorativo */
.project-card__number {
  font-family: var(--font-display);
  font-size: var(--text-xs);
  color: var(--color-accent);
  letter-spacing: 0.1em;
  font-style: italic;
}

/* Meta: estado */
.project-card__meta { display: flex; align-items: center; gap: var(--space-3); }

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

/* Contenido */
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

/* Stack de tecnologías */
.project-card__stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
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

/* Links de proyecto */
.project-card__links {
  display: flex;
  gap: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
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
}
.project-card__link:hover { color: var(--color-text); }
.project-card__link--primary { color: var(--color-accent); }
.project-card__link--primary:hover { color: var(--color-text); }

/* ── Reveal animation ─────────────────────────────────── */
[data-reveal] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--duration-reveal) var(--ease-out),
              transform var(--duration-reveal) var(--ease-out);
}
[data-reveal].is-visible { opacity: 1; transform: translateY(0); }

/* ── Responsive ─────────────────────────────────────────── */
@media (max-width: 900px) {
  .portfolio__header { grid-template-columns: 1fr; }
  .portfolio__grid   { grid-template-columns: 1fr; }
}
</style>
