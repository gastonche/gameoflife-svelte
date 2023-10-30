const DIMENSION = 100;

function rand(max = DIMENSION / 4) {
  return Math.floor(Math.random() * max);
}

export function emptyGrid() {
  return Array.from({ length: DIMENSION }, () => Array(DIMENSION).fill(0));
}

function makeRandomSquareGenerator() {
  const squares: Record<string, true> = {};

  return (max: number) => {
    let [i, j] = [-1, -1];
    do {
      [i, j] = [rand(max), rand(max)];
    } while (squares[`${i}-${j}`]);
    squares[`${i}-${j}`] = true;
    return [i, j];
  };
}

export function initialGrid() {
  const array = emptyGrid();
  let squares = 1000;
  const generate = makeRandomSquareGenerator();
  while (squares > 0) {
    const [i, j] = generate(DIMENSION);
    array[i][j] = 1;
    squares--;
  }
  return array;
}
