import axios from "axios";
import { showToastMsg } from "./show-toast-msg";

//Funcion para manejar en el catch los errores
export function handleErrors(error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data.error) {
        const errorMessage = error?.response?.data?.error || "An unexpected error occurred";

        showToastMsg({
            message: errorMessage, 
            type: "error",
        });
    } else if (axios.isAxiosError(error) && error.response?.data.errors) {
        error.response?.data?.errors.forEach((err: { msg: string }) => { 

        showToastMsg({
            message: err.msg,
            type: "error"
        });
    });
    } else {
        showToastMsg({
            message: "Non-Axios error or network issue:",
            type: "error"
        });
    }
}