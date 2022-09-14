import { Request, Response, NextFunction } from 'express';
import { IProduct } from '../interfaces/IProduct';

const validateName = (name: string) => {
  if (!name || name.length === 0) {
    return { code: 400, message: '"name" is required' };
  }
  if (typeof name !== 'string') {
    return { code: 422, message: '"name" must be a string' };
  }
  if (name.length < 3) {
    return { code: 422, message: '"name" length must be at least 3 characters long' };
  }
  return true;
};

const validateAmount = (amount: string) => {
  if (!amount || amount.length === 0) {
    return { code: 400, message: '"amount" is required' };
  }
  if (typeof amount !== 'string') {
    return { code: 422, message: '"amount" must be a string' };
  }
  if (amount.length < 3) {
    return { code: 422, message: '"amount" length must be at least 3 characters long' };
  }
  return true;
};

export default (req: Request, _res: Response, next: NextFunction) => {
  const { name, amount } = req.body as IProduct;
  const nameValidate = validateName(name);
  if (nameValidate !== true) {
    return next(nameValidate);
  }
  const amountValidate = validateAmount(amount);
  if (amountValidate !== true) {
    return next(amountValidate);
  }
  next();
};