import { AppError } from './AppError';

export class BadRequestError extends AppError {
  constructor(message = 'Bad request', errors?: string | Record<string, string[]>) {
    super(400, message, errors);
  }
}
