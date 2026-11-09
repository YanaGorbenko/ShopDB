import { Brand } from '../db/models/BrandModel.js';

export const getBrandsService = async () =>
  Brand.find({ isActive: true }).sort({ name: 1 });
export const getBrandByIdService = async id => Brand.findById(id);
