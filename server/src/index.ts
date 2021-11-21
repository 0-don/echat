import 'dotenv/config';
import 'reflect-metadata';
import { log } from 'console';
import path from 'path';
import express from 'express';
import session from 'express-session';
import psl from 'psl';
import { ApolloServer } from 'apollo-server-express';
import connectPgSimple from 'connect-pg-simple';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { graphqlUploadExpress } from 'graphql-upload';
import { buildTypeDefsAndResolvers } from 'type-graphql';
import { createConnection, getConnection } from 'typeorm';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { COOKIE_NAME, __prod__ } from './constants';
import { ApolloServerLoaderPlugin } from 'type-graphql-dataloader';

import ws from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import { UserResolver } from './resolvers/UserResolver';
import { ImageResolver } from './resolvers/ImageResolver';
import { ServiceResolver } from './resolvers/ServiceResolver';
import { UserServiceResolver } from './resolvers/UserServiceResolver';
import { ChatResolver } from './resolvers/ChatResolver';
import { ExtraResolver } from './resolvers/ExtraResolver';
import { OrderResolver } from './resolvers/OrderResolver';
import { fakerGen } from './seed/faker-gen';
import { gamesGen } from './seed/games-gen';

const PgSession = connectPgSimple(session);

(async () => {
  const app = express();

  await (
    await createConnection({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      // logging: true,
      entities: [path.resolve(__dirname, 'entity', '*.{js,ts}')],
      migrations: [path.resolve(__dirname, 'migration', '*.{js,ts}')],
      subscribers: [path.resolve(__dirname, 'subscriber', '*.{js,ts}')],
    })
  ).runMigrations();

  await gamesGen(true);

  await fakerGen(true);

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
      OrderResolver,
    ],
    validate: false,
  });

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    uploads: false,
    introspection: true,
    playground: true,
    plugins: [
      ApolloServerLoaderPlugin({ typeormGetConnection: getConnection }),
    ],
  });

  app.use(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }));
  apolloServer.applyMiddleware({ app, cors: false });

  const server = app.listen(parseInt(process.env.SERVER_PORT!), () => {
    const wsServer = new ws.Server({
      server,
      path: '/graphql',
    });

    useServer({ schema }, wsServer);

    log(`
    🚀  Server is running!!
    🔉  Listening on port ${process.env.SERVER_PORT}
    📭  Query at http://localhost:${process.env.SERVER_PORT}/graphql
    📭  Subscription at ws://localhost:${process.env.SERVER_PORT}/graphql
  `);
  });
})();
