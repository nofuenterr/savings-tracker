import { hash } from 'bcryptjs';
import crypto from 'crypto';

import { BadRequestError, NotFoundError } from '../../../utils/errors';
import {
  createResetToken,
  createUser,
  findResetToken,
  findUserByEmail,
  updatePassword,
} from '../repositories/authRepository';
import {
  EditPasswordParams,
  RegisterUserParams,
  SendResetLinkDTO,
} from '../types/authType';

export const registerUser = async ({
  username,
  email,
  password,
}: RegisterUserParams) => {
  const passwordHash = await hash(password, 12);

  const success = await createUser({ username, email, passwordHash });

  if (!success) throw new BadRequestError('Failed to create user');

  return success;
};

export const sendResetLink = async ({
  email,
}: {
  email: string;
}): Promise<SendResetLinkDTO> => {
  const user = await findUserByEmail({ email });

  if (!user) throw new NotFoundError('User not found');

  const tokenRaw = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(tokenRaw).digest('hex');

  const expiresAt = new Date(Date.now() + 1000 * 60 * 30).toISOString();

  const token = await createResetToken({
    userId: user.id,
    tokenHash,
    expiresAt,
  });

  if (!token) throw new NotFoundError('Failed to create password reset token');

  return { token, user, tokenRaw };
};

export const fetchResetToken = async ({ tokenRaw }: { tokenRaw: string }) => {
  const incomingHash = crypto
    .createHash('sha256')
    .update(tokenRaw)
    .digest('hex');

  const token = await findResetToken({ incomingHash });

  if (!token)
    throw new NotFoundError(
      "Password reset token either doesn't exist, is no longer valid, or has expired",
    );

  return token;
};

export const editPassword = async ({
  userId,
  newPassword,
}: EditPasswordParams) => {
  const passwordHash = await hash(newPassword, 12);

  const user = await updatePassword({ userId, passwordHash });

  if (!user) throw new NotFoundError('User not found');

  return user;
};
