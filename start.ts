import { sentryGlobalFunctionMiddleware, sentryGlobalRequestMiddleware } from '@sentry/tanstackstart-react';
import { createCsrfMiddleware, createMiddleware, createStart } from '@tanstack/react-start';
import { setResponseHeader } from '@tanstack/react-start/server';
import crypto from 'node:crypto';
import { buildContentSecurityPolicy } from 'lib/security';

const securityHeadersMiddleware = createMiddleware().server(({ next }) => {
  const nonce = crypto.randomBytes(16).toString('base64');
  setResponseHeader('strict-transport-security', 'max-age=63072000; includeSubDomains; preload');
  setResponseHeader('x-content-type-options', 'nosniff');
  setResponseHeader('referrer-policy', 'no-referrer-when-downgrade');
  setResponseHeader(
    'content-security-policy',
    buildContentSecurityPolicy({
      isDevelopment: import.meta.env.DEV,
      nonce,
    })
  );
  return next({ context: { nonce } });
});

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === 'serverFn',
});

export const startInstance = createStart(() => ({
  requestMiddleware: [securityHeadersMiddleware, csrfMiddleware, sentryGlobalRequestMiddleware],
  functionMiddleware: [sentryGlobalFunctionMiddleware],
}));
