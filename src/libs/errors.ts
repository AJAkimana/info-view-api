enum ErrorType {
  DuplicateDataError = 'Duplicate data error',
  InvalidDataError = 'Invalid data error',
  NotFound = 'Record not found',
  AssociationError = 'Association error',
  UniqueConstraintError = 'Unique constraint error',
  ForeignKeyError = 'Foreign key error',
  InternalError = 'Internal Server Error',
  ForbiddenAccess = 'Forbidden Access Error',
  UnauthorizedError = 'Unauthorized Error',
  DatabaseServiceError = 'Database service error',
  MultipeChoice = 'Multiple choice',
}

export class BaseError extends Error {
  public statusCode?: number;
  public error?: any;

  constructor() {
    super();
    this.statusCode = 500;
  }
}

class DuplicateDataError extends BaseError {
  public type: ErrorType;

  public message: string;

  constructor(message: string = 'Already exists') {
    super();
    this.type = ErrorType.DuplicateDataError;
    this.message = message;
    this.statusCode = 409;
  }
}

class InvalidDataError extends BaseError {
  public type: ErrorType;

  public message: string;

  constructor(message: string = `Invalid info`) {
    super();
    this.type = ErrorType.InvalidDataError;
    this.message = message;
    this.statusCode = 400;
  }
}

class NotFoundError extends BaseError {
  public type: ErrorType;

  public message: string;

  constructor(message: string = 'Not found') {
    super();
    this.type = ErrorType.NotFound;
    this.message = message;
    this.statusCode = 404;
  }
}

class InternalServerError extends BaseError {
  public type: ErrorType;

  public message: string;

  constructor(message: string = 'Service not available', error?: any) {
    super();
    this.type = ErrorType.InternalError;
    this.statusCode = 500;
    this.message = message;
    this.error = error;
  }
}
class UnauthorizedError extends BaseError {
  public type: ErrorType;

  public message: string;

  constructor(message: string = 'Unauthorized') {
    super();
    this.type = ErrorType.UnauthorizedError;
    this.statusCode = 401;
    this.message = message;
  }
}
class ForbiddenAccessError extends BaseError {
  public type: ErrorType;

  public message: string;

  constructor(message: string = 'Access forbidden') {
    super();
    this.type = ErrorType.ForbiddenAccess;
    this.statusCode = 403;
    this.message = message;
  }
}

class DatabaseServiceError extends BaseError {
  public type: ErrorType;

  public message: string;

  constructor(message: string = 'Database service error', error?: any) {
    super();
    this.type = ErrorType.DatabaseServiceError;
    this.statusCode = 500;
    this.message = message;
    this.error = error;
  }
}

export const forbiddenAccessError = (message?: string) =>
  new ForbiddenAccessError(message);
export const unauthorizedError = (message?: string) =>
  new UnauthorizedError(message);
export const internalServerError = (message?: string, error?: any) =>
  new InternalServerError(message, error);
export const notFoundError = (message?: string) => new NotFoundError(message);
export const invalidDataError = (message?: string) =>
  new InvalidDataError(message);
export const duplicateDataError = (message?: string) =>
  new DuplicateDataError(message);
export const databaseServiceError = (message?: string, error?: any) =>
  new DatabaseServiceError(message, error);
