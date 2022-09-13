import { Request, Response } from 'express';
import OrderService from '../services/order.service';

export default class ProductController {
  private service: OrderService;

  constructor() {
    this.service = new OrderService();
  }

  public async getAll(_req: Request, res: Response) {  
    const orders = await this.service.getAll();
    return res.status(200).json(orders);
  }
}