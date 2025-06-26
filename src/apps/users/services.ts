import { createRecord, fetchOne, updateRecords } from '@db/db-helper';
import { invalidDataError, notFoundError } from '@libs/errors';
import { compareTwoObjects } from '@libs/utils';
import { User } from '@models/user';
import { Op } from 'sequelize';

export const setUpUserInfo = async (user: Partial<AUTH.IUser>) => {
  const { id, createdAt, updatedAt, ...restUser } = user;
  if (id) {
    const currentUser = await fetchOne(User, {
      where: { id },
    });
    if (currentUser) {
      const { id, createdAt, updatedAt, ...current } = currentUser;
      const { hasDifferent, newObject } = compareTwoObjects(current, restUser);
      if (hasDifferent) {
        const updated = await updateRecords(User, newObject, {
          where: { id },
          returning: true,
          individualHooks: true,
        });
        return updated[1][0];
      }
      return currentUser;
    }

    throw notFoundError('User not found');
  }

  const existingUser = await fetchOne(User, {
    where: {
      [Op.or]: [{ email: user.email }, { phoneNumber: user.phoneNumber }],
    },
  });
  if (existingUser) {
    throw invalidDataError('Email or phone number already exists');
  }

  return createRecord(User, restUser);
};
