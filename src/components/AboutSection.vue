<script setup>
// ─────────────────────────────────────────────────────────────
// AboutSection.vue — Sección "Sobre mí"
// Layout asimétrico: texto a la izquierda, datos destacados a la derecha
// ─────────────────────────────────────────────────────────────

// Datos rápidos que aparecen en el panel derecho
const highlights = [
  { value: '2+',        label: 'Años de experiencia' },
  { value: 'Laravel',   label: 'Stack backend principal' },
  { value: 'Vue.js',    label: 'Framework frontend favorito' },
  { value: 'UX First',  label: 'Filosofía de diseño' },
]

// Tags de intereses y soft skills
const tags = [
  'Diseño UI/UX', 'Accesibilidad Web', 'Performance',
  'Taekwondo', 'Scout', 'Inglés técnico'
]
</script>

<template>
  <section
    id="sobre-mi"
    class="section about"
    data-section="sobre-mi"
    aria-labelledby="about-title"
  >
    <div class="container about__inner">

      <!-- Columna izquierda: texto -->
      <div class="about__content">
        <span class="section-label" data-reveal data-delay="0">Sobre mí</span>
        <span class="divider" data-reveal data-delay="50" aria-hidden="true"></span>

        <h2 id="about-title" class="section-title" data-reveal data-delay="100">
          Diseño que funciona.<br>Código que respira.
        </h2>

        <p class="about__text" data-reveal data-delay="150">
          Soy Tomás, un desarrollador frontend y diseñador gráfico de Ramos Mejía, Buenos Aires.
          Me formé en la Universidad Nacional de La Matanza y complementé mi carrera
          con desarrollo web full stack, especializándome en la intersección
          entre diseño visual y experiencia de usuario.
        </p>

        <p class="about__text" data-reveal data-delay="200">
          Trabajo con <strong>Laravel</strong>, <strong>Vue.js</strong> e <strong>Inertia.js</strong>
          para construir productos web que se ven bien y funcionan mejor.
          Mi enfoque siempre parte del usuario: qué necesita ver, qué necesita hacer,
          y cómo hacerlo lo más fluido posible.
        </p>

        <div class="about__tags" data-reveal data-delay="250">
          <span
            v-for="tag in tags"
            :key="tag"
            class="about__tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Columna derecha: métricas destacadas -->
      <aside class="about__highlights" aria-label="Datos destacados">
        <div
          v-for="(item, i) in highlights"
          :key="item.label"
          class="about__highlight-item"
          data-reveal
          :data-delay="i * 80"
        >
          <span class="about__highlight-value">{{ item.value }}</span>
          <span class="about__highlight-label">{{ item.label }}</span>
        </div>
      </aside>

    </div>
  </section>
</template>

<style scoped>
/* ── About ──────────────────────────────────────────────── */
.about__inner {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: var(--space-16);
  align-items: start;
}

/* Texto */
.about__text {
  font-size: var(--text-base);
  font-weight: 300;
  color: var(--color-muted);
  line-height: 1.8;
  margin-bottom: var(--space-6);
  max-width: 540px;
}
.about__text strong {
  color: var(--color-text);
  font-weight: 500;
}

/* Tags */
.about__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-8);
}
.about__tag {
  font-size: var(--text-xs);
  font-weight: 400;
  color: var(--color-muted);
  border: 1px solid var(--color-border);
  padding: var(--space-1) var(--space-3);
  border-radius: 100px;
  letter-spacing: 0.02em;
  transition: border-color var(--duration-fast) var(--ease-out),
              color var(--duration-fast) var(--ease-out);
}
.about__tag:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

/* Panel de highlights */
.about__highlights {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.about__highlight-item {
  padding: var(--space-6) var(--space-8);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  transition: background var(--duration-fast) var(--ease-out);
}
.about__highlight-item:last-child { border-bottom: none; }
.about__highlight-item:hover { background: var(--color-surface); }

.about__highlight-value {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 400;
  color: var(--color-accent);
  line-height: 1;
}
.about__highlight-label {
  font-size: var(--text-xs);
  color: var(--color-muted);
  font-weight: 400;
  letter-spacing: 0.02em;
}

/* ── Reveal animation ─────────────────────────────────── */
[data-reveal] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--duration-reveal) var(--ease-out),
              transform var(--duration-reveal) var(--ease-out);
}
[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Responsive ─────────────────────────────────────────── */
@media (max-width: 900px) {
  .about__inner {
    grid-template-columns: 1fr;
    gap: var(--space-12);
  }
  .about__highlights {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .about__highlight-item:nth-child(1),
  .about__highlight-item:nth-child(2) {
    border-bottom: 1px solid var(--color-border);
  }
  .about__highlight-item:nth-child(odd) {
    border-right: 1px solid var(--color-border);
  }
}
@media (max-width: 480px) {
  .about__highlights { grid-template-columns: 1fr; }
}
</style>
