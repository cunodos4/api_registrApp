import { Router } from 'express';
import * as ctrlUser from '../controllers/userControllers';
import { reqToken } from '../middlewares/jwtMiddlewares/check-token';
import { validation }from '../middlewares/validatorMiddleware/validationMiddleware'
import { userSchema } from '../validations/auth-validations/user';
import { loginSchema } from '../validations/auth-validations/login'

const router = Router();

router.post('/user/signup', validation(userSchema),  ctrlUser.signup);
router.post('/user/login', validation(loginSchema),  ctrlUser.login);
router.get('/user/all', reqToken, ctrlUser.getAllUsers);
router.get('/user/:id',reqToken, ctrlUser.getUserById)

export default router;