import createHttpError from 'http-errors';
import { getNextOrderNumber } from '../services/counterService.js';
import {
  createOrderService,
  getUserOrdersByIdService,
  getUserOrdersService,
  prepareOrderItemsService,
  updateSoldCountsService,
} from '../services/orderServices.js';
import {
  checkPromoCodeService,
  incrementPromoUsageService,
} from '../services/promoServices.js';
import { clearBasketService } from '../services/basketServices.js';

export const createOrder = async (req, res) => {
  const { promoCode, delivery, customer, comment } = req.body;
  const userId = req.user._id;

  const orderItems = await prepareOrderItemsService(userId);

  const sumOfOrder = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  let discountPercent = 0;
  let promoId = null;

  if (promoCode) {
    const promo = await checkPromoCodeService(promoCode);
    discountPercent = promo.discountPercent;
    promoId = promo._id;
  }

  const priceWithDiscount =
    Math.round(((sumOfOrder * (100 - discountPercent)) / 100) * 100) / 100;

  const number = await getNextOrderNumber();

  const order = await createOrderService({
    number,
    items: orderItems,
    userId,
    sumOfOrder,
    discount: discountPercent,
    priceWithDiscount,
    delivery,
    customer,
    comment,
  });

  await updateSoldCountsService(orderItems);

  if (promoId) {
    await incrementPromoUsageService(promoId);
  }

  await clearBasketService(userId);

  res.status(201).json(order);
};

export const getUserOrders = async (req, res) => {
  const userId = req.user._id;
  const orders = await getUserOrdersService(userId);
  if (!orders) {
    throw createHttpError(400, `Не було знайдено замовлень`);
  }
  res.status(200).json(orders);
};

export const getUserOrderById = async (req, res) => {
  const userId = req.user._id;
  const { orderId } = req.params;
  const order = await getUserOrdersByIdService(userId, orderId);
  if (!order) {
    throw createHttpError(404, `Order not found`);
  }
  res.status(200).json(order);
};
