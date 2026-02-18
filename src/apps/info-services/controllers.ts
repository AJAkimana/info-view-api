import { Request, Response } from 'express';
import {
  createOrUpdateServiceInfo,
  fetchAllServiceInfos,
  fetchServiceInfo,
  recordLog,
} from './services';
import { serverResponse } from '@libs/server';
import { fetchInfo } from '../app/services/service-proxy';
import { invalidDataError } from '@libs/errors';
import { sanitizeServices } from '@libs/utils';

export const configureServiceInfo = async (req: Request, res: Response) => {
  const data = req.body;
  const serviceInfo = await createOrUpdateServiceInfo(data);

  serverResponse(res, 200, 'Success', serviceInfo);
};

export const getServiceInfos = async (req: Request, res: Response) => {
  const options = req.query as SF.IServiceInfoQueryOptions;
  const serviceInfos = await fetchAllServiceInfos(options);

  const sanitized = sanitizeServices(serviceInfos);

  serverResponse(res, 200, 'Success', sanitized);
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
  const sanitized = sanitizeServices([serviceInfo]);

  serverResponse(res, 200, 'Success', sanitized[0]);
};

export const getInfo = async (req: Request, res: Response) => {
  const { params, serviceId, reqInfo } = req.body;

  let serviceInfo: SF.IServiceInfo | null = null;
  let result = { code: 200, message: 'Success', data: undefined as any };
  if (!serviceId) {
    result.code = 400;
    result.message = 'Service ID is required';
  }
  if (serviceId) {
    serviceInfo = await fetchServiceInfo({ id: serviceId });
  }

  if (!serviceInfo) {
    result.code = 404;
    result.message = 'Service not found or not configured';
  }
  if (serviceInfo && !serviceInfo.isActive) {
    result.code = 400;
    result.message = `Service "${serviceInfo.name}" is not available`;
  }
  if (serviceInfo?.isActive) {
    const info = await fetchInfo(serviceInfo, req.body);
    result.data = info;
  }
  const { code, message, data } = result;
  const logPayload = {
    ...params,
    code,
    message,
    fromCache: data?.fromCache || false,
  };
  recordLog(serviceId, logPayload, reqInfo);

  serverResponse(res, code, message, data?.data);
};
