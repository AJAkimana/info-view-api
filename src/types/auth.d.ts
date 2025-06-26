declare namespace AUTH {
  interface IUser extends IBase {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isActive: boolean;
    phoneNumber: string;
  }

  interface IRole extends IBase {
    name: string;
    key: string;
    description?: string;
  }

  interface IPassportError {
    message?: string;
  }
}
