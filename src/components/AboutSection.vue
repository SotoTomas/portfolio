<template>
  <section
    id="sobre-mi"
    class="section about theme-stone"
    aria-label="Sobre mí"
  >
    <div class="container">
      <div class="section-topline">
        <span class="eyebrow">02 / Detrás de la interfaz</span
        >
      </div>
      <div class="background-grid">
        <div class="education" data-reveal>
          <h3 class="eyebrow">Formación</h3>
          <div class="education-row">
            <span>En curso</span>
            <div>
              <h4>Diseño Gráfico y Digital</h4>
              <p>Universidad Nacional de La Matanza</p>
            </div>
          </div>
          <div class="education-row">
            <span>2025</span>
            <div>
              <h4>Desarrollo Web Completo</h4>
              <p>Udemy</p>
            </div>
          </div>
          <div class="education-row">
            <span>2024</span>
            <div>
              <h4>Administración de Bases de Datos</h4>
              <p>CFL 414</p>
            </div>
          </div>
        </div>
        <div class="toolkit" data-reveal>
          <h3 class="eyebrow">Herramientas del oficio</h3>
          <p>Una base técnica al servicio de cada idea.</p>
          <div class="tool-tags">
            <span
              v-for="skill in [
                'Vue.js',
                'JavaScript',
                'Laravel',
                'PHP',
                'MySQL',
                'Inertia.js',
                'Tailwind CSS',
                'Git',
                'Illustrator',
                'Photoshop',
                'UI / UX',
                'Tipografía',
              ]"
              :key="skill"
              class="pill"
              >{{ skill }}</span
            >
          </div>
          <p class="languages">Español nativo · Inglés intermedio</p>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.about {
  background: var(--color-bg);
}
.about-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 24px;
  align-items: start;
}
.portrait-col {
  position: relative;
  max-width: 370px;
  grid-column: 1 / 5;
}
.portrait {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/5;
}
.portrait img {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 80%;
  width: 125%;
  max-width: none;
  object-fit: cover;
  object-position: center;
  transform: translate(-50%, -50%) rotate(-90deg);
  filter: grayscale(1);
}
.portrait-mark {
  position: absolute;
  right: -24px;
  top: -24px;
  font-size: 64px;
  color: var(--color-accent);
  line-height: 1;
}
.portrait-caption {
  font-size: 12px;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.portrait-caption span {
  color: var(--color-muted);
  font-size: 9px;
  padding-top: 2px;
}
.about-copy {
  grid-column: 6 / -1;
}
.about-copy h2 {
  font-size: var(--text-feature);
  margin-bottom: 30px;
}
.about-copy > p {
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-muted);
  max-width: 510px;
  margin-bottom: 17px;
}
.about-copy .text-link {
  margin-top: 10px;
}
.process {
  margin-top: 100px;
  border-top: 1px solid var(--color-border);
  padding-top: 25px;
}
.process-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 30px;
}
.process-buttons button {
  background: transparent;
  padding: 20px 0;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.04em;
  display: flex;
  align-items: center;
  gap: 17px;
}
.process-buttons button > span {
  font-family: var(--font-body);
  font-size: 10px;
  color: var(--color-muted);
}
.process-buttons button > b {
  font: 22px var(--font-body);
  margin-left: auto;
}
.process-buttons button[aria-pressed="true"] {
  color: var(--color-accent);
  border-color: var(--color-accent);
}
.process-description {
  margin-top: 25px;
  max-width: 620px;
  min-height: 80px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-muted);
}
.background-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  margin-top: 65px;
}
.background-grid h3 {
  margin-bottom: 28px;
}
.education-row {
  display: flex;
  gap: 30px;
  border-top: 1px solid var(--color-border);
  padding: 18px 0;
}
.education-row > span {
  font-size: 10px;
  color: var(--color-muted);
  width: 55px;
  flex-shrink: 0;
}
.education-row h4 {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 6px;
}
.education-row p {
  font-size: 11px;
  color: var(--color-muted);
}
.toolkit > p {
  font-size: 14px;
  color: var(--color-muted);
  line-height: 1.8;
}
.tool-tags {
  display: flex;
  gap: 9px;
  flex-wrap: wrap;
  margin-top: 23px;
}
.toolkit .languages {
  font-size: 11px;
  margin-top: 27px;
}
@media (max-width: 800px) {
  .about-grid {
    grid-template-columns: repeat(8, minmax(0, 1fr));
    gap: 24px;
  }
  .portrait-col {
    grid-column: 1 / 4;
  }
  .about-copy {
    grid-column: 4 / -1;
  }
  .portrait-mark {
    font-size: 56px;
    right: -20px;
  }
  .background-grid {
    gap: 35px;
  }
  .process-buttons {
    gap: 20px;
  }
  .process-buttons button {
    font-size: 24px;
    gap: 10px;
  }
}
@media (max-width: 600px) {
  .about-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 48px;
  }
  .portrait-col {
    max-width: 280px;
    margin: 0;
    grid-column: 1 / -1;
  }
  .about-copy {
    grid-column: 1 / -1;
  }
  .process {
    margin-top: 55px;
  }
  .process-buttons {
    gap: 12px;
  }
  .process-buttons button {
    font-size: clamp(18px, 4.5vw, 22px);
    gap: 6px;
  }
  .process-buttons button > b {
    display: none;
  }
  .process-description {
    min-height: 130px;
  }
  .background-grid {
    grid-template-columns: 1fr;
    margin-top: 30px;
    gap: 40px;
  }
  .portrait-caption {
    font-size: 11px;
  }
}
</style>
