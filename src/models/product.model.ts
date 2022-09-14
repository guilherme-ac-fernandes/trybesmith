import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IProduct, IProductCreated } from '../interfaces/IProduct';
import connection from './connection';

export default class ProductModel {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  public async getAll(): Promise<IProductCreated[]> {
    const query = 'SELECT * FROM Trybesmith.Products';
    const [products] = await this.connection.execute(query);
    return products as IProductCreated[];
  }

  public async create(product: IProduct): Promise<IProductCreated> {
    const { name, amount } = product;
    const query = `
      INSERT INTO Trybesmith.Products (name, amount)
      VALUES (?, ?)
    `;
    const values = [name, amount];
    const [dataInserted] = await this.connection.execute<ResultSetHeader>(query, values);
    const { insertId: id } = dataInserted;
    return { id, ...product } as IProductCreated;
  }
}
