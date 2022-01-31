import type { NextApiRequest, NextApiResponse } from 'next';

import { ApolloServer } from 'apollo-server-micro';
import createLoaders from 'data/graphql/loaders';
import models from 'data/models';
import resolvers from 'data/graphql/resolvers';
import typeDefs from 'data/graphql/schema';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      // For subscriptions
      return {
        models,
      };
    }

    const currentUser = req.session?.user;

    return {
      currentUser,
      loaders: createLoaders(),
      models,
    };
  },
});

const startServer = apolloServer.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'https://studio.apollographql.com');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
