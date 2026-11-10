# Materia → Interfaz

Dirección creativa e implementación de la primera versión, septiembre de 2026.

## 1. Dirección creativa

La narrativa une diseño gráfico y desarrollo: una idea adquiere forma, estructura y comportamiento hasta convertirse en una herramienta. La portada dice «De la idea a la interfaz»; los proyectos explican la transformación con evidencias concretas.

La paleta usa papel cálido `#F0EDE6`, tinta `#24231F`, superficie `#E8E4DA` y naranja `#E8610A` en la escultura. Para texto naranja se usa el tono más oscuro `#A8441B`, que conserva la identidad y mejora el contraste. Los textos secundarios usan `#68645B`.

Fraunces crea la voz editorial con proporciones amplias y detalles artísticos; su cursiva enfatiza una palabra, no párrafos completos. DM Sans se reserva para descripciones, navegación y controles. Las fuentes se sirven localmente. La retícula alterna una portada asimétrica, un proyecto destacado a todo el ancho y cuatro proyectos en dos columnas. En móvil, todo pasa a una columna sin scroll horizontal obligatorio.

El espacio negativo organiza la lectura: una idea principal por bloque, márgenes amplios y separadores finos. La escultura tiene su propio espacio y no tapa títulos ni enlaces.

## 2. Escena WebGL

Siete láminas comparten una geometría de 32 × 40 segmentos. Su curvatura combina una onda sinusoidal y un pliegue en el eje X. Tres materiales producen papel claro, papel más oscuro y una única hoja naranja.

El cursor modifica la orientación con interpolación dependiente del delta de tiempo. El avance de ScrollTrigger reduce la separación y el ángulo de las hojas, mientras el uniform `uFold` aplana su curvatura. La transformación sucede dentro de la portada; esta versión no convierte todavía la escultura en el marco del primer proyecto.

El vertex shader aplica el aplanado y corrige las normales para esa escala. El fragment shader combina iluminación direccional suave y ruido en UV de baja amplitud para sugerir fibra de papel. Incluye conversión de espacio de color. No hay bloom, aberración cromática, desenfoque de profundidad ni sombras dinámicas: no aportan a esta dirección y exigirían pases adicionales.

La implementación usa Three.js puro dentro de `usePaperScene`. No incorpora TresJS porque una escena pequeña, procedural y de propietario único no necesita otra capa de componentes. El renderer se importa dinámicamente. Un SVG propio conserva la composición cuando se solicita movimiento reducido, ahorro de datos o falla WebGL. Un botón permite pausar el movimiento.

## 3. Vue y estado

Se conserva Vue 3 + Vite, ya presente en el proyecto. Es una SPA de una página: no tiene SSR, hidratación ni rutas de detalle. Las fichas son diálogos nativos y emplean View Transitions cuando el navegador lo permite. Su contenido y sus enlaces funcionan sin esa API.

`PaperScene` se monta una sola vez como hijo de `App`, fuera del contenido de proyectos. Abrir una ficha no recrea el renderer. Las coordenadas del canvas siguen el espacio de ilustración mediante ResizeObserver. La escena es decorativa; toda la información y navegación permanecen en HTML.

- `useGsap(scope)`: agrupa las animaciones DOM en un contexto, limita los selectores a la raíz Vue y revierte tanto animaciones como ScrollTriggers al desmontar. `matchMedia` atiende cambios en movimiento reducido.
- `useLenis()`: crea una sola instancia para la app. El ticker de GSAP entrega segundos, convertidos a milisegundos para Lenis. ScrollTrigger se actualiza desde el evento de scroll. Se conserva el desplazamiento táctil nativo y se evita interceptar el scroll de los diálogos.
- `usePaperScene(host, ready)`: posee recursos GPU, observadores y loop. Las posiciones, el cursor y el progreso son variables normales en una closure; no actualizan refs de Vue por cuadro.
- Vue controla estados discretos: proyecto seleccionado, estado del diálogo, paso de proceso, sección activa, pausa y disponibilidad del canvas. Las instancias Three no entran en `reactive()` ni en un store.
- VueUse Motion anima el pequeño símbolo junto al retrato al interactuar. GSAP es responsable de las entradas y Three del objeto; las librerías no escriben sobre el mismo elemento.

Si se incorporan rutas de casos con SSR en Nuxt, `GlobalCanvas.client.vue` debería vivir en `app.vue`, como hermano de `NuxtLayout`/`NuxtPage`, sin una key dependiente de la ruta. El HTML debe conservar el hueco y la composición estática durante SSR. Las páginas comunicarían identificador de escena y progreso; nunca un renderer serializado en `useState`. Los hooks de navegación restaurarían scroll y foco y refrescarían ScrollTrigger después de estabilizar el nuevo layout. Esta migración no se implementó en esta versión.

## 4. Secciones

**Portada:** nombre e identidad, promesa breve, objeto de papel y acceso inmediato a proyectos. No hay pantalla de carga obligatoria ni texto que dependa de WebGL.

**Trabajo seleccionado:** Organiza abre el recorrido. Su portada es una pieza gráfica, no una captura de la aplicación. Las otras piezas conservan capturas reales. Cada caso cuenta punto de partida, decisión y resultado; no se inventan métricas de impacto. TVLaravel distingue expresamente la demo visual del backend desactivado. Comunidad San Pablo conserva su estado «En construcción».

**Sobre mí:** retrato, formación y herramientas se conectan con un pequeño explorador de proceso: Entender → Dar forma → Construir. Los tres botones funcionan con teclado y anuncian el cambio de texto. El CV sigue enlazado.

**Contacto:** email directo y enlaces originales a LinkedIn, GitHub, Behance y WhatsApp. El portfolio no simula un envío de formulario ni afirma que un correo fue enviado.

## 5. Rendimiento y ciclo de vida

El objetivo es mantener un presupuesto de 16,7 ms por cuadro en una pantalla de 60 Hz. No se promete una frecuencia universal: depende de GPU, pantalla, batería y navegador. Falta medir en teléfonos físicos representativos antes de calificar esta versión como producción validada.

- DPR limitado a 1,6 en escritorio y 1,25 en pantallas pequeñas. Si más de 35 de las primeras 120 muestras de ticker superan 24 ms, se reduce a 1. Es una heurística de entrega de cuadros, no una medición de tiempo GPU.
- La escena retira su callback del ticker al salir del viewport, ocultar la pestaña, activar movimiento reducido o pausar. Lenis mantiene su propio callback necesario para la navegación.
- Una geometría y tres materiales compartidos para siete meshes. No hay texturas 3D ni modelos remotos.
- Al desmontar: eliminar ticker y listeners, matar ScrollTrigger, desconectar observadores, liberar geometría y materiales, vaciar escena, disponer renderer y liberar contexto. Los imports asíncronos comprueban si el componente sigue montado.
- Las imágenes estáticas se sirven como WebP, con dimensiones declaradas y carga diferida. Los originales se conservan en el repositorio.
- Las animaciones de proyectos se montan solamente al interactuar y se desmontan al salir. Se omiten si el usuario solicita menos movimiento o ahorro de datos. Para los GIF grandes se generaron versiones WebP animadas; el GIF de tienda se conserva porque es más pequeño que su conversión.
- Las fuentes son locales. El chunk Three queda separado del JavaScript de interfaz; Vite advierte por su tamaño sin comprimir. Dividirlo artificialmente no elimina el costo de la librería.

## Verificación y próximos límites

Validación local: compilación de producción; revisión visual en escritorio y móvil; navegación por anclas; apertura/cierre de fichas, Escape y recuperación del foco; controles de proceso; carga de imágenes y consola del navegador. Auditoría de npm sin vulnerabilidades después de actualizar dos dependencias transitivas compatibles.

Organiza se distribuye desde una GitHub Release para respetar el límite de archivos del repositorio; Caja San Pablo se incluye en la build. Antes de futuras publicaciones: confirmar el estado actual de disponibilidad laboral y formación, y medir Core Web Vitals y rendimiento en dispositivos físicos. El proyecto sigue siendo CSR, por lo que una futura estrategia de páginas indexables por caso requeriría prerender o Nuxt.

Referencias técnicas: [Lenis](https://github.com/darkroomengineering/lenis), [contextos GSAP](<https://gsap.com/docs/v3/GSAP/gsap.context()/>), [VueUse Motion](https://motion.vueuse.org/api/use-motion/), [gestión de recursos en Three.js](https://threejs.org/manual/en/cleanup.html).
