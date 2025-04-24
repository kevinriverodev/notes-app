import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: string;
            };
        }
    }
}

const validateJWT = async (req: Request , res: Response, next: Function) => {
    const { token } = req.cookies;

    if (!token) {
        res.status(401).json({ errors: [{ msg: 'Non-existent token in the request' }] });
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
            res.status(401).json({ errors: [{ msg: 'Invalid token - Unregistered user' }] });
            return;
        }

        const { status, id, role } = userAuth.toJSON();
        
        if(!status) {
            res.status(401).json({ errors: [{ msg: 'Invalid token - Inactive user' }] });
            return;
        }

        req.user = {
            id,
            role
        };

        next();

    } catch (error: unknown) {
        res.status(500).json(error);
        console.log(error);
    }
}

export default validateJWT;