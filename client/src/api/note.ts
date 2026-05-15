import api from "../config/axios";

export async function getNotes() {
	const response = await api.get(
		"/notes"
	);

	const { data } = response;

	if (!data.ok) throw new Error(data.error || "An unexpected error occurred");

	return data.data;
}

export async function getNote(id: string) {
	const response = await api.get(
		`/notes/${id}`
	);

	const { data } = response;

	if (!data.ok) throw new Error(data.error || "An unexpected error occurred");

	return data.data;
}

export async function createNote(title: string, description: string) {
	const response = await api.post(
		"/notes/",
		{ title, description }
	);

	const { data } = response;

	if (!data.ok) throw new Error(data.error || "An unexpected error occurred");

	return data.data;
}

export async function updateNote(id: number, title: string, description: string) {
	const response = await api.put(
		`/notes/${id}`,
		{ title, description }
	);

	const { data } = response;

	if (!data.ok) throw new Error(data.error || "An unexpected error occurred");

	return data.data;
}

export async function deleteNote(id: number) {
	const response = await api.delete(
		`/notes/${id}`
	);

	const { data } = response;

	if (!data.ok) throw new Error(data.error || "An unexpected error occurred");

	return data.data;
}

export async function searchNotesByQuery(query: string) {
	const response = await api.get(
		`/notes?query=${query}`
	);

	const { data } = response;

	if (!data.ok) throw new Error(data.error || "An unexpected error occurred");

	return data.data;
}