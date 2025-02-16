type Guard = "^" | ">" | "v" | "<";

const guardDirections = new Map<Guard, [number, number]>([
  ["^", [0, -1]],
  [">", [1, 0]],
  ["v", [0, 1]],
  ["<", [-1, 0]]
]);

const obstacleRotations: Record<Guard, Guard> = {
  "^": ">",
  ">": "v",
  v: "<",
  "<": "^"
};

const serializeCoord = (x: number, y: number) => `${x}, ${y}`;

export function countGuardPositions(mapRaw: string): number {
  const map = mapRaw
    .split("\n")
    .filter((ln) => ln.length > 0) // prettier adding empty line
    .map((ln) => ln.split(""));

  const visited: Set<string> = new Set<string>();
  let guardPosition: { direction: Guard; coords: [number, number] } | null =
    null;

  for (let y = 0; y < map.length; y++) {
    const row = map[y];
    for (let x = 0; x < row.length; x++) {
      const cell = map[y][x];
      const guardShapes = Array.from(guardDirections.keys());
      if (guardShapes.includes(cell)) {
        guardPosition = {
          // necessary since includes isn't a type guard
          // discussed here: https://github.com/mattpocock/ts-reset/pull/130, though
          // didn't totally understand
          direction: cell as Guard,
          coords: [x, y]
        };
        visited.add(serializeCoord(x, y));
        break;
      }
    }
  }

  /*
    Odd TS behavior: I originally factored the above for-loop as a find()
    with calls to findIndex on the rows. TS complained about the following was
    unnecessary, claiming guardPosition had never been reassigned and was still null
    Not sure what to make of this, if my work were wrong or if TS couldn't see
    how find was being used (granted, oddly)
  */
  if (guardPosition === null) {
    return 0;
  }

  // TODO How would you detect if a guard is stuck? I believe
  // possible a guard could end up in an enclosure i.e. arrangement
  // of obstacles such that, by only turning right at an obstacle,
  // the guard would never leave the enclosure, only ever looping around

  let inBounds = true;

  while (inBounds) {
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    const nextMove = guardDirections.get(guardPosition.direction)!;
    const target =
      map[guardPosition.coords[1] + nextMove[1]]?.[
        guardPosition.coords[0] + nextMove[0]
      ];

    if (target === undefined) {
      inBounds = false;
    } else {
      if (target === "#") {
        guardPosition.direction = obstacleRotations[guardPosition.direction];
      } else {
        const x = guardPosition.coords[0] + nextMove[0];
        const y = guardPosition.coords[1] + nextMove[1];
        guardPosition.coords = [x, y];
        visited.add(serializeCoord(x, y));
      }
    }
  }

  return visited.size;
}
