<script setup>
// ─────────────────────────────────────────────────────────────
// EducationSection.vue — Timeline de educación y formación
// ─────────────────────────────────────────────────────────────

const education = [
  {
    id: 1,
    year: 'Actualidad',
    title: 'Tecnicatura en Diseño Gráfico y Digital',
    institution: 'Universidad Nacional de La Matanza',
    description: 'Formación integral en diseño visual, comunicación gráfica, tipografía, identidad de marca y producción digital.',
    type: 'Grado universitario',
  },
  {
    id: 2,
    year: 'Feb 2025',
    title: 'Desarrollo Web Completo',
    institution: 'UDEMY',
    description: 'Curso exhaustivo de desarrollo web full stack: HTML, CSS, JavaScript, PHP, Laravel, Vue.js y bases de datos relacionales.',
    type: 'Certificación',
  },
  {
    id: 3,
    year: 'Dic 2024',
    title: 'Administración de Bases de Datos',
    institution: 'CFL 414',
    description: 'Especialización profesional en diseño, gestión y optimización de bases de datos relacionales con MySQL.',
    type: 'Especialización',
  },
]
</script>

<template>
  <section
    id="educacion"
    class="section education"
    data-section="educacion"
    aria-labelledby="education-title"
  >
    <div class="container education__inner">

      <!-- Header -->
      <div class="education__header">
        <span class="section-label" data-reveal>Educación</span>
        <span class="divider" data-reveal data-delay="50" aria-hidden="true"></span>
        <h2 id="education-title" class="section-title" data-reveal data-delay="100">
          Formación continua.
        </h2>
        <p class="education__subtitle" data-reveal data-delay="150">
          Combino formación académica con aprendizaje práctico y autodidacta.
        </p>
      </div>

      <!-- Timeline -->
      <ol class="timeline" role="list">
        <li
          v-for="(item, i) in education"
          :key="item.id"
          class="timeline__item"
          data-reveal
          :data-delay="i * 100"
        >
          <!-- Línea y punto del timeline -->
          <div class="timeline__marker" aria-hidden="true">
            <div class="timeline__dot"></div>
            <div class="timeline__line" v-if="i < education.length - 1"></div>
          </div>

          <!-- Contenido -->
          <div class="timeline__content">
            <div class="timeline__meta">
              <span class="timeline__year">{{ item.year }}</span>
              <span class="timeline__type">{{ item.type }}</span>
            </div>
            <h3 class="timeline__title">{{ item.title }}</h3>
            <p class="timeline__institution">{{ item.institution }}</p>
            <p class="timeline__description">{{ item.description }}</p>
          </div>
        </li>
      </ol>

    </div>
  </section>
</template>

<style scoped>
.education__inner {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: var(--space-16);
  align-items: start;
}

.education__header { position: sticky; top: 120px; }

.education__subtitle {
  font-size: var(--text-sm);
  color: var(--color-muted);
  font-weight: 300;
  line-height: 1.7;
  margin-top: var(--space-4);
}

/* ── Timeline ───────────────────────────────────────────── */
.timeline {
  list-style: none;
  display: flex;
  flex-direction: column;
}

.timeline__item {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: var(--space-6);
  padding-bottom: var(--space-12);
}
.timeline__item:last-child { padding-bottom: 0; }

/* Marcador visual */
.timeline__marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4px;
}
.timeline__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--color-accent);
  flex-shrink: 0;
  box-shadow: 0 0 0 3px var(--color-accent-dim);
}
.timeline__line {
  width: 1px;
  flex-grow: 1;
  background: var(--color-border);
  margin-top: var(--space-3);
}

/* Contenido del item */
.timeline__meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}
.timeline__year {
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-accent);
  letter-spacing: 0.05em;
}
.timeline__type {
  font-size: var(--text-xs);
  color: var(--color-muted);
  border: 1px solid var(--color-border);
  padding: 1px var(--space-2);
  border-radius: 100px;
}
.timeline__title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 400;
  color: var(--color-text);
  margin-bottom: var(--space-1);
  line-height: 1.3;
}
.timeline__institution {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-muted);
  margin-bottom: var(--space-3);
  letter-spacing: 0.01em;
}
.timeline__description {
  font-size: var(--text-sm);
  color: var(--color-muted);
  font-weight: 300;
  line-height: 1.7;
}

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
  .education__inner { grid-template-columns: 1fr; gap: var(--space-12); }
  .education__header { position: static; }
}
</style>
