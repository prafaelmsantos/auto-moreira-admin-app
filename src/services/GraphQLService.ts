import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { BASE_API_URL } from '../config/variables';

const cache = new InMemoryCache();

function httpLink(baseURL: string): ApolloLink {
  return createHttpLink({
    uri: `${baseURL}graphql`
  });
}

const graphQLClient = () =>
  new ApolloClient({
    link: httpLink(BASE_API_URL),
    cache: cache
  });

export { graphQLClient };
