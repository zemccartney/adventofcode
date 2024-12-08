export function reportSafety(
  reports: string,
  { dampen = false } = {}
): boolean[] {
  return reports
    .split("\n")
    .filter((ln) => ln.length > 0) // prettier adding empty line
    .map((report) => report.split(" ").map((x) => Number.parseInt(x, 10)))
    .map((report) => {
      const isAscending = report[0] - report[report.length - 1] < 0;

      const check = (a: number, b: number) => {
        const diff = b - a;
        const abs = Math.abs(diff);

        return (isAscending ? diff > 0 : diff < 0) && abs > 0 && abs <= 3;
      };

      const findBadLevel = (x: number, i: number, arr: number[]) => {
        const ni = i + 1;
        if (ni === arr.length) {
          return false;
        }

        return !check(x, arr[ni]);
      };

      const badLevelAt = report.findIndex(findBadLevel);

      if (badLevelAt === -1) {
        return true;
      }

      if (dampen) {
        /*
          Not sure exactly why previous implementation, which ran a for loop
          and, on encountering a bad level check, removed the next item and
          kept looping (also tried removing, then restarting)

          Seems like cases where you could fix by removing the current item,
          but not the next?

          9 6 8 6 4 2

          This would fail, I think
          Safe if dampened if you remove the first 6, but NOT if you remove the 8
          i.e. 9 8 6 4 2 is safe, but 9 6 6 4 2 is not
        */
        const branchX = report.toSpliced(badLevelAt, 1).findIndex(findBadLevel);
        const branchY = report
          .toSpliced(badLevelAt + 1, 1)
          .findIndex(findBadLevel);

        return branchX === -1 || branchY === -1;
      }

      return false;
    });
}
