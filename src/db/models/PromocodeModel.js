import { Schema, model } from 'mongoose';

const promoCodeSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    discountPercent: { type: Number, required: true, min: 1, max: 100 },
    isActive: { type: Boolean, default: true },
    expiresAt: { type: Date, required: true }, // Когда сгорает
    usageLimit: { type: Number, default: null }, // Сколько раз можно использовать
    usedCount: { type: Number, default: 0 },
  },
  { versionMap: false },
);

export const PromoCode = model('PromoCode', promoCodeSchema);
