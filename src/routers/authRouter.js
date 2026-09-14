import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getCurrentUser,
  logout,
  refreshSession,
  signIn,
  signUp,
} from '../controllers/authController.js';
import { signInSchema, signUpSchema } from '../validation/authValidation.js';

const router = Router();

router.post('/sign-up', celebrate(signUpSchema), signUp);
router.post('/sign-in', celebrate(signInSchema), signIn);
router.post('/logout', logout);
router.post('/refresh', refreshSession);
router.get('/current', getCurrentUser);

export default router;
