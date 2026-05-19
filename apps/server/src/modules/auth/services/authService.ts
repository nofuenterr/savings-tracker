import { hash } from 'bcryptjs';

import { BadRequestError } from '../../../utils/errors';
import { createUser } from '../repositories/authRepository';
import { RegisterUserParams } from '../types/authType';

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
