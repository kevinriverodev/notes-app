import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {

    if (!req.user) {
        res.status(401).json({ errors: [{ msg: 'Unverified user' }] });
        return;
    }

    try {
        const users = await User.findAndCountAll({
            where: {
                status: true
            }
        });

        if (!users) {
            res.status(400).json({ errors: [{ msg: 'No users found' }] });
            return;
        }

        const userData = users.rows.map(user => {
            const { password, status, ...data } = user.toJSON();

            return data;
        });

        res.status(200).json({ count: users.count, users: userData });

    } catch (error: unknown) {
        res.status(500).json(error);
    }
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!req.user) {
        res.status(401).json({ errors: [{ msg: 'Unverified user' }] });
        return;
    }
    
    try {
        const user = await User.findOne({
            where: {
                id,
                status: true
            }
        });

        if (!user) {
            res.status(400).json({ errors: [{ msg: 'No user found' }] });
            return;
        }

        const { password, status, ...data } = user.toJSON();

        res.json({ user: data });

    } catch (error: unknown) {
        res.status(500).json(error);
    }
}

export const createUser = async (req: Request, res: Response) => {    
    const { username, firstName, lastName, email, password, role } = req.body;

    if (!req.user) {
        res.status(401).json({ errors: [{ msg: 'Unverified user' }] });
        return;
    }

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    try {
        const user = await User.create({ username, firstName, lastName, email, password: hash, status: true, role });

        if (!user) {
            res.status(400).json({ errors: [{ msg: 'Error registering  user' }] });
            return;
        }

        const { password: pass, status, ...data } = user.toJSON();
        
        res.status(201).json({ user: data });
        
    } catch (error: unknown) {
        res.status(500).json(error);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { username, firstName, lastName, email, password } = req.body;

    if (!req.user) {
        res.status(401).json({ errors: [{ msg: 'Unverified user' }] });
        return;
    }

    try {
        const user = await User.findOne({
            where: {
                id: req.user.id,
                status: true
            }
        });

        if (!user) {
            res.status(400).json({ errors: [{ msg: 'No user found' }] });
            return;
        }

        if (password) {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(password, salt);   
            await user.update({ username, firstName, lastName, email, password: hash });        
        } else {
            await user.update({ username, firstName, lastName, email });        
        }

        const { password: pass, status, updatedAt, createdAt, ...data } = user.toJSON();

        res.status(200).json({ user: data });

    } catch (error: unknown) {
        res.status(500).json(error);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!req.user) {
        res.status(401).json({ errors: [{ msg: 'Unverified user' }] });
        return;
    }

    try {
        const user = await User.findOne({
            where: {
                id
            }
        });

        if (!user) {
            res.status(400).json({ errors: [{ msg: 'No user found' }] });
            return;
        }

        await user.update({ status: false });

        const { password, status, ...data } = user.toJSON();

        res.status(200).json({ user: data });
        
    } catch (error: unknown) {
        res.status(500).json(error);
    }
}