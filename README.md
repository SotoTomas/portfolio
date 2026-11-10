# Tomás Soto — Materia → Interfaz

Portfolio editorial con Vue 3 + Vite, Three.js, GSAP / ScrollTrigger, Lenis y VueUse Motion. Tipografías locales: Fraunces y DM Sans.

## Desarrollo

```sh
npm install
npm run dev
npm run build
npm run preview
```

La ruta base es `/portfolio/`, compatible con el destino de GitHub Pages existente. `npm run deploy` publica; no se ejecuta como parte de la compilación.

## Contenido y arquitectura

- `src/data/projects.js`: contenido, estado y enlaces de los ocho proyectos. Organiza es el destacado; también incluye Caja San Pablo, Academia Mágica Latinoamericana (con demo de IA) y Fageon.
- `src/components/PaperScene.vue` y `src/composables/usePaperScene.js`: escultura procedural, pausa, alternativa SVG y liberación de recursos.
- `src/composables/useLenis.js` y `useGsap.js`: desplazamiento y animación con limpieza de ciclo de vida.
- `src/styles/tokens.css`: paleta, tipografía y estilos compartidos.
- `src/components/PortfolioSection.vue`: grilla editorial y fichas en diálogos accesibles con View Transitions progresivas.

La dirección de arte, decisiones técnicas, adaptación futura a Nuxt y límites de rendimiento se detallan en [Materia → Interfaz](docs/materia-interfaz.md).

Se conservan los PNG, JPG y GIF originales; el sitio usa sus versiones optimizadas cuando son más pequeñas. Organiza y Caja San Pablo tienen portadas gráficas y descargas portables para Windows desde sus tarjetas y fichas.

## Descargables

Los ejecutables de `public/downloads/` se copian a `dist/downloads/` al compilar, conservando la ruta base del sitio. Provienen de:

- Organiza 1.1.3: `E:\proyectosDev\Organizador\release\Organiza-Portable-1.1.3.exe`.
- Caja San Pablo 1.0.1: `E:\proyectosDev\herramienta-contabilidad-sanpablo\portable\Caja San Pablo 1.0.1.exe`.

Organiza ocupa 113 MB y se distribuye mediante la [Release Organiza 1.1.3](https://github.com/SotoTomas/portfolio/releases/tag/organiza-v1.1.3), con enlace directo desde `src/data/projects.js`. Su ejecutable no se incluye en la build para respetar el límite de archivos de GitHub. Caja San Pablo se sirve desde `public/downloads/`.
