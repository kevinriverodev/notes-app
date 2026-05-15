import api from "../config/axios";

export async function updateUser(username: string, firstName: string, lastName: string, email: string, password: string) {
	const response = await api.put(
		"/users",
		{
			username,
			firstName,
			lastName,
			email,
			password: password ? password : undefined,
		}
	);

	const { data } = response;

	if (!data.ok) throw new Error(data.error || "An unexpected error occurred");

	return data.data;
}