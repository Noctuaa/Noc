// @ts-check
import { defineConfig, envField } from 'astro/config';

import vue from '@astrojs/vue';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [vue({ devtools: false })],

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
