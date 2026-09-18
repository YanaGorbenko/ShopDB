import createHttpError from 'http-errors';
import { getNextOrderNumber } from '../services/counterService.js';
import { createOrderService } from '../services/orderServices.js';
import { Product } from '../db/models/ProductModel.js';

export const createOrder = async (req, res) => {
  const { items, discount = 0, delivery, customer, comment } = req.body;
  const userId = req.user._id;
  //
  const productIds = items.map(i => i.productId);
  const productsFromDB = await Product.find({ _id: { $in: productIds } });

  const orderItems = items.map(item => {
    const product = productsFromDB.find(
      p => p._id.toString() === item.productId,
    );
    if (!product) {
      throw createHttpError(404, `Товар ${item.productId} не найден`);
    }

    if (!product.availableSizes.includes(item.size)) {
      throw createHttpError(
        400,
        `Размер "${item.size}" недоступен для товара "${product.title}". Доступные: ${product.availableSizes.join(', ')}`,
      );
    }

    // Проверка цвета
    if (!product.availableColors.includes(item.color)) {
      throw createHttpError(
        400,
        `Цвет "${item.color}" недоступен для товара "${product.title}". Доступные: ${product.availableColors.join(', ')}`,
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

  const sumOfOrder = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const priceWithDiscount =
    Math.round(((sumOfOrder * (100 - discount)) / 100) * 100) / 100;

  const number = await getNextOrderNumber();

  const order = await createOrderService({
    number,
    items: orderItems,
    userId,
    sumOfOrder,
    discount,
    priceWithDiscount,
    delivery,
    customer,
    comment,
  });

  res.status(201).json(order);
};
