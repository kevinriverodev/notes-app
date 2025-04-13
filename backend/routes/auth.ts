import { Router } from "express";
import { authUser } from "../controllers/auth";

const router = Router();

router.post('/login', authUser);

export { router as authRouter }