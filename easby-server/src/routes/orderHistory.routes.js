import { Router } from 'express';
import { orderHistory } from '../controllers/order.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/').get(verifyJWT, orderHistory);

export default router;