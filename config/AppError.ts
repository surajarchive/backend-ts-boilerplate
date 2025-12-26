import { ZodError } from 'zod';
import { ERROR_CODES } from './errorCodes';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: keyof typeof ERROR_CODES;
  public readonly details?: unknown;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode = 500,
    code: keyof typeof ERROR_CODES = 'INTERNAL_ERROR',
    details?: unknown,
  ) {
    super(message);

    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  /** Factory for Zod errors */
  static fromZod(error: ZodError): AppError {
    return new AppError('Validation failed', 400, 'VALIDATION_ERROR', AppError.flattenZod(error));
  }

  /** Zod → frontend-friendly format */
  private static flattenZod(error: ZodError) {
    const result: Record<string, string[]> = {};

    for (const issue of error.issues) {
      const path = issue.path.join('.') || 'root';

      if (!result[path]) {
        result[path] = [];
      }

      result[path].push(issue.message);
    }

    return result;
  }
}
