import { Router } from 'express';
import { isAuthenticated } from '../auth/middlewares';
import { validateReq } from '../app/middlewares';

const serviceRoutes = Router();

serviceRoutes.post('/', isAuthenticated, validateReq('serviceCreating'));

export default serviceRoutes;
