import express from "express";
import { review } from "../controller/review.controller.js";
import { authVerify } from "../middleware/Authmid.js";
const router = express.Router();

router.get("/", authVerify, review);

export default router;
