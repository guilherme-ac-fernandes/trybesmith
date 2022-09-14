import express, { Request, Response } from 'express';
import ProductRouter from './routers/products.router';
import UserRouter from './routers/user.router';
import OrderRouter from './routers/order.router';
import LoginRouter from './routers/login.router';

import 'express-async-errors';

import Middlewares from './middlewares';

const app = express();

app.use(express.json());

// Rotas de validação
app.get('/', (_req: Request, res: Response) => res.json({ message: 'Ok!' }));

// Rotas
app.use('/products', ProductRouter);
app.use('/users', UserRouter);
app.use('/orders', OrderRouter);
app.use('/login', LoginRouter);

// Middleware de Erro Genérico
app.use(Middlewares.error);

export default app;
