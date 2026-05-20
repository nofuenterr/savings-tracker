import db from '../../../includes/db/db';
import { SafeUser } from '../../../types/userType';
import {
  CreateResetTokenParams,
  CreateUserParams,
  NewResetTokenRow,
  ValidResetTokenRow,
  UserIdAndEmail,
  UpdatePasswordParams,
  SafeUpdatedUser,
} from '../types/authType';

export const createUser = async ({
  username,
  email,
  passwordHash,
}: CreateUserParams): Promise<SafeUser | undefined> => {
  const { rows } = await db.query<SafeUser>(
    `INSERT INTO users (username, email, password_hash) 
    VALUES ($1, $2, $3)
    RETURNING id, username, email, created_at;`,
    [username, email, passwordHash],
  );

  return rows[0];
};

export const findUserByEmail = async ({
  email,
}: {
  email: string;
}): Promise<UserIdAndEmail | undefined> => {
  const { rows } = await db.query<UserIdAndEmail>(
    `SELECT id, email FROM users
    WHERE email = $1;`,
    [email],
  );

  return rows[0];
};

export const createResetToken = async ({
  userId,
  tokenHash,
  expiresAt,
}: CreateResetTokenParams): Promise<NewResetTokenRow | undefined> => {
  const { rows } = await db.query<NewResetTokenRow>(
    `INSERT INTO password_reset_tokens (user_id, token_hash, expires_at) 
    VALUES ($1, $2, $3)
    RETURNING id, expires_at, created_at;`,
    [userId, tokenHash, expiresAt],
  );

  return rows[0];
};

export const findResetToken = async ({
  incomingHash,
}: {
  incomingHash: string;
}): Promise<ValidResetTokenRow | undefined> => {
  const { rows } = await db.query<ValidResetTokenRow>(
    `UPDATE password_reset_tokens
      SET used_at = NOW()
      WHERE 
        token_hash = $1 
        AND used_at IS NULL 
        AND expires_at > NOW()
      RETURNING id, user_id, used_at;`,
    [incomingHash],
  );

  return rows[0];
};

export const updatePassword = async ({
  userId,
  passwordHash,
}: UpdatePasswordParams): Promise<SafeUpdatedUser | undefined> => {
  const { rows } = await db.query<SafeUpdatedUser>(
    `UPDATE users
    SET password_hash = $2,
        updated_at = NOW()
    WHERE id = $1
    RETURNING id, username, email, updated_at;`,
    [userId, passwordHash],
  );

  return rows[0];
};
