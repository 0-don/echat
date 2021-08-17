import { GRAPHQL_SERVER_URL } from '../../constants';
import { withApollo } from 'next-apollo';
import { customFetch } from './customFetch';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import { createUploadLink } from 'apollo-upload-client';

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    connectToDevTools: true,
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache(),
    link: createUploadLink({
      uri: GRAPHQL_SERVER_URL,
      credentials: 'include',
      fetch: customFetch as any,
      // headers: {
      //   cookie:
      //     (typeof window === 'undefined'
      //       ? ctx?.req?.headers.cookie
      //       : undefined) || '',
      // },
    }),
  });

export default withApollo(createClient);
