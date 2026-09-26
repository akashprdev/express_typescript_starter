const isDev = process.env.NODE_ENV !== 'production';

export const env = {
  port: Number(isDev ? process.env.DEV_PORT : process.env.PORT) || 5000,
  databaseUrl: process.env.DATABASE_URL!,
  geminiApiKey: process.env.GEMINI_API_KEY!,
};
