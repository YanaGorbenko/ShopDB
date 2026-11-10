import { Router } from 'express';
import {
  createOrder,
  getUserOrderById,
  getUserOrders,
} from '../controllers/orderController.js';
import { checkToken } from '../middlewares/checkToken.js';
import { createOrderSchema, idSchema } from '../validation/orderValidation.js';
import { celebrate } from 'celebrate';

const orderRouter = Router();
orderRouter.post(
  '/create',
  checkToken,
  celebrate(createOrderSchema),
  createOrder,
);

orderRouter.get('/', checkToken, getUserOrders);
orderRouter.get('/:orderId', checkToken, celebrate(idSchema), getUserOrderById);
orderRouter.post('/', checkToken, celebrate(createOrderSchema), createOrder);

export default orderRouter;
