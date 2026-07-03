import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { echo, hello } from '../services/echo';

export const echoRoutes = new Hono()
  .get('/hello', (c) => c.json({ hello: hello() }))
  .get('/echo', zValidator('query', z.object({ str: z.string() })), (c) => {
    const { str } = c.req.valid('query');
    return c.json(echo(str));
  });
