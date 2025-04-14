import { Router } from 'express';
import { check } from 'express-validator';

import { authUser, registerUser } from '../controllers/auth';
import { emailExist, usernameExist } from '../helpers/database-validations';
import validateFields from '../middlewares/validate-fields';

const router = Router();

router.post('/login', [
    check('username', 'Invalid username length').trim().notEmpty(),
    check('password', 'Invalid password length').trim().notEmpty(),
    validateFields
], authUser);

router.post('/register', [
    check('username', 'Invalid username length').trim().isLength({ min:1, max: 50 }),
    check('username').custom(usernameExist),
    check('firstName', 'Invalid first name length').trim().isLength({ min:1, max: 100 }),
    check('lastName', 'Invalid last name length').trim().isLength({ min:1, max: 100 }),
    check('email', 'Invalid email').trim().isEmail(),
    check('email').custom(emailExist),
    check('password', 'Invalid password length').trim().isLength({ min: 6, max: 20 }),
    validateFields
], registerUser);

export { router as authRouter }