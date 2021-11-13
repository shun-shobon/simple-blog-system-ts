import { ErrorStatus } from "./ErrorStatus";

export class AppError extends Error {
  constructor(
    message: string,
    public readonly isOperational = false,
    public readonly statusCode = ErrorStatus.InternalError
  ) {
    super(message);
    this.name = "AppError";
  }
}
