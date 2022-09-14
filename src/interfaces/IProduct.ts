export interface IProduct {
  name: string,
  amount: string,
}

export interface IProductCreated extends IProduct {
  id: number,
  orderId: number,
}
