import log from '@utils/log';
import { NextFunction, Request, Response } from 'express';

export default (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  log('||---------------||', 'error');
  log('|| Error Handler ||', 'error');
  log('||---------------||', 'error');
  log(error.message, 'error');
  response.sendStatus(500).json({ error: error.message });
};
