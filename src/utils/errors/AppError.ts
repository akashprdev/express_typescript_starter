export class AppError extends Error {
  public statusCode: number;
  public errors?: string | Record<string, string[]> | null;

  constructor(
    statusCode: number,
    message: string,
    errors?: string | Record<string, string[]> | null
  ) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errors = errors;

    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this);
  }
}
