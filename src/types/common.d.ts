interface IContext {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  companyId: string;
}

interface IServerResponse<T> {
  success: boolean;
  status: number;
  message?: string;
  data?: T;
}

interface IBase {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
