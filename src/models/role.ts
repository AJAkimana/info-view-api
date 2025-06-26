import { BaseModel } from '@models/base.model';
import { DataTypes } from 'sequelize';
import { sequelize } from '@configs/database';
import { Company } from './company';

export class Role extends BaseModel<AUTH.IRole> implements AUTH.IRole {
  public name!: string;
  public companyId!: string;
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
    companyId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'roles',
    modelName: 'Role',
  },
);

// Associations can be defined here if needed
Role.belongsTo(Company, {
  as: 'company',
  foreignKey: 'companyId',
  targetKey: 'id',
});
