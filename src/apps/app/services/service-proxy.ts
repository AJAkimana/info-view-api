import { buildServerReq } from '@libs/utils';
import { makeRequest } from './make-request';
import { internalServerError } from '@libs/errors';

export const fetchInfo = async (
  serviceInfo: SF.IServiceInfo,
  dataBody: any,
) => {
  const { proxyReq, method, url } = buildServerReq(serviceInfo, dataBody);
  const { data, message, success } = await makeRequest<Record<string, any>>(
    proxyReq,
    url,
    method,
    dataBody,
  );

  if (!success) {
    throw internalServerError(message || 'Failed to fetch info');
  }
  if (!data) {
    throw internalServerError('No data returned from service');
  }
  // Remove any hidden parameters from the response
  serviceInfo.hiddenParams.forEach((param) => {
    if (data.hasOwnProperty(param)) {
      delete data[param];
    }
  });

  return data;
};
