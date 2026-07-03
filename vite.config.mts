import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { sentryTanstackStart } from '@sentry/tanstackstart-react/vite';
import viteReact from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';

const isProd = process.env.NODE_ENV === 'production';

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
