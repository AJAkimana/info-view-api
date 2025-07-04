import axios, { Method } from 'axios';
import { get } from 'lodash';

const baseInstance = (proxyReq: SF.IProxyRequest) => {
  return axios.create({
    baseURL: proxyReq.baseUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...proxyReq.headers,
    },
    signal: AbortSignal.timeout(proxyReq.timeout ?? 10000),
  });
};

export async function makeRequest<T>(
  proxyReq: SF.IProxyRequest,
  url: string,
  method: Method = 'GET',
  data?: any,
): Promise<IServerResponse<T>> {
  const instance = baseInstance(proxyReq);
  try {
    const { data: resData, status } = await instance({ url, method, data });

    const resultData = resData.data || resData;
    return { success: true, status, data: resultData as T };
  } catch (err) {
    const error: any = err;
    let errorRes = {
      success: false,
      status: error.response?.status || 500,
      message: '',
    };
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      const errorMsg =
        error.response.data?.error?.message ||
        error.response.data?.message ||
        'Failed to get response';
      errorRes = {
        ...errorRes,
        message: errorMsg,
      };
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      if (process.env.NODE_ENV !== 'test')
        errorRes.message = 'No response received';
    } else {
      // Something happened in setting up the request that triggered an Error
      errorRes.message = get(
        error.message,
        'message',
        'Something happened in setting up the request',
      );
    }

    return errorRes;
  }
}
