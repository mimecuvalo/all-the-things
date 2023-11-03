import { InMemoryCache, StoreObject, defaultDataIdFromObject } from '@apollo/client';

// This is your app's local state. Which can be queried and modified via Apollo.
// Learn more here: https://www.apollographql.com/docs/react/data/local-state/

export const clientCache: InMemoryCache = new InMemoryCache({ dataIdFromObject });

export function initializeLocalState() {
  /* todo */
}

// You can add custom caching controls based on your data model.
export function dataIdFromObject(obj: StoreObject) {
  switch (obj.__typename) {
    default:
      return defaultDataIdFromObject(obj); // fall back to default handling
  }
}
