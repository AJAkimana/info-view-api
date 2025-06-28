import { BaseModel } from '@models/base.model';
import { DataTypes } from 'sequelize';
import { sequelize } from '@configs/database';

export class User extends BaseModel<AUTH.IUser> implements AUTH.IUser {
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public roleId!: string;
  public password!: string;
  public isActive!: boolean;
  public phoneNumber!: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id',
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  },
);
