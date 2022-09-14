import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import Middleware from '../middlewares';

const router = Router();
const loginController = new LoginController();

router.post('/', Middleware.login, loginController.create.bind(loginController));

export default router;
