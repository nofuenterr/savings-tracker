import { Request, Response, NextFunction } from 'express';

import { NODE_ENV } from '../includes/config/mainConfig';
import { AppError } from '../utils/errors';

const errorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error({
    message: err.message,
    ...(NODE_ENV === 'development' && { stack: err.stack }),
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString(),
  });

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

export default errorMiddleware;
