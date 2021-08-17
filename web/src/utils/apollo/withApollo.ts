import { GRAPHQL_SERVER_URL } from "../../constants";
import { withApollo } from "next-apollo";
import { customFetch } from "./customFetch";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { createUploadLink } from "apollo-upload-client";
import ws from "ws";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4001/subscriptions/graphql",
  options: {
    reconnect: true,
  },
  webSocketImpl: ws,
});

const httpLink = createUploadLink({
  uri: GRAPHQL_SERVER_URL,
  credentials: "include",
  fetch: customFetch as any,
  // headers: {
  //   cookie:
  //     (typeof window === "undefined"
  //       ? //@ts-ignore
  //         ctx?.req?.headers.cookie
  //       : undefined) || "",
  // },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    connectToDevTools: true,
    ssrMode: typeof window === "undefined",
    cache: new InMemoryCache(),
    link: splitLink,
  });

export default withApollo(createClient);
