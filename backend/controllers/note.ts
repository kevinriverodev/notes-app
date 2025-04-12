import { Request, Response } from "express";

export const getNotes = async (req: Request, res: Response) => {
    res.json({ msg: 'get method in notes'});
}

export const getNote = async (req: Request, res: Response) => {
    res.json({ msg: 'get method by ID in notes'});
}

export const updateNote = async (req: Request, res: Response) => {
    res.json({ msg: 'put method in notes'});
}

export const deleteNote = async (req: Request, res: Response) => {
    res.json({ msg: 'delete method in notes'});
}

export const createNote = async (req: Request, res: Response) => {
    res.json({ msg: 'post method in notes'});
}