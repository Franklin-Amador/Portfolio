/**
 * @SofiDev Esto es JSDOC, si consideras que puede ser complicado solo borralo, es un comentario, no afectará en nada
 * @typedef PortafolioData
 * @property {string} imgSrc Url de la imagen
 * @property {string} title Titulo de la tarjeta
 * @property {string[]} skills Array con tus habilidades ej: ['React', 'CSS', 'JavaScript']
 * @property {string} descripcion La descripcion de la tarjeta
 * @property {string} demoURL Url de una pagina de demostración
 * @property {string} repoURL Url del repositorio, ej: https://github.com/usuario/repo
 * @property {string} anim La animación que se ejecutará cuando se cargue la tarjeta, ej: fade-up, fade-right, fade-left, fade-down
 * @property {number} averageBrightness Cuanto brillo tendrá el color de fondo de la tarjeta, ej: 0.1
 */

/**
 * @SofiDev Esto es JSDOC, si consideras que puede ser complicado solo borralo, es un comentario, no afectará en nada
 * @type {PortafolioData[]}
 */
export const portafolioData = [
	{
		imgSrc: "/img/lumina.png",
		title: 'Lumina - Plataforma de Cursos',
		skills: ['Azure', 'Terraform', 'Docker', 'SQL Server'],
		descripcion:
			'Plataforma de cursos online con arquitectura sólida en Azure. Implementa Infrastructure as Code con Terraform, Azure Database y Blob Storage para contenidos multimedia.',
		demoURL: '',
		repoURL: 'https://github.com/Franklin-Amador/Backend-lumina-api',
		anim: 'fade-right',
		averageBrightness: 0.2,
	},
	{
		imgSrc: "/img/ephpm.png",
		title: 'Clasificador de Economía - Modelo ML',
		skills: ['Python', 'Jupyter', 'Next.js', 'Docker'],
		descripcion:
			'Sistema full-stack de análisis macroeconómico basado en datos oficiales de EPHPM julio 2025. Pipeline ETL completo con modelo ML optimizado en ONNX para predicciones económicas.',
		demoURL: 'https://frontend-ephpm-2025.vercel.app/',
		repoURL: 'https://github.com/Franklin-Amador/BASE-EPHPM-JULIO-2025',
		anim: 'fade-up',
		averageBrightness: 0.1,
	},
	{
		imgSrc: "/img/rust-api.png",
		title: 'Backend Rust - API Campus Virtual',
		skills: ['Rust', 'Docker', 'PostgreSQL', 'MySQL', 'MariaDB'],
		descripcion:
			'API REST con arquitectura profesional: containerización multi-etapa, orquestación con Docker Compose, migraciones de PostgreSQL. Proyecto utilizado en investigación Compdes Guatemala 2025.',
		demoURL: '',
		repoURL: 'https://github.com/Franklin-Amador/seminario-backend-rust',
		anim: 'fade-left',
		averageBrightness: 0.15,
	},
	{
		imgSrc: "/img/Tetris.png",
		title: 'Tetris Game',
		skills: ['Python'],
		descripcion:
			'Juego clásico de Tetris desarrollado en Python utilizando Pygame. Incluye sistema de puntuación, niveles de dificultad y efectos visuales.',
		demoURL: '',
		repoURL: 'https://github.com/Franklin-Amador/Python/tree/main/Tetris',
		anim: 'fade-right',
	},
	{
		imgSrc: "/img/ERP.jpeg",
		title: 'ERP Mercadito',
		skills: ['C#', 'SQL'],
		descripcion:
			'Sistema ERP completo para gestión de inventario, ventas y reportes. Desarrollado con C# Windows Forms y SQL Server.',
		demoURL: '',
		repoURL: 'https://github.com/esau-bg/ERP_Mercadito',
		anim: 'fade-up',
		averageBrightness: 0.1,
	},
	{
		imgSrc: "/img/foto.jpeg",
		title: 'Portfolio Personal',
		skills: ['Astro', 'React', 'Tailwind', 'JavaScript'],
		descripcion:
			'Portfolio personal moderno con modo oscuro/claro, animaciones suaves y diseño responsivo. Construido con Astro y React.',
		demoURL: '',
		repoURL: 'https://github.com/Franklin-Amador/Portfolio',
		anim: 'fade-left',
	},
];

const skillIcons = {
	JavaScript: 'skill-icons:javascript',
	React: 'skill-icons:react-dark',
	Astro: 'skill-icons:astro',
	CSS: 'skill-icons:css',
	Sass: 'skill-icons:sass',
	StyledComponents: 'skill-icons:styledcomponents',
	Bootstrap: 'skill-icons:bootstrap',
	Tailwind: 'skill-icons:tailwindcss-dark',
	Python: 'skill-icons:python-dark',
	'C#': 'skill-icons:cs',
	SQL: 'skill-icons:mysql-dark',
	Docker: 'skill-icons:docker',
	Rust: 'skill-icons:rust',
	PostgreSQL: 'skill-icons:postgresql-dark',
	Azure: 'skill-icons:azure-dark',
	Terraform: 'skill-icons:terraform-dark',
	'Next.js': 'skill-icons:nextjs-dark',
	Jupyter: 'logos:jupyter',
	MySQL: 'skill-icons:mysql-dark',
	MariaDB: 'logos:mariadb-icon',
	'SQL Server': 'simple-icons:microsoftsqlserver',
	GraphQL: 'skill-icons:graphql-dark'
};

/**
 * @description Se mapea el portafolioData para que tenga los iconos de las habilidades
 * 	Puedes ver Array.map en https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 */
export const getPortafolioData = portafolioData.map((item) => {
	return {
		// Se coloca todo el contenido previo del item
		...item,
		// Se cambian las skills por los iconos correspondientes
		skills: item.skills.map((skill) => skillIcons[skill]),
	};
});
