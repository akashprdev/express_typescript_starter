import { sendSuccess } from '@/utils/response';
import { registerService } from './auth.service';
import { NextFunction, Request, Response } from 'express';

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await registerService(req.body);

    return sendSuccess({
      res,
      statusCode: 201,
      message: 'User registered successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
