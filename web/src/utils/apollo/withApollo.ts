import { GRAPHQL_SERVER_URL } from "../../constants";
import { withApollo } from "next-apollo";
import { customFetch } from "./customFetch";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { createUploadLink } from "apollo-upload-client";

import { WebSocketLink } from "@apollo/client/link/ws";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

const createClient = (ctx: NextPageContext) => {
  const wsLink =
    typeof window === "undefined"
      ? null
      : new WebSocketLink({
          uri: "ws://localhost:4001/graphql",
          options: {
            reconnect: true,
          },
        });

  const httpLink = createUploadLink({
    uri: GRAPHQL_SERVER_URL,
    credentials: "include",
    fetch: customFetch as any,
    headers: {
      cookie:
        typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined || "",
    },
  });

  const link = wsLink
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

  return new ApolloClient({
    connectToDevTools: true,
    ssrMode: typeof window === "undefined",
    cache: new InMemoryCache(),
    link,
  });
};
export default withApollo(createClient);