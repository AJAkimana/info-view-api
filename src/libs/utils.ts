import { Method } from 'axios';
import bcrypt from 'bcryptjs';

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
  let url = '';

  const proxyReq: SF.IProxyRequest = {
    baseUrl: basePath,
  };

  if (params.params) {
    params.params.forEach((param) => {
      if (body[param.key]) {
        url += `/${body[param.key]}`;
      }
    });
  }

  if (params.query) {
    url += `?${params.query}`;
  }

  const method = (params.method || 'GET') as Method;

  return {
    proxyReq,
    method,
    data: params.body || undefined,
    url,
  };
};
