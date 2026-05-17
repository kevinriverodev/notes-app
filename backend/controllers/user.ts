import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import { sendError, sendSuccess } from "../helpers/response";

export const getUsers = async (req: Request, res: Response) => {
	if (!req.user) {
		sendError(res, "Unverified user", 401);
		return;
	}

	try {
		const users = await User.findAndCountAll({
			where: {
				status: true,
			},
		});

		if (!users) {
			sendError(res, "No users found", 400);
			return;
		}

		const userData = users.rows.map((user) => {
			const { password, status, ...data } = user.toJSON();

			return data;
		});

		sendSuccess(res, { count: users.count, users: userData }, 200);

	} catch (error: unknown) {
		console.log("Server error: ", error);
		sendError(res, "An unexpected error occurred", 500);
	}
};

export const getUser = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!req.user) {
		sendError(res, "Unverified user", 401);
		return;
	}

	try {
		const user = await User.findOne({
			where: {
				id,
				status: true,
			},
		});

		if (!user) {
			sendError(res, "No user found", 400);
			return;
		}

		const { password, status, ...data } = user.toJSON();

		sendSuccess(res, data, 200);

	} catch (error: unknown) {
		console.log("Server error: ", error);
		sendError(res, "An unexpected error occurred", 500);
	}
};

export const createUser = async (req: Request, res: Response) => {
	const { username, firstName, lastName, email, password, role } = req.body;

	if (!req.user) {
		sendError(res, "Unverified user", 401);
		return;
	}

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
			role,
		});

		const { password: pass, status, ...data } = user.toJSON();

		sendSuccess(res, data, 201);	

	} catch (error: unknown) {
		console.log("Server error: ", error);
		sendError(res, "An unexpected error occurred", 500);
	}
};

export const updateUser = async (req: Request, res: Response) => {
	const { username, firstName, lastName, email, password } = req.body;

	if (!req.user) {
		sendError(res, "Unverified user", 401);
		return;
	}

	try {
		const user = await User.findOne({
			where: {
				id: req.user.id,
				status: true,
			},
		});

		if (!user) {
			sendError(res, "No user found", 400);
			return;
		}

		if (password) {
			const salt = bcrypt.genSaltSync();
			const hash = bcrypt.hashSync(password, salt);
			await user.update({
				username,
				firstName,
				lastName,
				email,
				password: hash,
			});
		} else {
			await user.update({ username, firstName, lastName, email });
		}

		const { password: pass, status, updatedAt, createdAt, ...data } = user.toJSON();

		sendSuccess(res, data, 200);

	} catch (error: unknown) {
		console.log("Server error: ", error);
		sendError(res, "An unexpected error occurred", 500);
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!req.user) {
		sendError(res, "Unverified user", 401);
		return;
	}

	try {
		const user = await User.findOne({
			where: {
				id,
			},
		});

		if (!user) {
			sendError(res, "No user found", 400);
			return;
		}

		await user.update({ status: false });

		const { password, status, ...data } = user.toJSON();

		sendSuccess(res, data, 200);

	} catch (error: unknown) {
		console.log("Server error: ", error);
		sendError(res, "An unexpected error occurred", 500);
	}
};