<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useMotion } from "@vueuse/motion";
const photo = import.meta.env.BASE_URL + "yo.webp";
const mark = ref(null);
const motion = useMotion(mark, {
  initial: { rotate: -12 },
  rest: { rotate: -12 },
  active: {
    rotate: 12,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
});
let media;
function animate(active) {
  if (!media?.matches) motion.apply(active ? "active" : "rest");
}
onMounted(() => {
  media = matchMedia("(prefers-reduced-motion: reduce)");
});
onBeforeUnmount(() => motion.stop());
const steps = [
  {
    label: "Entender",
    text: "El punto de partida es una pregunta: ¿qué necesita la persona que va a usar esto? El problema define las decisiones que siguen.",
  },
  {
    label: "Dar forma",
    text: "Jerarquía, tipografía y espacio. Mi formación en diseño gráfico se encuentra con la lógica de una interfaz clara y accesible.",
  },
  {
    label: "Construir",
    text: "Llevo el diseño a Vue y conecto las piezas con Laravel cuando el proyecto lo necesita. Desarrollo, pruebo y ajusto la experiencia.",
  },
];
const current = ref(0);
</script>
<template>
  <section id="sobre-mi" class="section about" aria-labelledby="about-title">
    <div class="container">
      <div class="section-topline">
        <span class="eyebrow">02 / Detrás de la interfaz</span
        ><span class="eyebrow muted">La mirada también se entrena</span>
      </div>
      <div class="about-grid">
        <div
          class="portrait-col"
          data-reveal
          @pointerenter="animate(true)"
          @pointerleave="animate(false)"
        >
          <div class="portrait">
            <img
              :src="photo"
              alt="Tomás Soto"
              width="600"
              height="750"
              loading="lazy"
              decoding="async"
            />
          </div>
          <span ref="mark" class="portrait-mark" aria-hidden="true">✳</span>
          <p class="portrait-caption">
            Tomás Soto <span>Ramos Mejía, Buenos Aires</span>
          </p>
        </div>
        <div class="about-copy" data-reveal>
          <h2 id="about-title" class="section-title">
            Pienso como diseñador.<br />Construyo como<br /><em
              >desarrollador.</em
            >
          </h2>
          <p>
            Soy Tomás, desarrollador frontend y estudiante de Diseño Gráfico y
            Digital. Me interesa ese lugar donde una buena idea encuentra una
            forma clara de funcionar.
          </p>
          <p>
            Trabajo con Vue, Laravel e Inertia para construir productos web.
            Fuera de la pantalla, el taekwondo y la vida scout también forman
            parte de mi manera de aprender, colaborar y mirar el mundo.
          </p>
          <a
            class="text-link"
            href="https://drive.google.com/file/d/1puI-RE6yFmft3kPmQP4q3xNd4flg1JJV/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            >Ver mi CV <span aria-hidden="true">↗</span></a
          >
        </div>
      </div>
      <div class="process" data-reveal>
        <span class="eyebrow">De la intención a la experiencia</span>
        <div
          class="process-buttons"
          role="group"
          aria-label="Explorar mi proceso"
        >
          <button
            v-for="(step, i) in steps"
            :key="step.label"
            :aria-pressed="current === i"
            aria-controls="process-description"
            @click="current = i"
          >
            <span>0{{ i + 1 }}</span
            >{{ step.label }}<b aria-hidden="true">↗</b>
          </button>
        </div>
        <p
          id="process-description"
          class="process-description"
          aria-live="polite"
        >
          {{ steps[current].text }}
        </p>
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
  background: var(--color-surface);
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
  font-size: clamp(40px, 4.3vw, 64px);
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
  font-size: 36px;
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
    font-size: 30px;
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
  .about-copy h2 {
    font-size: clamp(36px, 8.5vw, 48px);
  }
  .process {
    margin-top: 55px;
  }
  .process-buttons {
    gap: 12px;
  }
  .process-buttons button {
    font-size: clamp(18px, 5vw, 24px);
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
