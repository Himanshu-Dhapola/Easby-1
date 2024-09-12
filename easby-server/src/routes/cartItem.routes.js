import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  updateCartItem,
  removeCartItem,
} from '../controllers/cartItem.controller.js';

const router = Router();

router.route('/:id').put(verifyJWT, updateCartItem);
router.route('/:id').delete(verifyJWT, removeCartItem);

export default router;
