import { Request, Response, NextFunction } from 'express';

export default (req: Request, _res: Response, next: NextFunction) => {
  const { productsIds } = req.body;
  
  if (!productsIds) {
    return next({ code: 400, message: '"productsIds" is required' });
  }
  if (!Array.isArray(productsIds)) {
    return next({ code: 422, message: '"productsIds" must be an array' });
  }

  const arrayTypes = productsIds
    .map((number: number) => typeof number)
    .every((type: string) => type === 'number');

  if (!arrayTypes || productsIds.length === 0) {
    return next({ code: 422, message: '"productsIds" must include only numbers' });
  }

  next();
};