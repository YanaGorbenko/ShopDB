import { PromoCode } from '../db/models/PromocodeModel.js';
import createHttpError from 'http-errors';

export const checkPromoCodeService = async code => {
  const promo = await PromoCode.findOne({ code: code.toUpperCase() });

  if (!promo || !promo.isActive) {
    throw createHttpError(404, 'Промокод не найден или неактивен');
  }
  if (promo.expiresAt < new Date()) {
    throw createHttpError(400, 'Срок действия промокода истек');
  }
  if (promo.usageLimit && promo.usedCount >= promo.usageLimit) {
    throw createHttpError(400, 'Лимит использования промокода исчерпан');
  }

  return promo;
};

export const incrementPromoUsageService = async promoId => {
  await PromoCode.findByIdAndUpdate(promoId, { $inc: { usedCount: 1 } });
};
