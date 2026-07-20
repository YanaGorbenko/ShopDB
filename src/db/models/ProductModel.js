import { Schema, model } from 'mongoose';
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      enum: ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'],
      required: true,
    },
    dressStyle: {
      type: String,
      enum: ['Casual', 'Formal', 'Party', 'Gym'],
      default: 'Casual',
    },
    description: {
      type: String,
      required: true,
    },

    availableSizes: {
      type: [String],
      enum: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],
      default: [],
    },
    availableColors: {
      type: [String],
      default: [],
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    oldPrice: {
      type: Number,
      min: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    mainImage: {
      type: String,
      required: true,
    },

    otherImages: {
      type: [String],
      default: [],
    },
    brand: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false },
);

export const Product = model('Product', productSchema);
