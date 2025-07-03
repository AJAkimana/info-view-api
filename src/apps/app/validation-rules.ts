import { serviceRules } from '../info-services/validation-rules';
import { userRules } from '../users/validation-rules';

export const validationRules = {
  userCreating: userRules.userCreating,
  serviceCreating: serviceRules.serviceCreating,
  infoFetching: serviceRules.infoFetching,
};
