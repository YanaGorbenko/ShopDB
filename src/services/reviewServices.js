import { Product } from '../db/models/ProductModel.js';
import { Review } from '../db/models/ReviewModel.js';

export const createReviewService = async data => {
  const review = await Review.create(data);

  const reviews = await Review.find({ productId: data.productId });
  const totalGrade = reviews.reduce((sum, r) => sum + r.grade, 0);
  const averageGrade = totalGrade / reviews.length;

  // 3. Обновляем товар
  await Product.findByIdAndUpdate(data.productId, {
    rating: parseFloat(averageGrade.toFixed(1)),
    reviewsCount: reviews.length,
  });

  return review;
};

export const getReviewsService = async (
  productId,
  sortBy,
  sortOrder,
  page = 1,
  limit = 2,
) => {
  const skip = (page - 1) * limit;
  const reviewQuery = Review.find({ productId }).populate('userId', 'name');
  if (sortBy === 'grade') {
    reviewQuery.sort({ grade: sortOrder === 'desc' ? -1 : 1, createdAt: -1 });
  } else {
    reviewQuery.sort({ createdAt: sortOrder === 'asc' ? 1 : -1 });
  }

  const [totalCount, reviews] = await Promise.all([
    reviewQuery.clone().countDocuments(),
    reviewQuery.skip(skip).limit(limit),
  ]);

  const totalPages = Math.ceil(totalCount / limit);
  return { reviews, totalCount, totalPages };
};

export const getTopReviewsService = async (limit = 10) => {
  return Review.find({ grade: { $gte: 4 } })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('productId', 'title mainImage') // 👈 Только название и картинку товара
    .populate('userId', 'name');
};
