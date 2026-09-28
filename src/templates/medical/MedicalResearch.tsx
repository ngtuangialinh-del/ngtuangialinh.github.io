import { Box, Flex, Grid, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { LuAward, LuBeaker, LuMicroscope } from "react-icons/lu";

import SectionShell from "../../components/shared/SectionShell";
import EditorialFigure from "../../components/shared/EditorialFigure";
import { editorialIllustrations } from "../../data/illustrations";
import { researchProject } from "../../data/research";
import { sectionCopy } from "../../data/sectionCopy";

export function MedicalResearch() {
  const copy = sectionCopy.research;

  return (
    <SectionShell
      id="research"
      eyebrow={copy.eyebrow}
      title={copy.title}
      intro={copy.intro}
      maxW="1180px"
    >
      <Grid
        templateColumns={{ base: "1fr", lg: "1.02fr .98fr" }}
        gap={5}
        alignItems="stretch"
      >
        <Box
          bg="var(--brand-800)"
          color="#fff"
          borderRadius="lg"
          p={{ base: 6, md: 8 }}
          boxShadow="var(--shadow-md)"
          className="reveal-up delay-1"
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={5}
            justify="space-between"
          >
            <Box maxW="760px">
              <Text className="field-code" color="#c4e9e2">
                Research project · {researchProject.year}
              </Text>
              <Flex
                mt={3}
                gap={2}
                align="center"
                color="#fff3bf"
                fontWeight={800}
                data-testid="research-recognition"
              >
                <LuAward aria-hidden="true" />
                <Text>
                  {researchProject.recognition.award} ·{" "}
                  {researchProject.recognition.event}
                </Text>
              </Flex>
              <Text
                mt={3}
                fontSize={{ base: "xl", md: "2xl" }}
                lineHeight="1.35"
                fontWeight={800}
              >
                {researchProject.title}
              </Text>
            </Box>
            <Flex
              w="52px"
              h="52px"
              flex="0 0 auto"
              borderRadius="md"
              bg="rgba(255,255,255,.1)"
              align="center"
              justify="center"
            >
              <LuMicroscope size={27} />
            </Flex>
          </Flex>
          <Text mt={6} color="rgba(255,255,255,.78)" lineHeight="1.75">
            <strong>Research question:</strong> {researchProject.question}
          </Text>
          <Text mt={3} color="rgba(255,255,255,.72)" fontSize="sm">
            {researchProject.recognition.attribution} ·{" "}
            {researchProject.recognition.date}
          </Text>
        </Box>
        <Box className="reveal-up delay-2">
          <EditorialFigure
            illustration={editorialIllustrations.research}
            aspectRatio="3 / 2"
            objectPosition="center"
          />
        </Box>
      </Grid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={5} mt={5}>
        <Box
          bg="var(--surface)"
          border="1px solid"
          borderColor="var(--border-soft)"
          borderRadius="lg"
          p={6}
          boxShadow="var(--shadow-sm)"
        >
          <Flex gap={3} align="center" mb={5}>
            <LuBeaker color="var(--brand-200)" size={22} />
            <Text fontWeight={800}>Method overview</Text>
          </Flex>
          <VStack align="stretch" gap={4}>
            {researchProject.methods.map((method, index) => (
              <Flex key={method} gap={3} align="flex-start">
                <Text className="field-code" color="var(--brand-200)">
                  {String(index + 1).padStart(2, "0")}
                </Text>
                <Text color="var(--text-muted)" lineHeight="1.65">
                  {method}
                </Text>
              </Flex>
            ))}
          </VStack>
        </Box>
        <Box
          bg="var(--surface)"
          border="1px solid"
          borderColor="var(--border-soft)"
          borderRadius="lg"
          p={6}
          boxShadow="var(--shadow-sm)"
        >
          <Flex gap={3} align="center" mb={5}>
            <LuMicroscope color="var(--blue-500)" size={22} />
            <Text fontWeight={800}>Reported measurements</Text>
          </Flex>
          <SimpleGrid columns={{ base: 1, sm: 2 }} gap={3}>
            {researchProject.reportedResults.map((result) => (
              <Box
                key={result.subjectOrLabel}
                p={4}
                bg="var(--surface-subtle)"
                borderRadius="md"
              >
                <Text className="field-code" color="var(--text-muted)">
                  {result.subjectOrLabel}
                </Text>
                <Text mt={2} fontSize="lg" fontWeight={800}>
                  {result.value}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </SimpleGrid>
    </SectionShell>
  );
}

export default MedicalResearch;
