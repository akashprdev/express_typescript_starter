import type { Request } from 'express';

export const getClientIp = (req: Request): string => {
  const forwarded = req.headers['x-forwarded-for'];

  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }

  return req.socket.remoteAddress || req.ip || 'unknown';
};
