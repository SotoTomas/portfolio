// ─────────────────────────────────────────────────────────────
// vite.config.js — Configuración de Vite
// usePolling habilitado para compatibilidad con Windows (WSL/HMR)
// ─────────────────────────────────────────────────────────────
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base:'/portfolio',
  server: {
    watch: {
      usePolling: true,   // Necesario en Windows para que HMR funcione
    },
  },
})
