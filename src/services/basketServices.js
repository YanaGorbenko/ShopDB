import { Basket } from '../db/models/BasketModel.js';
import createHttpError from 'http-errors';

export const getBasketService = async userId => {
  const basket = await Basket.findOne({ userId }).populate(
    'items.productId',
    'title price mainImage isActive availableSizes availableColors',
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

export const changeProductAtBasketService = async (
  userId,
  itemId,
  updateData,
) => {
  const basketCheck = await Basket.findOne({ userId });

  if (!basketCheck) {
    throw createHttpError(404, 'Корзина не найдена');
  }

  const itemExists = basketCheck.items.some(
    item => item._id.toString() === itemId.toString(),
  );

  if (!itemExists) {
    throw createHttpError(404, 'Товар не найден в корзине');
  }

  const updateFields = {};

  for (const [key, value] of Object.entries(updateData)) {
    updateFields[`items.$.${key}`] = value;
  }
  const basket = await Basket.findOneAndUpdate(
    { userId, 'items._id': itemId },
    { $set: updateFields }, // 👈 Обновляем только то, что пришло
    { new: true },
  );

  if (!basket) {
    throw createHttpError(404, 'Товар в корзине не найден');
  }

  return basket;
};

export const clearBasketService = async userId => {
  return Basket.findOneAndUpdate(
    { userId },
    { $set: { items: [] } }, // 👈 Просто делаем массив пустым
    { new: true },
  );
};
