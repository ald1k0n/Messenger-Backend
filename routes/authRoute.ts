import express from "express";
const router = express.Router();
import { createUser, loginUser } from "../controllers/userController";

router.post("/", createUser);
router.post("/login", loginUser);

module.exports = router;
