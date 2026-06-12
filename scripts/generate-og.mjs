// Genera public/og.png (1200x630) con la identidad del sitio.
// Uso: node scripts/generate-og.mjs
import sharp from 'sharp';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" stop-color="#190230"/>
			<stop offset="55%" stop-color="#2b1560"/>
			<stop offset="100%" stop-color="#190230"/>
		</linearGradient>
		<linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
			<stop offset="0%" stop-color="#58f9ff"/>
			<stop offset="100%" stop-color="#df44e7"/>
		</linearGradient>
	</defs>
	<rect width="1200" height="630" fill="url(#bg)"/>
	<g stroke="#8664ee" stroke-opacity="0.12" stroke-width="1">
		${Array.from({ length: 19 }, (_, i) => `<line x1="${(i + 1) * 60}" y1="0" x2="${(i + 1) * 60}" y2="630"/>`).join('')}
		${Array.from({ length: 10 }, (_, i) => `<line x1="0" y1="${(i + 1) * 60}" x2="1200" y2="${(i + 1) * 60}"/>`).join('')}
	</g>
	<circle cx="1050" cy="120" r="220" fill="#7644e3" fill-opacity="0.18"/>
	<circle cx="120" cy="540" r="180" fill="#c93978" fill-opacity="0.14"/>
	<rect x="100" y="392" width="120" height="6" rx="3" fill="url(#accent)"/>
	<text x="100" y="330" font-family="Segoe UI, Arial, sans-serif" font-size="76" font-weight="700" fill="url(#accent)">Franklin Amador</text>
	<text x="100" y="450" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="500" fill="#dcd8fc">Full Stack Developer · Data Engineering · ML · DevOps</text>
	<text x="100" y="510" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="#a491f4">github.com/Franklin-Amador</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(new URL('../public/og.png', import.meta.url).pathname.slice(1));
console.log('public/og.png generado');
