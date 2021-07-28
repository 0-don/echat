import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import { createUploadLink } from 'apollo-upload-client';
import { GRAPHQL_SERVER_URL } from '../../constants';
import { customFetch } from './customFetch';
import { withApollo } from 'next-apollo';

const link = createUploadLink({
  uri: GRAPHQL_SERVER_URL,
  credentials: 'include',
  fetch: customFetch as any,
});

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    link,
    credentials: 'include',
    headers: {
      cookie:
        (typeof window === 'undefined'
          ? ctx?.req?.headers.cookie
          : undefined) || '',
    },
    cache: new InMemoryCache({}),
    ssrMode: typeof window === 'undefined',
    connectToDevTools: true,
  });

export default withApollo(createClient);
