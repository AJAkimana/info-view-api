import { BaseModel } from '@models/base.model';
import { DataTypes } from 'sequelize';
import { sequelize } from '@configs/database';

export class Role extends BaseModel<AUTH.IRole> implements AUTH.IRole {
  public name!: string;
  public key!: string;
  public description?: string;
}

Role.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
  },
  {
    sequelize,
    tableName: 'roles',
    modelName: 'Role',
  },
);
