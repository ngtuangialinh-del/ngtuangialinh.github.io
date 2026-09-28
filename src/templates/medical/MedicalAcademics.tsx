import { Box, Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import type { CSSProperties } from "react";
import { LuAward, LuGraduationCap } from "react-icons/lu";

import SectionShell from "../../components/shared/SectionShell";
import EditorialFigure from "../../components/shared/EditorialFigure";
import { academics } from "../../data/academics";
import { editorialIllustrations } from "../../data/illustrations";
import { sectionCopy } from "../../data/sectionCopy";
import type { ScoreGroup } from "../../types/medical";
import { ScoreDisplay } from "./ScoreDisplay";

function AcademicGroup({ group }: { group: ScoreGroup }) {
  return (
    <Box
      bg="var(--surface)"
      border="1px solid"
      borderColor="var(--border-soft)"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="var(--shadow-sm)"
      data-testid={`score-group-${group.label}`}
    >
      <Box
        px={5}
        py={4}
        minH="7rem"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap={1}
        bg="var(--surface-subtle)"
        borderBottom="1px solid"
        borderColor="var(--border-soft)"
        data-testid={`score-group-header-${group.label}`}
      >
        <Text fontWeight={800} color="var(--text-strong)">
          {group.label}
        </Text>
        <Text fontSize="sm" color="var(--text-muted)">
          {group.scaleDescription}
        </Text>
      </Box>
      <VStack align="stretch" gap={0} p={5}>
        {group.entries.map((entry) => (
          <Box
            key={entry.subjectOrLabel}
            py={2.5}
            borderBottom="1px solid"
            borderColor="var(--border-soft)"
            _last={{ borderBottom: 0 }}
          >
            <ScoreDisplay score={entry} />
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export function MedicalAcademics() {
  const copy = sectionCopy.academics;
  return (
    <SectionShell
      id="academics"
      eyebrow={copy.eyebrow}
      title={copy.title}
      intro={copy.intro}
      backgroundClassName="section-surface--alternate"
      maxW="1180px"
    >
      <Box mb={6} className="reveal-up delay-1">
        <EditorialFigure
          illustration={editorialIllustrations.academics}
          aspectRatio="16 / 6"
          objectPosition="center 52%"
        />
      </Box>
      <SimpleGrid
        columns={{ base: 1, md: 2, xl: 3 }}
        gap={5}
        className="reveal-up delay-1"
      >
        <AcademicGroup group={academics.gpaSummary} />
        <AcademicGroup group={academics.aLevels} />
        <AcademicGroup group={academics.igcse} />
        <AcademicGroup group={academics.ielts} />
        <AcademicGroup group={academics.grade12} />
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap={5}
        mt={5}
        className="reveal-up delay-2"
      >
        <Box
          bg="var(--surface)"
          border="1px solid"
          borderColor="var(--border-soft)"
          borderRadius="lg"
          p={6}
          boxShadow="var(--shadow-sm)"
        >
          <Flex gap={3} align="center" mb={4}>
            <LuAward color="var(--brand-200)" size={22} />
            <Text fontWeight={800} color="var(--text-strong)">
              Academic recognition
            </Text>
          </Flex>
          <VStack align="stretch" gap={3}>
            {academics.recognitions.map((recognition) => (
              <Flex key={recognition} gap={3} align="flex-start">
                <Box
                  mt="9px"
                  w="6px"
                  h="6px"
                  borderRadius="full"
                  bg="var(--brand-500)"
                  flex="0 0 auto"
                />
                <Text color="var(--text-muted)">{recognition}</Text>
              </Flex>
            ))}
          </VStack>
        </Box>
        <Box
          bg="var(--brand-800)"
          color="#fff"
          borderRadius="lg"
          p={6}
          boxShadow="var(--shadow-md)"
          style={
            {
              "--text-strong": "#fff",
              "--text-muted": "rgba(255,255,255,.76)",
              "--brand-200": "#c4e9e2",
              "--text-100": "#fff",
              "--text-300": "rgba(255,255,255,.76)",
              "--accent-300": "#c4e9e2",
            } as CSSProperties
          }
        >
          <Flex gap={3} align="center" mb={4}>
            <LuGraduationCap size={24} />
            <Box>
              <Text className="field-code" color="var(--brand-200)">
                Verified milestone
              </Text>
              <Text fontWeight={800} mt={1}>
                Medicine program admission
              </Text>
            </Box>
          </Flex>
          <ScoreDisplay score={academics.admissionScore} />
        </Box>
      </SimpleGrid>
    </SectionShell>
  );
}

export default MedicalAcademics;
