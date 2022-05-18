import { NextFunction, Request, Response } from 'express';
import log from '../utils/log';

export default (request: Request, response: Response, next: NextFunction) => {
  log(`${request.method} ${request.url}`);
  next();
};
