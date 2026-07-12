import { csrf } from 'hono/csrf';
import type { MiddlewareHandler } from 'hono';

export function createCsrfMiddleware(options?: { skip?: (path: string) => boolean }): MiddlewareHandler {
  const middleware = csrf();
  return (c, next) => {
    if (options?.skip?.(c.req.path)) return next();
    return middleware(c, next);
  };
}
