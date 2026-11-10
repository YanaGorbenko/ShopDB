import { Order } from '../db/models/OrderModel.js';
import { Product } from '../db/models/ProductModel.js';

export const getProductsByIdsService = async productIds => {
  return Product.find({ _id: { $in: productIds } });
};

export const updateSoldCountsService = async orderItems => {
  const bulkOps = orderItems.map(item => ({
    updateOne: {
      filter: { _id: item.productId },
      update: { $inc: { soldCount: item.quantity } },
    },
  }));

  return Product.bulkWrite(bulkOps);
};

export const createOrderService = order => Order.create(order);

export const getUserOrdersService = userId =>
  Order.find({ userId }).sort({ dateOfOrdering: -1 });

export const getUserOrdersByIdService = (userId, orderId) =>
  Order.findOne({ userId, _id: orderId });
