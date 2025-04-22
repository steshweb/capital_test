import axios, { AxiosResponse } from 'axios';

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

function convertTextToMatrix(text: string): number[][] {
  const lines = text.trim().split('\n');
  const cleanedLines = lines.filter(line => !line.includes('+') && line.includes('|'))
    .map(line => line.trim());

  const rows = cleanedLines.map(line => {
    const numbers = line.split(/\s*\|\s*/).filter(Boolean).map(Number);
    return numbers;
  });

  return rows;
}

function spiral(matrix: number[][]): number[] {
  const result: number[] = [];

  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix.length - 1;

  while (top <= bottom && left <= right) {
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][left]);
    };
    left++;

    for (let i = left; i <= right; i++) {
      result.push(matrix[bottom][i]);
    }
    bottom--;

    for (let i = bottom; i >= top; i--) {
      result.push(matrix[i][right]);
    }
    right--;

    for (let i = right; i >= left; i--) {
      result.push(matrix[top][i]);
    }
    top++;
  }

  return result;
}