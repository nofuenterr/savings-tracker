import jwt from 'jsonwebtoken';
import { PassportStatic } from 'passport';
import { NextFunction, Request, Response } from 'express';

import { JWT_SECRET, NODE_ENV } from '../../../includes/config/mainConfig';
import { ControllerRequest } from '../../../types/controllerType';
import { SafeUser } from '../../../types/userType';
import { UnauthorizedError } from '../../../utils/errors';
import { registerUser } from '../services/authService';
import { RegisterBody } from '../types/authType';

export const register = async (
  req: ControllerRequest<object, RegisterBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, email, password } = req.body;

    const result = await registerUser({ username, email, password });

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const login =
  (passport: PassportStatic) =>
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      'local',
      { session: false },
      async (
        err: Error | null,
        user: SafeUser | null,
        info: { message: string } | undefined,
      ) => {
        if (err) return next(err);

        if (!user)
          return next(
            new UnauthorizedError(info?.message || 'Authentication failed'),
          );

        try {
          const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' },
          );

          res.cookie('token', token, {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60,
          });

          return res.status(200).json({ message: 'Auth Passed', token, user });
        } catch (err) {
          next(err);
        }
      },
    )(req, res, next);
  };

export const logout = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
  } catch (err) {
    next(err);
  }
};
