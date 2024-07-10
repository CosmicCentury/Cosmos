import { Request, Response, NextFunction } from "express";
import { ClassElement } from "typescript";

export interface TRequest extends Request {
  userID: string;
}

export interface TData extends ClassElement {
  statusCode: number;
  data: any;
  token: string;
}

export interface ApiParams {
  name: string;
  description?: string;
  version: number;
  roles?: string[];
  required_auth?: boolean;
  param?: any;
  rootPath?: string;
  options?: {
    sse: boolean;
  };
  controller?(res: any, req: any, next?: any): any;
}

export interface ApiDictionary {
  GET?: ApiParams[];
  POST?: ApiParams[];
  PUT?: ApiParams[];
  PATCH?: ApiParams[];
  DELETE?: ApiParams[];
}

export interface ExpressHandler<
  TRequest extends Request = Request,
  TResponse extends Response = Response
> {
  (req: TRequest, res: TResponse, next: NextFunction): any;
}
