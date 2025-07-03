import { DataTypes } from 'sequelize';
import { BaseModel } from './base.model';
import { sequelize } from '@configs/database';

export class ServiceLog
  extends BaseModel<SF.IServiceLog>
  implements SF.IServiceLog
{
  public ipAddress?: string;
  public city?: string;
  public deviceType?: string;
  public serviceId!: string;
  public payload!: object;
}

ServiceLog.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deviceType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    serviceId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    payload: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'service_log',
    modelName: 'ServiceLog',
  },
);
