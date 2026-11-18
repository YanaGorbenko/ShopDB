import { Joi, Segments } from 'celebrate';
import { validateId } from '../utils/validId.js';

export const createOrderSchema = {
  [Segments.BODY]: Joi.object({
    promoCode: Joi.string().optional().allow(''),
    comment: Joi.string().max(500),
    delivery: Joi.object({
      method: Joi.string().valid('courier', 'pickup', 'post').required(),
      address: Joi.string().required(),
      city: Joi.string().required(),
    }).required(),
    customer: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
    }).required(),
  }),
};

export const idSchema = {
  [Segments.PARAMS]: Joi.object({
    orderId: Joi.string().custom(validateId).required(),
  }),
};

// size: { type: String, enum: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'], required: true },
//         color: {type: String, required: true},
