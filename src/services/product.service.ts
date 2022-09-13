import IProduct from '../interfaces/IProduct';
import ProductModel from '../models/product.model';

export default class ProductService {
  private model: ProductModel;

  constructor() {
    this.model = new ProductModel();
  }

  public async create(product: IProduct): Promise<IProduct> { 
    const newProduct = await this.model.create(product);
    return newProduct;
  }
}