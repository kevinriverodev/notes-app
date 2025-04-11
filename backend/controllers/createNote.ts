import { Request, Response } from "express";

const createNote = async (req: Request, res: Response) => {
    res.json({ msg: 'post method in notes'});
}

export default createNote;