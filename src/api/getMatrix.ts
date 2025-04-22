import axios, { AxiosResponse } from 'axios';
import { convertTextToMatrix, spiral } from '../utils/matrix';

export async function getMatrix(url: string): Promise<number[]> {
  try {
    const response: AxiosResponse<string> = await axios.get(url, {
      responseType: 'text',
    });

    const text = response.data;

    if (typeof text !== 'string' || !text.trim()) {
      console.error('Invalid data format: expected a non-empty text');
      return [];
    }

    const rows = convertTextToMatrix(text);

    if (!rows.every(row => row.length === rows.length)) {
      console.error('Matrix is not square');
      return [];
    }

    return spiral(rows);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        const status = err.response.status;
        console.error(`Server error: ${status} - ${err.response.statusText}`);

        if (status >= 500 && status < 600) {
          console.warn("Server error, please try again later.");
        }
      } else if (err.request) {
        console.error('No response received:', err.message);
      } else {
        console.error('Error setting up request:', err.message);
      }
    } else {
      console.error('Unexpected error:', err);
    }

    return [];
  }
}