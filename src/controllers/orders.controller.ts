import { Request, Response } from 'express';
import OrderService from '../services/order.service';

interface NewRequest extends Request {
  userId: number,
}

export default class ProductController {
  private service: OrderService;

  constructor() {
    this.service = new OrderService();
  }

  public async getAll(_req: Request, res: Response) {  
    const { code, data } = await this.service.getAll();
    return res.status(code).json(data);
  }

  public async create(req: Request, res: Response) {
    const { productsIds } = req.body;
    const { userId } = req as NewRequest;
    const { code, data } = await this.service.create(userId, productsIds);
    return res.status(code).json(data);
  }
}