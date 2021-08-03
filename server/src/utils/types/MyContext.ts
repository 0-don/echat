import { Request, Response } from 'express';
import { createUserLoader, createImageLoader, createLanguageLoader, createScheduleLoader } from '../loaders';

export type MyContext = {
  // @ts-ignore
  req: Request & { session: Express.Session };
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
  imageLoader: ReturnType<typeof createImageLoader>;
  languageLoader: ReturnType<typeof createLanguageLoader>;
  scheduleLoader: ReturnType<typeof createScheduleLoader>;
};