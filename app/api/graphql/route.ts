// app/api/graphql/route.ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';
import { createContext, Context } from 'data/context';
import resolvers from 'data/resolvers';
import typeDefs from 'data/schema';

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV === 'development',
  plugins: [],
  // Enable batching to match client configuration
  allowBatchedHttpRequests: true,
});

// Create the Next.js handler
const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => {
    // Convert NextRequest to the format expected by your context function
    const mockReq = {
      method: req.method,
      headers: Object.fromEntries(req.headers.entries()),
      url: req.url,
    };

    const mockRes = {
      setHeader: () => {},
      end: () => {},
    };

    return createContext({ req: mockReq as any, res: mockRes as any });
  },
});

// Export the handler for both GET and POST
export { handler as GET, handler as POST };

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      Allow: 'GET, POST, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
