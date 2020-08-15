import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const cache = new InMemoryCache();
const link = createHttpLink({
    uri: `https://${process.env.WP_BASE_URL}/graphql`,
});

export const client = new ApolloClient({
    cache,
    link,
});
