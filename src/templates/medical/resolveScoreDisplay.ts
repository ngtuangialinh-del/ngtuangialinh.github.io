import type { LabeledScore } from "../../types/medical";

/**
 * BR-2 (pure, testable form): pair a score's value with a resolved scale
 * note. Idempotent — resolving an already-resolved score is a no-op.
 */
export function resolveScoreDisplay(
  score: LabeledScore,
  fallbackScaleNote?: string,
): { value: string; scaleNote?: string } {
  return {
    value: score.value,
    scaleNote: score.scaleNote ?? fallbackScaleNote,
  };
}
