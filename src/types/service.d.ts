declare namespace SF {
  interface IServiceInfo extends IBase {
    name: string;
    description: string;
    serviceType: string;
    basePath: string;
  }

  interface IServiceParam extends IBase {
    key: string;
    name: string;
    serviceId: string;
  }
}
