// export interface ApiResponse {}

export interface ControllerParams {
  /** request params */
  req: any;
  /** response params (optional) */
  res?: any;
  /** error handling */
  next?: any;
}

export interface ApiParams {
  name: string;
  description?: string;
  version: string;
  permissions?: string[];
  param?: any;
  rootPath?: string;
  controller(res: any, req: any, next?: any): any;
}

export interface ApiDictionary {
  GET?: ApiParams[];
  POST?: ApiParams[];
  PUT?: ApiParams[];
  PATCH?: ApiParams[];
  DELETE?: ApiParams[];
}
