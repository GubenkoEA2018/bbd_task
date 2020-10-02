// Core
import { toast } from 'react-toastify';

// Styles
import styles from './styles.module.scss';

// Types

export const configureToast = (): void =>
  toast.configure({
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

export const toastService = {
  success(msg: string): void {
    toast.success(msg, {
      className: styles.Success,
    });
  },
  error(msg: string): void {
    toast.error(msg, {
      className: styles.Error,
    });
  },
};
