import express from 'express';
import {
  getProductById,
  getProducts,
} from '../cotrollers/productController.js';

const router = express.Router();

router.route('/').get(getProducts);

router.route('/:id').get(getProductById);

export default router;
