import { databaseServiceError } from '@libs/errors';
import {
  Model,
  ModelStatic,
  WhereOptions,
  CreationAttributes,
  FindOptions,
} from 'sequelize';

// Create a new record
export async function createRecord<T extends Model>(
  model: ModelStatic<T>,
  data: CreationAttributes<T>,
): Promise<T> {
  try {
    return await model.create(data);
  } catch (error) {
    console.error('Error creating record:', error);
    throw databaseServiceError('Error creating record', error);
  }
}

// Fetch records (all or by condition)
export async function fetchAll<T extends Model>(
  model: ModelStatic<T>,
  where?: WhereOptions,
  otherOptions?: FindOptions<T>,
): Promise<T[]> {
  try {
    return await model.findAll({ where, ...otherOptions });
  } catch (error) {
    console.error('Error fetching records:', error);
    throw databaseServiceError('Error fetching records', error);
  }
}

// Fetch a single record by condition
export async function fetchOne<T extends Model>(
  model: ModelStatic<T>,
  where: WhereOptions,
  otherOptions?: FindOptions<T>,
): Promise<T | null> {
  try {
    return await model.findOne({ where, ...otherOptions });
  } catch (error) {
    console.error('Error fetching record:', error);
    throw databaseServiceError('Error fetching record', error);
  }
}

// Update records by condition
export async function updateRecords<T extends Model>(
  model: ModelStatic<T>,
  data: Partial<CreationAttributes<T>>,
  where: WhereOptions,
): Promise<[number, T[]]> {
  try {
    return await model.update(data, { where, returning: true });
  } catch (error) {
    console.error('Error updating records:', error);
    throw databaseServiceError('Error updating records', error);
  }
}

// Delete records by condition
export async function deleteRecords<T extends Model>(
  model: ModelStatic<T>,
  where: WhereOptions,
): Promise<number> {
  try {
    return await model.destroy({ where });
  } catch (error) {
    console.error('Error deleting records:', error);
    throw databaseServiceError('Error deleting records', error);
  }
}
