import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { payment } from '../controllers/payment.controller.js';

const router = Router();

router.route('/').post(verifyJWT, payment);

export default router;
