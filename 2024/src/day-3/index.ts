// https://stackoverflow.com/a/56950384
type Match =
  | {
      op: string;
      opA: string;
      opB: string;
      cond: undefined;
      toggle: undefined;
    }
  | {
      op: undefined;
      opA: undefined;
      opB: undefined;
      cond: string;
      toggle: string;
    };

export function mulIt(
  memory: string,
  { withConditionals = false } = {}
): number {
  const results = memory.matchAll(
    /(?<op>mul\((?<opA>\d{1,3}),(?<opB>\d{1,3})\))|(?<cond>(?<toggle>do(n't)?)\(\))/g
  );

  let sum = 0;
  let enabled = true;

  for (const match of results) {
    const groups: Match = match.groups as unknown as Match;
    if (typeof groups.cond === "string") {
      const { toggle } = groups;
      if (withConditionals) {
        enabled = toggle === "do" ? true : false;
      }
    } else {
      const { opA, opB } = groups;
      if (enabled) {
        sum += parseInt(opA, 10) * parseInt(opB, 10);
      }
    }
  }

  return sum;
}
