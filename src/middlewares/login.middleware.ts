import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../interfaces/IUser';

export default (req: Request, _res: Response, next: NextFunction) => {
  const { username, password } = req.body as ILogin;
  if (!username || username.length === 0) {
    return next({ code: 400, message: '"username" is required' });
  }
  if (!password || password.length === 0) {
    return next({ code: 400, message: '"password" is required' });
  }
  next();
};