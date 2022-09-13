import { Pool, RowDataPacket } from 'mysql2/promise';
// import IOrder from '../interfaces/IOrder';
import connection from './connection';

interface IOrderSQL extends RowDataPacket {
  id: number,
  userId: number,
  productsIds: any,
}

// const changeForEach = (array: IOrderSQL[]) => {
//   const newArray: IOrder[] = [];
//   array.forEach((order: IOrderSQL) => {
//     const index = newArray.findIndex(({ id }) => id === order.id);
//     console.log(array[0], index);
//     if (index < 0) {
//       newArray[index].productsIds.push(order.productId);
//     } else {
//       newArray.push({ id: order.id, userId: order.userId, productsIds: [order.productId],
//       });
//     }
//   });
//   return newArray;
// };

// const change = (orders: IOrderSQL[]) => orders.reduce((acc: IOrderSQL, curr: IOrderSQL) => {
//   const index = acc.findIndex((order: IOrderSQL) => order.id === curr.id);
//   if (index > 0) {
//     acc.push({ id: curr.id, userId: curr.userId, productsIds: [curr.productId] });
//     return acc;
//   }
//   acc[index] = { ...acc[index], productsIds: [...acc[index].productsIds, curr.productId] };
//   return acc;
// }, []);

export default class OrderModel {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  public async getAll(): Promise<IOrderSQL[]> {
    const query = `
      SELECT o.id AS id, o.userId AS userId, p.id AS productsIds
      FROM Trybesmith.Orders AS o
      INNER JOIN Trybesmith.Products AS p
      ON o.id = p.orderId
    `;
    const [orders] = await this.connection.execute<IOrderSQL[]>(query);
    
    const newOrders = orders.reduce((acc: any, { id, userId, productsIds }) => {
      const index = acc.findIndex((ord: any) => ord.id === id);
      if (index === -1) {
        acc.push({ id, userId, productsIds: [productsIds] });
        return acc;
      }
      acc[index] = { ...acc[index], productsIds: [...acc[index].productsIds, productsIds] };
      return acc;
    }, []);

    return newOrders;
  }
}
