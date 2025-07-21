import { buildServerReq } from '@libs/utils';
import { makeRequest } from './make-request';
import { internalServerError } from '@libs/errors';
import { CACHE_SERVICES } from '@libs/constants/utils';
import { readData, writeData } from '@cache/redis-helper';

const fetchFromCache = async (
  serviceInfo: SF.IServiceInfo,
  cacheKey: string,
) => {
  const cacheInfo = CACHE_SERVICES.find(
    ({ serviceType }) => serviceType === serviceInfo.serviceType,
  );
  if (!cacheInfo) {
    return null;
  }
  return readData(cacheKey);
};

const writeToCache = async (
  serviceInfo: SF.IServiceInfo,
  cacheKey: string,
  data: any,
) => {
  const cacheInfo = CACHE_SERVICES.find(
    ({ serviceType }) => serviceType === serviceInfo.serviceType,
  );
  if (!cacheInfo) {
    return;
  }
  await writeData(cacheKey, data);
};

export const fetchInfo = async (
  serviceInfo: SF.IServiceInfo,
  dataBody: SF.IDataBody,
) => {
  const {
    proxyReq,
    method,
    url,
    data: bodyData,
    cacheKey,
  } = buildServerReq(serviceInfo, dataBody);

  const cachedData = await fetchFromCache(serviceInfo, cacheKey);
  if (cachedData) {
    return { data: cachedData, fromCache: true };
  }

  const { data, message, success } = await makeRequest<Record<string, any>>(
    proxyReq,
    url,
    method,
    bodyData,
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
  // Write to cache
  writeToCache(serviceInfo, cacheKey, data);

  return { data, fromCache: false };
};
