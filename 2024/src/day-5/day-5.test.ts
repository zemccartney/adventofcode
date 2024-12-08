import { describe, expect, test } from "vitest";

import * as Mod from ".";

import Example from "./input/example.txt?raw";
import PuzzleInput from "./input/input.txt?raw";

const formatManifest = (
  manifest: string
): { rules: number[][]; updates: number[][] } => {
  const [rulesSection, updatesSection] = manifest
    .split(/\s+\n/)
    .map((section) => section.split("\n").filter((ln) => ln.length !== 0));

  return {
    rules: rulesSection.map((rule) =>
      rule.split("|").map((n) => parseInt(n, 10))
    ),
    updates: updatesSection.map((update) =>
      update.split(",").map((n) => parseInt(n, 10))
    )
  };
};

describe("Day 5: Print Queue", () => {
  test("Calculates the sum of middle numbers of correctly-ordered safety manual updates", () => {
    const manifest = formatManifest(Example);
    const [sumCorrect, sumIncorrect] = Mod.analyzeUpdates(manifest);
    expect(sumCorrect).to.equal(143);
    expect(sumIncorrect).to.equal(123);
  });

  test("Puzzle results", () => {
    console.log("PUZZLE RESULTS");

    const m1 = formatManifest(PuzzleInput);
    const [sumCorrect, sumIncorrect] = Mod.analyzeUpdates(m1);
    console.log("Part 1: ", sumCorrect);
    console.log("Part 2: ", sumIncorrect);
  });
});
