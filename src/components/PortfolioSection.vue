<script setup>
import { ref, nextTick, onBeforeUnmount } from "vue";
import { projects } from "../data/projects";
const selected = ref(null);
const dialog = ref(null);
const hovered = ref(null);
const loadedPreviews = ref(new Set());
const failedPreviews = ref(new Set());
let transition;
function preview(project, event) {
  if (event?.pointerType === "touch" || matchMedia("(hover: none)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches || navigator.connection?.saveData) return;
  hovered.value = project.id;
}
function previewLoaded(id) { loadedPreviews.value.add(id); }
function previewFailed(id) { failedPreviews.value.add(id); }
function leaveProject(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) hovered.value = null;
}
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
onBeforeUnmount(() => { transition?.skipTransition(); dialog.value?.close(); });
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
      <div class="project-grid" data-reveal>
        <article v-for="project in projects" :key="project.id" class="project"
          :class="['project-' + project.id, { 'project-featured': project.featured }]"
          @pointerenter="preview(project, $event)" @pointerleave="hovered = null"
          @focusin="preview(project)" @focusout="leaveProject">
          <button class="project-cover"
            :class="['cover-' + project.id, { 'is-previewing': hovered === project.id }]"
            @click="open(project)" :aria-label="'Ver el caso de ' + project.title" aria-haspopup="dialog">
            <span class="project-turn" aria-hidden="true">
              <span class="project-face project-front">
                <img v-if="project.preview" :src="project.preview" alt="" width="1200" height="675" loading="lazy" decoding="async" />
              </span>
              <span class="project-face project-back">
                <img v-if="project.preview" :src="project.preview" alt="" width="1200" height="675" loading="lazy" decoding="async" />
                <img v-if="hovered === project.id && project.gif && !failedPreviews.has(project.id)"
                  class="project-animation" :class="{ 'is-loaded': loadedPreviews.has(project.id) }"
                  :src="project.gif" alt="" decoding="async" @load="previewLoaded(project.id)" @error="previewFailed(project.id)" />
              </span>
            </span>
            <span class="cover-label" aria-hidden="true">{{ project.number }}{{ project.featured ? ' / DESTACADO' : '' }}</span>
          </button>
          <div class="project-info">
            <h3>{{ project.title }}</h3>
            <button class="project-more" @click="open(project)" :aria-label="'Más sobre ' + project.title" aria-haspopup="dialog"><span aria-hidden="true">+</span></button>
          </div>
        </article>
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
.projects-heading { margin-bottom: 64px; }
.project-grid { display: grid; width: min(100%, 960px); margin-inline: auto; aspect-ratio: 3 / 2; grid-template-columns: repeat(12, minmax(0, 1fr)); grid-template-rows: repeat(9, minmax(0, 1fr)); gap: 0; isolation: isolate; }
.project { position: relative; min-width: 0; min-height: 0; overflow: hidden; }
.project-academia-magica { grid-area: 1 / 1 / 4 / 9; }
.project-organiza { grid-area: 1 / 9 / 3 / 13; }
.project-caja-san-pablo { grid-area: 3 / 9 / 5 / 13; }
.project-fageon { grid-area: 4 / 1 / 7 / 9; }
.project-artmap { grid-area: 5 / 9 / 7 / 13; }
.project-tvlaravel { grid-area: 7 / 1 / 10 / 7; }
.project-rosco { grid-area: 7 / 7 / 10 / 13; }
.project-cover { --cover-bg: #e7e8e1; display: block; position: relative; width: 100%; height: 100%; min-height: 0; background: var(--cover-bg); padding: 0; perspective: 1600px; text-align: left; }
.project-cover:focus-visible { outline-offset: -4px; }
.cover-academia-magica { --cover-bg: #d8cdd8; }
.cover-fageon { --cover-bg: #c8d7ce; }
.cover-organiza { --cover-bg: #e9e3d5; }
.cover-caja-san-pablo { --cover-bg: #d7dfe5; }
.project-turn { position: relative; display: block; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform .85s var(--ease); }
.is-previewing .project-turn { transform: rotateY(180deg); }
.project-face { position: absolute; inset: 0; display: block; overflow: hidden; background: var(--cover-bg); backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.project-back { transform: rotateY(180deg); }
.project-face > img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
.project-face > .project-animation { position: absolute; inset: 0; opacity: 0; transition: opacity .5s ease .25s; }
.is-previewing .project-animation.is-loaded { opacity: 1; }
.cover-label { position: absolute; top: 16px; left: 16px; padding: 8px; background: var(--color-bg); color: var(--color-text); font-size: 10px; letter-spacing: .1em; pointer-events: none; opacity: 0; transition: opacity .25s ease; }
.project-info { position: absolute; inset: auto 24px 24px; display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 16px; background: var(--color-bg); opacity: 0; transform: translateY(8px); pointer-events: none; transition: opacity .25s ease, transform .3s var(--ease); }
.project:hover .project-info, .project:focus-within .project-info { opacity: 1; transform: none; pointer-events: auto; }
.project:hover .cover-label, .project:focus-within .cover-label { opacity: 1; }
.project-info h3 { min-width: 0; font-size: clamp(18px, 1.5vw, 22px); font-weight: 700; letter-spacing: -.025em; line-height: 1.15; overflow-wrap: anywhere; }
.project-featured h3 { font-size: clamp(22px, 2vw, 28px); }
.project-more { flex-shrink: 0; display: grid; place-items: center; width: 48px; height: 48px; background: transparent; border-bottom: 1px solid var(--color-border); font-size: 32px; line-height: 1; transition: color .25s, border-color .25s; }
.project-more span { transition: transform .3s var(--ease); }
.project-more:hover, .project-more:focus-visible { color: var(--color-accent); border-color: currentColor; }
.project-more:hover span { transform: rotate(90deg); }
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
@media (max-width: 1000px) and (min-width: 601px) {
  .project-grid { grid-template-columns: repeat(8, minmax(0, 1fr)); aspect-ratio: 4 / 3; }
  .project-academia-magica { grid-area: 1 / 1 / 4 / 6; }
  .project-organiza { grid-area: 1 / 6 / 3 / 9; }
  .project-caja-san-pablo { grid-area: 3 / 6 / 5 / 9; }
  .project-fageon { grid-area: 4 / 1 / 7 / 6; }
  .project-artmap { grid-area: 5 / 6 / 7 / 9; }
  .project-tvlaravel { grid-area: 7 / 1 / 10 / 5; }
  .project-rosco { grid-area: 7 / 5 / 10 / 9; }
  .project-info { gap: 8px; inset: auto 16px 16px; padding: 12px; }
  .project-more { width: 44px; height: 44px; }
}
@media (max-width: 600px) {
  .projects { padding-top: 72px; }
  .projects-heading { margin-bottom: 40px; }
  .section-topline { gap: 16px; }
  .section-topline .eyebrow { font-size: 10px; letter-spacing: .06em; }
  .project-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); grid-template-rows: none; grid-auto-rows: auto; aspect-ratio: auto; }
  .project { grid-area: auto / 1 / auto / -1; }
  .project-cover { aspect-ratio: 16 / 10; height: auto; }
  .project-featured .project-cover { aspect-ratio: 4 / 3; }
  .project-featured h3 { font-size: 24px; }
  .project-info { inset: auto 16px 16px; padding: 12px; gap: 8px; opacity: 1; transform: none; pointer-events: auto; }
  .project-info h3 { overflow-wrap: normal; }
  .case-inner { padding: 24px; }
  .case-story { grid-template-columns: 1fr; }
  .case-top .eyebrow { font-size: 11px; }
  .case-close { white-space: nowrap; }
  .case-dialog { width: calc(100% - 20px); }
}
@media (hover: none) {
  .project-info { opacity: 1; transform: none; pointer-events: auto; }
}
@media (prefers-reduced-motion: reduce) {

  .project-turn, .is-previewing .project-turn { transform: none; transition: none; }
  .project-back { display: none; }
  .project-more:hover span { transform: none; }
}
</style>
