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
    params?: Record<string, string>[];
    query?: string;
  }

  interface IServiceInfoQueryOptions extends Partial<IServiceInfo> {}

  interface IProxyRequest {
    baseUrl: string;
    headers?: Record<string, string>;
  }
}
