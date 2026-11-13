import { Schema, model } from 'mongoose';

const reviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    comment: {
      type: String,
      trim: true,
    },
    grade: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

export const Review = model('Review', reviewSchema);
