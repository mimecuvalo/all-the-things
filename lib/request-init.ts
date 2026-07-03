import { createServerFn } from '@tanstack/react-start';
import { getRequestHeader, setResponseHeader } from '@tanstack/react-start/server';

export const SUPPORTED_LOCALES = ['en', 'fr', 'xx-LS'] as const;
export const DEFAULT_LOCALE = 'en';

function generateCsp(isDev: boolean): string {
  const directives: Record<string, string[]> = {
    'default-src': ["'self'"],
    'connect-src': isDev ? ['*', 'ws:', 'wss:'] : ["'self'", 'https://*.ingest.sentry.io'],
    'font-src': ["'self'", 'https:', 'data:'],
    'frame-src': ["'self'", 'http:', 'https:'],
    'img-src': ['data:', 'http:', 'https:'],
    'manifest-src': ["'self'"],
    'media-src': ["'self'", 'blob:'],
    'object-src': ["'self'"],
    // unpkg is dev-only (react-scan, loaded from the Help menu).
    'script-src': ["'self'", "'unsafe-inline'"].concat(isDev ? ["'unsafe-eval'", 'https://unpkg.com'] : []),
    'style-src': ["'self'", "'unsafe-inline'"],
  };
  if (!isDev) directives['upgrade-insecure-requests'] = [];
  return Object.entries(directives)
    .map(([k, v]) => `${k} ${v.join(' ')}`.trim())
    .join('; ');
}

function detectLocale(): string {
  const cookie = getRequestHeader('cookie') ?? '';
  const match = cookie.match(/(?:^|;\s*)locale=([^;]+)/);
  const fromCookie = match?.[1];
  if (fromCookie && (SUPPORTED_LOCALES as readonly string[]).includes(fromCookie)) {
    return fromCookie;
  }

  const accept = getRequestHeader('accept-language') ?? '';
  if (/\bfr\b/.test(accept)) return 'fr';

  return DEFAULT_LOCALE;
}

export const initRequest = createServerFn({ method: 'GET' }).handler(() => {
  setResponseHeader('strict-transport-security', 'max-age=63072000; includeSubDomains; preload');
  setResponseHeader('x-content-type-options', 'nosniff');
  setResponseHeader('x-xss-protection', '1; mode=block');
  setResponseHeader('referrer-policy', 'no-referrer-when-downgrade');
  setResponseHeader('content-security-policy', generateCsp(import.meta.env.DEV));

  return { locale: detectLocale() };
});
