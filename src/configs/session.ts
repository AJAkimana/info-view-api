import { Time } from '@libs/constants/time';
import expressSession from 'express-session';
import { redisStore } from './redis-client';

export const session = () =>
  expressSession({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET!,
    name: process.env.SESSION_NAME,
    cookie: {
      httpOnly: true,
      secure: false,
      domain: process.env.BASE_URL,
      path: '/',
      sameSite: true,
      maxAge: Time.week,
    },
    store: redisStore,
  });
