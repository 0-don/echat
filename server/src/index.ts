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
import { graphqlUploadExpress } from 'graphql-upload';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { COOKIE_NAME, ENTITIES, MIGRATIONS, __prod__ } from './constants';

import { UserResolver } from './resolvers/UserResolver';
import { ImageResolver } from './resolvers/ImageResolver';
import {
  createUserLoader,
  createImageLoader,
  createLanguageLoader,
  createScheduleLoader,
  createGameImageLoader,
} from './utils/loaders';
import { GameResolver } from './resolvers/GameResolver';

const PgSession = connectPgSimple(session);

(async () => {
  const app = express();

  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: [ENTITIES],
    migrations: [MIGRATIONS],
    subscribers: [MIGRATIONS],
  });
  await conn.runMigrations();

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

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, ImageResolver, GameResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      userLoader: createUserLoader(),
      imageLoader: createImageLoader(),
      languageLoader: createLanguageLoader(),
      scheduleLoader: createScheduleLoader(),
      gameImageLoader: createGameImageLoader(),
    }),
    uploads: false,
    introspection: true,
  });

  app.use(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }));
  server.applyMiddleware({ app, cors: false });

  app.listen(parseInt(process.env.SERVER_PORT!), () => {
    log(`
    🚀  Server is running!
    🔉  Listening on port ${process.env.SERVER_PORT}
    📭  Query at https://localhost:${process.env.SERVER_PORT}/graphql
  `);
  });
})();
