import createHttpError from 'http-errors';
import {
  createReviewService,
  getReviewsService,
  getTopReviewsService,
} from '../services/reviewServices.js';

export const createReview = async (req, res) => {
  const { productId, comment, grade } = req.body;
  const userId = req.user._id;
  const review = await createReviewService({
    userId,
    productId,
    comment,
    grade,
  });
  res.status(201).json(review);
};

export const getReviews = async (req, res) => {
  const { productId, sortBy, sortOrder, page, limit } = req.query;
  const result = await getReviewsService(
    productId,
    sortBy,
    sortOrder,
    page,
    limit,
  );
  res.json(result);
};

export const getTopReviews = async (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const reviews = await getTopReviewsService(limit);
  res.json(reviews);
};
