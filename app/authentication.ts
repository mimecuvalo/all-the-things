import { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from '@auth0/nextjs-auth0';
import prisma from 'data/prisma';

const authenticate =
  (handler: (req: NextApiRequest, res: NextApiResponse) => void) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = getSession(req, res);

    if (!session) {
      return res.status(401).send({ msg: 'Not logged in.' });
    }

    const user = await prisma.user.findUnique({
      select: {
        email: true,
        role: true,
      },
      where: {
        email: session.user.email,
      },
    });

    if (user?.role !== 'ADMIN') {
      return res.status(403).send({ msg: 'I call shenanigans.' });
    }

    return handler(req, res);
  };

export default authenticate;
