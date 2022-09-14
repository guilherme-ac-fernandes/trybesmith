import { Router } from 'express';
import OrderController from '../controllers/orders.controller';
import Middleware from '../middlewares';

const router = Router();
const orderController = new OrderController();

router.get('/', orderController.getAll.bind(orderController));
router.post('/', Middleware.auth, Middleware.order, orderController.create.bind(orderController));

export default router;
