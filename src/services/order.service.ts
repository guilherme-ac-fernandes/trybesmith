import IOrder from '../interfaces/IOrder';
import OrderModel from '../models/order.model';

export default class UserService {
  private model: OrderModel;

  constructor() {
    this.model = new OrderModel();
  }

  public async getAll() { 
    const orders = await this.model.getAll();
    return orders;
  }
}