<script setup>
import { ref, nextTick, onBeforeUnmount } from "vue";
import { projects } from "../data/projects";
const selected = ref(null);
const dialog = ref(null);
const hovered = ref(null);
let transition;
function preview(project) {
  if (
    matchMedia("(prefers-reduced-motion: reduce)").matches ||
    navigator.connection?.saveData
  )
    return;
  hovered.value = project.id;
}
async function change(update) {
  transition?.skipTransition();
  if (
    document.startViewTransition &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    transition = document.startViewTransition(update);
    await transition.finished.catch(() => {});
  } else await update();
}
function open(project) {
  change(async () => {
    selected.value = project;
    await nextTick();
    dialog.value?.showModal();
  });
}
function close() {
  change(() => {
    dialog.value?.close();
    selected.value = null;
  });
}
onBeforeUnmount(() => {
  transition?.skipTransition();
  dialog.value?.close();
});
</script>
<template>
  <section
    id="portfolio"
    class="section projects"
    aria-labelledby="projects-title"
  >
    <div class="container">
      <div class="section-topline">
        <span class="eyebrow">01 / Trabajo seleccionado</span
        ><span class="eyebrow muted"
          >{{ projects.length }} ideas, hechas realidad</span
        >
      </div>
      <div class="projects-heading" data-reveal>
        <h2 id="projects-title" class="section-title">
          Cada proyecto,<br />una <em>forma de pensar.</em>
        </h2>
        <p>
          De una necesidad real a una experiencia<br />que se puede usar,
          recorrer y sentir.
        </p>
      </div>
      <div class="project-grid">
        <article
          v-for="(project, index) in projects"
          :key="project.id"
          class="project"
          :class="{ 'project-featured': index === 0 }"
          data-reveal
        >
          <button
            class="project-cover"
            :class="'cover-' + project.id"
            @click="open(project)"
            @pointerenter="preview(project)"
            @pointerleave="hovered = null"
            @focus="preview(project)"
            @blur="hovered = null"
            :aria-label="'Ver el caso de ' + project.title"
          >
            <img
              :src="project.preview"
              :alt="project.previewAlt || 'Captura de ' + project.title"
              width="1200"
              height="675"
              loading="lazy"
              decoding="async"
            />
            <img
              v-if="hovered === project.id && project.gif"
              class="project-animation is-visible"
              :src="project.gif"
              alt=""
              decoding="async"
              aria-hidden="true"
            />
            <span class="cover-label">{{
              index === 0
                ? "PROYECTO DESTACADO"
                : project.number + " / SELECCIÓN"
            }}</span>
            <span class="project-open" aria-hidden="true">↗</span>
          </button>
          <div class="project-info">
            <div>
              <p class="project-category">{{ project.category }}</p>
              <h3>
                <button @click="open(project)">
                  {{ project.title }} <span aria-hidden="true">↗</span>
                </button>
              </h3>
              <p class="project-subtitle">{{ project.subtitle }}</p>
            </div>
            <div class="project-extra">
              <p v-if="index === 0">{{ project.description }}</p>
              <div class="project-stack">
                <span v-for="tech in project.stack" :key="tech">{{
                  tech
                }}</span>
              </div>
              <a
                v-if="project.download"
                class="text-link project-download"
                :href="project.download"
                :download="project.downloadName"
                :aria-label="
                  'Descargar ' +
                  project.title +
                  ' para Windows (' +
                  project.downloadSize +
                  ')'
                "
                >Descargar para Windows <span aria-hidden="true">↓</span></a
              >
              <p v-if="project.download" class="download-meta">
                Portable · {{ project.downloadSize }}
              </p>
              <p v-if="project.cardNote" class="project-card-note">
                {{ project.cardNote }}
              </p>
              <a
                v-if="project.liveLabel && project.live"
                class="text-link project-demo"
                :href="project.live"
                target="_blank"
                rel="noopener noreferrer"
                >{{ project.liveLabel }} <span aria-hidden="true">↗</span></a
              >
            </div>
          </div>
        </article>
      </div>
      <a
        class="text-link all-projects"
        href="https://github.com/SotoTomas"
        target="_blank"
        rel="noopener noreferrer"
        >Más código, experimentos e ideas en GitHub
        <span aria-hidden="true">↗</span></a
      >
    </div>
    <dialog
      ref="dialog"
      class="case-dialog"
      data-lenis-prevent
      aria-labelledby="case-title"
      @cancel.prevent="close"
      @click="
        (event) => {
          if (event.target === dialog) close();
        }
      "
    >
      <div v-if="selected" class="case-inner">
        <div class="case-top">
          <span class="eyebrow"
            >Proyecto {{ selected.number }} / {{ selected.status }}</span
          ><button
            class="case-close"
            @click="close"
            autofocus
            aria-label="Cerrar proyecto"
          >
            Cerrar ×
          </button>
        </div>
        <p class="eyebrow muted">{{ selected.category }}</p>
        <h2 id="case-title" class="section-title">{{ selected.title }}</h2>
        <p class="case-description">{{ selected.description }}</p>
        <img
          class="case-image"
          :src="selected.preview"
          :alt="selected.previewAlt || 'Vista de ' + selected.title"
          width="1200"
          height="675"
        />
        <div class="case-story">
          <div
            v-for="item in [
              { title: 'El punto de partida', text: selected.challenge },
              { title: 'La decisión', text: selected.decision },
              { title: 'Lo que toma forma', text: selected.result },
            ]"
            :key="item.title"
          >
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </div>
        </div>
        <p v-if="selected.note" class="case-note">{{ selected.note }}</p>
        <div class="case-links">
          <a
            v-if="selected.download"
            class="text-link"
            :href="selected.download"
            :download="selected.downloadName"
            >Descargar para Windows · {{ selected.downloadSize }}
            <span aria-hidden="true">↓</span></a
          >
          <a
            v-if="selected.live"
            class="text-link"
            :href="selected.live"
            target="_blank"
            rel="noopener noreferrer"
            >{{ selected.liveLabel || "Explorar demo" }}
            <span aria-hidden="true">↗</span></a
          ><a
            v-if="selected.github"
            class="text-link"
            :href="selected.github"
            target="_blank"
            rel="noopener noreferrer"
            >Ver código <span>↗</span></a
          ><span v-if="selected.availability" class="pill">{{
            selected.availability
          }}</span>
        </div>
      </div>
    </dialog>
  </section>
</template>
<style scoped>
.projects {
  padding-top: 82px;
}
.projects-heading {
  display: grid;
  grid-template-columns: 8fr 4fr;
  align-items: end;
  gap: 24px;
  margin-bottom: 80px;
}
.projects-heading > p {
  font-size: 16px;
  line-height: 1.5;
  color: var(--color-muted);
  padding-bottom: 5px;
}
.project-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 96px 24px;
}
.project {
  grid-column: span 6;
  min-width: 0;
}
.project-featured {
  grid-column: 1 / -1;
}
@media (min-width: 1001px) {
  .project:nth-child(2n + 2) {
    grid-column: 1 / 8;
  }
  .project:nth-child(2n + 3) {
    grid-column: 9 / -1;
    padding-top: 96px;
  }
}
.project-cover {
  display: block;
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--color-surface);
  padding: 0;
  isolation: isolate;
}
.project-cover > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.8s var(--ease);
  box-shadow: none;
}
.project-cover:hover > img {
  transform: scale(1.035);
}
.project-featured .project-cover {
  aspect-ratio: 2;
  padding: 0;
  background: #dadfce;
}
.project-featured .project-cover > img {
  object-fit: cover;
  box-shadow: none;
}
.cover-artmap {
  background: #dcd8e1;
}
.cover-academia-magica {
  background: #ded3bd;
}
.cover-fageon {
  background: #d4dfdf;
}
.project-extra > .project-card-note {
  margin: 16px 0 10px;
  font-size: 14px;
}
.project-demo {
  font-size: 14px;
}
.cover-caja-san-pablo {
  background: #dddcca;
}
.project-download {
  margin-top: 20px;
  font-size: 14px;
}
.project-extra > .download-meta {
  margin: 8px 0 0;
  font-size: 11px;
}
.cover-tvlaravel {
  background: #dfe1dd;
}
.cover-scout {
  background: #ddd8cb;
}
.cover-rosco {
  background: #e4d8c8;
}
.cover-label {
  position: absolute;
  left: 20px;
  top: 17px;
  font-size: 8px;
  letter-spacing: 0.1em;
  background: var(--color-bg);
  padding: 6px 8px;
  z-index: 2;
}
.project-featured .cover-label {
  top: 22px;
  left: 24px;
}
.project-open {
  position: absolute;
  bottom: 18px;
  right: 18px;
  width: 43px;
  height: 43px;
  background: var(--color-bg);
  border-radius: 0;
  display: grid;
  place-items: center;
  font-size: 24px;
  transition: transform 0.3s;
}
.project-cover:hover .project-open {
  transform: rotate(45deg);
}
.project-cover .project-animation {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.project-cover .project-animation.is-visible {
  opacity: 1;
}
.project-info {
  padding-top: 21px;
  display: flex;
  justify-content: space-between;
  gap: 26px;
}
.project-category {
  font-size: 11px;
  letter-spacing: 0.11em;
  color: var(--color-muted);
  margin-bottom: 10px;
}
.project-info h3 {
  font-family: var(--font-display);
  font-size: clamp(28px, 3vw, 44px);
  font-weight: 700;
  letter-spacing: -0.025em;
}
.project-info h3 button {
  background: transparent;
  padding: 0;
  font: inherit;
  text-align: left;
}
.project-info h3 span {
  font-family: var(--font-body);
  font-size: 18px;
  margin-left: 12px;
}
.project-subtitle {
  font-size: 14px;
  color: var(--color-muted);
  margin-top: 7px;
}
.project-extra {
  max-width: 390px;
}
.project-extra > p {
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-muted);
  margin-bottom: 18px;
}
.project-stack {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.project-stack span {
  font-size: 11px;
  border: 1px solid var(--color-border);
  border-radius: 0;
  padding: 4px 8px;
}
.project:not(.project-featured) .project-info {
  display: block;
}
.project:not(.project-featured) .project-stack {
  justify-content: flex-start;
  margin-top: 17px;
}
.project-featured h3 {
  font-size: 48px;
}
.all-projects {
  margin-top: 55px;
}
.case-dialog {
  border: 1px solid var(--color-border);
  padding: 0;
  background: var(--color-bg);
  color: var(--color-text);
  max-width: 1000px;
  width: calc(100% - 40px);
  max-height: 90dvh;
}
.case-dialog::backdrop {
  background: #181710a6;
}
.case-inner {
  padding: 40px;
}
.case-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding-bottom: 30px;
}
.case-close {
  background: var(--color-text);
  color: var(--color-bg);
  padding: 11px 18px;
  font-size: 14px;
}
.case-inner h2 {
  margin-top: 18px;
}
.case-description {
  font-size: 16px;
  line-height: 1.7;
  max-width: 670px;
  margin: 24px 0;
}
.case-image {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  object-position: top;
}
.case-story {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 26px;
  margin-top: 35px;
}
.case-story h3 {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
}
.case-story p {
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-muted);
}
.case-note {
  background: var(--color-surface);
  padding: 18px;
  margin-top: 30px;
  font-size: 14px;
  line-height: 1.7;
}
.case-links {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 25px;
  margin-top: 25px;
}
@media (prefers-reduced-motion: reduce) {
  .project-animation {
    display: none !important;
  }
}
@media (max-width: 700px) {
  .section-topline .muted {
    display: none;
  }
  .projects-heading {
    display: block;
  }
  .projects-heading > p {
    margin-top: 25px;
  }
  .project-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 56px;
  }
  .project {
    grid-column: 1 / -1;
  }
  .project-featured .project-cover {
    aspect-ratio: 1.65;
  }
  .project-featured .project-cover > img {
    object-fit: contain;
  }
  .project-info {
    display: block;
  }
  .project-extra {
    margin-top: 20px;
    max-width: none;
  }
  .project-stack {
    justify-content: flex-start;
  }
  .project-cover {
    padding: 0;
  }
  .project-cover .project-animation {
    inset: 0;
    width: 100%;
    height: 100%;
  }
  .case-inner {
    padding: 24px;
  }
  .case-story {
    grid-template-columns: 1fr;
  }
  .case-top .eyebrow {
    font-size: 11px;
  }
  .case-close {
    white-space: nowrap;
  }
  .case-dialog {
    width: calc(100% - 20px);
  }
}
</style>
