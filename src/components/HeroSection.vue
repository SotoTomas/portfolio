<template>
  <section id="hero" class="hero" aria-labelledby="hero-title">
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
          <h1 id="hero-title" data-intro>
            De la idea<br />a la <em>interfaz.</em>
          </h1>
        </div>
        <div class="hero-aside" data-intro>
          <span class="vertical-label">Diseño / Desarrollo / Dirección</span>
          <p class="hero-description">
            Le doy forma a lo que imaginás. Diseño y desarrollo experiencias
            digitales con intención, carácter y código.
          </p>
          <a class="hero-cta" href="#portfolio"
            >Explorá mis proyectos <span aria-hidden="true">↘</span></a
          >
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
        <span><b>01</b> Diseño con intención</span>
        <span><b>02</b> Código con carácter</span>
        <span><b>03</b> Ideas que toman forma</span>
      </div>
    </div>
  </section>
</template>
<style scoped>
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
  font-size: clamp(64px, 8.4vw, 120px);
  line-height: 0.94;
  font-weight: 700;
  letter-spacing: -0.055em;
}
h1 em {
  color: var(--color-accent);
  font-style: normal;
}
.hero-aside {
  grid-column: 10 / -1;
  position: relative;
  padding-top: 112px;
}
.vertical-label {
  position: absolute;
  top: -120px;
  right: 0;
  writing-mode: vertical-rl;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.13em;
}
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
    grid-column: 5 / -1;
    padding-top: 0;
  }
  .vertical-label {
    top: 0;
    right: auto;
    left: -64px;
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
  h1 {
    font-size: clamp(52px, 12.5vw, 74px);
  }
  .hero-kicker {
    font-size: 10px;
    letter-spacing: 0.05em;
    margin-bottom: 32px;
  }
  .hero-aside {
    grid-column: 2 / -1;
  }
  .vertical-label {
    left: -40px;
    font-size: 10px;
  }
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
