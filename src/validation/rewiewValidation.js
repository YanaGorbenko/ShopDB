import { Joi, Segments } from 'celebrate';
import { validateId } from '../utils/validId.js';

export const createReviewSchema = {
  [Segments.BODY]: Joi.object({
    grade: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().max(1000).allow(''),
    productId: Joi.string().custom(validateId).required(),
  }),
};

export const getReviewSchema = {
  [Segments.QUERY]: Joi.object({
    productId: Joi.string().custom(validateId).required(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(2).default(2),
    sortBy: Joi.string().valid('date', 'grade'),
    sortOrder: Joi.string().valid('asc', 'desc'),
  }),
};

export const getTopReviewsSchema = {
  [Segments.QUERY]: Joi.object({
    limit: Joi.number().integer().min(1).max(20).default(10),
  }),
};
