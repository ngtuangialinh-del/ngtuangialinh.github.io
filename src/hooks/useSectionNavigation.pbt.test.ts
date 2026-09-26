import fc from "fast-check";
import { describe, expect, it } from "vitest";

import { navDestinations } from "../data/navigation";
import {
  malformedHashArbitrary,
  sectionIdArbitrary,
  validHashArbitrary,
} from "../test/generators";
import { hashForSectionId, resolveCanonicalHash, sectionIdFromHash } from "./useSectionNavigation";

describe("resolveCanonicalHash (BR-1 properties)", () => {
  it("is idempotent: applying it twice equals applying it once", () => {
    fc.assert(
      fc.property(fc.oneof(validHashArbitrary, malformedHashArbitrary), (hash) => {
        const once = resolveCanonicalHash(hash);
        const twice = resolveCanonicalHash(once);

        expect(twice).toBe(once);
      }),
    );
  });

  it("round-trips every valid canonical hash to itself", () => {
    fc.assert(
      fc.property(validHashArbitrary, (hash) => {
        expect(resolveCanonicalHash(hash)).toBe(hash);
      }),
    );
  });

  it("maps every malformed/unknown hash to the canonical Introduction hash", () => {
    fc.assert(
      fc.property(malformedHashArbitrary, (hash) => {
        expect(resolveCanonicalHash(hash)).toBe(navDestinations[0].hash);
      }),
    );
  });

  it("always resolves to exactly one of the eight canonical destinations", () => {
    fc.assert(
      fc.property(fc.oneof(validHashArbitrary, malformedHashArbitrary), (hash) => {
        const resolved = resolveCanonicalHash(hash);

        expect(
          navDestinations.some((destination) => destination.hash === resolved),
        ).toBe(true);
      }),
    );
  });

  it("round-trips every section id through its canonical hash", () => {
    fc.assert(
      fc.property(sectionIdArbitrary, (sectionId) => {
        expect(sectionIdFromHash(hashForSectionId(sectionId))).toBe(sectionId);
      }),
      { seed: 20260919 },
    );
  });
});
