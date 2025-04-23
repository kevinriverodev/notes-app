import { Request, Response } from 'express';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';

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

        const { id, status, password: hash, createdAt, updatedAt, ...data } = user.toJSON();

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

        res.cookie('token', token, { sameSite: 'none', secure: true });

        res.status(200).json({
            user: data,
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

        const { password: pass, status, id, createdAt, updatedAt, ...data } = user?.toJSON();
        
        const token = await generateJWT(data.id);

        res.cookie('token', token, { sameSite: 'none', secure: true });

        res.status(201).json({
            user: data,
        });
        
    } catch (error: unknown) {
        res.status(500).json(error);
    }
}

export const validateCookie = async (req: Request, res: Response) => {
    const { token } = req.cookies;

    if(!token) {
        res.status(401).json({ msg: 'Non-existent token in the request' });
        return;
    }

    try {
        const { uid } = JSON.parse(JSON.stringify(jwt.verify(token, process.env.SECRETORPRIVATEKEY || 'Th!sMyPA!BRT3k3y')));
        
        const userAuth = await User.findOne({
            where: {
                id: uid,
                status: true
            }
        });
    
        if (!userAuth) {
            res.status(401).json({ msg: 'Invalid token' });
            return;
        }
    
        const { id, status, password, createdAt, updatedAt, ...data } = userAuth.toJSON();
        
        res.status(200).json({ user: data });
        
    } catch (error: unknown) {
        res.status(500).json(error);
    }
}