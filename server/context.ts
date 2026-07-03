import type { Session } from '@auth/core/types';
import type { PrismaClient } from '../generated/prisma/client';
import { getSession } from './auth';
import prisma from './prisma';

export type Context = {
  user?: Session['user'];
  prisma: PrismaClient;
};

export async function createContext(request: Request): Promise<Context> {
  let session: Session | null = null;
  try {
    session = await getSession(request);
  } catch {
    // fall through — unauthenticated
  }

  if (!session?.user) return { prisma };

  return { user: session.user, prisma };
}
