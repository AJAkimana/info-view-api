import { Router } from 'express';
import authRoutes from './auth/routes';
import userRoutes from './users';
import serviceRoutes from './info-services/routes';

const appRoutes = Router();

appRoutes.use('/auth', authRoutes);
appRoutes.use('/users', userRoutes);
appRoutes.use('/info-services', serviceRoutes);

export default appRoutes;
