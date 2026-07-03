import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import type { AppEnv } from '../env';
import { assertAdmin } from '../authorization';
import { createUser, listUsers } from '../services/user';

export const userRoutes = new Hono<AppEnv>()
  .get('/', async (c) => {
    const ctx = c.get('ctx');
    await assertAdmin(ctx);
    return c.json(await listUsers(ctx));
  })
  .post('/', zValidator('json', z.object({ username: z.string(), email: z.string().email() })), async (c) => {
    const ctx = c.get('ctx');
    await assertAdmin(ctx);
    return c.json(await createUser(ctx, c.req.valid('json')));
  });
