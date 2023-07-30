import { config } from "dotenv";
config();
import jwt from "jsonwebtoken";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN!;

export const signAccessToken = (payload: any) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ payload }, ACCESS_TOKEN, (err: any, token: any) => {
      if (err) {
        reject();
      } else {
        resolve(token);
      }
    });
  });
};

export const verifyAccessToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, ACCESS_TOKEN, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return reject(message);
      }
      resolve(payload);
    });
  });
};
