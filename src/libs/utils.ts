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
