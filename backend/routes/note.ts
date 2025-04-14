import { Router } from 'express';
import { check } from 'express-validator';

import { createNote, deleteNote, getNoteById, getUserNotes, updateNote } from '../controllers/note';
import validateJWT from '../middlewares/validate-jwt';
import validateFields from '../middlewares/validate-fields';

const router = Router();

router.get('/', [
    validateJWT
], getUserNotes);

router.get('/:id', [
    validateJWT,
    check('id', 'Invalid id - Non-numeric id').trim().isInt(),
    validateFields
], getNoteById);

router.post('/', [
    validateJWT,
    check('title', 'Invalid title length').trim().isLength({ min: 1, max: 100 }),
    check('description', 'Invalid description length').trim().isLength({ min: 1, max: 200 }),
    validateFields
], createNote);

router.put('/:id', [
    validateJWT,
    check('id', 'Invalid id - Non-numeric id').trim().isInt(),
    check('title', 'Invalid title length').trim().isLength({ min: 1, max: 100 }),
    check('description', 'Invalid description length').trim().isLength({ min: 1, max: 200 }),
    validateFields
], updateNote);

router.delete('/:id', [
    validateJWT,
    check('id', 'Invalid id - Non-numeric id').trim().isInt(),
    validateFields
], deleteNote);

export { router as noteRouter }