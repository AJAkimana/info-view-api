import { Model, Optional } from 'sequelize';

export type BaseAttributes = {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type BaseCreationAttributes = Optional<
  BaseAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

export class BaseModel<
  TAttributes extends BaseAttributes,
  TCreationAttributes extends Partial<TAttributes> = BaseCreationAttributes,
> extends Model<TAttributes, TCreationAttributes> {
  public id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
