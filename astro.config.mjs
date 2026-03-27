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
      SMTP_HOST: envField.string({ context: 'server', access: 'secret' }),
      SMTP_PORT: envField.number({ context: 'server', access: 'secret' }),
      SMTP_USER: envField.string({ context: 'server', access: 'secret' }),
      SMTP_PASS: envField.string({ context: 'server', access: 'secret' }),
      EMAIL_TO: envField.string({ context: 'server', access: 'secret' }),
      PUBLIC_EMAIL_TO: envField.string({ context: 'client', access: 'public' }),
    },
  },

  adapter: node({
    mode: 'standalone',
  }),
});
