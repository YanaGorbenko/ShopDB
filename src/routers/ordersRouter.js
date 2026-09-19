import { Router } from 'express';
import { createOrder, getUserOrders } from '../controllers/orderController.js';
import { checkToken } from '../middlewares/checkToken.js';
import { createOrderSchema } from '../validation/orderValidation.js';
import { celebrate } from 'celebrate';

const orderRouter = Router();
orderRouter.post(
  '/create',
  checkToken,
  celebrate(createOrderSchema),
  createOrder,
);

orderRouter.get('/getOrders', checkToken, getUserOrders);

export default orderRouter;
