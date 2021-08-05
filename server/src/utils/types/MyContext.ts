import { Request, Response } from 'express';
import { createUserLoader, createImageLoader, createLanguageLoader, createScheduleLoader } from '../loaders';
import { createGameImageLoader } from '../loaders/createGameImageLoader';

export type MyContext = {
  // @ts-ignore
  req: Request & { session: Express.Session };
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
  imageLoader: ReturnType<typeof createImageLoader>;
  languageLoader: ReturnType<typeof createLanguageLoader>;
  scheduleLoader: ReturnType<typeof createScheduleLoader>;
  gameImageLoader: ReturnType<typeof createGameImageLoader>;
};
