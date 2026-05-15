import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { sendError } from "../helpers/response";

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

const validateJWT = async (req: Request, res: Response, next: Function) => {
	const { token } = req.cookies;

	if (!token) {
		sendError(res, "Non-existent token in the request", 401);
		return;
	}

	try {
		const { uid } = JSON.parse(
			JSON.stringify(
				jwt.verify(token, process.env.SECRETORPRIVATEKEY || "Th!sMyPA!BRT3k3y")
			)
		);

		const userAuth = await User.findOne({
			where: {
				id: uid,
				status: true,
			},
		});

		if (!userAuth) {
			sendError(res, "Invalid token", 401);
			return;
		}

		const { status, id, role } = userAuth.toJSON();

		if (!status) {
			sendError(res, "Invalid token", 401);
			return;
		}

		req.user = {
			id,
			role,
		};

		next();

	} catch (error: unknown) {
		console.log("Server error: ", error);
		sendError(res, "An unexpected error occurred", 500);
		return;
	}
};

export default validateJWT;