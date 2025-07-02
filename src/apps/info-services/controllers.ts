import { Request, Response } from 'express';
import {
  createOrUpdateServiceInfo,
  fetchAllServiceInfos,
  fetchServiceInfo,
} from './services';
import { serverResponse } from '@libs/server';
import { fetchInfo } from '../app/services/service-proxy';
import { invalidDataError } from '@libs/errors';

export const configureServiceInfo = async (req: Request, res: Response) => {
  const data = req.body;
  const serviceInfo = await createOrUpdateServiceInfo(data);

  serverResponse(res, 200, 'Success', serviceInfo);
};

export const getServiceInfos = async (req: Request, res: Response) => {
  const options = req.query as SF.IServiceInfoQueryOptions;
  const serviceInfos = await fetchAllServiceInfos(options);

  serverResponse(res, 200, 'Success', serviceInfos);
};

export const getServiceDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw invalidDataError(`Service ID is required`);
  }
  const serviceInfo = await fetchServiceInfo({ id });
  if (!serviceInfo) {
    throw invalidDataError(`Service not found or not configured`);
  }
  serverResponse(res, 200, 'Success', serviceInfo);
};

export const getInfo = async (req: Request, res: Response) => {
  const { params, serviceId } = req.body;

  if (!serviceId) {
    throw invalidDataError(`Service ID is required`);
  }

  const serviceInfo = await fetchServiceInfo({ id: serviceId });

  if (!serviceInfo) {
    throw invalidDataError(`Service not found or not configured`);
  }
  const info = await fetchInfo(serviceInfo, params);

  serverResponse(res, 200, 'Success', info);
};
