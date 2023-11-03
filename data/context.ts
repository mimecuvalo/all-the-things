import { Claims } from '@auth0/nextjs-auth0';
import auth0 from 'vendor/auth0';
import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
import prisma from './prisma';

export type Context = {
  user?: Claims;
  accessToken?: string;
  prisma: PrismaClient;
};

export async function createContext({ req, res }: { req: NextApiRequest; res: NextApiResponse }): Promise<Context> {
  let session;

  try {
    session = await auth0.getSession(req, res);
  } catch (ex) {
    // fall through
  }

  // if the user is not logged in, omit returning the user and accessToken
  if (!session) return { prisma };

  const { user, accessToken } = session;

  return {
    user,
    accessToken,
    prisma,
  };
}
