import { Router } from 'express';
import {
  findProductById,
  searchProducts,
  categorySearch,
} from '../controllers/product.controller.js';

const router = Router();

router.route('/:id').get(findProductById);
router.route('/search/:keyword').get(searchProducts);
router.route('/category/:keyword').get(categorySearch);

export default router;
