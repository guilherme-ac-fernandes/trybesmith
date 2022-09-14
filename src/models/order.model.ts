import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import IOrder from '../interfaces/IOrder';
import connection from './connection';

interface IOrderSQL extends IOrder, RowDataPacket {}

export default class OrderModel {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  public async getAll(): Promise<IOrderSQL[]> {
    // Aplicação do JSON_ARRAYAGG utilizando após ajuda da Luá OCtaviano 
    // documentação: https://dev.mysql.com/doc/refman/5.7/en/aggregate-functions.html#function_json-arrayagg
    const query = `
      SELECT o.id AS id, o.userId AS userId, JSON_ARRAYAGG(p.id) AS productsIds
      FROM Trybesmith.Orders AS o
      INNER JOIN Trybesmith.Products AS p
      ON o.id = p.orderId
      GROUP BY o.id
      ORDER BY userId ASC
    `;
    const [orders] = await this.connection.execute<IOrderSQL[]>(query);
    return orders;
  }

  public async getByUserId(userId: number): Promise<IOrderSQL[]> {
    const query = `
      SELECT o.id AS id, o.userId AS userId, JSON_ARRAYAGG(p.id) AS productsIds
      FROM Trybesmith.Orders AS o
      INNER JOIN Trybesmith.Products AS p
      ON o.id = p.orderId
      WHERE o.userId = ?
      GROUP BY o.id
      ORDER BY userId ASC
    `;
    const [order] = await this.connection.execute<IOrderSQL[]>(query, [userId]);
    return order;
  }

  public async create(userId: number, productsIds: number[]) {
    productsIds.forEach(async (productsId) => {
      const query = `
        INSERT INTO Trybesmith.Orders (userId)
        VALUES (?)
      `;
      const values = [userId];
      const [dataInserted] = await this.connection.execute<ResultSetHeader>(query, values);
      const { insertId } = dataInserted;

      const query2 = `
        UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?;
      `;
      const values2 = [insertId, productsId];
      await this.connection.execute<ResultSetHeader>(query2, values2);
    });
    return { userId, productsIds };
  }
}
