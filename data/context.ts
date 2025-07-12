import auth0 from 'vendor/auth0';

import { PrismaClient } from '@prisma/client';
import prisma from './prisma';
import { User } from '@auth0/nextjs-auth0/types';

export type Context = {
  user?: User;
  prisma: PrismaClient;
};

export async function createContext(): Promise<Context> {
  let session;

  try {
    session = await auth0.getSession();
  } catch {
    // fall through
  }

  // if the user is not logged in, omit returning the user and accessToken
  if (!session) return { prisma };

  const { user } = session;

  return {
    user,
    prisma,
  };
}
