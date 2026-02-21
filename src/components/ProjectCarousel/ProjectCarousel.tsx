import { useState, useEffect } from 'react';
import './ProjectCarousel.css';

interface Project {
	imgSrc: string;
	title: string;
	titleEN?: string;
	skills: string[];
	descriptionES: string;
	descriptionEN: string;
	demoURL: string;
	repoURL: string;
}

interface ProjectCarouselProps {
	projects: Project[];
}

const carouselImages = [
	'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
	'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
	'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
	'https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1200&q=80',
	'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
	'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
];

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);
	const [language, setLanguage] = useState<'es' | 'en'>('es');

	useEffect(() => {
		// Get initial language
		const initialLang = document.documentElement.getAttribute('data-language') as 'es' | 'en' || 'es';
		setLanguage(initialLang);

		// Listen for language changes
		const handleLanguageChange = (e: CustomEvent) => {
			setLanguage(e.detail.language);
		};

		document.addEventListener('languageChanged', handleLanguageChange as EventListener);

		return () => {
			document.removeEventListener('languageChanged', handleLanguageChange as EventListener);
		};
	}, []);

	useEffect(() => {
		if (!isAutoPlaying) return;

		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % projects.length);
		}, 5000); // Cambia cada 5 segundos

		return () => clearInterval(interval);
	}, [isAutoPlaying, projects.length]);

	const goToSlide = (index: number) => {
		setCurrentIndex(index);
		setIsAutoPlaying(false);
	};

	const nextSlide = () => {
		setCurrentIndex((prev) => (prev + 1) % projects.length);
		setIsAutoPlaying(false);
	};

	const prevSlide = () => {
		setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
		setIsAutoPlaying(false);
	};

	const getButtonLabel = (label: string) => {
		const translations: Record<string, Record<'es' | 'en', string>> = {
			'Repositorio': { es: 'Repositorio', en: 'Repository' },
			'Ver Demo': { es: 'Ver Demo', en: 'View Demo' },
			'Proyecto anterior': { es: 'Proyecto anterior', en: 'Previous project' },
			'Siguiente proyecto': { es: 'Siguiente proyecto', en: 'Next project' }
		};
		return translations[label]?.[language] || label;
	};

	return (
		<div className="carousel-container">
			<div className="carousel-featured-label">
				<span data-i18n="portfolio.featured">Proyectos Destacados</span>
			</div>

			<div className="carousel-wrapper">
				<button 
					className="carousel-btn carousel-btn-prev" 
					onClick={prevSlide}
					aria-label={getButtonLabel('Proyecto anterior')}
				>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</button>

				<div className="carousel-track">
					{projects.map((project, index) => {
						const offset = index - currentIndex;
						const isActive = offset === 0;
						const isNext = offset === 1 || offset === -(projects.length - 1);
						const isPrev = offset === -1 || offset === projects.length - 1;

						const imageSrc = project.imgSrc || carouselImages[index % carouselImages.length];
						const description = language === 'es' ? project.descriptionES : project.descriptionEN;
						const title = language === 'es' ? project.title : (project.titleEN || project.title);

						return (
							<div
								key={index}
								className={`carousel-card ${isActive ? 'active' : ''} ${isNext ? 'next' : ''} ${isPrev ? 'prev' : ''}`}
								style={{
									transform: `translateX(${offset * 110}%) scale(${isActive ? 1 : 0.85})`,
									opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.5,
									zIndex: isActive ? 10 : Math.abs(offset) > 1 ? 0 : 5,
									pointerEvents: isActive ? 'auto' : 'none'
								}}
							>
								<div className="carousel-card-image">
									<img src={imageSrc} alt={project.title} loading="lazy" />
								</div>
								<div className="carousel-card-content">
								<h3 className="carousel-card-title">{title}</h3>
									<p className="carousel-card-description">{description}</p>
									<div className="carousel-card-skills">
										{project.skills.map((skill, i) => (
											<iconify-icon key={i} icon={skill} width="32" height="32" />
										))}
									</div>
									<div className="carousel-card-buttons">
										<a 
											href={project.repoURL} 
											target="_blank" 
											rel="noopener noreferrer"
											className="carousel-btn-link"
										>
											<iconify-icon icon="mdi:github" width="20" height="20" />
											{getButtonLabel('Repositorio')}
										</a>
										{project.demoURL && (
											<a 
												href={project.demoURL} 
												target="_blank" 
												rel="noopener noreferrer"
												className="carousel-btn-link carousel-btn-demo"
											>
												<iconify-icon icon="mdi:open-in-new" width="20" height="20" />
												{getButtonLabel('Ver Demo')}
											</a>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>

				<button 
					className="carousel-btn carousel-btn-next" 
					onClick={nextSlide}
					aria-label={getButtonLabel('Siguiente proyecto')}
				>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</button>
			</div>

			<div className="carousel-dots">
				{projects.map((_, index) => (
					<button
						key={index}
						className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
						onClick={() => goToSlide(index)}
						aria-label={`${language === 'es' ? 'Ir al proyecto' : 'Go to project'} ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
}
							