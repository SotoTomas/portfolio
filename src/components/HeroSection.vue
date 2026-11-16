<script setup>
const photo = import.meta.env.BASE_URL + "yo.png";
</script>
<template>
  <section id="hero" class="hero theme-paper" aria-labelledby="hero-title">
    <div class="container">
      <div class="hero-meta" data-intro>
        <span class="eyebrow">Portfolio / Tomás Soto</span>
        <span class="eyebrow location">Buenos Aires, Argentina</span>
      </div>
      <div class="hero-body">
        <div class="hero-heading">
          <p class="hero-kicker eyebrow" data-intro>
            Diseño gráfico + Desarrollo frontend
          </p>
          <h1 id="hero-title" class="hero-name" data-intro>Tomás Soto</h1>
      <div class="about-grid">
        <div
          class="portrait-col"
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
          <span class="portrait-mark" aria-hidden="true">✳</span>
          <p class="portrait-caption">
            Tomás Soto <span>Ramos Mejía, Buenos Aires</span>
          </p>
        </div>
        <div class="about-copy" >
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

        </div>
        <div class="hero-aside" data-intro>
          <div class="vertical-label"><span>Diseño / Desarrollo / Dirección</span><span>Identidad / Interfaz / Experiencia</span><span>Ideas / Forma / Código</span></div>
        </div>
      </div>
      <div class="hero-bottom" data-intro>
        <span class="availability"
          ><i aria-hidden="true"></i> Disponible para nuevos proyectos</span
        >
        <a class="hero-scroll" href="#portfolio"
          >Trabajo seleccionado <span aria-hidden="true">↓</span></a
        >
        <span class="edition eyebrow">Diseño + código</span>
      </div>
      <div class="discipline-index" aria-label="Disciplinas">
        <span><b>01</b> Integración de API de IA</span>
        <span><b>02</b> Mapas interactivos</span>
        <span><b>03</b> Aplicaciones web con Vue</span>
      </div>
    </div>
  </section>
</template>
<style scoped>
.hero-name { font-size: clamp(42px, 6vw, 90px); margin-bottom: 36px; }
.about-grid { display: grid; grid-template-columns: minmax(160px, 300px) minmax(0, 1fr); gap: 32px; align-items: start; }
.portrait-col { position: relative; }
.portrait { overflow: hidden; aspect-ratio: 4 / 5; position: relative; }
.portrait img { width: 100%; height: 100%; object-fit: cover; object-position: center top; filter: grayscale(1); }
.portrait-mark { position: absolute; right: -18px; top: -24px; font-size: 48px; color: var(--color-accent); }
.portrait-caption { font-size: 12px; margin-top: 12px; display: flex; flex-wrap: wrap; gap: 8px; justify-content: space-between; }
.portrait-caption span, .about-copy p { color: var(--color-muted); }
.about-copy p { font-size: 14px; line-height: 1.6; margin-bottom: 18px; }
@media (max-width: 600px) { .about-grid { grid-template-columns: 1fr; } .portrait-col { max-width: 260px; } }

.hero-meta {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding-top: 32px;
}
.location {
  color: var(--color-muted);
}
.hero-body {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: 24px;
  padding-block: clamp(80px, 9vw, 144px);
  min-height: 640px;
  align-items: end;
}
.hero-heading {
  grid-column: 1 / 10;
}
.hero-kicker {
  margin-bottom: 40px;
}
h1 {
  font-size: var(--text-display);
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -0.04em;
}
h1 em {
  color: var(--color-accent);
  font-style: normal;
}
.hero-aside {
  grid-column: 10 / -1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 24px;
  min-width: 0;
}
.vertical-label {
  display: flex;
  flex-shrink: 0;
  align-items: flex-end;
  gap: 14px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.13em;
}
.vertical-label span {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  white-space: nowrap;
}
.hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 28px; }
.hero-description {
  font-size: 16px;
  line-height: 1.5;
  max-width: 280px;
  color: var(--color-muted);
}
.hero-cta {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid var(--color-text);
  padding-block: 24px 12px;
  font-size: 14px;
}
.hero-cta span {
  font-size: 24px;
  transition: transform 0.3s var(--ease);
}
.hero-cta:hover span {
  transform: translate(4px, 4px);
}
.hero-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding-bottom: 32px;
  font-size: 12px;
}
.availability {
  display: flex;
  align-items: center;
  gap: 8px;
}
.availability i {
  width: 6px;
  height: 6px;
  background: var(--color-accent);
}
.hero-scroll {
  display: flex;
  align-items: center;
  gap: 48px;
  min-height: 44px;
}
.hero-scroll span {
  font-size: 24px;
}
.discipline-index {
  border-block: 1px solid var(--color-text);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding-block: 24px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.discipline-index b {
  margin-right: 24px;
  font-weight: 400;
  color: var(--color-muted);
}
@media (max-width: 1000px) {
  .hero-body {
    grid-template-columns: repeat(8, minmax(0, 1fr));
    min-height: auto;
    gap: 64px 24px;
  }
  .hero-heading {
    grid-column: 1 / -1;
  }
  .hero-aside {
    grid-column: 1 / -1;
    justify-content: flex-end;
  }
  .hero-description {
    max-width: 340px;
  }
  .edition {
    display: none;
  }
}
@media (max-width: 600px) {
  .hero-meta {
    padding-top: 24px;
  }
  .location {
    display: none;
  }
  .hero-body {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    padding-block: 72px 64px;
    gap: 48px 16px;
  }
  .hero-kicker {
    font-size: 10px;
    letter-spacing: 0.05em;
    margin-bottom: 32px;
  }
  .hero-aside {
    grid-column: 1 / -1;
    justify-content: flex-end;
    gap: 20px;
  }
  .vertical-label { gap: 8px; font-size: 9px; letter-spacing: 0.08em; }
  .hero-bottom {
    flex-wrap: wrap;
    gap: 8px;
    font-size: 11px;
  }
  .hero-scroll {
    gap: 16px;
  }
  .discipline-index {
    grid-template-columns: 1fr;
    gap: 16px;
    font-size: 11px;
  }
}
</style>
