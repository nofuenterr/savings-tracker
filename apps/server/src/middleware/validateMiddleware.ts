import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';

export const validate = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      req.body = parsed.body;
      req.params = (parsed.params ?? req.params) as typeof req.params;

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: err.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        });
      }
      next(err);
    }
  };
};
