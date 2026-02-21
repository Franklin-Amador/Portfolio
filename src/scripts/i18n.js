const translations = {
  es: {
    nav: {
      home: "Home",
      about: "Acerca de",
      projects: "Proyectos",
      hobbies: "Hobbies",
      contact: "Contacto",
    },
    hero: {
      subtitle1: "Full Stack Developer especializado en Data Engineering, Machine Learning y DevOps.",
      subtitle2: "Construyo pipelines de datos robustos, modelos ML en producción y arquitecturas cloud escalables.",
      buttonProjects: "Ver Proyectos",
      buttonContact: "Contactar",
    },
    about: {
      title: "Sobre mí",
      description1: "¡Hola! Soy Franklin, Full Stack Developer con enfoque en Data Engineering, Machine Learning y DevOps. Actualmente estudio Ingeniería en Sistemas, combinando teoría académica con práctica profesional en proyectos reales.",
      description2: "Me apasiona construir sistemas que extraen valor de los datos: desde pipelines ETL hasta modelos ML en producción, pasando por infraestructura cloud automatizada. Trabajo con Python, FastAPI, Docker, Kubernetes y herramientas de observabilidad como Prometheus y Grafana. Cuando no estoy programando, disfruto de la música, la naturaleza, el origami, resolver puzzles, los cubos de Rubik y los videojuegos.",
    },
    skills: {
      title: "Habilidades",
    },
    portfolio: {
      title: "Proyectos",
    },
    blog: {
      title: "Hobbies",
    },
    contact: {
      title: "Contacto",
      description: "¿Tienes un proyecto en mente? ¿Quieres colaborar? ¡Hablemos! Estoy disponible para nuevas oportunidades y proyectos interesantes.",
    },
    buttons: {
      viewMore: "Ver más",
      github: "GitHub",
      demo: "Demo",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      hobbies: "Hobbies",
      contact: "Contact",
    },
    hero: {
      subtitle1: "Full Stack Developer specialized in Data Engineering, Machine Learning and DevOps.",
      subtitle2: "I build robust data pipelines, production ML models and scalable cloud architectures.",
      buttonProjects: "View Projects",
      buttonContact: "Get in Touch",
    },
    about: {
      title: "About Me",
      description1: "Hello! I'm Franklin, a Full Stack Developer focused on Data Engineering, Machine Learning and DevOps. I'm currently studying Systems Engineering, combining academic theory with professional practice on real projects.",
      description2: "I'm passionate about building systems that extract value from data: from ETL pipelines to production ML models, through automated cloud infrastructure. I work with Python, FastAPI, Docker, Kubernetes and observability tools like Prometheus and Grafana. When I'm not coding, I enjoy music, nature, origami, solving puzzles, Rubik's cubes and video games.",
    },
    skills: {
      title: "Skills",
    },
    portfolio: {
      title: "Projects",
    },
    blog: {
      title: "Hobbies",
    },
    contact: {
      title: "Contact",
      description: "Do you have a project in mind? Want to collaborate? Let's talk! I'm available for new opportunities and interesting projects.",
    },
    buttons: {
      viewMore: "View More",
      github: "GitHub",
      demo: "Demo",
    },
  },
};

function getTranslation(key, lang = "es") {
  const keys = key.split(".");
  let value = translations[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}

function updateAllTranslations(lang) {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const text = getTranslation(key, lang);
    el.textContent = text;
  });
}

// Actualizar cuando cambia el idioma
document.addEventListener("languageChanged", (e) => {
  updateAllTranslations(e.detail.language);
});

// Actualizar al cargar
const initialLang = document.documentElement.getAttribute("data-language") || "es";
updateAllTranslations(initialLang);
