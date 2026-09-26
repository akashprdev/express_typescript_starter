import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error('unauthorized');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new Error('invalid token');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    req.user = {
      id: decoded.id,
    };

    next();
  } catch (error) {
    next(error);
  }
};
