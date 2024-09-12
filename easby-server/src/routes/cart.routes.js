import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  findCustomerCart,
  addItemToCart,
  emptyCart,
} from '../controllers/cart.controller.js';

const router = Router();

router.route('/').get(verifyJWT, findCustomerCart);
router.route('/add').put(verifyJWT, addItemToCart);
router.route('/empty-cart').post(verifyJWT, emptyCart);

export default router;
