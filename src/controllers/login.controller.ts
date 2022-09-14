import { NextFunction, Request, Response } from 'express';
import { ILogin } from '../interfaces/IUser';
import LoginService from '../services/login.service';

export default class ProductController {
  private service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const user = req.body as ILogin;
    const { code, data, message } = await this.service.login(user);
    if (message) {
      return next({ code, message });
    }
    return res.status(code).json({ token: data });
  }
}