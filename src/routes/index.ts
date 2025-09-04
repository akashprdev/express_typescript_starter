import { Router } from 'express';
import authRouter from '@/routes/auth';

const router = Router();

router.use('/auth', authRouter);

export default router;
