const horizontalRight = (x: number, y: number, grid: string[][]) =>
  Array.from({ length: 4 }, (_, i) => grid[y]?.[x + i])
    .filter(Boolean)
    .join("");
const horizontalLeft = (x: number, y: number, grid: string[][]) =>
  Array.from({ length: 4 }, (_, i) => grid[y]?.[x - i])
    .filter(Boolean)
    .join("");
const verticalUp = (x: number, y: number, grid: string[][]) =>
  Array.from({ length: 4 }, (_, i) => grid[y + i]?.[x])
    .filter(Boolean)
    .join("");
const verticalDown = (x: number, y: number, grid: string[][]) =>
  Array.from({ length: 4 }, (_, i) => grid[y - i]?.[x])
    .filter(Boolean)
    .join("");
const diagonalUpLeft = (x: number, y: number, grid: string[][]) =>
  Array.from({ length: 4 }, (_, i) => grid[y + i]?.[x - i])
    .filter(Boolean)
    .join("");
const diagonalUpRight = (x: number, y: number, grid: string[][]) =>
  Array.from({ length: 4 }, (_, i) => grid[y + i]?.[x + i])
    .filter(Boolean)
    .join("");
const diagonalDownLeft = (x: number, y: number, grid: string[][]) =>
  Array.from({ length: 4 }, (_, i) => grid[y - i]?.[x - i])
    .filter(Boolean)
    .join("");
const diagonalDownRight = (x: number, y: number, grid: string[][]) =>
  Array.from({ length: 4 }, (_, i) => grid[y - i]?.[x + i])
    .filter(Boolean)
    .join("");

const finders = [
  horizontalRight,
  horizontalLeft,
  verticalUp,
  verticalDown,
  diagonalUpLeft,
  diagonalUpRight,
  diagonalDownLeft,
  diagonalDownRight
];

const toGrid = (crossword: string): string[][] =>
  crossword.split("\n").map((row) => row.split(""));

export function findXmases(crossword: string): number {
  let count = 0;
  const grid = toGrid(crossword);

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      if (row[x] === "X") {
        const matches = finders
          .map((f) => f(x, y, grid))
          .filter((word) => word === "XMAS").length;
        count += matches;
      }
    }
  }

  return count;
}

export function findMasXs(crossword: string): number {
  let count = 0;
  const grid = toGrid(crossword);

  // avoiding duplicate counts
  // 3 x 3 grid
  // starts with M or S
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      if (["S", "M"].includes(row[x])) {
        // middle has to be A
        // corners have to be inverses of each other, must be either M or S
        const center = grid[y + 1]?.[x + 1];
        if (center === "A") {
          const corners = [
            // order: tl, tr, bl, br
            grid[y][x],
            grid[y][x + 2],
            grid[y + 2]?.[x] || "",
            grid[y + 2]?.[x + 2] || ""
          ];

          if (corners.every((letter) => ["S", "M"].includes(letter))) {
            // count if
            // the center of our 3x3 grid is an A
            // the corners are all Ss or Ms
            // opposite corners don't match each other
            // Taken together, these checks should mean our 3x3 grid is 2 MASs in the shape of an X
            count +=
              corners[0] !== corners[3] && corners[1] !== corners[2] ? 1 : 0;
          }
        }
      }
    }
  }

  return count;
}
