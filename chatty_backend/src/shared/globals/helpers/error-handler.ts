import HTTPS_STATUS from "http-status-codes";

export interface IError {
  message: string;
  statusCode: number;
  status: string;
}

export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  serializeErrors(): IError;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;

  constructor(message: string) {
    super(message);
  }

  serializeErrors(): IError {
    return {
      message: this.message,
      status: this.status,
      statusCode: this.statusCode
    };
  }
}

export class BadRequestError extends CustomError {
  statusCode = HTTPS_STATUS.BAD_REQUEST;
  status = "error";

  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends CustomError {
  statusCode = HTTPS_STATUS.NOT_FOUND;
  status = "error";

  constructor(message: string) {
    super(message);
  }
}

export class NotAuthorized extends CustomError {
  statusCode = HTTPS_STATUS.UNAUTHORIZED;
  status = "error";

  constructor(message: string) {
    super(message);
  }
}

export class FileTooLargeError extends CustomError {
  statusCode = HTTPS_STATUS.REQUEST_TOO_LONG;
  status = "error";

  constructor(message: string) {
    super(message);
  }
}

export class ServerError extends CustomError {
  statusCode = HTTPS_STATUS.SERVICE_UNAVAILABLE;
  status = "error";

  constructor(message: string) {
    super(message);
  }
}

export class JoiValidationError extends CustomError {
  statusCode = HTTPS_STATUS.BAD_REQUEST;
  status = "error";

  constructor(message: string) {
    super(message);
  }
}
