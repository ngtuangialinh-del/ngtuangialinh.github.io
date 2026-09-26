import fc from "fast-check";
import { describe, expect, it } from "vitest";

import { labeledScoreArbitrary } from "../../test/generators";
import { resolveScoreDisplay } from "./resolveScoreDisplay";

describe("resolveScoreDisplay (BR-2 properties)", () => {
  it("never produces a value without an accompanying scale note when one is available", () => {
    fc.assert(
      fc.property(
        labeledScoreArbitrary,
        fc.string({ minLength: 1, maxLength: 40 }),
        (score, fallbackScaleNote) => {
          const resolved = resolveScoreDisplay(score, fallbackScaleNote);

          expect(resolved.value).toBe(score.value);
          expect(resolved.scaleNote).toBeTruthy();
        },
      ),
    );
  });

  it("is idempotent: resolving an already-resolved score changes nothing", () => {
    fc.assert(
      fc.property(
        labeledScoreArbitrary,
        fc.string({ minLength: 1, maxLength: 40 }),
        (score, fallbackScaleNote) => {
          const once = resolveScoreDisplay(score, fallbackScaleNote);
          const twice = resolveScoreDisplay(
            { subjectOrLabel: score.subjectOrLabel, ...once },
            fallbackScaleNote,
          );

          expect(twice).toEqual(once);
        },
      ),
    );
  });
});
