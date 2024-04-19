import express from "express";
import {
  getPayment,
  payment,
  paymentCapture,
  SubscriptionUpdate,
} from "../controller/payment.controller.js";
import { authVerify } from "../middleware/Authmid.js";
const router = express.Router();

router
  .get("/", authVerify, payment)
  .post("/valid", paymentCapture)
  .put("/status_up", authVerify, SubscriptionUpdate)
  .get("/get_all", authVerify, getPayment);

export default router;
