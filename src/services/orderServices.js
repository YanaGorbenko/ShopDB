import { Order } from '../db/models/OrderModel.js';

export const createOrderService = order => Order.create(order);

export const getUserOrdersService = userId =>
  Order.find({ userId }).sort({ dateOfOrdering: -1 });
