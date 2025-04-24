import { ToastPosition, toast } from 'react-toastify';

export interface ToastMsgProps {
  msg: string;
  type: string;
  position: ToastPosition;
  autoClose: number;
  theme?: string;
}

export function showToastMsg({
    msg,
    type,
    position,
    autoClose,
    theme,
}: ToastMsgProps) {
    switch (type) {
        case 'success':
            toast.success(msg, { type, position, autoClose, theme: theme || 'light', });
        break;
        case 'error':
            toast.error(msg, { type, position, autoClose, theme: theme || 'light' });
            break;
        case 'info':
            toast.info(msg, { type, position, autoClose, theme: theme || 'light' });
            break;
        case 'warning':
            toast.warn(msg, { type, position, autoClose, theme: theme || 'light' });
        break;
  }
}
