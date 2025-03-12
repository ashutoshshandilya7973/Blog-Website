import { Router } from 'express';
import { registerUser,loginUser, forgotPassword, resetPassword } from '../controller/auth.controller.js';
import { userForgotPasswordSchema, userLoginSchema, userRegisterSchema } from '../validator/auth.validator.js';
import { validator } from '../middleware/validator.middeware.js';
const router=Router();

router.route('/register').post(validator(userRegisterSchema),registerUser)
router.route('/login').post(validator(userLoginSchema),loginUser)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password').post(resetPassword)
export {router}