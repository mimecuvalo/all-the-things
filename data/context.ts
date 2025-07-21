import { getServerSession } from 'next-auth';
import { authOptions } from '@/util/auth';
import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
import { Session } from 'next-auth';
import prisma from './prisma';

export type Context = {
  user?: Session['user'];
  prisma: PrismaClient;
};

export async function createContext({ req, res }: { req: NextApiRequest; res: NextApiResponse }): Promise<Context> {
  let session;

  try {
    session = await getServerSession(req, res, authOptions);
  } catch {
    // fall through
  }

  // if the user is not logged in, omit returning the session
  if (!session) return { prisma };

  return {
    user: session.user,
    prisma,
  };
}
