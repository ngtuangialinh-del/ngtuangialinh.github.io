import { Box, Text } from "@chakra-ui/react";

import type { LabeledScore, ScoreGroup } from "../../types/medical";
import { resolveScoreDisplay } from "./resolveScoreDisplay";

/**
 * BR-2: score context is provided by either the row's concise note or the
 * parent group's scale description, without repeating long bracketed copy.
 */
export function ScoreDisplay({
  score,
  fallbackScaleNote,
}: {
  score: LabeledScore;
  fallbackScaleNote?: string;
}) {
  const { scaleNote } = resolveScoreDisplay(score, fallbackScaleNote);

  return (
    <Box data-testid={`score-${score.subjectOrLabel}`}>
      <Text as="span" fontWeight={700} color="var(--text-100)">
        {score.subjectOrLabel}:{" "}
      </Text>
      <Text as="span" fontWeight={700} color="var(--accent-300)">
        {score.value}
      </Text>
      {scaleNote ? (
        <Text as="span" fontSize="sm" color="var(--text-300)">
          {" · "}
          {scaleNote}
        </Text>
      ) : null}
    </Box>
  );
}

export function ScoreGroupDisplay({ group }: { group: ScoreGroup }) {
  return (
    <Box data-testid={`score-group-${group.label}`}>
      <Text fontWeight={700} mb={1} color="var(--text-100)">
        {group.label}
      </Text>
      <Text fontSize="xs" color="var(--text-400, gray.500)" mb={2}>
        {group.scaleDescription}
      </Text>
      {group.entries.map((entry) => (
        <ScoreDisplay key={entry.subjectOrLabel} score={entry} />
      ))}
    </Box>
  );
}

export default ScoreDisplay;
