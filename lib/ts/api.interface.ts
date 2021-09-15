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
  version: string;
  roles?: string[];
  required_auth?: boolean;
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

export interface ExpressHandler {
  (req: TRequest, res: Response, next: NextFunction): any;
}
