import { Joi, Segments } from 'celebrate';

export const checkPromoCodeSchema = {
  [Segments.BODY]: Joi.object({
    code: Joi.string().required().trim(),
  }),
};
