import {
  addProductToBasketService,
  changeProductAtBasketService,
  deleteProductFromBasketService,
  getBasketService,
} from '../services/basketServices.js';
import createHttpError from 'http-errors';

export const getBasket = async (req, res) => {
  const userId = req.user._id;
  const basket = await getBasketService(userId);
  res.status(200).json(basket);
};

export const addProductToBasket = async (req, res) => {
  const userId = req.user._id;
  const { productId, size, color, quantity } = req.body;
  const basket = await addProductToBasketService(userId, {
    productId,
    size,
    color,
    quantity,
  });
  res.status(200).json(basket);
};

export const deleteProductFromBasket = async (req, res) => {
  const userId = req.user._id;
  const { itemId } = req.params;
  const basket = await deleteProductFromBasketService(userId, itemId);
  if (!basket) {
    throw createHttpError(404, 'Корзина не найдена');
  }

  res.status(200).json(basket);
};

export const changeProductAtBasket = async (req, res) => {
  const userId = req.user._id;
  const { itemId } = req.params;
  const { size, color, quantity } = req.body;
  const updateData = {};
  if (size !== undefined) updateData.size = size;
  if (color !== undefined) updateData.color = color;
  if (quantity !== undefined) updateData.quantity = quantity;
  const basket = await changeProductAtBasketService(userId, itemId, updateData);
  res.status(200).json(basket);
};
