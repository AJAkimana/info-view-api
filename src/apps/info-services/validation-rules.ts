import { check } from 'express-validator';

export const serviceRules = {
  serviceCreating: [
    check('name', 'Provide the service name')
      .exists({
        checkFalsy: true,
        checkNull: true,
      })
      .isString(),
    check('serviceType', 'Provide the service type')
      .exists({
        checkFalsy: true,
        checkNull: true,
      })
      .isString(),
    check('description', 'Provide a description')
      .exists({
        checkFalsy: true,
        checkNull: true,
      })
      .isString(),
    check('basePath', 'Provide the base path')
      .exists({
        checkFalsy: true,
        checkNull: true,
      })
      .isString(),
    check('params', 'Provide the service parameters').exists().isObject(),
    check('hiddenParams', 'Provide the hidden parameters').optional().isArray(),
  ],
};
