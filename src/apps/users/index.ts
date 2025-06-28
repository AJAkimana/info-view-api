import { Router } from 'express';
import { validateReq } from '../app/middlewares';
import { addUser } from './controllers';

const userRoutes = Router();

userRoutes.post('/', validateReq('userCreating'), addUser);

export default userRoutes;
