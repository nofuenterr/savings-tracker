import jwt, { type JwtPayload } from 'jsonwebtoken';
import { PassportStatic } from 'passport';
import { NextFunction, Request, Response } from 'express';

import { JWT_SECRET, NODE_ENV } from '../../../includes/config/mainConfig';
import { ControllerRequest } from '../../../types/controllerType';
import { SafeUser } from '../../../types/userType';
import { UnauthorizedError } from '../../../utils/errors';
import {
  editPassword,
  fetchResetToken,
  registerUser,
  sendResetLink,
} from '../services/authService';
import { RegisterBody, ResetPasswordBody } from '../types/authType';

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

          return res.status(200).json({
            success: true,
            message: 'Auth Passed',
            token,
            user,
          });
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
    res.status(200).json({
      success: true,
      message: 'Logged out',
    });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (
  req: ControllerRequest<object, { email: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;

    const result = await sendResetLink({ email });

    return res.status(201).json({
      success: true,
      data: result,
      message: `Check your inbox. We've sent a reset link to ${email}. The link expires in 30 minutes.`,
      link: `http://localhost:3000/auth/verify-reset-token?token=${result.tokenRaw}`,
    });
  } catch (err) {
    next(err);
  }
};

export const verifyResetToken = async (
  req: ControllerRequest<object, object, { token: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token } = req.query;

    const result = await fetchResetToken({ tokenRaw: token });

    const resetToken = jwt.sign(
      { userId: result.user_id, purpose: 'password_reset' },
      JWT_SECRET,
      { expiresIn: '10m' },
    );

    return res.status(200).json({
      success: true,
      message: 'Password reset token has been verified',
      resetToken,
    });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (
  req: ControllerRequest<object, ResetPasswordBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { resetToken, newPassword } = req.body;

    const payload = jwt.verify(resetToken, JWT_SECRET) as JwtPayload;

    if (payload.purpose !== 'password_reset') {
      throw new Error('Invalid token');
    }

    const result = await editPassword({
      userId: payload.userId,
      newPassword,
    });

    res.clearCookie('token');

    return res.status(200).json({
      success: true,
      data: result,
      message: 'Your password has been reset successfully.',
    });
  } catch (err) {
    next(err);
  }
};
