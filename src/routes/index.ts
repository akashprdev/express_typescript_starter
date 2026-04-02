import { Router } from 'express';
import auth from '@/features/auth/auth.route';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    app: 'Express TypeScript Starter API',
    status: 'running',
    message: 'API is working correctly 🚀',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});
// Auth routes
router.use('/auth', auth);

export default router;
