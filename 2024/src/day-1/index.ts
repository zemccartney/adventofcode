// assumes lists are same length; need to handle if not?
export function distance(a: number[], b: number[]) {
  const aSorted = a.toSorted();
  const bSorted = b.toSorted();

  let sum = 0;
  for (let i = 0; i < aSorted.length; i++) {
    sum += Math.abs(aSorted[i] - bSorted[i]);
  }

  return sum;
}

export function similarityScore(a: number[], b: number[]): number {
  const unique = new Set(a);
  const scores = new Map<number, number>();

  for (const n of unique) {
    scores.set(n, n * b.filter((x) => x === n).length);
  }

  let score = 0;
  for (const n of a) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    score += scores.get(n)!;
  }

  return score;
}
