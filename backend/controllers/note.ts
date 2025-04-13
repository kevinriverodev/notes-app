import { Request, Response } from "express";
import Note from "../models/note";

export const getUserNotes = async (req: Request, res: Response) => {
    const { uid } = req.headers;

    try {
        const notes = await Note.findAndCountAll({
            where: {
                userId: uid,
                status: true
            }
        });

        res.status(200).json(notes);

    } catch (error: unknown) {
        res.status(500).json(error);
    }
}

export const getNoteById = async (req: Request, res: Response) => {
    const { uid } = req.headers;
    const { id } = req.params;

    try {
        const note = await Note.findOne({
            where: {
                id,
                userId: uid,
                status: true
            }
        });

        res.status(200).json(note);

    } catch (error: unknown) {
        res.status(500).json(error);
    }
}

export const createNote = async (req: Request, res: Response) => {
    const { title, description, status, userId } = req.body;

    try {
        const note = await Note.create({ title, description, status, userId });

        res.status(201).json(note);
        
    } catch (error: unknown) {
        res.status(500).json(error);
    }
}

export const updateNote = async (req: Request, res: Response) => {
    const { uid } = req.headers;
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const note = await Note.findOne({
            where: {
                id,
                userId: uid
            }
        });

        await note?.update({ title, description });

        res.status(200).json(note);
    
    } catch (error: unknown) {
        res.status(500).json(error);
    }
}

export const deleteNote = async (req: Request, res: Response) => {
    const { uid } = req.headers;
    const { id } = req.params;

    try {
        const note = await Note.findOne({
            where: {
                id,
                userId: uid
            }
        });

        await note?.update({ status: false });

        res.status(200).json(note);
    
    } catch (error: unknown) {
        res.status(500).json(error);
    }
}