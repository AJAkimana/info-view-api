import { Response } from 'express';

export const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const serverResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: any,
  totalItems?: number,
) => {
  const messageType = statusCode >= 400 ? 'error' : 'message';

  if (!totalItems && Array.isArray(data)) {
    totalItems = data.length;
  }
  return res.status(statusCode).json({
    status: statusCode,
    [messageType]: message,
    data,
    totalItems,
  });
};
