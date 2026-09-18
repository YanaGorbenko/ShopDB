import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    number: {
      type: String,
      required: true,
      unique: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        title: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        size: {
          type: String,
          enum: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],
          required: true,
        },
        color: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    dateOfOrdering: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sumOfOrder: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
    priceWithDiscount: {
      type: Number,
      default: 0,
    },
    delivery: {
      method: {
        type: String,
        enum: ['courier', 'pickup', 'post'],
        required: true,
      },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true, lowercase: true, trim: true },
      phone: { type: String, required: true },
    },
    comment: { type: String, maxlength: 500 },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  { versionKey: false },
);

orderSchema.index({ sumOfOrder: 1 });

export const Order = model('Order', orderSchema);
