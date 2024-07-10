import { Router } from 'express';

import validateRequest from '../../middleware/validateRequest';
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
} from './product.controller';
import { createProductValidationSchema } from './product.validation';

const router = Router();

router.get('/', getAllProducts);
router.post(
  '/add-product',
  validateRequest(createProductValidationSchema),
  createProduct
);

router.get('/:id', getSingleProduct);

export default router;
