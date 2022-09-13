import { Request, Response } from 'express';
import IProduct from '../interfaces/IProduct';
import ProductService from '../services/product.service';

export default class ProductController {
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  public async getAll(_req: Request, res: Response) {  
    const products = await this.service.getAll();
    return res.status(200).json(products);
  }

  public async create(req: Request, res: Response) {
    const product = req.body as IProduct;  
    const newProduct = await this.service.create(product);
    return res.status(201).json(newProduct);
  }
}