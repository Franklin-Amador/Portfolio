import { useState, useEffect, useRef } from 'react';
import './ProjectCarousel.css';
import { getTranslation } from '../../utils/translations';

interface Project {
	imgSrc: string;
	imgSrcSet?: string;
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

const prefersReducedMotion = () =>
	typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(() => !prefersReducedMotion());
	const [language, setLanguage] = useState<'es' | 'en'>('es');
	const isHoveredRef = useRef(false);

	// Refs para manipulación imperativa (sin re-renders)
	const activeCardRef = useRef<HTMLDivElement | null>(null);
	const progressBarRef = useRef<HTMLDivElement | null>(null);
	const progressRafRef = useRef<number | null>(null);
	const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// Language detection
	useEffect(() => {
		const lang = document.documentElement.getAttribute('data-language') as 'es' | 'en' || 'es';
		setLanguage(lang);
		const handler = (e: CustomEvent) => setLanguage(e.detail.language);
		document.addEventListener('languageChanged', handler as EventListener);
		return () => document.removeEventListener('languageChanged', handler as EventListener);
	}, []);

	// Auto-play
	useEffect(() => {
		if (!isAutoPlaying) return;
		const interval = setInterval(() => {
			setCurrentIndex((p) => (p + 1) % projects.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [isAutoPlaying, projects.length]);

	// Progress bar — manipula el DOM directo, cero re-renders
	useEffect(() => {
		if (progressRafRef.current !== null) cancelAnimationFrame(progressRafRef.current);
		const bar = progressBarRef.current;
		if (!bar) return;
		bar.style.width = '0%';
		if (!isAutoPlaying) return;

		const start = performance.now();
		const tick = (now: number) => {
			const p = Math.min(((now - start) / 5000) * 100, 100);
			bar.style.width = `${p}%`;
			if (p < 100) progressRafRef.current = requestAnimationFrame(tick);
		};
		progressRafRef.current = requestAnimationFrame(tick);
		return () => { if (progressRafRef.current !== null) cancelAnimationFrame(progressRafRef.current); };
	}, [currentIndex, isAutoPlaying]);

	// Tilt 3D — listener imperativo sobre el card activo, cero re-renders
	useEffect(() => {
		const card = activeCardRef.current;
		if (!card) return;
		if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return;

		const onMove = (e: MouseEvent) => {
			const rect = card.getBoundingClientRect();
			const x = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 9;
			const y = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -7;
			card.style.transform = `perspective(1200px) rotateX(${y}deg) rotateY(${x}deg)`;
			card.style.transition = 'transform 0.1s ease-out';
		};

		const onLeave = () => {
			card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
			card.style.transition = 'transform 0.45s ease-out';
		};

		card.addEventListener('mousemove', onMove);
		card.addEventListener('mouseleave', onLeave);
		return () => {
			card.removeEventListener('mousemove', onMove);
			card.removeEventListener('mouseleave', onLeave);
		};
	}, [currentIndex]);

	const pauseAndScheduleResume = () => {
		setIsAutoPlaying(false);
		if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
		resumeTimerRef.current = setTimeout(() => {
			if (!prefersReducedMotion() && !isHoveredRef.current) setIsAutoPlaying(true);
		}, 8000);
	};

	const goToSlide = (i: number) => { setCurrentIndex(i); pauseAndScheduleResume(); };
	const nextSlide = () => { setCurrentIndex((p) => (p + 1) % projects.length); pauseAndScheduleResume(); };
	const prevSlide = () => { setCurrentIndex((p) => (p - 1 + projects.length) % projects.length); pauseAndScheduleResume(); };

	const pauseOnInteract = () => {
		isHoveredRef.current = true;
		setIsAutoPlaying(false);
	};

	const resumeAfterInteract = () => {
		isHoveredRef.current = false;
		if (!prefersReducedMotion()) setIsAutoPlaying(true);
	};

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
		if (e.key === 'ArrowRight') { e.preventDefault(); nextSlide(); }
	};

	const t = (key: string) => getTranslation(key, language);

	return (
		<div className="carousel-container">
			<div className="carousel-featured-label">
				<span>{t('portfolio.featured')}</span>
			</div>

			<div
				className="carousel-wrapper"
				role="region"
				aria-roledescription="carousel"
				aria-label={t('portfolio.featured')}
				tabIndex={0}
				onKeyDown={onKeyDown}
				onMouseEnter={pauseOnInteract}
				onMouseLeave={resumeAfterInteract}
				onFocusCapture={pauseOnInteract}
				onBlurCapture={resumeAfterInteract}
			>
				<button className="carousel-btn carousel-btn-prev" onClick={prevSlide} aria-label={t('buttons.prevProject')}>
					<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</button>

				<div className="carousel-track">
					{projects.map((project, index) => {
						const offset = index - currentIndex;
						const isActive = offset === 0;
						const description = language === 'es' ? project.descriptionES : project.descriptionEN;
						const title = language === 'es' ? project.title : (project.titleEN || project.title);

						return (
							// Wrapper: sólo posicionamiento — React lo controla
							<div
								key={index}
								className="carousel-slide"
								aria-hidden={!isActive}
								style={{
									transform: `translateX(${offset * 110}%) scale(${isActive ? 1 : 0.82})`,
									opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.45,
									zIndex: isActive ? 10 : Math.abs(offset) > 1 ? 0 : 5,
									pointerEvents: isActive ? 'auto' : 'none',
									transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.6s ease',
								}}
							>
								{/* Card interior: border-radius + tilt imperativo */}
								<div
									className={`carousel-card${isActive ? ' active' : ''}`}
									ref={isActive ? activeCardRef : null}
								>
									<div className="carousel-card-image">
										<img
											src={project.imgSrc}
											srcSet={project.imgSrcSet}
											sizes="(max-width: 768px) 100vw, 60vw"
											alt={title}
											loading="lazy"
										/>
									</div>

									<div className="carousel-card-content">
										<h3 className="carousel-card-title">{title}</h3>
										<p className="carousel-card-description">{description}</p>
										<div className="carousel-card-skills">
											{project.skills.map((skill, i) => (
												<iconify-icon key={i} icon={skill} width="30" height="30" />
											))}
										</div>
										<div className="carousel-card-buttons">
											<a href={project.repoURL} target="_blank" rel="noopener noreferrer" className="carousel-btn-link" tabIndex={isActive ? 0 : -1}>
												<iconify-icon icon="mdi:github" width="18" height="18" />
												{t('buttons.repo')}
											</a>
											{project.demoURL && (
												<a href={project.demoURL} target="_blank" rel="noopener noreferrer" className="carousel-btn-link carousel-btn-demo" tabIndex={isActive ? 0 : -1}>
													<iconify-icon icon="mdi:open-in-new" width="18" height="18" />
													{t('buttons.viewDemo')}
												</a>
											)}
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				<button className="carousel-btn carousel-btn-next" onClick={nextSlide} aria-label={t('buttons.nextProject')}>
					<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</button>
			</div>

			{/* Progress bar con ref directo — sin estado React */}
			<div className="carousel-progress-wrap">
				<span className="carousel-slide-counter">
					{String(currentIndex + 1).padStart(2, '0')}
				</span>
				<div className="carousel-progress">
					<div className="carousel-progress-fill" ref={progressBarRef} />
				</div>
				<span className="carousel-slide-counter">
					{String(projects.length).padStart(2, '0')}
				</span>
			</div>
		</div>
	);
}
