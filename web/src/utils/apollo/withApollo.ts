import { NextPageContext } from 'next';
import { withApollo } from 'next-apollo';
import { GRAPHQL_SERVER_URL, __prod__ } from '../../constants';
import { customFetch } from './customFetch';
import { createUploadLink } from 'apollo-upload-client';

import { ApolloClient, from, InMemoryCache, split, } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import {
  ApolloLink,
  Operation,
  FetchResult,
  Observable,
} from '@apollo/client/core';
import { GraphQLError, print } from 'graphql';
import { createClient, Client, ClientOptions } from 'graphql-ws';

import { parse, stringify } from 'flatted';
import { PaginatedUserService } from 'src/generated/graphql';

const cleanTypeName = new ApolloLink((operation, forward) => {
  const omitTypename = (key: string, value: any) =>
    key === '__typename' ? undefined : value;

  if (operation.variables && !operation.getContext().hasUpload) {
    operation.variables = parse(stringify(operation.variables), omitTypename);
  }

  return forward(operation);
});

class WebSocketLink extends ApolloLink {
  private client: Client;

  constructor(options: ClientOptions) {
    super();
    this.client = createClient(options);
  }

  public request(operation: Operation): Observable<FetchResult> {
    return new Observable((sink) => {
      return this.client.subscribe<FetchResult>(
        { ...operation, query: print(operation.query) },
        {
          next: sink.next.bind(sink),
          complete: sink.complete.bind(sink),
          error: (err) => {
            if (err instanceof Error) {
              return sink.error(err);
            }

            if (err instanceof CloseEvent) {
              return sink.error(
                // reason will be available on clean closes
                new Error(
                  `Socket closed with event ${err.code} ${err.reason || ''}`
                )
              );
            }

            return sink.error(
              new Error(
                (err as GraphQLError[]).map(({ message }) => message).join(', ')
              )
            );
          },
        }
      );
    });
  }
}

const createApolloClient = (ctx: NextPageContext) => {
  const wsLink =
    typeof window !== 'undefined' &&
    new WebSocketLink({
      url: __prod__
        ? `wss://${new URL(window.location.href).hostname}/graphql`
        : `ws://${new URL(GRAPHQL_SERVER_URL).host}/graphql`,
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
export default withApollo(createApolloClient);
