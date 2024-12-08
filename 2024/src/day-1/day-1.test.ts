import { describe, expect, test } from "vitest";

import * as Mod from ".";
import Example from "./input/example.txt?raw";
import PuzzleInput from "./input/puzzle-input.txt?raw";

const formatInput = (input: string): [number[], number[]] => {
  const left: number[] = [];
  const right: number[] = [];

  input.split("\n").forEach((set) => {
    set
      .split("   ")
      .filter((ln) => ln.length > 0) // prettier adding empty line
      .forEach((x, i) =>
        i === 0 ? left.push(parseInt(x, 10)) : right.push(parseInt(x, 10))
      );
  });

  return [left, right];
};

describe("Day 1: Historian Hysteria", () => {
  test("list distance is 11", () => {
    const [leftList, rightList] = formatInput(Example);
    expect(Mod.distance(leftList, rightList)).to.equal(11);
  });

  test("list similarity score is 31", () => {
    const [leftList, rightList] = formatInput(Example);
    expect(Mod.similarityScore(leftList, rightList)).to.equal(31);
  });

  test("Puzzle results", () => {
    console.log("PUZZLE RESULTS");
    const [leftList, rightList] = formatInput(PuzzleInput);
    console.log("Part 1: ", Mod.distance(leftList, rightList));
    console.log("Part 2: ", Mod.similarityScore(leftList, rightList));
  });
});
