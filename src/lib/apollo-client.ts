import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `https://${process.env.GATSBY_WP_BASE_URL}/graphql`,
  credentials: 'include',
});

export const client = new ApolloClient({
  cache,
  link,
});
