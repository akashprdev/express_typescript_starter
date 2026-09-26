import 'dotenv/config';

import '@/types/express';
import app from '@/index';
import { env } from './config/env';
import db from './database/database';
import { logger } from '@/utils/logger';

const connectDatabase = async () => {
  try {
    await db.execute('SELECT 1');
    logger.info('Database connected successfully');
  } catch (error) {
    logger.error({ error }, 'Database connection failed');
    process.exit(1);
  }
};

const startServer = async () => {
  await connectDatabase();

  const server = app.listen(env.port, () => {
    logger.info(`🚀 Server running on http://localhost:${env.port}`);
  });

  return server;
};

startServer();
