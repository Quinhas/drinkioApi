import log from '@utils/log';
import { NextFunction, Request, Response } from 'express';

export default (request: Request, response: Response, next: NextFunction) => {
  log(`${request.method} ${request.url}`);
  next();
};
