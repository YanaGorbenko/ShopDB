import { Joi, Segments } from 'celebrate';
import { validateId } from '../utils/validId.js';

export const addProductToBasketSchema = {
  [Segments.BODY]: Joi.object({
    productId: Joi.string().custom(validateId).required(),
    size: Joi.string()
      .valid('XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL')
      .required(),
    color: Joi.string().required(),
    quantity: Joi.number().min(1).required(),
  }),
};

export const deleteProductFromBasketSchema = {
  [Segments.PARAMS]: Joi.object({
    itemId: Joi.string().custom(validateId).required(),
  }),
};

export const changeProductAtBasketSchema = {
  [Segments.BODY]: Joi.object({
    size: Joi.string().valid(
      'XXS',
      'XS',
      'S',
      'M',
      'L',
      'XL',
      'XXL',
      '3XL',
      '4XL',
    ),
    color: Joi.string(),
    quantity: Joi.number().min(1),
  }).min(1),
  [Segments.PARAMS]: Joi.object({
    itemId: Joi.string().custom(validateId).required(),
  }),
};
