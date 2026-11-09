import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getBrandById, getBrands } from '../controllers/brandsController.js';
import { idSchema } from '../validation/brandsValidation.js';

const brandRouter = Router();
brandRouter.get('/', getBrands);
brandRouter.get('/:brandId', celebrate(idSchema), getBrandById);

export default brandRouter;
