import { Request, Response } from 'express';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';

import User from '../models/user';
import generateJWT from '../helpers/generate-jwt';

export const authUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [{ email: username }, { username }],
            },
        });

        if (!user) {
            res.status(401).json({ msg: 'Invalid username/email' });
            return;
        }

        const { id, status, password: hash, email, createdAt, updatedAt, ...data } = user.toJSON();

        if (!status) {
            res.status(401).json({ msg: 'Inactive user' });
            return;
        }

        const isValidPassword = await bcrypt.compare(String(password), hash);

        if (!isValidPassword) {
            res.status(401).json({ msg: 'Invalid password' });
            return;
        }

        const token = await generateJWT(id);

        res.status(200).json({
            user: data,
            token
        });

    } catch (error: unknown) {
        res.status(500).json(error);
    }
}

export const registerUser = async (req: Request, res: Response) => {
    const { username, firstName, lastName, email, password } = req.body;

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    try {
        const user = await User.create({ username, firstName, lastName, email, password: hash, status: true, role: 'USER' });

        const { password: pass, status, ...data } = user?.toJSON();
        
        const token = await generateJWT(data.id);

        res.status(201).json({
            user: data,
            token
        });
        
    } catch (error: unknown) {
        res.status(500).json(error);
    }
}