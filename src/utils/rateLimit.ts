import rateLimit from 'express-rate-limit';
import { getClientIp } from './getClientIp';
import { Request } from 'express';
// General API limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,

  keyGenerator: (req: Request) => {
    return getClientIp(req);
  },

  handler: (req, res) => {
    console.info('Rate limit hit:', {
      ip: getClientIp(req),
      path: req.originalUrl,
      time: new Date().toISOString(),
    });

    res.status(429).json({
      success: false,
      error: 'Too many requests, please try again later.',
    });
  },
});

// Auth limiter — strict brute-force protection
export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many authentication attempts, please try again later.' },
  skipSuccessfulRequests: true, // Only count failed attempts
});

// AI / RAG limiter — cost control
export const aiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'AI request limit exceeded, please slow down.' },
});

// Admin limiter — sensitive route protection
export const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Admin rate limit exceeded.' },
});
