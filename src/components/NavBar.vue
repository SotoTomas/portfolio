<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
const active = ref("hero");
let observer;
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) active.value = entry.target.id;
      });
    },
    { rootMargin: "-20% 0px -55% 0px" },
  );
  document
    .querySelectorAll("main > section")
    .forEach((el) => observer.observe(el));
});
onBeforeUnmount(() => observer?.disconnect());
</script>
<template>
  <header class="nav">
    <div class="container nav-inner">
      <a class="wordmark" href="#hero" aria-label="Tomás Soto, inicio"
        >Tomás Soto<span aria-hidden="true">.</span></a
      >
      <span class="nav-caption">DISEÑO &amp; DESARROLLO WEB</span>
      <nav aria-label="Principal">
        <a
          v-for="link in [
            { id: 'portfolio', label: 'Proyectos' },
            { id: 'sobre-mi', label: 'Sobre mí' },
            { id: 'contacto', label: 'Hablemos' },
          ]"
          :key="link.id"
          :href="'#' + link.id"
          :aria-current="active === link.id ? 'location' : undefined"
          >{{ link.label
          }}<span v-if="link.id === 'contacto'" aria-hidden="true"> ↗</span></a
        >
      </nav>
    </div>
  </header>
</template>
<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 30;
  background: var(--color-bg);
}
.nav-inner {
  height: 92px;
  display: flex;
  align-items: center;
  gap: 55px;
  border-bottom: 1px solid var(--color-border);
}
.wordmark {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -1.1px;
  white-space: nowrap;
}
.wordmark span {
  font-family: var(--font-body);
  font-size: 12px;
  vertical-align: top;
  margin-left: 5px;
  letter-spacing: 0;
}
.nav-caption {
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--color-muted);
}
nav {
  margin-left: auto;
  display: flex;
  gap: 35px;
}
nav a {
  font-size: 14px;
  padding: 12px 0;
}
nav a:hover,
nav a[aria-current] {
  color: var(--color-accent);
}
@media (max-width: 850px) {
  .nav-caption {
    display: none;
  }
  .nav-inner {
    height: 76px;
    gap: 20px;
  }
  nav {
    gap: 22px;
  }
}
@media (max-width: 440px) {
  .wordmark {
    font-size: 22px;
  }
  nav {
    gap: 14px;
  }
  nav a {
    font-size: 11px;
  }
}

nav a {
  min-height: 44px;
  display: flex;
  align-items: center;
  white-space: nowrap;
}
@media (max-width: 380px) {
  .wordmark {
    font-size: 17px;
  }
  .nav-inner {
    gap: 8px;
  }
  nav {
    gap: 8px;
  }
  nav a {
    font-size: 10px;
  }
}
</style>
