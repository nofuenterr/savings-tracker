export class NotFoundError extends Error {
  statusCode = 404;
  constructor(message: string | undefined) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class BadRequestError extends Error {
  statusCode = 400;
  constructor(message: string | undefined) {
    super(message);
    this.name = 'BadRequestError';
  }
}

export class UnauthorizedError extends Error {
  statusCode = 401;
  constructor(message: string | undefined) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends Error {
  statusCode = 403;
  constructor(message: string | undefined) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
}
