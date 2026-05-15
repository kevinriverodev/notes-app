import api from "../config/axios";

export async function signin(username: string, password: string) {
	const response = await api.post(
		"/auth/signin",
		{ username, password }
	);

	const { data } = response;

	if (!data.ok) throw new Error(data.error || "An unexpected error occurred");

	return data.data;
}

export async function signup(username: string, firstName: string, lastName: string, email: string, password: string) {
	const response = await api.post(
		"/auth/signup",
		{
			username,
			firstName,
			lastName,
			email,
			password
		}
	);

	const { data } = response;

	if (!data.ok) throw new Error(data.error || "An unexpected error occurred");

	return data.data;
}

export async function validateCookie() {
	const response = await api.get(
		"/auth/validate-cookie"
	);

	const { data } = response;

	if (!data.ok) throw new Error(data.error || "An unexpected error occurred");

	return data.data;
}