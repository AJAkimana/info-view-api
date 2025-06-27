import { NextFunction, Request, Response } from 'express';
import { validationRules } from './validation-rules';
import { validationResult } from 'express-validator';
import { serverResponse } from '@libs/server';

type ValidationType = 'userCreating' | 'serviceCreating';

export const validateReq =
  (validationType: ValidationType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const validations = validationRules[validationType];

    for (const validation of validations) {
      const result = await validation.run(req);
      if (result?.context?.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    console.log(errors);

    serverResponse(res, 400, 'Validation error');
  };

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (process.env.NODE_ENV === 'develop') {
    console.log('Internal Server error', err.stack);
  }
  const message = err.message || 'Something went wrong';
  const statusCode = res.statusCode ? res.statusCode : 500;

  serverResponse(res, statusCode, message);
};
