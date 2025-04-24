import axios from 'axios';
import { showToastMsg } from './show-toast-msg';

export function handleErrors(error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data.errors) {
        const { errors } = error.response.data;

        errors.forEach((error: { msg: string; message: string }) => {
            showToastMsg({
                msg: error.msg || error.message,
                type: "error",
                position: "bottom-left",
                autoClose: 8000,
            });
        });
    } else if ( axios.isAxiosError(error) && error.response?.data.name.startsWith("Sequelize")) {
        showToastMsg({
            msg: "Database error",
            type: "error",
            position: "bottom-left",
            autoClose: 8000,
        });
    } else if (axios.isAxiosError(error) && error.message) {
        showToastMsg({
            msg: error.message,
            type: "error",
            position: "bottom-left",
            autoClose: 8000,
        });
    } else {
        showToastMsg({
            msg: 'Unexpected error',
            type: "error",
            position: "bottom-left",
            autoClose: 8000,
        });
        console.log(error);
    }
}
