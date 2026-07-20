import { Product } from '../db/models/ProductModel.js';
export const getProductsService = async () => Product.find();
