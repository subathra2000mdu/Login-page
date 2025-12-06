import express from 'express';
import register from '../controller/registerController.js';
import login from '../controller/loginController.js';
import logout from '../controller/logoutController.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

export default authRouter;