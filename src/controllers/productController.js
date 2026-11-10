// import { Product } from '../db/models/ProductModel.js';
import createHttpError from 'http-errors';
import {
  getProductByIdService,
  getProductsService,
} from '../services/productsService.js';

export const getProducts = async (req, res) => {
  const {
    page,
    limit,
    category,
    minPrice,
    maxPrice,
    style,
    search,
    onSale,
    isNewProduct,
    isTop,
  } = req.query;

  let { colors, sizes, brands } = req.query;
  if (colors && typeof colors === 'string') {
    colors = colors.split(',').map(c => c.trim());
  }
  if (sizes && typeof sizes === 'string') {
    sizes = sizes.split(',').map(s => s.trim());
  }
  if (brands && typeof brands === 'string') {
    brands = brands.split(',').map(s => s.trim());
  }
  const products = await getProductsService(
    page,
    limit,
    category,
    minPrice,
    maxPrice,
    colors,
    sizes,
    brands,
    style,
    search,
    onSale === 'true' || onSale === true,
    isNewProduct === 'true' || isNew === true,
    isTop === 'true' || isTop === true,
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
