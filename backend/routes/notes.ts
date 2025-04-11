import { Router } from "express";
import getNotes from "../controllers/getNotes";
import getNote from "../controllers/getNote";
import createNote from "../controllers/createNote";
import updateNote from "../controllers/updateNote";
import deleteNote from "../controllers/deleteNote";

const router = Router();

router.get('/', getNotes);
router.get('/:id', getNote);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;