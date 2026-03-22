// @ts-check
import { defineConfig, envField } from 'astro/config';

import vue from '@astrojs/vue';

import node from '@astrojs/node';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://nocdev.fr',
  integrations: [vue({ devtools: false }), sitemap()],

  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
      EMAIL_TO: envField.string({ context: 'server', access: 'secret' }),
      PUBLIC_EMAIL_TO: envField.string({ context: 'client', access: 'public' }),
    },
  },

  adapter: node({
    mode: 'standalone',
  }),
});
