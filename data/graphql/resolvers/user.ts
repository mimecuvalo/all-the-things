const User = {
  Query: {
    // @ts-ignore figure out later
    allUsers: async (parent, args, { models }) => {
      return await models.User.findAll();
    },

    // @ts-ignore figure out later
    fetchUser: async (parent, { id }, { loaders, models }) => {
      return loaders.users.load(id);
    },
  },

  // Example stubs of mutations, non-functional out of the box.
  Mutation: {
    // @ts-ignore figure out later
    createUser: async (parent, { username, email }, { models }) => {
      return await models.User.create({ username, email });
    },
  },
};
export default User;
