import { Schema, model } from 'mongoose';

const basketSchema = new Schema(
  {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        size: {
          type: String,
          enum: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],
          required: true,
        },
        color: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
  },
  { versionKey: false, timestamps: true },
);

export const Basket = model('Basket', basketSchema);
