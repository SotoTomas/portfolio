<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount, watch } from "vue";
import { projects } from "../data/projects";
const selected = ref(null);
const dialog = ref(null);
const carousel = ref(null);
const viewport = ref(null);
const track = ref(null);
const orderedProjects = ref([...projects]);
const playing = ref(false);
const pointerInside = ref(false);
const focusInside = ref(false);
const inView = ref(false);
const pageVisible = ref(true);
let frame = 0;
let previousTime = 0;
let offset = 0;
let observer;
let motionPreference;
let transition;

function applyOffset() {
  if (track.value) track.value.style.transform = `translate3d(${-offset}px, 0, 0)`;
}
function stepWidth() {
  const first = track.value?.firstElementChild;
  if (!first) return 0;
  return first.offsetWidth + (parseFloat(getComputedStyle(track.value).columnGap) || 0);
}
function animate(time) {
  frame = 0;
  if (!playing.value || pointerInside.value || focusInside.value || !inView.value || !pageVisible.value || selected.value) {
    previousTime = 0;
    return;
  }
  if (previousTime) {
    offset += Math.min(time - previousTime, 50) * 0.03;
    const step = stepWidth();
    if (step && offset >= step) {
      offset -= step;
      orderedProjects.value = [...orderedProjects.value.slice(1), orderedProjects.value[0]];
    }
    applyOffset();
  }
  previousTime = time;
  frame = requestAnimationFrame(animate);
}
function syncPlayback() {
  cancelAnimationFrame(frame);
  frame = 0;
  previousTime = 0;
  if (playing.value && !pointerInside.value && !focusInside.value && inView.value && pageVisible.value && !selected.value) {
    frame = requestAnimationFrame(animate);
  }
}
function moveProjects(direction) {
  playing.value = false;
  offset = 0;
  if (viewport.value) viewport.value.scrollLeft = 0;
  const items = orderedProjects.value;
  orderedProjects.value = direction > 0
    ? [...items.slice(1), items[0]]
    : [items[items.length - 1], ...items.slice(0, -1)];
  applyOffset();
}
function leaveCarousel(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) {
    focusInside.value = false;
    if (viewport.value) viewport.value.scrollLeft = 0;
  }
}
function updateVisibility() { pageVisible.value = !document.hidden; }
function updateMotionPreference(event) { if (event.matches) playing.value = false; }
watch([playing, pointerInside, focusInside, inView, pageVisible, selected], syncPlayback);
onMounted(() => {
  motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
  playing.value = !motionPreference.matches;
  motionPreference.addEventListener("change", updateMotionPreference);
  document.addEventListener("visibilitychange", updateVisibility);
  updateVisibility();
  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(([entry]) => { inView.value = entry.isIntersecting; });
    observer.observe(carousel.value);
  } else inView.value = true;
});
async function change(update) {
  transition?.skipTransition();
  if (document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    transition = document.startViewTransition(update);
    await transition.finished.catch(() => {});
  } else await update();
}
function open(project) {
  change(async () => { selected.value = project; await nextTick(); dialog.value?.showModal(); });
}
function close() {
  change(() => { dialog.value?.close(); selected.value = null; });
}
onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  observer?.disconnect();
  motionPreference?.removeEventListener("change", updateMotionPreference);
  document.removeEventListener("visibilitychange", updateVisibility);
  transition?.skipTransition();
  dialog.value?.close();
});
</script>
<template>
  <section id="portfolio" class="section projects theme-white" aria-labelledby="projects-title">
    <div class="container">
      <div class="section-topline">
        <span class="eyebrow">01 / Trabajo seleccionado</span>
        <span class="eyebrow muted">{{ projects.length }} proyectos</span>
      </div>
      <div class="projects-heading" data-reveal>
        <h2 id="projects-title" class="section-title">Proyectos</h2>
      </div>
      <div ref="carousel" class="projects-carousel" role="region" aria-roledescription="carrusel" aria-label="Proyectos seleccionados" data-reveal>
        <div class="carousel-controls" aria-label="Controles del carrusel">
          <span class="eyebrow muted">Explorá los proyectos</span>
          <div class="carousel-buttons">
            <button type="button" @click="moveProjects(-1)" aria-label="Proyecto anterior">←</button>
            <button type="button" @click="moveProjects(1)" aria-label="Proyecto siguiente">→</button>
            <button type="button" class="carousel-toggle" @click="playing = !playing" :aria-label="playing ? 'Pausar carrusel' : 'Reproducir carrusel'">{{ playing ? 'Pausar' : 'Reproducir' }} <span aria-hidden="true">{{ playing ? 'Ⅱ' : '▶' }}</span></button>
          </div>
        </div>
        <div ref="viewport" class="carousel-viewport" @pointerenter="event => { if (event.pointerType !== 'touch') pointerInside = true; }" @pointerleave="pointerInside = false" @focusin="focusInside = true" @focusout="leaveCarousel">
        <div ref="track" class="project-track">
        <article v-for="project in orderedProjects" :key="project.id" class="project"
          :class="['project-' + project.id, { 'project-featured': project.featured }]">
          <button class="project-cover" :class="'cover-' + project.id"
            @click="open(project)" :aria-label="'Ver el caso de ' + project.title" aria-haspopup="dialog">
            <img v-if="project.preview" class="project-image" :src="project.preview" alt="" width="1200" height="675" loading="lazy" decoding="async" />
            <span class="project-caption">
              <span class="project-number">{{ project.number }}</span>
              <span class="project-title">{{ project.title }}</span>
              <span class="project-plus" aria-hidden="true">+</span>
            </span>
          </button>
          <div v-if="project.live || project.github || project.download" class="project-links" :aria-label="'Enlaces de ' + project.title">
            <a v-if="project.live" :href="project.live" target="_blank" rel="noopener noreferrer">Explorar demo <span aria-hidden="true">↗</span></a>
            <a v-if="project.github" :href="project.github" target="_blank" rel="noopener noreferrer">Ver código <span aria-hidden="true">↗</span></a>
            <a v-if="project.download" :href="project.download" :download="project.downloadName">Descargar aplicación <span aria-hidden="true">↓</span></a>
          </div>
        </article>
        </div>
        </div>
      </div>
      <a class="text-link all-projects" href="https://github.com/SotoTomas" target="_blank" rel="noopener noreferrer">Más código, experimentos e ideas en GitHub <span aria-hidden="true">↗</span></a>
    </div>
    <dialog ref="dialog" class="case-dialog" data-lenis-prevent aria-labelledby="case-title" @cancel.prevent="close" @click="(event) => { if (event.target === dialog) close(); }">
      <div v-if="selected" class="case-inner">
        <div class="case-top">
          <span class="eyebrow">Proyecto {{ selected.number }} / {{ selected.status }}</span>
          <button class="case-close" @click="close" autofocus aria-label="Cerrar proyecto">Cerrar ×</button>
        </div>
        <p class="eyebrow muted">{{ selected.category }}</p>
        <h2 id="case-title" class="section-title">{{ selected.title }}</h2>
        <p class="case-description">{{ selected.description }}</p>
        <img v-if="selected.preview" class="case-image" :src="selected.preview" :alt="selected.previewAlt || 'Vista de ' + selected.title" width="1200" height="675" />
        <div class="case-stack" aria-label="Tecnologías del proyecto"><span v-for="tech in selected.stack" :key="tech" class="pill">{{ tech }}</span></div>
        <div class="case-story">
          <div v-for="item in [{ title: 'El punto de partida', text: selected.challenge }, { title: 'La decisión', text: selected.decision }, { title: 'Lo que toma forma', text: selected.result }]" :key="item.title">
            <h3>{{ item.title }}</h3><p>{{ item.text }}</p>
          </div>
        </div>
        <p v-if="selected.note" class="case-note">{{ selected.note }}</p>
        <div class="case-links">
          <a v-if="selected.download" class="text-link" :href="selected.download" :download="selected.downloadName">Descargar para Windows · {{ selected.downloadSize }} <span aria-hidden="true">↓</span></a>
          <a v-if="selected.live" class="text-link" :href="selected.live" target="_blank" rel="noopener noreferrer">{{ selected.liveLabel || 'Explorar demo' }} <span aria-hidden="true">↗</span></a>
          <a v-if="selected.github" class="text-link" :href="selected.github" target="_blank" rel="noopener noreferrer">Ver código <span aria-hidden="true">↗</span></a>
          <span v-if="selected.availability" class="pill">{{ selected.availability }}</span>
        </div>
      </div>
    </dialog>
  </section>
</template>
<style scoped>
.projects { padding-top: 96px; }
.projects-heading { margin-bottom: 40px; }
.carousel-controls { display: flex; justify-content: space-between; align-items: center; gap: 16px; border-top: 1px solid var(--color-border); padding: 16px 0; }
.carousel-buttons { display: flex; align-items: center; gap: 8px; }
.carousel-buttons button { min-width: 44px; min-height: 44px; background: transparent; border: 1px solid var(--color-border); font-size: 20px; transition: color .2s, border-color .2s; }
.carousel-buttons button:hover, .carousel-buttons button:focus-visible { color: var(--color-accent); border-color: currentColor; }
.carousel-buttons .carousel-toggle { padding: 0 12px; font-size: 12px; }
.carousel-toggle span { margin-left: 8px; }
.carousel-viewport { overflow: hidden; }
.project-track { display: flex; align-items: start; gap: 24px; width: max-content; }
.project { flex: 0 0 clamp(240px, 25vw, 320px); min-width: 0; }
.project-cover { --cover-bg: #e7e8e1; display: block; position: relative; width: 100%; aspect-ratio: 4 / 3; min-height: 0; overflow: hidden; background: var(--cover-bg); padding: 0; text-align: left; }

.project-cover:focus-visible { outline: 3px solid var(--color-accent); outline-offset: -3px; z-index: 2; }
.cover-academia-magica { --cover-bg: #d8cdd8; }
.cover-fageon { --cover-bg: #c8d7ce; }
.cover-organiza { --cover-bg: #e9e3d5; }
.cover-caja-san-pablo { --cover-bg: #d7dfe5; }
.project-image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top center; transition: transform .45s var(--ease); }
.project-caption { position: absolute; inset: auto 0 0; display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: start; gap: 8px; padding: 12px; background: var(--color-bg); color: var(--color-text); font-family: var(--font-body); }
.project-caption::before { content: ""; position: absolute; left: 0; right: 0; bottom: 100%; height: 3px; background: var(--color-accent); transform: scaleX(0); transform-origin: left; transition: transform .3s var(--ease); }
.project-number { font-size: 10px; line-height: 1.5; color: var(--color-muted); }
.project-title { font-size: clamp(12px, 1.05vw, 15px); line-height: 1.25; font-weight: 700; overflow-wrap: anywhere; }
.project-plus { font-size: 20px; line-height: .9; transition: color .2s ease; }
@media (hover: hover) {
  .project-cover:hover .project-image { transform: scale(1.035); }
  .project-cover:hover .project-caption::before { transform: scaleX(1); }
  .project-cover:hover .project-plus { color: var(--color-accent); }
}
.project-cover:focus-visible .project-image { transform: scale(1.035); }
.project-cover:focus-visible .project-caption::before { transform: scaleX(1); }
.project-cover:focus-visible .project-plus { color: var(--color-accent); }
.project-links { display: flex; flex-wrap: wrap; gap: 8px 24px; padding-top: 16px; font-size: 13px; line-height: 1.5; }
.project-links a { border-bottom: 1px solid currentColor; padding-bottom: 3px; }
.project-links a:hover, .project-links a:focus-visible { color: var(--color-accent); }
.all-projects { margin-top: 64px; }
.case-stack { display: flex; flex-wrap: wrap; gap: 8px; margin-block: 24px; }
.case-dialog { border: 1px solid var(--color-border); padding: 0; background: var(--color-bg); color: var(--color-text); max-width: 1000px; width: calc(100% - 40px); max-height: 90dvh; }
.case-dialog::backdrop { background: #181710a6; }
.case-inner { padding: 40px; }
.case-top { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding-bottom: 30px; }
.case-close { background: var(--color-text); color: var(--color-bg); padding: 11px 18px; font-size: 14px; }
.case-inner h2 { margin-top: 18px; }
.case-description { font-size: 16px; line-height: 1.7; max-width: 670px; margin: 24px 0; }
.case-image { width: 100%; height: auto; max-height: 400px; object-fit: cover; object-position: top; }
.case-story { display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; margin-top: 35px; }
.case-story h3 { font-size: 14px; font-weight: 500; margin-bottom: 12px; }
.case-story p { font-size: 14px; line-height: 1.5; color: var(--color-muted); }
.case-note { background: var(--color-surface); padding: 18px; margin-top: 30px; font-size: 14px; line-height: 1.7; }
.case-links { display: flex; align-items: center; flex-wrap: wrap; gap: 25px; margin-top: 25px; }

@media (max-width: 600px) {
  .projects { padding-top: 72px; }
  .projects-heading { margin-bottom: 24px; }
  .section-topline { gap: 16px; }
  .section-topline .eyebrow { font-size: 10px; letter-spacing: .06em; }
  .carousel-controls { align-items: end; }
  .carousel-controls > .eyebrow { max-width: 105px; line-height: 1.5; }
  .project-track { gap: 16px; }
  .project { flex-basis: min(75vw, 280px); }
  .project-cover, .project-featured .project-cover { aspect-ratio: 4 / 3; }
  .case-inner { padding: 24px; }
  .case-story { grid-template-columns: 1fr; }
  .case-top .eyebrow { font-size: 11px; }
  .case-close { white-space: nowrap; }
  .case-dialog { width: calc(100% - 20px); }
}

@media (prefers-reduced-motion: reduce) {
  .project-image, .project-caption::before, .project-plus { transition: none; }
  .project-cover:hover .project-image, .project-cover:focus-visible .project-image { transform: none; }
}
</style>
