import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/IUser';

const validateUsername = (username: string) => {
  if (!username || username.length === 0) {
    return { code: 400, message: '"username" is required' };
  }
  if (typeof username !== 'string') {
    return { code: 422, message: '"username" must be a string' };
  }
  if (username.length < 3) {
    return { code: 422, message: '"username" length must be at least 3 characters long' };
  }
  return true;
};

const validateClasse = (classe: string) => {
  if (!classe || classe.length === 0) {
    return { code: 400, message: '"classe" is required' };
  }
  if (typeof classe !== 'string') {
    return { code: 422, message: '"classe" must be a string' };
  }
  if (classe.length < 3) {
    return { code: 422, message: '"classe" length must be at least 3 characters long' };
  }
  return true;
};

const validateLevel = (level: number) => {
  if (level < 1) {
    return { code: 422, message: '"level" must be greater than or equal to 1' };
  }
  if (!level) {
    return { code: 400, message: '"level" is required' };
  }
  if (typeof level !== 'number') {
    return { code: 422, message: '"level" must be a number' };
  }
  
  return true;
};

const validatePassword = (password: string) => {
  if (!password || password.length === 0) {
    return { code: 400, message: '"password" is required' };
  }
  if (typeof password !== 'string') {
    return { code: 422, message: '"password" must be a string' };
  }
  if (password.length < 8) {
    return { code: 422, message: '"password" length must be at least 8 characters long' };
  }
  return true;
};

export default (req: Request, _res: Response, next: NextFunction) => {
  const { username, classe, level, password } = req.body as IUser;
  
  const usernameValidate = validateUsername(username);
  if (usernameValidate !== true) {
    return next(usernameValidate);
  }

  const classeValidate = validateClasse(classe);
  if (classeValidate !== true) {
    return next(classeValidate);
  }

  const levelValidate = validateLevel(level);
  if (levelValidate !== true) {
    return next(levelValidate);
  }

  const passwordValidate = validatePassword(password);
  if (passwordValidate !== true) {
    return next(passwordValidate);
  }

  next();
};