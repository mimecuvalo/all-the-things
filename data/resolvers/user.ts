import { combineResolvers } from 'graphql-resolvers';
import { isAdmin } from './authorization';

const User = {
  Query: {
    users: combineResolvers(isAdmin, (parent, args, { prisma }) => {
      return prisma.user.findMany();
    }),
  },

  Mutation: {
    createUser: combineResolvers(isAdmin, async (parent, args, ctx) => {
      // Your code here...
    }),
  },
};
export default User;
