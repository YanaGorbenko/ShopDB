import { Router } from 'express';
import { celebrate } from 'celebrate';
import { checkToken } from '../middlewares/checkToken.js';
import { checkPromoCode } from '../controllers/promoController.js';
import { checkPromoCodeSchema } from '../validation/promoValidation.js';

const promoRouter = Router();

promoRouter.post(
  '/check',
  checkToken,
  celebrate(checkPromoCodeSchema),
  checkPromoCode,
);

export default promoRouter;
