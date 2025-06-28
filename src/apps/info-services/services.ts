import { createRecord, fetchAll, fetchOne } from '@db/db-helper';
import { ServiceInfo } from '@models/service-info';

/**
 * Create a new ServiceInfo or update if it already exists (by id).
 * If no id is provided in data, create a new record.
 * When updating, only update fields that are different, ignoring id, createdAt, updatedAt.
 * @param data - The service info data
 * @returns The created or updated ServiceInfo instance
 */
export const createOrUpdateServiceInfo = async (data: SF.IServiceInfo) => {
  if (!('id' in data) || !data.id) {
    // No id provided, create new
    return ServiceInfo.create(data);
  }
  // Find by id
  const existing = await fetchOne(ServiceInfo, { id: data.id });
  if (!existing) {
    // No record found, create new
    return createRecord(ServiceInfo, data);
  }
  // Only compare non-common fields, ignore id, createdAt, updatedAt
  const ignoreFields = ['id', 'createdAt', 'updatedAt'];
  const updateData: Partial<SF.IServiceInfo> = {};
  (Object.keys(data) as (keyof SF.IServiceInfo)[]).forEach((key) => {
    if (!ignoreFields.includes(key as string) && data[key] !== existing[key]) {
      (updateData as any)[key] = data[key];
    }
  });
  if (Object.keys(updateData).length > 0) {
    await existing.update(updateData);
  }
  return existing;
};

export const fetchAllServiceInfos = async (
  options?: SF.IServiceInfoQueryOptions,
) => {
  return fetchAll(ServiceInfo, options);
};

export const fetchServiceInfo = async (
  options: SF.IServiceInfoQueryOptions,
) => {
  return fetchOne(ServiceInfo, options);
};
