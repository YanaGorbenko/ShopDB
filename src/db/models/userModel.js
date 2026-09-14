import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    ordersIds: {
      type: [Schema.Types.ObjectId],
      ref: 'Order',
      default: [],
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.index({ email: 1 });

export const User = model('User', userSchema);
