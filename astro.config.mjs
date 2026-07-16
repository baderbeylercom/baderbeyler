import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://baderbeyler.com',
  output: 'static',
  integrations: [
    sitemap({ filter: (page) => !page.includes('/duzenleme-modu') }),
  ],
});
