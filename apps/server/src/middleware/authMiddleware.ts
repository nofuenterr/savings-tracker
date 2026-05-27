import passport from 'passport';
import { NextFunction, Request, Response } from 'express';

import { SafeUser } from '@savings-tracker/shared';

import { UnauthorizedError } from '../utils/errors';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: Error | null, user: SafeUser | false) => {
      if (err) return next(err);

      if (!user)
        return next(new UnauthorizedError('Unauthorized: not logged in'));

      req.user = user;
      next();
    },
  )(req, res, next);
};
