import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { config as loadEnv } from 'dotenv';
import { nitro } from 'nitro/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import formatjs from '@formatjs/unplugin/vite';

const isProd = process.env.NODE_ENV === 'production';
const abs = (p: string) => fileURLToPath(new URL(p, import.meta.url));

loadEnv({ path: abs('./.env.local') });
loadEnv({ path: abs('./.env') });
loadEnv({ path: abs('./prisma/.env') });

export default defineConfig({
  server: { port: 3000 },
  // Native tsconfig `paths` resolution (replaces the vite-tsconfig-paths plugin).
  resolve: { tsconfigPaths: true },
  optimizeDeps: { exclude: ['pg', '@prisma/adapter-pg'] },
  ssr: { external: ['pg', '@prisma/adapter-pg'] },
  plugins: [
    // srcDirectory is where Start looks for its entries: app/router.tsx (required),
    // app/start.ts, and app/routeTree.gen.ts. Everything else (components/, lib/,
    // server/, …) stays at the repo root and resolves via tsconfig `paths`.
    tanstackStart({
      srcDirectory: 'app',
      router: { routesDirectory: 'routes' },
    }),
    // Compiles the server into a deployable output (.output locally; Vercel's
    // Build Output API when VERCEL=1). Required for Vercel/Node deployment —
    // without it, `vite build` only emits a raw dist/ that Vercel can't serve.
    // serverEntry:false — TanStack Start owns the SSR render entry; tell Nitro
    // not to go looking for a custom server entry of its own (it would
    // otherwise warn and disable it anyway).
    nitro({ serverEntry: false }),
    formatjs({
      idInterpolationPattern: '[md5:contenthash:hex:10]',
      additionalComponentNames: ['F'],
      ast: true,
      flatten: true,
      removeDefaultMessage: isProd,
    }),
    viteReact(),
  ],
});
