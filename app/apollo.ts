import { ApolloClient, ApolloLink, HttpLink, split } from '@apollo/client';
import { dataIdFromObject, initializeLocalState } from 'data/local_state';
import { resolvers, typeDefs } from 'data/local_state';

import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import configuration from 'app/configuration';
import { onError } from '@apollo/client/link/error';

export default function createApolloClient() {
  const apolloUrl = '/graphql';
  // link to use if batching
  // also adds a `batch: true` header to the request to prove it's a different link (default)
  const batchHttpLink = new BatchHttpLink({ uri: apolloUrl });
  // link to use if not batching
  const httpLink = new HttpLink({ uri: apolloUrl });

  // We add the Apollo/GraphQL capabilities here (also notice ApolloProvider below).
  const cache = new InMemoryCache({
    dataIdFromObject,
  }); // xxx .restore(window['__APOLLO_STATE__']);

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(`\n[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}\n`)
      );
    }
    if (networkError) {
      console.log(`\n[Network error]: ${networkError}\n`);
    }
  });
  const splitLink = split(
    (op) => op.getContext().important === true,
    httpLink, // if test is true, debatch
    batchHttpLink // otherwise, batch
  );
  const link = ApolloLink.from([errorLink, splitLink]);

  initializeLocalState(configuration.user, configuration.experiments);
  const client = new ApolloClient({
    request: async (op) => {
      op.setContext({
        headers: {
          'x-xsrf-token': configuration.csrf || '',
        },
      });
    },
    link,
    cache,
    typeDefs,
    resolvers,
  });

  return client;
}
