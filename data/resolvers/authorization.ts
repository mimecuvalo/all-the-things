// @ts-nocheck

import { skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, ctx) => {
  if (!ctx.user) {
    throw new Error(`Not logged in.`);
  }

  return skip;
};

export const isAdmin = async (parent, args, ctx) => {
  if (!ctx.user) {
    throw new Error(`Not logged in.`);
  }

  const user = await ctx.prisma.user.findUnique({
    where: {
      email: ctx.user.email,
    },
  });

  if (user.role !== 'ADMIN') {
    throw new Error(`I call shenanigans.`);
  }

  return skip;
};
