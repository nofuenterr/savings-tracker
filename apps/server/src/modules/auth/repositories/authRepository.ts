import db from '../../../includes/db/db';
import { SafeUser } from '../../../types/userType';
import { CreateUser } from '../types/authType';

export const createUser = async ({
  username,
  email,
  passwordHash,
}: CreateUser): Promise<SafeUser | undefined> => {
  const { rows } = await db.query<SafeUser>(
    `INSERT INTO users (username, email, password_hash) 
    VALUES ($1, $2, $3)
    RETURNING id, username, email, created_at;`,
    [username, email, passwordHash],
  );

  return rows[0];
};
