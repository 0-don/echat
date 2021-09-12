import 'dotenv/config';
import 'reflect-metadata';
import { log } from 'console';
import express from 'express';
import session from 'express-session';
import psl from 'psl';
import { ApolloServer } from 'apollo-server-express';
import connectPgSimple from 'connect-pg-simple';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createServer } from 'http';
import { graphqlUploadExpress } from 'graphql-upload';
import { buildTypeDefsAndResolvers } from 'type-graphql';
import { execute, subscribe } from 'graphql';
import { createConnection, getConnection } from 'typeorm';
import { COOKIE_NAME, __prod__ } from './constants';
import { UserResolver } from './resolvers/UserResolver';
import { ImageResolver } from './resolvers/ImageResolver';
import { ServiceResolver } from './resolvers/ServiceResolver';
import { UserServiceResolver } from './resolvers/UserServiceResolver';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { ChatResolver } from './resolvers/ChatResolver';
import { ApolloServerLoaderPlugin } from 'type-graphql-dataloader';
import { ExtraResolver } from './resolvers/ExtraResolver';
import path from 'path';

const PgSession = connectPgSimple(session);

(async () => {
  const app = express();
  const httpServer = createServer(app);

  await (
    await createConnection({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      logging: true,
      entities: [path.resolve(__dirname, 'entity', '*.{js,ts}')],
      migrations: [path.resolve(__dirname, 'migration', '*.{js,ts}')],
      subscribers: [path.resolve(__dirname, 'subscriber', '*.{js,ts}')],
    })
  ).runMigrations();

  // parse application/json
  app.set('trust proxy', 1);
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
        sameSite: 'lax', // csrf
        secure: __prod__, // cookie only works in https
        domain: __prod__
          ? `${psl.get(new URL(process.env.CORS_ORIGIN!).hostname)}` //get hostname without subdomain from cors_orgin .env
          : undefined,
      },
    })
  );

  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [
      ChatResolver,
      UserResolver,
      ImageResolver,
      ServiceResolver,
      UserServiceResolver,
      ExtraResolver,
    ],
    validate: false,
  });

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    uploads: false,
    introspection: true,
    plugins: [
      ApolloServerLoaderPlugin({ typeormGetConnection: getConnection }),
    ],
  });

  await server.start();
  app.use(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }));
  server.applyMiddleware({ app, cors: false });

  SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath }
  );

  httpServer.listen(parseInt(process.env.SERVER_PORT!), () => {
    log(`
    🚀  Server is running!!
    🔉  Listening on port ${process.env.SERVER_PORT}
    📭  Query at https://localhost:${process.env.SERVER_PORT}/graphql
    📭  Subscription at ws://localhost:${process.env.SERVER_PORT}/graphql
  `);
  });
})();
