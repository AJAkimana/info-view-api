import { Router } from 'express';
import { getUserInfo, loginUser } from './controllers';
import { isAuthenticated } from './middlewares';

const authRoutes = Router();

authRoutes.post('/login', loginUser);
authRoutes.get('/info', isAuthenticated, getUserInfo);

export default authRoutes;
