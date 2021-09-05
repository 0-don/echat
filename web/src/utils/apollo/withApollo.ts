import { GRAPHQL_SERVER_URL, __prod__ } from '../../constants';
import { withApollo } from 'next-apollo';
import { customFetch } from './customFetch';

import { ApolloClient, ApolloLink, from, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import { createUploadLink } from 'apollo-upload-client';

import { WebSocketLink } from '@apollo/client/link/ws';
import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { PaginatedUserService } from 'src/generated/graphql';

const cleanTypeName = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key: string, value: any) =>
      key === '__typename' ? undefined : value;
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    );
  }
  return forward(operation).map((data) => {
    return data;
  });
});

const createClient = (ctx: NextPageContext) => {
  const wsLink =
    typeof window !== 'undefined' &&
    new WebSocketLink({
      uri: __prod__
        ? `wss://${new URL(window.location.href).hostname}/graphql`
        : `ws://${new URL(GRAPHQL_SERVER_URL).host}/graphql`,
      options: { reconnect: true },
    });

  const httpLink = createUploadLink({
    uri: GRAPHQL_SERVER_URL,
    credentials: 'include',
    fetch: customFetch as any,
    headers: {
      cookie:
        typeof window === 'undefined'
          ? ctx?.req?.headers.cookie
          : undefined || '',
    },
  });

  const link = wsLink
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

  return new ApolloClient({
    connectToDevTools: true,
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            filterUserService: {
              keyArgs: [],
              merge(
                existing: PaginatedUserService | undefined,
                incoming: PaginatedUserService
              ): PaginatedUserService {
                return {
                  ...incoming,
                  userService: [
                    ...(existing?.userService || []),
                    ...incoming.userService,
                  ],
                };
              },
            },
          },
        },
      },
    }),
    link: from([cleanTypeName, link]),
  });
};
export default withApollo(createClient);
