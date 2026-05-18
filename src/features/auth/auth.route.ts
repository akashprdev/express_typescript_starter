import { Router } from 'express';
import { loginController, registerController } from './auth.controller';
import { validate } from '@/middlewares/validate.middleware';
import { createUserSchema, loginUserSchema } from './auth.validation';

const router = Router();

// http://localhost:3000/register
router.post('/register', validate(createUserSchema), registerController);

router.post('/login', validate(loginUserSchema), loginController);

export default router;
