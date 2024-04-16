import express from "express";
import {
  signup,
  login,
  verifyOtp,
  forgotPasswordRequest,
  forgotPassword,
} from "../controller/auth.controller.js";
import { verifySchema } from "../middleware/verifySchema.js";
import {
  RegisterSchema,
  LoginSchema,
  requestSchema,
  resetSchema,
} from "../validation/userValodation.js";
import upload from "../middleware/upload.js";
const router = express.Router();

router.post(
  "/signup",
  upload.single("avatar"),
  verifySchema(RegisterSchema),
  signup
);
router.post("/login", verifySchema(LoginSchema), login);
router
  .get("/verifyOTP", verifyOtp)
  .post("/request", verifySchema(requestSchema), forgotPasswordRequest)
  .post("/reset", verifySchema(resetSchema), forgotPassword);

export default router;
