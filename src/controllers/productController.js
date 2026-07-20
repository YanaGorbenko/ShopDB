// import { Product } from '../db/models/ProductModel.js';
import createHttpError from 'http-errors';
import { getProductsService } from '../services/productsService.js';

export const getProducts = async (req, res) => {
  const products = await getProductsService();
  res.json(products);
};
