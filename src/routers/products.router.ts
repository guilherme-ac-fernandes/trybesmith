import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import Middlewares from '../middlewares';

const router = Router();
const productController = new ProductController();

router.post('/', Middlewares.product, productController.create.bind(productController));
router.get('/', productController.getAll.bind(productController));

export default router;
