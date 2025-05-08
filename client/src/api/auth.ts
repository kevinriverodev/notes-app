import axios from "axios";
import { handleErrors } from "../helpers/handle-errors";

export async function signin(username: string, password: string) {
	try {
		const response = await axios.post(
			"http://localhost:8080/api/auth/signin",
			{
				username,
				password,
			},
			{
				withCredentials: true,
			}
		);

		const { data, status } = response;

		if (status >= 400) {
			console.log(data, status);
			return;
		}

		return data.user;

	} catch (error) {
		handleErrors(error);
	}
}

export async function signup(username: string, firstName: string, lastName: string, email: string, password: string) {
	try {
		const response = await axios.post(
			"http://localhost:8080/api/auth/signup",
			{
				username,
				firstName,
				lastName,
				email,
				password,
			},
			{
				withCredentials: true,
			}
		);

		const { data, status } = response;

		if (status >= 400) {
			console.log(data, status);
			return;
		}

		return data.user;

	} catch (error) {
		handleErrors(error);
	}
}

export async function validateCookie() {
	try {
		const response = await axios.get(
			"http://localhost:8080/api/auth/validate-cookie",
			{
				withCredentials: true,
			}
		);

		const { data, status } = response;

		if (status >= 400) {
			console.log(data, status);
			return;
		}

		return data.user;

	} catch (error) {
		handleErrors(error);
	}
}