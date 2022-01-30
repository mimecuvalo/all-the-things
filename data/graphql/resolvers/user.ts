import { combineResolvers } from 'graphql-resolvers';
import { isAdmin } from './authorization';

const User = {
  Query: {
    allUsers: combineResolvers(isAdmin, async (parent, args, { models }) => {
      return await models.User.findAll();
    }),

    fetchUser: combineResolvers(isAdmin, async (parent, { id }, { loaders, models }) => {
      return loaders.users.load(id);
    }),
  },

  // Example stubs of mutations, non-functional out of the box.
  Mutation: {
    createUser: combineResolvers(isAdmin, async (parent, { username, email }, { models }) => {
      return await models.User.create({ username, email });
    }),
  },
};
export default User;
