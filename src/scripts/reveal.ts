const initReveal = () => {
	const elements = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)');
	if (elements.length === 0) return;

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		elements.forEach((el) => el.classList.add('is-revealed'));
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					(entry.target as HTMLElement).classList.add('is-revealed');
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
	);

	elements.forEach((el) => observer.observe(el));
};

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initReveal);
} else {
	initReveal();
}
