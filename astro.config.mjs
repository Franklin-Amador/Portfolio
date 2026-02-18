import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Actualiza esto con tu dominio de Cloudflare cuando lo tengas
  // site: 'https://tu-dominio.pages.dev',
  devToolbar: {
    enabled: false
  },
  integrations: [react(), tailwind(), sitemap()]
});