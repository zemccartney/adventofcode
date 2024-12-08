import { describe, expect, test } from "vitest";

import * as Mod from ".";

import Example from "./input/example.txt?raw";
import Example2 from "./input/example2.txt?raw";
import PuzzleInput from "./input/input.txt?raw";

describe("Day 3: Mull It Over", () => {
  test("Extracts valid mul statements from corrupted memory", () => {
    expect(Mod.mulIt(Example)).to.equal(161);
  });

  test("Handles conditional statements in instruction extraction", () => {
    expect(Mod.mulIt(Example2, { withConditionals: true })).to.equal(48);
  });

  test("Puzzle results", () => {
    console.log("PUZZLE RESULTS");

    console.log("Part 1: ", Mod.mulIt(PuzzleInput));
    console.log("Part 2: ", Mod.mulIt(PuzzleInput, { withConditionals: true }));
  });
});
