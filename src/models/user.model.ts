import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IUser, ICreateUser } from '../interfaces/IUser';
import connection from './connection';

export default class UserModel {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  public async create(product: IUser): Promise<ICreateUser> {
    const { username, classe, level, password } = product;
    const query = `
      INSERT INTO Trybesmith.Users (username, classe, level, password)
      VALUES (?, ?, ?, ?)
    `;
    const values = [username, classe, level, password];
    const [dataInserted] = await this.connection.execute<ResultSetHeader>(query, values);
    const { insertId: id } = dataInserted;
    return { id, ...product } as ICreateUser;
  }

  public async getUserById(userId: number) {
    const query = 'SELECT * FROM Trybesmith.Users WHERE id = ?';
    const values = [userId];
    const [data] = await this.connection.execute(query, values);
    const [user] = data as ICreateUser[];
    return user;
  }
}
