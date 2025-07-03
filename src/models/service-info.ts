import { BaseModel } from '@models/base.model';
import { DataTypes } from 'sequelize';
import { sequelize } from '@configs/database';

export class ServiceInfo
  extends BaseModel<SF.IServiceInfo>
  implements SF.IServiceInfo
{
  public name!: string;
  public serviceType!: string;
  public description!: string;
  public isActive!: boolean;
  public basePath!: string;
  public params!: SF.IParam;
  public hiddenParams!: string[];
}

ServiceInfo.init(
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
    serviceType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    basePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    params: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
    },
    hiddenParams: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
  },
  {
    sequelize,
    tableName: 'service_info',
    modelName: 'ServiceInfo',
  },
);
