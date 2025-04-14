import { Request, Response } from 'express';

export const isValidRole = (role: string) => {
    return (req: Request, res: Response, next: Function) => {

        if (!req.user) {
            res.status(401).json({ msg: 'Unverified user' });
            return;
        }

        if (req.user.role !== role) {
            res.status(401).json({ msg: 'Not authorized for this functionality' });
            return;
        }

        next();
    }
}

export const roleExist = (roles: string[]) => {
    return (req: Request, res: Response, next: Function) => {

        if (!req.user) {
            res.status(401).json({ msg: 'Unverified user' });
            return;
        }

        if (!roles.includes(req.body.role)){
            res.status(400).json({ msg: 'Invalid role' });
            return;
        }

        next();
    };
}