import { Router } from 'express';
import { isAuthenticated } from '../auth/middlewares';
import { validateReq } from '../app/middlewares';
import { addUser } from './controllers';

const userRoutes = Router();

userRoutes.post('/', validateReq('userCreating'), addUser);

export default userRoutes;
