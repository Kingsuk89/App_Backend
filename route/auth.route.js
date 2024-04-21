import express from 'express';
import multer from 'multer';

import { signup, login, verifyOtp, forgotPasswordRequest, forgotPassword } from '../controller/auth.controller.js';
import { verifySchema } from '../middleware/verifySchema.js';
import { RegisterSchema, LoginSchema, requestSchema, resetSchema } from '../validation/userValodation.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/signup', upload.single('avatar'), verifySchema(RegisterSchema), signup);
router.post('/login', verifySchema(LoginSchema), login);
router
	.post('/verifyOTP', verifyOtp)
	.post('/request', verifySchema(requestSchema), forgotPasswordRequest)
	.post('/reset', verifySchema(resetSchema), forgotPassword);

export default router;
