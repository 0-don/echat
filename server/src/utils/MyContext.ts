import { Request, Response } from "express";

export type MyContext = {
  // @ts-ignore
  req: Request & { session: Express.Session };
  res: Response;
};