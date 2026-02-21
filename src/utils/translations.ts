export const translations = {
  es: {
    nav: {
      home: "Home",
      about: "Acerca de",
      projects: "Proyectos",
      hobbies: "Hobbies",
      contact: "Contacto",
    },
    hero: {
      title: "Franklin Amador",
      subtitle1: "Full Stack Developer especializado en Data Engineering, Machine Learning y DevOps.",
      subtitle2: "Construyo pipelines de datos robustos, modelos ML en producción y arquitecturas cloud escalables.",
      buttonProjects: "Ver Proyectos",
      buttonContact: "Contactar",
    },
    about: {
      title: "Acerca de mí",
      description: "Soy un Full Stack Developer apasionado por los datos y la arquitectura de sistemas. Con experiencia en Data Engineering, Machine Learning y DevOps, me especializo en crear soluciones escalables que transforman datos en insights valiosos.",
    },
    skills: {
      title: "Habilidades",
      description: "Tecnologías y herramientas que domino",
    },
    portfolio: {
      title: "Proyectos",
      description: "Aquí puedes ver algunos de mis proyectos destacados",
    },
    blog: {
      title: "Hobbies",
      description: "Mi blog con artículos sobre tecnología y otros intereses",
    },
    contact: {
      title: "Contacto",
      description: "¿Te interesa trabajar juntos? Contáctame",
      email: "Enviar Email",
      subject: "Asunto del mensaje",
      message: "Tu mensaje",
      send: "Enviar",
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
      title: "Franklin Amador",
      subtitle1: "Full Stack Developer specialized in Data Engineering, Machine Learning and DevOps.",
      subtitle2: "I build robust data pipelines, production ML models and scalable cloud architectures.",
      buttonProjects: "View Projects",
      buttonContact: "Get in Touch",
    },
    about: {
      title: "About Me",
      description: "I'm a Full Stack Developer passionate about data and system architecture. With experience in Data Engineering, Machine Learning and DevOps, I specialize in creating scalable solutions that transform data into valuable insights.",
    },
    skills: {
      title: "Skills",
      description: "Technologies and tools I master",
    },
    portfolio: {
      title: "Projects",
      description: "Here you can see some of my featured projects",
    },
    blog: {
      title: "Hobbies",
      description: "My blog with articles about technology and other interests",
    },
    contact: {
      title: "Contact",
      description: "Interested in working together? Get in touch",
      email: "Send Email",
      subject: "Message Subject",
      message: "Your message",
      send: "Send",
    },
    buttons: {
      viewMore: "View More",
      github: "GitHub",
      demo: "Demo",
    },
  },
};

export function getTranslation(key: string, lang: string = "es"): string {
  const keys = key.split(".");
  let value: any = translations[lang as keyof typeof translations];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}
