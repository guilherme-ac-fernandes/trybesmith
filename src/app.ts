import express, { Request, Response } from 'express';
import ProductRouter from './routers/products.router';
import UserRouter from './routers/user.router';

const app = express();

app.use(express.json());

app.get('/', (_req: Request, res: Response) => res.json({ message: 'Ok!' }));
app.use('/products', ProductRouter);
app.use('/users', UserRouter);

export default app;
