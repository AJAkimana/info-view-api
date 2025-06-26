import { BaseModel } from '@models/base.model';
import { DataTypes } from 'sequelize';
import { sequelize } from '@configs/database';
import { ServiceParam } from './service-param';

export class ServiceInfo
  extends BaseModel<SF.IServiceInfo>
  implements SF.IServiceInfo
{
  public name!: string;
  public serviceType!: string;
  public description!: string;
  public basePath!: string;
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
    basePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'service_info',
    modelName: 'ServiceInfo',
  },
);

// Associations can be defined here if needed
ServiceInfo.hasMany(ServiceParam, {
  as: 'params',
  foreignKey: 'serviceId',
  sourceKey: 'id',
});
