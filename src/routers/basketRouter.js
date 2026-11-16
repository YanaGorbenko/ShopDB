import { Router } from 'express';
import { checkToken } from '../middlewares/checkToken.js';
import { celebrate } from 'celebrate';
import {
  addProductToBasket,
  deleteProductFromBasket,
  getBasket,
} from '../controllers/basketController.js';
import {
  addProductToBasketSchema,
  deleteProductFromBasketSchema,
} from '../validation/basketValidation.js';

const basketRouter = Router();
basketRouter.post(
  '/',
  checkToken,
  celebrate(addProductToBasketSchema),
  addProductToBasket,
);

basketRouter.get('/', checkToken, getBasket);
basketRouter.delete(
  '/:itemId',
  checkToken,
  celebrate(deleteProductFromBasketSchema),
  deleteProductFromBasket,
);
// orderRouter.get('/:orderId', checkToken, celebrate(idSchema), getUserOrderById);
// orderRouter.post('/', checkToken, celebrate(createOrderSchema), createOrder);

export default basketRouter;
