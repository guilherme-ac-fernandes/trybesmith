import { Pool } from 'mysql2/promise';
import { ICreateUser } from '../interfaces/IUser';
import connection from './connection';

export default class LoginModel {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  public async login(username: string): Promise<ICreateUser> {
    const query = `
      SELECT * FROM Trybesmith.Users
      WHERE username = ?
    `;
    const [data] = await this.connection.execute(query, [username]);
    const [user] = data as ICreateUser[];
    return user;
  }
}
