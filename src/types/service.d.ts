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

  interface InfoParam {
    key: string;
    name: string;
    label: string;
    required?: boolean;
    type?: string; // e.g., 'string', 'number', 'boolean'
  }

  interface IParam {
    method: string;
    body?: InfoParam[];
    params?: InfoParam[];
    query?: InfoParam[];
  }

  interface IServiceInfoQueryOptions extends Partial<IServiceInfo> {}

  interface IProxyRequest {
    baseUrl: string;
    headers?: Record<string, string>;
    timeout?: number;
  }

  interface IServiceLog extends IBase {
    ipAddress?: string;
    city?: string;
    deviceType?: string;
    serviceId: string;
    payload: object;
  }

  interface IDataBody {
    params: Record<string, any>;
    serviceId: string;
    reqInfo: Record<string, any>;
  }
}
