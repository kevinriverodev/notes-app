import { Request, Response } from "express";

const deleteNote = async (req: Request, res: Response) => {
    res.json({ msg: 'delete method in notes'});
}

export default deleteNote;