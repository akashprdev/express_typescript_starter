import { Router } from 'express';
import auth from '@/features/auth/auth.route';
import { apiLimiter, authLimiter } from '@/utils/rateLimit';

const router = Router();

// Apply general limiter to all routes as baseline
router.use(apiLimiter);

// Health check — no auth, no extra limiter needed
router.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    app: 'Express TypeScript Starter API',
    status: 'running',
    message: 'API is working correctly 🚀',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Feature routes with appropriate limiters
// Strict: 5 req / 10min
router.use('/auth', authLimiter, auth);

export default router;
