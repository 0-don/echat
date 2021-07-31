import { Request, Response } from "express";
import { createImageLoader } from "./loaders/createImageLoader";
import { createUserLoader } from "./loaders/createUserLoader";

export type MyContext = {
  // @ts-ignore
  req: Request & { session: Express.Session };
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
  imageLoader: ReturnType<typeof createImageLoader>;};