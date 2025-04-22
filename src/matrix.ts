import axios, { AxiosResponse } from 'axios';

export async function getMatrix(url: string): Promise<number[]> {
  try {
    const response: AxiosResponse<string> = await axios.get(url, {
      responseType: 'text',
    });

    const text = response.data;

    const lines = text.trim().split('\n');
    const cleanedLines = lines.filter(line => !line.includes('+') && line.includes('|'))
      .map(line => line.trim());

    const rows = cleanedLines.map(line => {
      const numbers = line.split(/\s*\|\s*/).filter(Boolean).map(Number);
      return numbers;
    });

    if (!rows.every(row => row.length === rows.length)) {
      console.error('Matrix is not square');
      return [];
    }

    return spiral(rows);
  } catch (err) {
    console.error('An error:', err);
    return [];
  }
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