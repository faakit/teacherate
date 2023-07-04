import axios from 'axios';
import { notify } from './toast';

export const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    notify.error(error.response?.data?.error || 'Ocorreu um erro... 🥺');
  }
};
