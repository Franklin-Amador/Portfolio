import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // IMPORTANTE: sin `site` el sitemap no se genera y las og:image salen
  // relativas (los crawlers las ignoran). Pon aquí tu dominio de producción.
  // site: 'https://tu-dominio.pages.dev',
  devToolbar: {
    enabled: false
  },
  integrations: [react(), tailwind(), sitemap()]
});