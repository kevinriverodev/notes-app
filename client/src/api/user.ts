import axios from "axios";
import { showToastMsg } from "../helpers/show-toast-msg";
import { handleErrors } from "../helpers/handle-errors";

export async function signin(username: string, password: string) {
    try {
        const response = await axios.post('http://localhost:8080/api/auth/signin', {
            username,
            password
        }, {
            withCredentials: true
        });

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
    try{
        const response = await axios.post('http://localhost:8080/api/auth/signup', {
            username,
            firstName,
            lastName,
            email,
            password
        }, {
            withCredentials: true
        });

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

export async function updateUser(username: string, firstName: string, lastName: string, email: string, password: string, confirmPassword: string) {
	if (password.trim() || confirmPassword.trim()) {
		if (password.trim() !== confirmPassword.trim() || !password.trim() || !confirmPassword.trim()) {
			showToastMsg({
				msg: "Passwords dont't match",
				type: "error",
				position: "bottom-left",
				autoClose: 8000,
			});
			return;
		}
	}

	try {
		const response = await axios.put("http://localhost:8080/api/users", {
				username,
				firstName,
				lastName,
				email,
				password: password ? password : undefined,
			},
			{ 
                withCredentials: true 
            }
		);

		const { data, status } = response;

		if (status >= 400) {
			console.log(data, status);
			return;
		}

		showToastMsg({
			msg: "User successfully updated",
			type: "success",
			position: "bottom-left",
			autoClose: 4000,
		});

		return data.user;
        
	} catch (error) {
		handleErrors(error);
	}
}

export async function validateCookie() {
    try {
        const response = await axios.get('http://localhost:8080/api/auth/validate-cookie', {
            withCredentials: true
        });

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