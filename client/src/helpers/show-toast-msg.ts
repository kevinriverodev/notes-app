import { ToastPosition, toast, Theme } from "react-toastify";

type ToastType = "success" | "error" | "info" | "warn";

export interface ToastMsgProps {
    message: string;
    type?: ToastType;
    position?: ToastPosition;
    autoClose?: number; 
    theme?: Theme;
}

export function showToastMsg({ message, type = "info", position = "bottom-left", autoClose = 5000, theme = "light" }: ToastMsgProps) {
    return toast[type](message, {
        position,
        autoClose,
        theme,
    });
}