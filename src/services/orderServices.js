import { Order } from '../db/models/OrderModel.js';
import { Product } from '../db/models/ProductModel.js';
import { getBasketService } from './basketServices.js';

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

export const prepareOrderItemsService = async userId => {
  const basket = await getBasketService(userId);

  if (!basket || basket.items.length === 0) {
    throw createHttpError(400, 'Корзина пуста');
  }

  return basket.items.map(item => {
    const product = item.productId;

    if (!product) {
      throw createHttpError(404, 'Один из товаров больше не существует');
    }

    if (product.isActive === false) {
      throw createHttpError(
        400,
        `Товар "${product.title}" больше не продается`,
      );
    }

    if (!product.availableSizes.includes(item.size)) {
      throw createHttpError(
        400,
        `Размер "${item.size}" больше недоступен для "${product.title}"`,
      );
    }

    if (!product.availableColors.includes(item.color)) {
      throw createHttpError(
        400,
        `Цвет "${item.color}" больше недоступен для "${product.title}"`,
      );
    }

    return {
      productId: product._id,
      title: product.title,
      price: product.price,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
    };
  });
};
