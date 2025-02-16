import { describe, expect, test } from "vitest";

import * as Mod from ".";

import Example from "./input/example.txt?raw";
import PuzzleInput from "./input/input.txt?raw";

describe.only("Day 6: Guard Gallivant", () => {
  test("Calculates the distinct positions visited by the guard", () => {
    expect(Mod.countGuardPositions(Example)).to.equal(41);
  });

  test("Puzzle results", () => {
    console.log("PUZZLE RESULTS");

    console.log("Part 1: ", Mod.countGuardPositions(PuzzleInput));
    console.log("Part 2: ");
  });
});
