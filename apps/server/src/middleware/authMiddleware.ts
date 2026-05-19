import passport from 'passport';
import { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from '../utils/errors';
import { SafeUser } from '../types/userType';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: Error, user: SafeUser) => {
      if (err) return next(err);

      if (!user)
        return next(new UnauthorizedError('Unauthorized: not logged in'));

      req.user = user;
      next();
    },
  )(req, res, next);
};
