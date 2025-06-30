import { Router } from 'express';
import authRoutes from './auth/routes';
import userRoutes from './users';
import serviceRoutes from './info-services/routes';
import { serverResponse } from '@libs/server';

const appRoutes = Router();

appRoutes.use('/auth', authRoutes);
appRoutes.use('/users', userRoutes);
appRoutes.use('/info-services', serviceRoutes);
appRoutes.get('/', (req, res) => {
  serverResponse(res, 200, 'Welcome to the API');
});

export default appRoutes;
