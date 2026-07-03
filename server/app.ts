import { Hono } from 'hono';
import type { AppEnv } from './env';
import { authHandler } from './auth';
import { createContext } from './context';
import { ForbiddenError, UnauthorizedError } from './authorization';
import { echoRoutes } from './routes/echo';
import { miscRoutes } from './routes/misc';
import { userRoutes } from './routes/user';

const app = new Hono<AppEnv>().basePath('/api');

app.all('/auth/*', (c) => authHandler(c.req.raw));

app.use('*', async (c, next) => {
  c.set('ctx', await createContext(c.req.raw));
  await next();
});

app.onError((err, c) => {
  if (err instanceof UnauthorizedError) return c.json({ error: err.message }, 401);
  if (err instanceof ForbiddenError) return c.json({ error: err.message }, 403);
  console.error(err);
  return c.json({ error: 'Internal Server Error' }, 500);
});

const routes = app.route('/', echoRoutes).route('/', miscRoutes).route('/users', userRoutes);

export type AppType = typeof routes;
export default app;
