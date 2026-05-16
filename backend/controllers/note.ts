import { Request, Response } from "express";
import { Op } from "sequelize";
import Note from "../models/note";
import { sendError, sendSuccess } from "../helpers/response";

export const getUserNotes = async (req: Request, res: Response) => {
	const { query } = req.query;

	if (!req.user) {
		sendError(res, "Unverified user", 401);
		return;
	}

	try {
		if (query) {
			const notes = await Note.findAndCountAll({
				where: {
					[Op.or]: [
						{
							title: {
								[Op.like]: `%${query}%`,
							},
						},
						{
							description: {
								[Op.like]: `%${query}%`,
							},
						},
					],
					[Op.and]: [{ userId: req.user.id }, { status: true }],
				},
				order: [["updatedAt", "DESC"]],
			});

			if (!notes) {
				sendError(res, "No notes found", 400);
				return;
			}

			sendSuccess(res, notes, 200);
		} else {
			const notes = await Note.findAndCountAll({
				where: {
					userId: req.user.id,
					status: true,
				},
				order: [["updatedAt", "DESC"]],
			});

			if (!notes) {
				sendError(res, "No notes found", 400);
				return;
			}

			sendSuccess(res, notes, 200);
		}
	} catch (error: unknown) {
		console.log("Server error: ", error);
		sendError(res, "An unexpected error occurred", 500);
	}
};

export const getNoteById = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!req.user) {
		sendError(res, "Unverified user", 401);
		return;
	}

	try {
		const note = await Note.findOne({
			where: {
				id,
				userId: req.user.id,
				status: true,
			},
		});

		if (!note) {
			sendError(res, "No note found", 400);
			return;
		}

		sendSuccess(res, note, 200);

	} catch (error: unknown) {
		console.log("Server error: ", error);
		sendError(res, "An unexpected error occurred", 500);
	}
};

export const createNote = async (req: Request, res: Response) => {
	const { title, description } = req.body;

	if (!req.user) {
		sendError(res, "Unverified user", 401);
		return;
	}

	try {
		const note = await Note.create({
			title,
			description,
			status: true,
			userId: req.user.id,
		});

		sendSuccess(res, note, 201);  

	} catch (error: unknown) {
		console.log("Server error: ", error);
		sendError(res, "An unexpected error occurred", 500);
	}
};

export const updateNote = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { title, description } = req.body;

	if (!req.user) {
		sendError(res, "Unverified user", 401);
		return;
	}

	try {
		const note = await Note.findOne({
			where: {
				id,
				userId: req.user.id,
			},
		});

		if (!note) {
			sendError(res, "No note found", 400);
			return;
		}

		note.update({ title, description });

		sendSuccess(res, note, 200);

	} catch (error: unknown) {
		console.log("Server error: ", error);
		sendError(res, "An unexpected error occurred", 500);
	}
};

export const deleteNote = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!req.user) {
		sendError(res, "Unverified user", 401);
		return;
	}

	try {
		const note = await Note.findOne({
			where: {
				id,
				userId: req.user.id,
			},
		});

		if (!note) {
			sendError(res, "No note found", 400);
			return;
		}

		await note.update({ status: false });

		sendSuccess(res, note, 200);

	} catch (error: unknown) {
		console.log("Server error: ", error);
		sendError(res, "An unexpected error occurred", 500);
	}
};