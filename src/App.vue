<script setup>
import { ref } from "vue";
import { useLenis } from "./composables/useLenis";
import { useGsap } from "./composables/useGsap";
import NavBar from "./components/NavBar.vue";
import HeroSection from "./components/HeroSection.vue";
import PortfolioSection from "./components/PortfolioSection.vue";
import AboutSection from "./components/AboutSection.vue";
import ContactSection from "./components/ContactSection.vue";
import FooterComponent from "./components/FooterComponent.vue";
const root = ref(null);
useLenis();
useGsap(root);
</script>
<template>
  <div ref="root" class="site">
    <a href="#main-content" class="skip-link">Saltar al contenido</a>
    <NavBar />
    <main id="main-content">
      <HeroSection />
      <PortfolioSection />
      <AboutSection />
      <ContactSection />
    </main>
    <FooterComponent />
  </div>
</template>
<style>
@import "./styles/tokens.css";
.site {
  position: relative;
  overflow: clip;
}
</style>
