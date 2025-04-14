import { Router } from 'express';
import { check } from 'express-validator';

import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user';
import validateJWT from '../middlewares/validate-jwt';
import validateFields from '../middlewares/validate-fields';
import { isValidRole, roleExist } from '../middlewares/validate-role';
import { emailExist, usernameExist } from '../helpers/database-validations';

const router = Router();

router.get('/', [
    validateJWT,
    isValidRole('ADMIN'),
    validateFields
], getUsers);

router.get('/:id', [
    validateJWT,
    isValidRole('ADMIN'),
    check('id', 'Invalid id format').isInt(),
    validateFields
], getUser);

router.post('/', [
    validateJWT,
    isValidRole('ADMIN'),
    roleExist(['ADMIN', 'USER']),
    check('username', 'Invalid username length').trim().isLength({ min:1, max: 50 }),
    check('username').custom(usernameExist),
    check('firstName', 'Invalid first name length').trim().isLength({ min:1, max: 100 }),
    check('lastName', 'Invalid last name length').trim().isLength({ min:1, max: 100 }),
    check('email', 'Invalid email').trim().isEmail(),
    check('email').custom(emailExist),
    check('password', 'Invalid password length').trim().isLength({ min: 6, max: 20 }),
    validateFields
], createUser);

router.put('/:id', [
    validateJWT,
    check('id', 'Invalid id format').isInt(),
    check('username', 'Invalid username length').trim().isLength({ min:1, max: 50 }),
    check('firstName', 'Invalid first name length').trim().isLength({ min:1, max: 100 }),
    check('lastName', 'Invalid last name length').trim().isLength({ min:1, max: 100 }),
    check('email', 'Invalid email').trim().isEmail(),
    check('password', 'Invalid password length').trim().isLength({ min: 6, max: 20 }),
    validateFields
], updateUser);

router.delete('/:id', [
    validateJWT,
    isValidRole('ADMIN'),
    check('id', 'Invalid id format').isInt(),
    validateFields
], deleteUser);

export { router as userRouter }