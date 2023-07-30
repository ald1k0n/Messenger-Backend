import multer, { diskStorage } from "multer";
import { config } from "dotenv";
config();

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${process.env.STORAGE_DESTINATION!}`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

export const upload = multer({ storage: storage });
