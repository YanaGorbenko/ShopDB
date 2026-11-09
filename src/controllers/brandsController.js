import createHttpError from 'http-errors';
import {
  getBrandByIdService,
  getBrandsService,
} from '../services/brandsServices.js';

export const getBrands = async (req, res) => {
  const brands = await getBrandsService();
  res.json(brands);
};

export const getBrandById = async (req, res) => {
  const { brandId } = req.params;
  const brand = await getBrandByIdService(brandId);
  if (!brand) {
    throw createHttpError(404, 'Brand not found');
  }
  res.json(brand);
};
