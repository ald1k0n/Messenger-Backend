import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "./jwt";
import { User } from "@prisma/client";
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.sendStatus(401);
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }

  await verifyAccessToken(token)
    .then((user) => {
      //@ts-ignore
      req.user = user;
      next();
    })
    .catch(() => {
      res.sendStatus(401);
    });
};
