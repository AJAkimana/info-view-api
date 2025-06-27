import { Router } from 'express';
import { isAuthenticated } from '../auth/middlewares';
import { validateReq } from '../app/middlewares';
import { addUser } from './controllers';
import { asyncHandler } from '@libs/server';

const userRoutes = Router();

userRoutes.post(
  '/',
  asyncHandler(validateReq('userCreating')),
  asyncHandler(addUser),
);

export default userRoutes;
