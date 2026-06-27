<script setup>
// ─────────────────────────────────────────────────────────────
// App.vue — Componente raíz del portfolio
// Ensambla todos los componentes y activa el composable useReveal
// ─────────────────────────────────────────────────────────────

import { useReveal }        from './composables/useReveal.js'
import NavBar               from './components/NavBar.vue'
import CursorFollower       from './components/CursorFollower.vue'
import HeroSection          from './components/HeroSection.vue'
import AboutSection         from './components/AboutSection.vue'
import PortfolioSection     from './components/PortfolioSection.vue'
import EducationSection     from './components/EducationSection.vue'
import SkillsSection        from './components/SkillsSection.vue'
import ContactSection       from './components/ContactSection.vue'
import FooterComponent      from './components/FooterComponent.vue'

// Activa el sistema de reveal-on-scroll para todos los [data-reveal]
useReveal('[data-reveal]')
</script>

<template>
  <!-- Cursor personalizado (solo desktop con mouse) -->
  <CursorFollower />

  <!-- Barra de navegación fija -->
  <NavBar />

  <!-- Contenido principal -->
  <main id="main-content">
    <HeroSection />
    <AboutSection />
    <PortfolioSection />
    <EducationSection />
    <SkillsSection />
    <ContactSection />
  </main>

  <!-- Pie de página -->
  <FooterComponent />
</template>

<style>
/* Importar tokens globales de diseño */
@import './styles/tokens.css';
</style>
