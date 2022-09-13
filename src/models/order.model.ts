import { Pool, RowDataPacket } from 'mysql2/promise';
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
}
