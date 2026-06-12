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
            title: "Sobre mí",
            description1: "¡Hola! Soy Franklin, Full Stack Developer con enfoque en Data Engineering, Machine Learning y DevOps. Actualmente estudio Ingeniería en Sistemas, combinando teoría académica con práctica profesional en proyectos reales.",
            description2: "Me apasiona construir sistemas que extraen valor de los datos: desde pipelines ETL hasta modelos ML en producción, pasando por infraestructura cloud automatizada. Trabajo con Python, FastAPI, Docker, Kubernetes y herramientas de observabilidad como Prometheus y Grafana. Cuando no estoy programando, disfruto de la música, la naturaleza, el origami, resolver puzzles, los cubos de Rubik y los videojuegos.",
        },
        skills: {
            title: "Habilidades",
            description: "Domino múltiples lenguajes incluyendo JavaScript, TypeScript, Python y Go. Especializado en desarrollo web moderno con React, Astro y Node.js, utilizando Tailwind, Sass y Bootstrap para diseño, combinado con bases de datos SQL y NoSQL.",
        },
        portfolio: {
            title: "Proyectos",
            featured: "Proyectos Destacados",
            otherProjects: "Otros Proyectos",
        },
        blog: {
            title: "Hobbies",
            description: "Un vistazo a mis intereses y proyectos personales fuera del trabajo.",
            readMore: "Leer mas",
        },
        contact: {
            title: "Contacto",
            description: "¿Tienes un proyecto en mente? ¿Quieres colaborar? ¡Hablemos! Estoy disponible para nuevas oportunidades y proyectos interesantes.",
            emailLabel: "Email",
            emailText: "Envíame un correo",
            githubLabel: "GitHub",
            linkedinLabel: "LinkedIn",
            linkedinText: "Conéctate conmigo",
            followLabel: "Sígueme en redes sociales",
            availability: "💼 Disponible para trabajos freelance y oportunidades laborales",
        },
        buttons: {
            viewMore: "Ver más",
            github: "GitHub",
            demo: "Demo",
            repo: "Repositorio",
            viewDemo: "Ver Demo",
            prevProject: "Proyecto anterior",
            nextProject: "Siguiente proyecto",
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
            description1: "Hello! I'm Franklin, a Full Stack Developer focused on Data Engineering, Machine Learning and DevOps. I'm currently studying Systems Engineering, combining academic theory with professional practice on real projects.",
            description2: "I'm passionate about building systems that extract value from data: from ETL pipelines to production ML models, through automated cloud infrastructure. I work with Python, FastAPI, Docker, Kubernetes and observability tools like Prometheus and Grafana. When I'm not coding, I enjoy music, nature, origami, solving puzzles, Rubik's cubes and video games.",
        },
        skills: {
            title: "Skills",
            description: "I master multiple languages including JavaScript, TypeScript, Python and Go. Specialized in modern web development with React, Astro and Node.js, using Tailwind, Sass and Bootstrap for design, combined with SQL and NoSQL databases.",
        },
        portfolio: {
            title: "Projects",
            featured: "Featured Projects",
            otherProjects: "Other Projects",
        },
        blog: {
            title: "Hobbies",
            description: "A glimpse into my interests and personal projects outside of work.",
            readMore: "Read more",
        },
        contact: {
            title: "Contact",
            description: "Do you have a project in mind? Want to collaborate? Let's talk! I'm available for new opportunities and interesting projects.",
            emailLabel: "Email",
            emailText: "Send me an email",
            githubLabel: "GitHub",
            linkedinLabel: "LinkedIn",
            linkedinText: "Connect with me",
            followLabel: "Follow me on social media",
            availability: "💼 Available for freelance work and job opportunities",
        },
        buttons: {
            viewMore: "View More",
            github: "GitHub",
            demo: "Demo",
            repo: "Repository",
            viewDemo: "View Demo",
            prevProject: "Previous project",
            nextProject: "Next project",
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
