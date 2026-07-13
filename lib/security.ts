export function buildContentSecurityPolicy(options: { isDevelopment: boolean; nonce?: string }): string {
  const { isDevelopment, nonce } = options;
  const directives: Record<string, string[]> = {
    'default-src': ["'self'"],
    'connect-src': isDevelopment ? ['*', 'ws:', 'wss:'] : ["'self'", 'https://*.ingest.sentry.io'],
    'font-src': ["'self'", 'https:', 'data:'],
    'frame-src': ["'self'", 'http:', 'https:'],
    'img-src': ["'self'", 'data:', 'blob:', 'http:', 'https:'],
    'manifest-src': ["'self'"],
    'media-src': ["'self'", 'blob:'],
    'object-src': ["'none'"],
    'script-src': [
      "'self'",
      ...(isDevelopment
        ? ["'unsafe-inline'", "'unsafe-eval'", 'https://unpkg.com']
        : nonce
          ? [`'nonce-${nonce}'`, "'strict-dynamic'"]
          : []),
    ],
    'style-src': ["'self'", "'unsafe-inline'"],
  };
  if (!isDevelopment) directives['upgrade-insecure-requests'] = [];

  return Object.entries(directives)
    .map(([directive, values]) => `${directive} ${values.join(' ')}`.trim())
    .join('; ');
}
