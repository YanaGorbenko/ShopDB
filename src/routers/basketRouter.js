import { Router } from 'express';
import { checkToken } from '../middlewares/checkToken.js';
import { celebrate } from 'celebrate';
import {
  addProductToBasket,
  changeProductAtBasket,
  deleteProductFromBasket,
  getBasket,
} from '../controllers/basketController.js';
import {
  addProductToBasketSchema,
  changeProductAtBasketSchema,
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
basketRouter.patch(
  '/:itemId',
  checkToken,
  celebrate(changeProductAtBasketSchema),
  changeProductAtBasket,
);

export default basketRouter;
