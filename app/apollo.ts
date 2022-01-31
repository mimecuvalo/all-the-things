import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split } from '@apollo/client';
import { resolvers, typeDefs } from 'data/localState';

import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { dataIdFromObject } from 'data/localState';
import isEqual from 'lodash/isEqual';
import merge from 'deepmerge';
import { onError } from '@apollo/client/link/error';
import { useMemo } from 'react';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient;

function createApolloClient() {
  // link to use if batching
  // also adds a `batch: true` header to the request to prove it's a different link (default)
  const uri = 'http://localhost:3000/api/graphql';
  const batchHttpLink = new BatchHttpLink({ uri });
  // link to use if not batching
  const httpLink = new HttpLink({
    uri, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  });
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

  // We add the Apollo/GraphQL capabilities here (also notice ApolloProvider below).
  const cache = new InMemoryCache({
    dataIdFromObject,
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link,
    cache,
    typeDefs,
    resolvers,
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
