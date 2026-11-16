import { Basket } from '../db/models/BasketModel.js';
import createHttpError from 'http-errors';

export const getBasketService = async userId => {
  const basket = await Basket.findOne({ userId }).populate(
    'items.productId',
    'title price mainImage',
  );

  if (!basket) return { items: [] };

  return basket;
};

export const addProductToBasketService = async (userId, data) => {
  const basket = await Basket.findOneAndUpdate(
    { userId },
    {
      $push: { items: data },
      $setOnInsert: { userId },
    },
    {
      new: true,
      upsert: true,
    },
  );

  if (!basket) {
    throw createHttpError(500, 'Не удалось добавить товар в корзину');
  }

  return basket;
};

export const deleteProductFromBasketService = async (userId, itemId) => {
  const basket = await Basket.findOne({ userId });

  if (!basket) {
    throw createHttpError(404, 'Корзина не найдена');
  }

  const itemExists = basket.items.some(
    item => item._id.toString() === itemId.toString(),
  );

  if (!itemExists) {
    throw createHttpError(404, 'Товар не найден в корзине');
  }
  return Basket.findOneAndUpdate(
    { userId },
    { $pull: { items: { _id: itemId } } },
    { new: true },
  );
};
