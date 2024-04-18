import express from "express";
import { verifySchema } from "../middleware/verifySchema.js";
import { inQuerySchema } from "../validation/inQueryValidation.js";
import { postInQuery } from "../controller/inQuery.controller.js";

const router = express.Router();

router.post("/", verifySchema(inQuerySchema), postInQuery);

export default router;
