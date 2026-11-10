const asset = (path) => import.meta.env.BASE_URL + path;
export const projects = [
  {
    id: "organiza",
    title: "Organiza",
    subtitle: "Un lugar para cada pendiente.",
    category: "PRODUCTO DIGITAL / DESKTOP",
    number: "01",
    status: "Versión 1.1.3",
    description:
      "Agenda y gestión de clientes para profesionales freelance. Tareas, contactos y entregas conectados en un mismo espacio.",
    stack: ["Vue 3", "Tailwind CSS", "Electron"],
    preview: asset("previews/organiza.svg"),
    previewAlt: "Portada gráfica de Organiza",
    download: "https://github.com/SotoTomas/portfolio/releases/download/organiza-v1.1.3/Organiza-Portable-1.1.3.exe",
    downloadName: "Organiza-Portable-1.1.3.exe",
    downloadSize: "113 MB",
    github: null,
    live: null,
    availability: "Aplicación para Windows",
    challenge:
      "El trabajo freelance necesita conectar el seguimiento de clientes con los compromisos de cada semana.",
    decision:
      "Las entregas finales e intermedias de cada cliente aparecen también en la agenda. Las recurrencias permiten planificar por días de la semana.",
    result:
      "Fichas con accesos a WhatsApp y correo, exportación PDF, vistas semanal, mensual y anual, y almacenamiento local con copias de respaldo en escritorio.",
    note: "Versión portable para Windows: descargá el ejecutable y abrilo sin instalar.",
  },
  {
    id: "caja-san-pablo",
    title: "Caja San Pablo",
    subtitle: "Las cuentas claras, en un solo lugar.",
    category: "HERRAMIENTA CONTABLE / DESKTOP",
    number: "02",
    status: "Versión 1.0.1",
    description:
      "Herramienta contable para gestionar ventas, productos, stock y gastos de ferias, eventos y campamentos de la comunidad San Pablo.",
    stack: ["Vue 3", "IndexedDB", "Electron"],
    preview: asset("previews/caja-san-pablo.svg"),
    previewAlt: "Portada gráfica de Caja San Pablo",
    download: asset("downloads/Caja-San-Pablo-Portable-1.0.1.exe"),
    downloadName: "Caja-San-Pablo-Portable-1.0.1.exe",
    downloadSize: "91,6 MB",
    github: null,
    live: null,
    availability: "Aplicación para Windows · 64 bits",
    challenge:
      "Llevar las cuentas de una actividad comunitaria requiere reunir ventas, compras y comprobantes sin perder de vista el stock.",
    decision:
      "Una caja táctil con productos configurables y almacenamiento local. Los movimientos alimentan el historial y los reportes de cada actividad.",
    result:
      "Consulta de recaudación, gastos y ganancias, exportación CSV y PDF, y respaldos automáticos al cerrar la aplicación de escritorio.",
    note: "Versión portable para Windows: descargá el ejecutable y abrilo sin instalar. Los datos se guardan en el dispositivo.",
  },
  {
    id: "artmap",
    title: "Atlas del arte",
    subtitle: "La historia, desde otra perspectiva.",
    category: "EXPERIENCIA INTERACTIVA / WEBGL",
    number: "03",
    status: "En construcción",
    description:
      "Un mapa 3D para explorar Historia del Arte. Un proyecto que nació de una necesidad propia: encontrar otra forma de estudiar.",
    stack: ["Vue.js", "Three.js", "Tailwind CSS"],
    preview: asset("previews/artmap.webp"),
    gif: asset("gifs/artmap.webp"),
    github: "https://github.com/SotoTomas/art-history-map",
    live: "https://sototomas.github.io/art-history-map/",
    challenge:
      "Transformar los contenidos de Historia del Arte en una experiencia que invite a explorar.",
    decision:
      "Un mapa tridimensional navegable, con rotación, zoom y puntos de interés que permiten consultar información.",
    result:
      "Una herramienta de estudio que conecta desarrollo web, exploración espacial y formación en diseño gráfico.",
  },
  {
    id: "tvlaravel",
    title: "TVLaravel",
    subtitle: "Del catálogo a la experiencia.",
    category: "E-COMMERCE / FULL STACK",
    number: "04",
    status: "Demo de interfaz",
    description:
      "Tienda virtual con una arquitectura de comercio y gestión construida con Laravel, Vue e Inertia.",
    stack: ["Laravel", "Vue.js", "Inertia.js", "MySQL"],
    preview: asset("previews/tienda-virtual.webp"),
    gif: asset("gifs/tienda-virtual.gif"),
    github: "https://github.com/SotoTomas/TVLaravel",
    live: "https://sototomas.github.io/tienda-virtual/",
    challenge:
      "Reunir catálogo, carrito y administración de productos en un mismo proyecto.",
    decision:
      "Arquitectura MVC con autenticación, roles y un panel de gestión. Vue e Inertia conectan la experiencia de interfaz con Laravel.",
    result:
      "El repositorio conserva el trabajo full stack. La demo publicada permite recorrer la interfaz.",
    note: "El backend y la base de datos están desactivados en la demo pública; no permite realizar compras reales.",
  },
  {
    id: "scout",
    title: "Comunidad San Pablo",
    subtitle: "Una comunidad, más cerca.",
    category: "DISEÑO WEB / COMUNIDAD",
    number: "05",
    status: "En construcción",
    description:
      "Rediseño del sitio de la Comunidad Scout-guía San Pablo, con foco en claridad, experiencia de usuario y rendimiento.",
    stack: ["HTML", "CSS", "JavaScript"],
    preview: asset("previews/rediseñoWeb.webp"),
    gif: asset("gifs/rediseñoWeb.webp"),
    github: "https://github.com/SotoTomas/scout-guia-sp",
    live: "https://sototomas.github.io/scout-guia-sp/",
    challenge:
      "Mejorar la forma en que la comunidad se presenta y comparte su información en la web.",
    decision:
      "Revisar la jerarquía visual y la experiencia de navegación del sitio existente.",
    result:
      "Un rediseño en construcción que conecta mi trabajo de desarrollo con mi participación en el mundo scout.",
  },
  {
    id: "rosco",
    title: "Rosco de palabras",
    subtitle: "Aprender también es jugar.",
    category: "JUEGO WEB / EDUCACIÓN",
    number: "06",
    status: "Finalizado",
    description:
      "Trivia de Historia del Arte con temporizador, modos de juego y puntuación. Del estudio personal a una herramienta compartida.",
    stack: ["JavaScript", "CSS", "Firebase"],
    preview: asset("previews/pasapalabra.webp"),
    gif: asset("gifs/pasapalabra.webp"),
    github: "https://github.com/SotoTomas/Pasapalabra",
    live: "https://sototomas.github.io/Pasapalabra/",
    challenge:
      "Practicar y memorizar conceptos de Historia del Arte de una manera participativa.",
    decision:
      "Convertir el repaso en un rosco de preguntas con distintos modos, temporizador y sistema de puntuación.",
    result:
      "El proyecto se compartió comercialmente con compañeros de carrera y se amplió con acceso mediante cuentas de Firebase.",
  },
  {
    id: "academia-magica",
    title: "Academia Mágica Latinoamericana",
    subtitle: "Tus decisiones escriben la historia.",
    category: "AVENTURA NARRATIVA / INTELIGENCIA ARTIFICIAL",
    number: "07",
    status: "Demo disponible",
    description:
      "Una aventura narrativa y social en una academia de magia, donde tus elecciones construyen vínculos y dan forma a tu propia historia. Conocé a personajes originales, avanzá por capítulos, intercambiá mensajes y publicaciones, y participá en encuentros interactivos con inteligencia artificial.",
    stack: ["Narrativa interactiva", "IA", "Diseño responsive"],
    preview: asset("previews/academia-magica.svg"),
    previewAlt: "Portada gráfica de Academia Mágica Latinoamericana",
    github: null,
    live: "https://sototomas.github.io/academia-demo/",
    liveLabel: "Probar la IA y conocer personajes",
    cardNote: "Demo disponible para interactuar con los personajes y probar la IA.",
    challenge:
      "Crear una historia propia dentro de una academia de magia, con vínculos que se construyen a partir de las decisiones de cada jugador.",
    decision:
      "Reunir capítulos jugables, mensajes, publicaciones y encuentros con inteligencia artificial en una interfaz de pergamino, con temas inspirados en las casas y adaptación para móviles.",
    result:
      "Un mundo con doce personajes originales, manuales mágicos y un sistema de reputación y relaciones que evoluciona con cada decisión.",
    note: "Hay una demo disponible para que pruebes cómo responde la IA e interactúes con los personajes.",
  },
  {
    id: "fageon",
    title: "Fageon",
    subtitle: "De cada comprobante a información clara.",
    category: "GESTIÓN DOCUMENTAL / INTELIGENCIA ARTIFICIAL",
    number: "08",
    status: "Plataforma empresarial",
    description:
      "Plataforma de gestión documental para empresas argentinas. Lee facturas, recibos y otros comprobantes con OCR e inteligencia artificial, y organiza la información para facilitar su revisión y seguimiento comercial y fiscal. Automatiza tareas repetitivas sin perder de vista la evidencia ni el control humano.",
    stack: ["OCR", "Inteligencia artificial", "Gestión documental"],
    preview: asset("previews/fageon.svg"),
    previewAlt: "Portada gráfica de Fageon",
    github: null,
    live: null,
    challenge:
      "Facilitar la revisión y el seguimiento comercial y fiscal de facturas, recibos y otros comprobantes de empresas argentinas.",
    decision:
      "Combinar OCR e inteligencia artificial para leer los documentos y organizar la información, conservando la evidencia y la revisión humana.",
    result:
      "Una plataforma que automatiza tareas documentales repetitivas y reúne la información para su consulta y seguimiento.",
  },
];
