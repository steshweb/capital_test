import { getMatrix } from './api/getMatrix';

const SOURCE_URL = 'https://raw.githubusercontent.com/Real-Estate-THE-Capital/js-assignment/main/matrix.txt';
const TRAVERSAL = [
  10, 50, 90, 130,
  140, 150, 160, 120,
  80, 40, 30, 20,
  60, 100, 110, 70
];

getMatrix(SOURCE_URL)
  .then(result => {
    console.log(JSON.stringify(result) === JSON.stringify(TRAVERSAL)
      ? '✅ Тест пройдено!'
      : '❌ Тест не пройдено!');
  })
  .catch(err => {
    console.error('Помилка виконання:', err);
  });
