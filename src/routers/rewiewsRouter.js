import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  createReviewSchema,
  getReviewSchema,
  getTopReviewsSchema,
} from '../validation/rewiewValidation.js';
import {
  createReview,
  getReviews,
  getTopReviews,
} from '../controllers/reviewController.js';
import { checkToken } from '../middlewares/checkToken.js';

const reviewRouter = Router();
reviewRouter.post('/', checkToken, celebrate(createReviewSchema), createReview);
reviewRouter.get('/', celebrate(getReviewSchema), getReviews);
reviewRouter.get('/top', celebrate(getTopReviewsSchema), getTopReviews);

export default reviewRouter;
