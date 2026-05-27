// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://departamentoscostanera.com',
  base: '/departamentos-costanera',

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'zh'],
    routing: {
      prefixDefaultLocale: true
    }
  },

  integrations: [
    react(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es',
          en: 'en',
          zh: 'zh',
        },
      },
    }),
  ]
});