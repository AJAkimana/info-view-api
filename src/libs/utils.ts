import { Method } from 'axios';
import bcrypt from 'bcryptjs';
import { invalidDataError } from './errors';

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(Number(process.env.PASS_SALT || 1));
  const hashPass = bcrypt.hashSync(password, salt);
  return hashPass;
};
export const unHashPassword = (password: string, hashedPass: string) => {
  return bcrypt.compareSync(password, hashedPass);
};

export const compareTwoObjects = (current: any, newObj: any) => {
  let newObject = {};
  let hasDifferent = false;
  Object.keys(current).forEach((key) => {
    if (newObj[key] !== undefined && current[key] !== newObj[key]) {
      hasDifferent = true;
      newObject = { ...newObject, [key]: newObj[key] };
    }
  });
  return { hasDifferent, newObject };
};

export const buildServerReq = (
  serviceInfo: SF.IServiceInfo,
  body: SF.IDataBody,
) => {
  const { basePath, params, serviceType } = serviceInfo;
  const { params: bodyParams, reqInfo } = body;

  const errMsg = (paramName = '') => `You need to provide the "${paramName}"`;
  const isInvalidKey = (param: SF.InfoParam, key: string) => {
    if (param.disabled) {
      bodyParams[key] = `${key.toUpperCase()}-DISABLED`;
    }
    return !param.disabled && param.required && !bodyParams[key];
  };

  let url = '';
  let cacheKey = '';
  let infoBody = undefined as any;

  const proxyReq: SF.IProxyRequest = {
    baseUrl: basePath,
  };

  // This is a special case for Network services
  if (
    serviceType === 'Network' &&
    reqInfo.ipAddress &&
    reqInfo.ipAddress !== '127.0.0.1'
  ) {
    url += `/${reqInfo.ipAddress}`;
  }

  // Handle path parameters
  if (params.params) {
    for (const param of params.params) {
      if (isInvalidKey(param, param.key)) {
        throw invalidDataError(errMsg(param.name));
      }
      if (bodyParams[param.key]) {
        url += `/${bodyParams[param.key]}`;
        cacheKey += bodyParams[param.key];
      }
    }
  }

  // Handle query parameters
  if (params.query) {
    const queryParams = params.query
      .filter((param) => {
        if (isInvalidKey(param, param.key)) {
          throw invalidDataError(errMsg(param.name));
        }
        return bodyParams[param.key] !== undefined;
      })
      .map((param) => {
        cacheKey += bodyParams[param.key];
        return `${encodeURIComponent(param.key)}=${encodeURIComponent(bodyParams[param.key])}`;
      })
      .join('&');
    if (queryParams) {
      url += `?${queryParams}`;
    }
  }

  // Handle body parameters
  if (params.body) {
    infoBody = params.body.reduce(
      (acc, param) => {
        if (isInvalidKey(param, param.key)) {
          throw invalidDataError(errMsg(param.name));
        }
        if (bodyParams[param.key] !== undefined) {
          acc[param.key] = bodyParams[param.key];
          cacheKey += bodyParams[param.key];
        }
        return acc;
      },
      {} as Record<string, any>,
    );
  }

  const method = (params.method || 'GET') as Method;

  return {
    proxyReq,
    method,
    data: infoBody,
    cacheKey: `${serviceType}-${cacheKey.toUpperCase()}`,
    url,
  };
};

export const sanitizeServices = (
  services: SF.IServiceInfo[],
): SF.IServiceInfo[] => {
  const toFilter = (param: SF.InfoParam) => !param.disabled;
  return services.map((service) => {
    // Remove sequelize metadata
    const { createdAt, updatedAt, ...rest } = service.toJSON?.() || {};
    const { params } = service;
    if (params['query']) {
      params['query'] = params['query'].filter(toFilter);
    }
    if (params['body']) {
      params['body'] = params['body'].filter(toFilter);
    }
    if (params['params']) {
      params['params'] = params['params'].filter(toFilter);
    }

    rest.params = params;
    return rest;
  });
};
