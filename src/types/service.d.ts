declare namespace SF {
  interface IServiceInfo extends IBase {
    name: string;
    description: string;
    serviceType: string;
    isActive: boolean;
    basePath: string;
    params: IParam;
  }

  interface IParam {
    method: string;
    body?: any;
    param?: string;
    query?: string;
  }
}
