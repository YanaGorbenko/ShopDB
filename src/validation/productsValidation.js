import { Joi, Segments } from 'celebrate';
import { validateId } from '../utils/validId.js';

export const getProductsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(2).default(2),
    category: Joi.string().valid(
      'T-shirts',
      'Shorts',
      'Shirts',
      'Hoodie',
      'Jeans',
    ),
    minPrice: Joi.number().integer().min(1),
    maxPrice: Joi.number().integer().max(5000),
    colors: Joi.string().trim().optional(),
    sizes: Joi.string().trim().optional(),
    style: Joi.string().valid('Casual', 'Formal', 'Party', 'Gym'),
  }),
};

export const idSchema = {
  [Segments.PARAMS]: Joi.object({
    productId: Joi.string().custom(validateId).required(),
  }),
};
