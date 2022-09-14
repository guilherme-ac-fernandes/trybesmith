import { Request, Response } from 'express';
import { IUser } from '../interfaces/IUser';
import UserService from '../services/user.service';

export default class ProductController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public async create(req: Request, res: Response) {
    const user = req.body as IUser;  
    const { code, data } = await this.service.create(user);
    return res.status(code).json({ token: data });
  }
}