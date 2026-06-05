import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import remarkDirective from 'remark-directive';
import { remarkDetails } from './src/plugins/remark-details.mjs';

export default defineConfig({
  site: 'https://corgo.dev',
  integrations: [tailwind(), sitemap()],
  markdown: {
    remarkPlugins: [remarkDirective, remarkDetails],
  },
});