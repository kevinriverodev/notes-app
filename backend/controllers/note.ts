import { Request, Response } from 'express';
import { Op } from 'sequelize';

import Note from '../models/note';

export const getUserNotes = async (req: Request, res: Response) => { 
    const { query } = req.query;

    if (!req.user) {
        res.status(401).json({ msg: 'Unverified user' });
        return;
    }

    try {
        if (query) {
            const notes = await Note.findAndCountAll({
                where: {
                    [Op.or]: [
                        {
                          title: {
                            [Op.like]: `%${query}%` },
                        },
                        {
                          description: {
                            [Op.like]: `%${query}%`  
                          }
                        }
                    ],
                    [Op.and]: [{ userId: req.user.id, }, { status: true }]
                },
                order: [
                    ['updatedAt', 'DESC']
                ]
            });

            if (!notes) {
                res.status(400).json({ msg: 'No notes found' });
                return;
            }
    
            res.status(200).json(notes);

        } else {
            const notes = await Note.findAndCountAll({
                where: {
                    userId: req.user.id,
                    status: true
                },
                order: [
                    ['updatedAt', 'DESC']
                ]
            });

            if (!notes) {
                res.status(400).json({ msg: 'No notes found' });
                return;
            }
    
            res.status(200).json(notes);
        }

    } catch (error: unknown) {
        res.status(500).json(error);
    }
}

export const getNoteById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!req.user) {
        res.status(401).json({ msg: 'Unverified user' });
        return;
    }

    try {
        const note = await Note.findOne({
            where: {
                id,
                userId: req.user.id,
                status: true
            }
        });

        if (!note) {
            res.status(400).json({ msg: 'No note found' });
            return;
        }

        res.status(200).json(note);

    } catch (error: unknown) {
        res.status(500).json(error);
    }
}

export const createNote = async (req: Request, res: Response) => {
    const { title, description } = req.body;

    if (!req.user) {
        res.status(401).json({ msg: 'Unverified user' });
        return;
    }

    try {
        const note = await Note.create({ title, description, status: true, userId: req.user.id });

        res.status(201).json(note);
        
    } catch (error: unknown) {
        res.status(500).json(error);
    }
}

export const updateNote = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!req.user) {
        res.status(401).json({ msg: 'Unverified user' });
        return;
    }

    try {
        const note = await Note.findOne({
            where: {
                id,
                userId: req.user.id
            }
        });

        if (!note) {
            res.status(400).json({ msg: 'No note found' });
            return;
        }

        await note.update({ title, description });

        res.status(200).json(note);
    
    } catch (error: unknown) {
        res.status(500).json(error);
    }
}

export const deleteNote = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!req.user) {
        res.status(401).json({ msg: 'Unverified user' });
        return;
    }

    try {
        const note = await Note.findOne({
            where: {
                id,
                userId: req.user.id
            }
        });

        if (!note) {
            res.status(400).json({ msg: 'No note found' });
            return;
        }

        await note.update({ status: false });

        res.status(200).json(note);
    
    } catch (error: unknown) {
        res.status(500).json(error);
    }
}