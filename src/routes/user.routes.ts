import { Router } from 'express';
import * as ctrlUser from '../controllers/userControllers';
import { reqToken,validation, userSchema, loginSchema } from '../barrel';
const router = Router();

router.post('/user/signup', validation(userSchema),  ctrlUser.signup);
router.post('/user/login', validation(loginSchema),  ctrlUser.login);
router.get('/user/all', reqToken, ctrlUser.getAllUsers);
router.get('/user/:id',reqToken, ctrlUser.getUserById);


//Validaciones pendientes. 
router.post('/refreshToken', ctrlUser.refreshTokens);
router.put('/resetPassword', ctrlUser.resetPassword);
router.post('/requestReset', ctrlUser.resetMail);

export default router;