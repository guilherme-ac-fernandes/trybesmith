import express, { Request, Response } from 'express';
import ProductRouter from './routers/products.router';
import UserRouter from './routers/user.router';
import OrderRouter from './routers/order.router';

const app = express();

app.use(express.json());

app.get('/', (_req: Request, res: Response) => res.json({ message: 'Ok!' }));
app.use('/products', ProductRouter);
app.use('/users', UserRouter);
app.use('/orders', OrderRouter);

export default app;
