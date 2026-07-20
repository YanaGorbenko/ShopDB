import { Router } from 'express';
import {
  getProductById,
  getProducts,
} from '../controllers/productController.js';
import {
  getProductsSchema,
  idSchema,
} from '../validation/productsValidation.js';
import { celebrate } from 'celebrate';

const productRouter = Router();
productRouter.get('/', celebrate(getProductsSchema), getProducts);
productRouter.get('/:productId', celebrate(idSchema), getProductById);

export default productRouter;
