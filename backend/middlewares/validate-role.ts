import { Request, Response } from "express";
import { sendError } from "../helpers/response";

export const isValidRole = (role: string) => {
	return (req: Request, res: Response, next: Function) => {
		if (!req.user) {
			sendError(res, "Unverified user", 401);
			return;
		}

		if (req.user.role !== role) {
			sendError(res, "You don't have permission to access this feature", 401);
			return;
		}

		next();
	};
};

export const roleExist = (roles: string[]) => {
	return (req: Request, res: Response, next: Function) => {
		if (!req.user) {
			sendError(res, "Unverified user", 401);
			return;
		}

		if (!roles.includes(req.body.role)) {
			sendError(res, "Invalid role", 401);
			return;
		}

		next();
	};
};