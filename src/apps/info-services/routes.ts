import { Router } from 'express';
import { isAuthenticated } from '../auth/middlewares';
import { validateReq } from '../app/middlewares';
import {
  configureServiceInfo,
  getInfo,
  getServiceDetails,
  getServiceInfos,
} from './controllers';

const serviceRoutes = Router();

serviceRoutes.post(
  '/',
  isAuthenticated,
  validateReq('serviceCreating'),
  configureServiceInfo,
);
serviceRoutes.get('/:id', getServiceDetails);

serviceRoutes.get('/', getServiceInfos);
serviceRoutes.post('/info', validateReq('infoFetching'), getInfo);

export default serviceRoutes;
