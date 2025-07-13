// app/api/graphql/route.ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { createContext, Context } from 'data/context';
import resolvers from 'data/resolvers';
import typeDefs from 'data/schema';
import { pick } from 'lodash';
import { NextResponse } from 'next/server';

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV === 'development',
  plugins: [],
  formatError: (err) => {
    return pick(err, 'message');
  },
  allowBatchedHttpRequests: true,
});

// Create the Next.js handler
const handler = startServerAndCreateNextHandler(server, {
  context: async () => createContext(),
});

export { handler as GET, handler as POST };

export async function OPTIONS() {
  if (process.env.NODE_ENV === 'development') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://studio.apollographql.com',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  }

  return new NextResponse(null, { status: 405 });
}
