import { Request, Response } from 'express';
import { createOrUpdateServiceInfo } from './services';
import { serverResponse } from '@libs/server';

export const configureServiceInfo = async (req: Request, res: Response) => {
  const data = req.body;
  const serviceInfo = await createOrUpdateServiceInfo(data);

  serverResponse(res, 200, 'Success', serviceInfo);
};
