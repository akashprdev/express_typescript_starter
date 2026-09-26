import type { Response } from 'express';

interface SuccessOptions<T> {
  res: Response;
  statusCode?: number;
  message?: string;
  data?: T | null;

  page?: number;
  limit?: number;
  noOfPages?: number;
}

interface ErrorOptions {
  res: Response;
  statusCode?: number;
  message?: string;
  errors?: unknown;
}

export type HttpError = Error & {
  statusCode?: number;
  errors?: unknown;
};

export const sendSuccess = <T>({
  res,
  statusCode = 200,
  message = 'Success',
  data,

  page,
  limit,
  noOfPages,
}: SuccessOptions<T>) => {
  return res.status(statusCode).json({
    success: true,
    message,

    ...(page !== undefined && { page }),
    ...(limit !== undefined && { limit }),
    ...(noOfPages !== undefined && { noOfPages }),

    data: data ?? null,
  });
};

export const sendError = ({
  res,
  statusCode = 500,
  message = 'Something went wrong',
  errors = null,
}: ErrorOptions) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
