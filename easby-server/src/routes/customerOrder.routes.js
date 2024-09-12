import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { createOrder, findOrderById } from '../controllers/order.controller.js';

const router = Router();

router.route('/').post(verifyJWT, createOrder);
router.route('/:id').get(verifyJWT, findOrderById);

export default router;
