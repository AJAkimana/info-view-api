import { check } from 'express-validator';

export const userRules = {
  userCreating: [
    check('firstName', 'Provide the first name')
      .exists({
        checkFalsy: true,
        checkNull: true,
      })
      .isString(),
    check('lastName', 'Provide the last name')
      .exists({
        checkFalsy: true,
        checkNull: true,
      })
      .isString(),
    check('email', 'Type a valid email')
      .exists({
        checkFalsy: true,
        checkNull: true,
      })
      .isString(),
    check('password', 'Provide a secure password')
      .exists({
        checkFalsy: true,
        checkNull: true,
      })
      .isString(),
    check('phoneNumber', 'Give a phone number')
      .exists({
        checkFalsy: true,
        checkNull: true,
      })
      .isMobilePhone(['en-RW', 'fr-CD']),
  ],
};
