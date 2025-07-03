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

  infoFetching: [
    check('serviceId', 'Provide the service ID')
      .exists({
        checkFalsy: true,
        checkNull: true,
      })
      .isUUID(),
    check('params', 'Provide service info').exists().isObject(),
    check('reqInfo', 'Invalid data RI').optional().isObject(),
    check('reqInfo.ipAddress', 'Invalid data IA').optional(),
    check('reqInfo.deviceType', 'Invalid data DT').optional(),
    check('reqInfo.city', 'Invalid data C').optional(),
  ],
};
