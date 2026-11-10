import { Brand } from '../db/models/BrandModel.js';
import { Product } from '../db/models/ProductModel.js';

export const getProductsService = async (
  page = 1,
  limit = 2,
  category,
  minPrice,
  maxPrice,
  colors,
  sizes,
  brands,
  style,
  search,
  onSale = false,
  isNewProduct = false,
  isTop = false,
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
  if (brands && Array.isArray(brands) && brands.length > 0) {
    const brandRegexes = brands.map(b => new RegExp(`^${b.trim()}$`, 'i'));

    const foundBrands = await Brand.find({
      $or: [{ slug: { $in: brandRegexes } }, { name: { $in: brandRegexes } }],
    });

    const brandIds = foundBrands.map(b => b._id);

    if (brandIds.length > 0) {
      productsQuery.where('brand').in(brandIds);
    } else {
      return { products: [], totalCount: 0, totalPages: 0 };
    }
  }

  if (onSale) {
    productsQuery.where({
      oldPrice: { $ne: null, $exists: true, $gt: 0 },
      $expr: { $gt: ['$oldPrice', '$price'] },
    });
  }

  if (isNewProduct) {
    productsQuery.where('isNewProduct').equals(true);
  }

  if (isTop) {
    const TOP_THRESHOLD = 10;

    productsQuery.where('soldCount').gte(TOP_THRESHOLD);
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
