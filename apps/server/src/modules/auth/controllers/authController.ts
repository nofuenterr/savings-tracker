import jwt, { type JwtPayload } from 'jsonwebtoken';
import { PassportStatic } from 'passport';
import { NextFunction, Request, Response } from 'express';

import { SafeUser } from '@savings-tracker/shared';

import {
  CLIENT_URL,
  JWT_SECRET,
  NODE_ENV,
} from '../../../includes/config/mainConfig';
import { isUsingGmail } from '../../../includes/config/nodemailer';
import { ControllerRequest } from '../../../types/controllerType';
import { UnauthorizedError } from '../../../utils/errors';
import { sendEmail } from '../../../utils/sendEmail';
import {
  editPassword,
  fetchResetToken,
  registerUser,
  sendResetLink,
} from '../services/authService';
import {
  ForgotPasswordBody,
  RegisterBody,
  ResetPasswordBody,
  VerifyResetTokenBody,
} from '../types/authType';

export async function getCurrentUser(
  req: ControllerRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    return res.status(200).json({
      success: true,
      data: req.user ?? null,
    });
  } catch (err) {
    next(err);
  }
}

export const register = async (
  req: ControllerRequest<object, RegisterBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, email, password } = req.body;

    const user = await registerUser({ username, email, password });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 1000 * 60 * 60,
    });

    return res.status(201).json({
      success: true,
      data: { user },
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
            sameSite: 'none',
            maxAge: 1000 * 60 * 60,
          });

          return res.status(200).json({
            success: true,
            data: { user },
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
  req: ControllerRequest<object, ForgotPasswordBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;

    const tokenRaw = await sendResetLink({ email });

    if (!isUsingGmail() || NODE_ENV === 'production') {
      console.log(`${CLIENT_URL}/auth/verify-reset-token?token=${tokenRaw}`);
    }
    sendEmail({
      to: email,
      subject: 'Password Reset Link',
      text: `
        We received a request to reset your Savings Tracker account password.

        Click the link below to reset your password:
        ${CLIENT_URL}/auth/verify-reset-token?token=${tokenRaw}

        This link will expire in 30 minutes. If you didn't request this, you can safely ignore this email.
      `,
    }).catch((err) => {
      console.error('[Mailer] Failed to send reset email:', err);
    });

    return res.status(201).json({
      success: true,
      data: { email },
    });
  } catch (err) {
    next(err);
  }
};

export const verifyResetToken = async (
  req: ControllerRequest<object, VerifyResetTokenBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token } = req.body;

    const result = await fetchResetToken({ tokenRaw: token });

    const resetToken = jwt.sign(
      { userId: result.user_id, purpose: 'password_reset' },
      JWT_SECRET,
      { expiresIn: '10m' },
    );

    return res.status(200).json({
      success: true,
      data: { resetToken },
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

    await editPassword({
      userId: payload.userId,
      newPassword,
    });

    res.clearCookie('token');

    return res.status(200).json({
      success: true,
      message: 'Your password has been reset successfully.',
    });
  } catch (err) {
    next(err);
  }
};
