import express from "express";
import { payment, paymentCapture } from "../controller/payment.controller.js";
import { authVerify } from "../middleware/Authmid.js";
const router = express.Router();

router.get("/", authVerify, payment).post("/valid", paymentCapture);

export default router;
