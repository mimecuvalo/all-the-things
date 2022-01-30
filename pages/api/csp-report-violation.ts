import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('CSP Violation:', { data: req.body.data });
  res.status(204).send('');
}
