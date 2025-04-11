import { Request, Response } from "express";

const updateNote = async (req: Request, res: Response) => {
    res.json({ msg: 'put method in notes'});
}

export default updateNote;