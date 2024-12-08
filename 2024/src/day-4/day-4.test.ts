import { describe, expect, test } from "vitest";

import * as Mod from ".";

import Example from "./input/example.txt?raw";
import PuzzleInput from "./input/input.txt?raw";

describe("Day 4: Ceres Search", () => {
  test("Finds instances of XMAS in the given crossword", () => {
    expect(Mod.findXmases(Example)).to.equal(18);
  });

  test("Finds MAS xs in the given crossword", () => {
    expect(Mod.findMasXs(Example)).to.equal(9);
  });

  test("Puzzle results", () => {
    console.log("PUZZLE RESULTS");

    console.log("Part 1: ", Mod.findXmases(PuzzleInput));
    console.log("Part 2: ", Mod.findMasXs(PuzzleInput));
  });
});
