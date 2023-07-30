import express from "express";
import { uploadFiles, deleteFiles } from "../controllers/fileUploadController";
import { upload } from "../utils/multer";
import { auth } from "../utils/protected";

const router = express.Router();

router.post("/", upload.array("files"), uploadFiles);
router.delete("/", auth, deleteFiles);

module.exports = router;
