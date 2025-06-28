import { Router } from 'express';
import { isAuthenticated } from '../auth/middlewares';
import { validateReq } from '../app/middlewares';
import { configureServiceInfo, getInfo, getServiceInfos } from './controllers';

const serviceRoutes = Router();

serviceRoutes.post(
  '/',
  isAuthenticated,
  validateReq('serviceCreating'),
  configureServiceInfo,
);

serviceRoutes.get('/', getServiceInfos);
serviceRoutes.post('/info', getInfo);

export default serviceRoutes;
