import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Replace with the real domain via SITE_URL at build time.
  // canonical, og:image, sitemap and robots.txt all derive from this.
  site: process.env.SITE_URL ?? 'https://bangkardi.com',
  integrations: [react(), sitemap()],
  vite: {
    ssr: { noExternal: ['@bangkardi/registry'] },
  },
});
