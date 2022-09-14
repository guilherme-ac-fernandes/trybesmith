import { Router } from 'express';
import UserController from '../controllers/user.controller';
import Middlewares from '../middlewares';

const router = Router();
const userController = new UserController();

router.post('/', Middlewares.user, userController.create.bind(userController));

export default router;
