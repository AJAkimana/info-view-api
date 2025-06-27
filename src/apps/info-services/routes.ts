import { Router } from 'express';
import { isAuthenticated } from '../auth/middlewares';
import { validateReq } from '../app/middlewares';
import { configureServiceInfo } from './controllers';

const serviceRoutes = Router();

serviceRoutes.post(
  '/',
  isAuthenticated,
  validateReq('serviceCreating'),
  configureServiceInfo,
);

export default serviceRoutes;
