import { emptyGrid } from "./grid";

export function checkGrid(grid: number[][]) {
  const array = emptyGrid();
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      array[i][j] = checkCell(i, j);
    }
  }

  return array;

  function checkCell(i: number, j: number) {
    const cell = grid[i][j];
    const liveNeighbours = [
      grid[i - 1]?.[j - 1],
      grid[i - 1]?.[j],
      grid[i - 1]?.[j + 1],
      grid[i]?.[j - 1],
      grid[i]?.[j + 1],
      grid[i + 1]?.[j - 1],
      grid[i + 1]?.[j],
      grid[i + 1]?.[j + 1],
    ].filter(Boolean).length;

    if(liveNeighbours < 2 || liveNeighbours > 3 || cell === 0 && liveNeighbours === 2) {
        return 0;
    }

    return 1;
  }
}
