// @ts-check
import { defineConfig, envField } from 'astro/config';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  integrations: [vue({ devtools: true })],
  env: {
    schema: {
      SMTP_HOST: envField.string({ context: 'server', access: 'secret' }),
      SMTP_PORT: envField.number({ context: 'server', access: 'secret' }),
      SMTP_USER: envField.string({ context: 'server', access: 'secret' }),
      SMTP_PASS: envField.string({ context: 'server', access: 'secret' }),
      EMAIL_TO: envField.string({ context: 'server', access: 'secret' }),
    },
  },
});
