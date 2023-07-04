import { toast } from 'react-toastify';

export const notify = {
  success: (message: string) => toast.success(message, { position: 'bottom-center' }),
  error: (message: string) => toast.error(message, { position: 'bottom-center' }),
};
