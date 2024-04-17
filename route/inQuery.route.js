import express from "express";
import { verifySchema } from "../middleware/verifySchema";
import { inQuerySchema } from "../validation/inQueryValidation";
import { postInQuery } from "../controller/inQuery.controller";

const router = express.Router();

router.get("/", verifySchema(inQuerySchema), postInQuery);

export default router;
