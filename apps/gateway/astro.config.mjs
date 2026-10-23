import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  // Replace with the real domain via SITE_URL at build time.
  site: process.env.SITE_URL ?? 'https://bangkardi.com',
  integrations: [react()],
  vite: {
    ssr: { noExternal: ['@bangkardi/registry'] },
  },
});
