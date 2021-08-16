import "dotenv/config";
import "reflect-metadata";

import express from "express";
import session from "express-session";
import psl from "psl";
import { ApolloServer } from "apollo-server-express";
import connectPgSimple from "connect-pg-simple";
import cookieParser from "cookie-parser";
import cors from "cors";
import { graphqlUploadExpress } from "graphql-upload";
import { buildTypeDefsAndResolvers } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, ENTITIES, MIGRATIONS, __prod__ } from "./constants";
import dotenv from "dotenv";
import { UserResolver } from "./resolvers/UserResolver";
import { ImageResolver } from "./resolvers/ImageResolver";
import {
  createUserLoader,
  createImageLoader,
  createLanguageLoader,
  createScheduleLoader,
  createGameImageLoader,
} from "./utils/loaders";
import { GameResolver } from "./resolvers/GameResolver";
import { UserGameResolver } from "./resolvers/UserGameResolver";
import { createGameLoader } from "./utils/loaders/createGameLoader";
import { ChatResolver } from "./resolvers/ChatResolver";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { execute, subscribe } from "graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

dotenv.config();
const PgSession = connectPgSimple(session);

const main = async () => {
  const app = express();

  const httpServer = createServer(app);

  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: [ENTITIES],
    migrations: [MIGRATIONS],
    subscribers: [MIGRATIONS],
  });
  await conn.runMigrations();

  // parse application/json
  app.set("trust proxy", 1);
  app.use(cookieParser());
  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
  app.use(
    session({
      name: COOKIE_NAME,
      store: new PgSession({ conString: process.env.DATABASE_URL }),
      secret: process.env.SESSION_SECRET!,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
        domain: __prod__
          ? `${psl.get(new URL(process.env.CORS_ORIGIN!).hostname)}` //get hostname without subdomain from cors_orgin .env
          : undefined,
      },
    })
  );

  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [
      UserResolver,
      ImageResolver,
      GameResolver,
      UserGameResolver,
      ChatResolver,
    ],

    validate: false,
    dateScalarMode: "isoDate",
  });
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  const server = new ApolloServer({
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
    schema: schema,

    context: ({ req, res }) => ({
      req,
      res,
      userLoader: createUserLoader(),
      imageLoader: createImageLoader(),
      languageLoader: createLanguageLoader(),
      scheduleLoader: createScheduleLoader(),
      gameImageLoader: createGameImageLoader(),
      gameLoader: createGameLoader(),
    }),
    introspection: true,
  });
  app.use(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }));

  await server.start();

  server.applyMiddleware({ app, cors: false });

  SubscriptionServer.create(
    { schema, execute, subscribe },
    {
      server: httpServer,
      path: server.graphqlPath,
    }
  );
  httpServer.listen(4001, () => {
    console.log(
      `Server ready at http://localhost:${process.env.SERVER_PORT}${server.graphqlPath}`
    );
    console.log(
      `Subscriptions ready at ws://localhost:${
        process.env.SERVER_PORT
      }${"/subscriptions"}`
    );
  });
};
main();
