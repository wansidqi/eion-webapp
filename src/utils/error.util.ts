import { AxiosError } from 'axios';

export function ErrorResponseData(error: AxiosError) {
  return error.response?.data as { success: boolean; error?: string | { [key: string]: string }; message?: string };
}
