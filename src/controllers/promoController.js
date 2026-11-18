import { checkPromoCodeService } from '../services/promoServices.js';

export const checkPromoCode = async (req, res) => {
  const { code } = req.body;

  const promo = await checkPromoCodeService(code);

  res.status(200).json({
    code: promo.code,
    discountPercent: promo.discountPercent,
    message: 'Промокод успешно применен',
  });
};
