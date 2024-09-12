import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  loginCustomer,
  registerCustomer,
  getUserDetails,
} from '../controllers/customer.controller.js';

const router = Router();

router.route('/register').post(registerCustomer);
router.route('/login').post(loginCustomer);
router.route('/details').get(verifyJWT, getUserDetails);

export default router;
