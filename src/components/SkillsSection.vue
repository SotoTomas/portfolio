<script setup>
// ─────────────────────────────────────────────────────────────
// SkillsSection.vue — Habilidades técnicas agrupadas por categoría
// Cada categoría tiene un ícono SVG inline y las skills como tags
// ─────────────────────────────────────────────────────────────

const categories = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: ['Vue.js', 'JavaScript ES6+', 'HTML5', 'CSS3', 'SCSS', 'TailwindCSS', 'Inertia.js', 'Responsive Design'],
  },
  {
    id: 'backend',
    label: 'Backend & DB',
    skills: ['PHP', 'Laravel', 'MySQL', 'APIs REST', 'MVC', 'Autenticación'],
  },
  {
    id: 'design',
    label: 'Diseño',
    skills: ['Adobe Illustrator', 'Adobe Photoshop', 'UI/UX Design', 'Tipografía', 'Identidad Visual', 'Diseño Editorial'],
  },
  {
    id: 'tools',
    label: 'Herramientas',
    skills: ['Git', 'GitHub', 'Vite', 'npm', 'SEO Básico', 'Accesibilidad WCAG'],
  },
]

// Idiomas y extras
const extras = [
  { label: 'Español', level: 'Nativo' },
  { label: 'Inglés', level: 'Intermedio' },
]
</script>

<template>
  <section
    id="skills"
    class="section skills"
    data-section="skills"
    aria-labelledby="skills-title"
  >
    <div class="container">

      <!-- Header -->
      <div class="skills__header">
        <span class="section-label" data-reveal>Skills</span>
        <span class="divider" data-reveal data-delay="50" aria-hidden="true"></span>
        <h2 id="skills-title" class="section-title" data-reveal data-delay="100">
          Herramientas del oficio.
        </h2>
      </div>

      <!-- Grid de categorías -->
      <div class="skills__grid">
        <div
          v-for="(cat, i) in categories"
          :key="cat.id"
          class="skills__category"
          data-reveal
          :data-delay="i * 80"
        >
          <h3 class="skills__category-title">{{ cat.label }}</h3>
          <ul class="skills__list" :aria-label="`Habilidades de ${cat.label}`">
            <li
              v-for="skill in cat.skills"
              :key="skill"
              class="skills__item"
            >
              {{ skill }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Separador y extras -->
      <div class="skills__extras" data-reveal>
        <div class="skills__extras-inner">
          <div
            v-for="lang in extras"
            :key="lang.label"
            class="skills__lang"
          >
            <span class="skills__lang-name">{{ lang.label }}</span>
            <span class="skills__lang-level">{{ lang.level }}</span>
          </div>
          <div class="skills__lang">
            <span class="skills__lang-name">Modalidad</span>
            <span class="skills__lang-level">Remota · Híbrida · Presencial</span>
          </div>
          <div class="skills__lang">
            <span class="skills__lang-name">Disponibilidad</span>
            <span class="skills__lang-level">Part-Time · Full-Time</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ── Skills ─────────────────────────────────────────────── */
.skills__header { margin-bottom: var(--space-16); }

.skills__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--color-border);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: var(--space-6);
}

.skills__category {
  background: var(--color-bg);
  padding: var(--space-8);
  transition: background var(--duration-fast) var(--ease-out);
}
.skills__category:hover { background: var(--color-surface); }

.skills__category-title {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--space-6);
}

.skills__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.skills__item {
  font-size: var(--text-sm);
  color: var(--color-muted);
  font-weight: 300;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  transition: color var(--duration-fast) var(--ease-out);
}
.skills__item::before {
  content: '';
  display: block;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--color-border);
  flex-shrink: 0;
  transition: background var(--duration-fast) var(--ease-out);
}
.skills__category:hover .skills__item { color: var(--color-text); }
.skills__category:hover .skills__item::before { background: var(--color-accent); }

/* ── Extras ─────────────────────────────────────────────── */
.skills__extras {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.skills__extras-inner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--color-border);
}
.skills__lang {
  background: var(--color-bg);
  padding: var(--space-6) var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.skills__lang-name {
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
}
.skills__lang-level {
  font-size: var(--text-sm);
  color: var(--color-text);
  font-weight: 300;
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
@media (max-width: 1024px) {
  .skills__grid { grid-template-columns: repeat(2, 1fr); }
  .skills__extras-inner { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .skills__grid { grid-template-columns: 1fr; }
  .skills__extras-inner { grid-template-columns: 1fr; }
}
</style>
