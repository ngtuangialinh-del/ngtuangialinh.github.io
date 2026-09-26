import fc from "fast-check";

import { navDestinations } from "../data/navigation";
import type { LabeledScore, ScoreGroup, SectionId } from "../types/medical";

const canonicalSectionIds = navDestinations.map(
  (destination) => destination.id,
) as [SectionId, ...SectionId[]];

/** Reusable domain generators for fast-check PBT suites (MSP-NFR-09). */
export const sectionIdArbitrary: fc.Arbitrary<SectionId> = fc.constantFrom(
  ...canonicalSectionIds,
);

export const validHashArbitrary: fc.Arbitrary<string> = fc.constantFrom(
  ...navDestinations.map((destination) => destination.hash),
);

export const malformedHashArbitrary: fc.Arbitrary<string> = fc
  .string()
  .filter(
    (value) =>
      !navDestinations.some((destination) => destination.hash === value),
  );

export const labeledScoreArbitrary: fc.Arbitrary<LabeledScore> = fc.record({
  subjectOrLabel: fc.string({ minLength: 1, maxLength: 40 }),
  value: fc.string({ minLength: 1, maxLength: 10 }),
  scaleNote: fc.option(fc.string({ minLength: 1, maxLength: 40 }), {
    nil: undefined,
  }),
});

export const scoreGroupArbitrary: fc.Arbitrary<ScoreGroup> = fc.record({
  label: fc.string({ minLength: 1, maxLength: 40 }),
  scaleDescription: fc.string({ minLength: 1, maxLength: 60 }),
  entries: fc.array(labeledScoreArbitrary, { minLength: 1, maxLength: 8 }),
});
