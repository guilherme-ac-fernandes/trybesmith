import OrderModel from '../models/order.model';

export default class OrderService {
  private model: OrderModel;

  constructor() {
    this.model = new OrderModel();
  }

  public async getAll() { 
    const orders = await this.model.getAll();
    return { code: 200, data: orders };
  }

  public async create(userId: number, productsIds: number[]) { 
    const newOrder = await this.model.create(userId, productsIds);
    return { code: 201, data: newOrder };
  }
}