import { Router } from 'express';
import authRoutes from './auth/routes';
import userRoutes from './users';

const appRoutes = Router();

appRoutes.use('/auth', authRoutes);
appRoutes.use('/users', userRoutes);

export default appRoutes;
