import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '@/utils/response';
import { loginService, registerService } from './auth.service';

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

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await loginService(req.body);

    return sendSuccess({
      res,
      message: 'Login successful',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
