import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import helmet from 'helmet';

import routes from '@/routes';
import { errorHandler } from './middlewares/error.middleware';
import { logger } from './utils/logger';

const app = express();

// ─── Proxy ───
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: 'cross-origin',
    },
  })
);
// ─── CORS ----
// Must come before routes so preflight OPTIONS requests are handled correctly
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : [];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      if (process.env.NODE_ENV !== 'production') {
        // In dev, allow all origins
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error(`CORS policy: origin '${origin}' not allowed`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ─── Request Logging
app.use(
  pinoHttp({
    logger,
    transport:
      process.env.NODE_ENV !== 'production'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'SYS:standard',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
    serializers: {
      req(req) {
        return { method: req.method, url: req.url };
      },
      res(res) {
        return { statusCode: res.statusCode };
      },
    },
    redact: {
      paths: ['req.headers.authorization'],
      remove: true,
    },
  })
);

// ─── Body Parsing ────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    app: 'Express TypeScript Starter API',
    status: 'running',
    message: 'API is working correctly 🚀',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// ─── Routes  ---
app.use('/api/v1', routes);

// ─── Error Handling ---
app.use(errorHandler);

export default app;
