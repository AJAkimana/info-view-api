declare namespace SF {
  interface IServiceInfo extends IBase {
    name: string;
    description: string;
    serviceType: string;
    isActive: boolean;
    basePath: string;
    params: IParam;
    hiddenParams: string[];
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

  interface IServiceLog extends IBase {
    ipAddress?: string;
    city?: string;
    deviceType?: string;
    serviceId: string;
    payload: object;
  }
}
