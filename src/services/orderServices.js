import { Order } from '../db/models/OrderModel.js';

export const createOrderService = order => Order.create(order);
