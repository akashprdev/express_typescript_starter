import { Request, Response, NextFunction } from 'express';
import { HttpError, sendError } from '@/utils/response';

export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  return sendError({
    res,
    statusCode: err.statusCode ?? 500,
    message: err.message || 'Internal Server Error',
  });
};
