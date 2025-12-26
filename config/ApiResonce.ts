export class ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
  error: {
    code: string;
    details?: unknown;
  } | null;

  private constructor(
    success: boolean,
    statusCode: number,
    message: string,
    data: T | null,
    error: ApiResponse<T>["error"]
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.error = error;
  }

  /** Success response */
  static success<T>(
    statusCode: number,
    data: T,
    message = "Success"
  ): ApiResponse<T> {
    return new ApiResponse<T>(true, statusCode, message, data, null);
  }

  /** Error response */
  static error(
    statusCode: number,
    message: string,
    code = "INTERNAL_ERROR",
    details?: unknown
  ): ApiResponse<null> {
    return new ApiResponse(false, statusCode, message, null, { code, details });
  }
}
