import { Joi, Segments } from 'celebrate';
import { validateId } from '../utils/validId.js';

export const createOrderSchema = {
  [Segments.BODY]: Joi.object({
    discount: Joi.number().integer().min(0).max(100).default(0),
    comment: Joi.string().max(500),
    items: Joi.array()
      .items(
        Joi.object({
          productId: Joi.string().custom(validateId).required(),
          size: Joi.string()
            .valid('XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL')
            .required(),
          color: Joi.string().required(),
          quantity: Joi.number().min(1).required(),
        }),
      )
      .min(1)
      .required(),
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

// size: { type: String, enum: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'], required: true },
//         color: {type: String, required: true},
