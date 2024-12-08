import { describe, expect, test } from "vitest";

import * as Mod from ".";
import Example from "./input/example.txt?raw";
import PuzzleInput from "./input/input.json";

describe("Day 2: Red-Nosed Reports", () => {
  test("Indicates 2 reports - first and last - are safe in example", () => {
    const results = Mod.reportSafety(Example);

    expect(results.filter(Boolean)).to.have.length(2);
    expect(results[0]).to.equal(true);
    expect(results[results.length - 1]).to.equal(true);
  });

  test("With problem dampening", () => {
    const results = Mod.reportSafety(Example, { dampen: true });
    expect(results.filter(Boolean)).to.have.length(4);
    [0, 3, 4, 5].forEach((i) => {
      expect(results[i]).to.equal(true);
    });
  });

  test("Puzzle results", () => {
    console.log("PUZZLE RESULTS");

    // TODO Report vite bug? Or no, is that expected behavior of import statement? (not parsing JSON if string blob (not an object or array))
    const unescaped = JSON.parse(PuzzleInput) as unknown;

    if (typeof unescaped !== "string") {
      throw new Error("parsing fell down");
    }

    console.log(unescaped.split("\n").length);

    console.log("Part 1: ", Mod.reportSafety(unescaped).filter(Boolean).length);
    console.log(
      "Part 2: ",
      Mod.reportSafety(unescaped, { dampen: true }).filter(Boolean).length
    );
  });
});
