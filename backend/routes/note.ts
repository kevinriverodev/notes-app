import { Router } from "express";
import { createNote, deleteNote, getNoteById, getUserNotes, updateNote } from "../controllers/note";

const router = Router();

router.get('/', getUserNotes);
router.get('/:id', getNoteById);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export { router as noteRouter }