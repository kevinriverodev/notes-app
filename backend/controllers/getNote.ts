import { Request, Response } from "express";

const getNote = async (req: Request, res: Response) => {
    res.json({ msg: 'get method by ID in notes'});
}

export default getNote;