import { convertTextToMatrix, spiral } from "../src/utils/matrix";

describe('convertTextToMatrix', () => {
  it('returns empty array for empty text', () => {
    const text = '';
    const result = convertTextToMatrix(text);
    expect(result).toEqual([]);
  });

  it('parses matrix text correctly', () => {
    const text = `
      | 1 | 2 | 3 |
      | 4 | 5 | 6 |
      | 7 | 8 | 9 |
    `;
    const result = convertTextToMatrix(text);
    expect(result).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });
});

describe('spiral', () => {
  it('returns empty array for empty matrix', () => {
    const result = spiral([]);
    expect(result).toEqual([]);
  });

  it('returns numbers in counter-clockwise spiral order', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const result = spiral(matrix);
    expect(result).toEqual([
      1, 4, 7, 8, 9, 6, 3, 2, 5
    ]);
  });
});
