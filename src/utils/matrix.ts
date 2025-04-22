export function convertTextToMatrix(text: string): number[][] {
  const lines = text.trim().split('\n');
  const cleanedLines = lines.filter(line => !line.includes('+') && line.includes('|'))
    .map(line => line.trim());

  const rows = cleanedLines.map(line => {
    const numbers = line.split(/\s*\|\s*/).filter(Boolean).map(Number);
    return numbers;
  });

  return rows;
}

export function spiral(matrix: number[][]): number[] {
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