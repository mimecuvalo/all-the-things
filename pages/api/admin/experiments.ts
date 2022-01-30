// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { REGISTERED_EXPERIMENTS } from 'app/experiments';

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.json({ experiments: REGISTERED_EXPERIMENTS });
}
