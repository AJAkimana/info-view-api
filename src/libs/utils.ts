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

export const buildServerReq = (serviceInfo: SF.IServiceInfo, body: any) => {
  const { basePath, params } = serviceInfo;
  const errMsg = (paramName = '') => `You need to provide the "${paramName}"`;
  let url = '';
  let infoBody = undefined as any;

  const proxyReq: SF.IProxyRequest = {
    baseUrl: basePath,
  };

  // Handle path parameters
  if (params.params) {
    for (const param of params.params) {
      if (param.required && !body[param.key]) {
        throw invalidDataError(errMsg(param.name));
      }
      if (body[param.key]) {
        url += `/${body[param.key]}`;
      }
    }
  }

  // Handle query parameters
  if (params.query) {
    const queryParams = params.query
      .filter((param) => {
        if (param.required && !body[param.key]) {
          throw invalidDataError(errMsg(param.name));
        }
        return body[param.key] !== undefined;
      })
      .map(
        (param) =>
          `${encodeURIComponent(param.key)}=${encodeURIComponent(body[param.key])}`,
      )
      .join('&');
    if (queryParams) {
      url += `?${queryParams}`;
    }
  }

  // Handle body parameters
  if (params.body) {
    infoBody = params.body.reduce(
      (acc, param) => {
        if (param.required && !body[param.key]) {
          throw invalidDataError(errMsg(param.name));
        }
        if (body[param.key] !== undefined) {
          acc[param.key] = body[param.key];
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
    url,
  };
};
