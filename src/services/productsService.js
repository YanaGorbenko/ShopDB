import { Product } from '../db/models/ProductModel.js';

export const getProductsService = async (
  page = 1,
  limit = 2,
  category,
  minPrice,
  maxPrice,
  colors,
  sizes,
  style,
  search,
) => {
  const skip = (page - 1) * limit;
  const productsQuery = Product.find();

  if (search && search.trim()) {
    productsQuery.where({
      title: { $regex: search, $options: 'i' },
    });
  }

  if (category) {
    productsQuery.where('category').equals(category);
  }

  if (style) {
    productsQuery.where('dressStyle').equals(style);
  }

  if (minPrice) {
    productsQuery.where('price').gte(minPrice);
  }
  if (maxPrice) {
    productsQuery.where('price').lte(maxPrice);
  }

  if (colors && Array.isArray(colors) && colors.length > 0) {
    productsQuery.where('availableColors').in(colors);
  }

  if (sizes && Array.isArray(sizes) && sizes.length > 0) {
    productsQuery.where('availableSizes').in(sizes);
  }

  productsQuery.sort({ createdAt: -1 });

  const [totalCount, products] = await Promise.all([
    productsQuery.clone().countDocuments(),
    productsQuery.skip(skip).limit(limit),
  ]);

  const totalPages = Math.ceil(totalCount / limit);
  return { products, totalCount, totalPages };
};

export const getProductByIdService = async id => Product.findById(id);
