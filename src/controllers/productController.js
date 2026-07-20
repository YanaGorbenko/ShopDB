// import { Product } from '../db/models/ProductModel.js';
import createHttpError from 'http-errors';
import {
  getProductByIdService,
  getProductsService,
} from '../services/productsService.js';

export const getProducts = async (req, res) => {
  const { page, limit, category, minPrice, maxPrice, style, search } =
    req.query;
  let { colors, sizes } = req.query;
  if (colors && typeof colors === 'string') {
    colors = colors.split(',').map(c => c.trim());
  }
  if (sizes && typeof sizes === 'string') {
    sizes = sizes.split(',').map(s => s.trim());
  }
  const products = await getProductsService(
    page,
    limit,
    category,
    minPrice,
    maxPrice,
    colors,
    sizes,
    style,
    search,
  );
  res.json(products);
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await getProductByIdService(productId);
  if (!product) {
    throw createHttpError(404, 'Product not found');
  }
  res.json(product);
};
