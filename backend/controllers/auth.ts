import { Request, Response } from "express";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import generateJWT from "../helpers/generate-jwt";
import { sendError, sendSuccess } from "../helpers/response";

export const authUser = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({
			where: {
				[Op.or]: [{ email: username }, { username }],
			},
		});

		if (!user) {
			sendError(res, "Invalid username/password", 401);
			return;
		}

		const { id, status, password: hash, createdAt, updatedAt, ...data } = user.toJSON();

		if (!status) {
			sendError(res, "Inactive user", 401);
			return;
		}

		const isValidPassword = await bcrypt.compare(String(password), hash);

		if (!isValidPassword) {
			sendError(res, "Invalid username/password", 401);
			return;
		}

		const token = await generateJWT(id);

		res.cookie("token", token, { sameSite: "none", secure: true });

		sendSuccess(res, data, 200);

	} catch (error: unknown) {
		console.log("Server error: ", error);
		sendError(res, "An unexpected error occurred", 500);
	}
};

export const registerUser = async (req: Request, res: Response) => {
	const { username, firstName, lastName, email, password } = req.body;

	const salt = bcrypt.genSaltSync();
	const hash = bcrypt.hashSync(password, salt);

	try {
		const user = await User.create({
			username,
			firstName,
			lastName,
			email,
			password: hash,
			status: true,
			role: "USER",
		});

		const { password: pass, status, id, createdAt, updatedAt, ...data } = user.toJSON();

		const token = await generateJWT(id);

		res.cookie("token", token, { sameSite: "none", secure: true });

		sendSuccess(res, data, 201);

	} catch (error: unknown) {
		console.log("Server error: ", error);
		sendError(res, "An unexpected error occurred", 500);
	}
};

export const validateCookie = async (req: Request, res: Response) => {
	const { token } = req.cookies;

	if (!token) {
		sendError(res, "Non-existent token in the request", 401)
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

		const { id, status, password, createdAt, updatedAt, ...data } = userAuth.toJSON();

		sendSuccess(res, data, 200);

	} catch (error: unknown) {
		console.log("Server error: ", error);
		sendError(res, "An unexpected error occurred", 500);
	}
};