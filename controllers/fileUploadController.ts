import { config } from "dotenv";
config();
import { Request, Response } from "express";
import { unlink } from "fs";

export const uploadFiles = async (req: Request, res: Response) => {
  //@ts-ignore
  const destinations = req.files?.map((file: any) => {
    return `http://localhost:8080/uploads/${file.filename}`;
  });
  res.send(destinations);
};

export const deleteFiles = async (req: Request, res: Response) => {
  const { filename } = req.body;

  const file = filename.replace("http://localhost:8080/uploads/", "");
  console.log(file);
  await unlink(`${process.env.STORAGE_DESTINATION!}/${file}`, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: "Error to delete file",
      });
    } else {
      res.status(200).json({
        message: "Successfully deleted file",
      });
    }
  });
};
