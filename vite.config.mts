import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { config as loadEnv } from 'dotenv';
import tsconfigPaths from 'vite-tsconfig-paths';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { sentryTanstackStart } from '@sentry/tanstackstart-react/vite';
import viteReact from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';

const isProd = process.env.NODE_ENV === 'production';
const abs = (p: string) => fileURLToPath(new URL(p, import.meta.url));

loadEnv({ path: abs('./.env.local') });
loadEnv({ path: abs('./.env') });
loadEnv({ path: abs('./prisma/.env') });

const sentryPlugins =
  process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_ORG && process.env.SENTRY_PROJECT
    ? [
        sentryTanstackStart({
          org: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,
          authToken: process.env.SENTRY_AUTH_TOKEN,
        }),
      ]
    : [];

export default defineConfig({
  server: { port: 3000 },
  optimizeDeps: { exclude: ['pg', '@prisma/adapter-pg'] },
  ssr: { external: ['pg', '@prisma/adapter-pg'] },
  plugins: [
    tsconfigPaths(),
    tanstackStart({
      srcDirectory: '.',
      router: { routesDirectory: 'routes' },
    }),
    ...sentryPlugins,
    viteReact(),
    babel({
      plugins: [
        [
          'formatjs',
          {
            idInterpolationPattern: '[md5:contenthash:hex:10]',
            additionalComponentNames: ['F'],
            ast: true,
            removeDefaultMessage: isProd,
          },
        ],
      ],
    }),
  ],
});
