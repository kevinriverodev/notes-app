import { Request, Response } from "express";

const getNotes = async (req: Request, res: Response) => {
    res.json({ msg: 'get method in notes'});
}

export default getNotes;