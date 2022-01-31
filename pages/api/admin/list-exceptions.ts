// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let clientExceptions = {},
    serverExceptions = {};

  res.json({ clientExceptions, serverExceptions });
}
