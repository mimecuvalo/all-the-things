import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { config as loadEnv } from 'dotenv';
import { nitro } from 'nitro/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { sentryTanstackStart } from '@sentry/tanstackstart-react/vite';
import viteReact from '@vitejs/plugin-react';
import formatjs from '@formatjs/unplugin/vite';

const isProd = process.env.NODE_ENV === 'production';
const clientSentryDsn = process.env.VITE_SENTRY_DSN || process.env.SENTRY_DSN || '';
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
  define: {
    'import.meta.env.VITE_SENTRY_DSN': JSON.stringify(clientSentryDsn),
  },
  // Native tsconfig `paths` resolution (replaces the vite-tsconfig-paths plugin).
  resolve: { tsconfigPaths: true },
  optimizeDeps: { exclude: ['pg', '@prisma/adapter-pg'] },
  ssr: { external: ['pg', '@prisma/adapter-pg'] },
  plugins: [
    tanstackStart({
      srcDirectory: '.',
      router: { routesDirectory: 'routes' },
    }),
    // Compiles the server into a deployable output (.output locally; Vercel's
    // Build Output API when VERCEL=1). Required for Vercel/Node deployment —
    // without it, `vite build` only emits a raw dist/ that Vercel can't serve.
    // serverEntry:false — our root server.ts IS the SSR render entry (Sentry-
    // wrapped); tell Nitro not to also treat it as a separate custom server
    // entry (it would otherwise warn and disable it anyway).
    nitro({ serverEntry: false }),
    ...sentryPlugins,
    formatjs({
      idInterpolationPattern: '[md5:contenthash:hex:10]',
      additionalComponentNames: ['F'],
      ast: true,
      removeDefaultMessage: isProd,
    }),
    viteReact(),
  ],
});
