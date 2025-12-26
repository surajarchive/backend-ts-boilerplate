import type { NextFunction, Request, Response } from "express";
import { AppError } from "../config/AppError";
import { ApiResponse } from "../config/ApiResonce";
import { ERROR_CODES } from "../config/errorCodes";
import { ZodError } from "zod";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json(
        ApiResponse.error(err.statusCode, err.message, err.code, err.details)
      );
  }

  if (err instanceof ZodError) {
    const appErr = AppError.fromZod(err);
    return res
      .status(appErr.statusCode)
      .json(
        ApiResponse.error(
          appErr.statusCode,
          appErr.message,
          appErr.code,
          appErr.details
        )
      );
  }

  // Programmer / unknown error
  console.error("🔥 Unhandled error:", err);

  return res
    .status(500)
    .json(
      ApiResponse.error(
        500,
        "Internal Server Error",
        ERROR_CODES.INTERNAL_ERROR
      )
    );
}
