import { Router } from 'express';
import { createUserSchema } from './auth.validation';
import { registerController } from './auth.controller';
import { validate } from '@/middlewares/validate.middleware';

const router = Router();

// http://localhost:3000/register
router.post('/register', validate(createUserSchema), registerController);

export default router;
