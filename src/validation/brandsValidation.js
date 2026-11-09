import { validateId } from '../utils/validId.js';
import { Joi, Segments } from 'celebrate';

export const idSchema = {
  [Segments.PARAMS]: Joi.object({
    brandId: Joi.string().custom(validateId).required(),
  }),
};
