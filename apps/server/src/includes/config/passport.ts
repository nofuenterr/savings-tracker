import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { compare } from 'bcryptjs';
import { Request } from 'express';

import { SafeUser } from '@savings-tracker/shared';

import db from '../db/db';
import { JWT_SECRET } from './mainConfig';

const configurePassport = () => {
  const localOptions = {
    usernameField: 'email',
    passwordField: 'password',
  };

  passport.use(
    new LocalStrategy(localOptions, async (email, password, done) => {
      try {
        const { rows } = await db.query(
          `SELECT id, username, email, password_hash, created_at
          FROM users 
          WHERE email = $1 
          AND deleted_at IS NULL;`,
          [email],
        );
        const user = rows[0];
        if (!user)
          return done(null, false, {
            message: "An account with the email doesn't exist",
          });
        const match = await compare(password, user.password_hash);
        if (!match) return done(null, false, { message: 'Incorrect password' });
        const {
          password_hash,
          ...safeUser
        }: { password_hash: string; safeUser: SafeUser } = user;
        return done(null, safeUser);
      } catch (err) {
        return done(err);
      }
    }),
  );

  const cookieExtractor = (req: Request) => {
    if (req?.cookies) {
      return req.cookies.token ?? null;
    }
    return null;
  };

  const jwtOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: JWT_SECRET,
  };

  passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
      try {
        const { rows } = await db.query(
          `SELECT id, username, email, created_at
          FROM users 
          WHERE id = $1 
          AND deleted_at IS NULL;`,
          [payload.id],
        );
        const user: SafeUser = rows[0];
        if (!user) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }),
  );

  return passport;
};

export default configurePassport;
