import { Request, Response } from "express";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

import User from "../models/user";
import generateJWT from "../helpers/generate-jwt";

export const authUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [{ email: username }, { username }],
            },
        });

        if (!user) {
            res.status(500).json({ msg: 'Invalid username/email' });
            return;
        }

        const { id, status, password: hash, ...data } = user.toJSON();

        if (!status) {
            res.status(500).json({ msg: 'Inactive user' });
            return;
        }

        const isValidPassword = await bcrypt.compare(String(password), hash);

        if (!isValidPassword) {
            res.status(500).json({ msg: 'Invalid password' });
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