import { sendError } from '@/utils/response';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validate =
  (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const { fieldErrors } = z.flattenError(result.error);

      return sendError({
        res,
        statusCode: 400,
        message: 'Validation failed',
        errors: fieldErrors,
      });
    }

    req.body = result.data;
    next();
  };
