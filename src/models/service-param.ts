import { BaseModel } from '@models/base.model';
import { DataTypes } from 'sequelize';
import { sequelize } from '@configs/database';
import { ServiceInfo } from './service-info';

export class ServiceParam
  extends BaseModel<SF.IServiceParam>
  implements SF.IServiceParam
{
  public key!: string;
  public name!: string;
  public serviceId!: string;
}

ServiceParam.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'service_info',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'service_param',
    modelName: 'ServiceParam',
  },
);

// Associations can be defined here if needed
ServiceParam.belongsTo(ServiceInfo, {
  as: 'service',
  foreignKey: 'serviceId',
  targetKey: 'id',
});
