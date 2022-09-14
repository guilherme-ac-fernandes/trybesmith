import { IProduct } from '../interfaces/IProduct';
import ProductModel from '../models/product.model';

export default class ProductService {
  private model: ProductModel;

  constructor() {
    this.model = new ProductModel();
  }

  public async getAll() {
    const products = await this.model.getAll();
    return { code: 200, data: products };
  }

  public async create(product: IProduct) { 
    const newProduct = await this.model.create(product);
    return { code: 201, data: newProduct };
  }
}