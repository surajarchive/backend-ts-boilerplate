import type { NextFunction, Request, Response } from "express";
import { AppError } from "../config/AppError";
import { ApiResponse } from "../config/ApiResonce";
import { ERROR_CODES } from "../config/errorCodes";

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
