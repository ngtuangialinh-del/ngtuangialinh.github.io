import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  LuArrowRight,
  LuCheck,
  LuDownload,
  LuEye,
  LuStethoscope,
} from "react-icons/lu";

import EditorialFigure from "../../components/shared/EditorialFigure";
import { DocumentPreviewDialog } from "../../components/ui/document-preview-dialog";
import { academics } from "../../data/academics";
import { cvDocument } from "../../data/evidence";
import { identity } from "../../data/identity";
import { editorialIllustrations } from "../../data/illustrations";
import { withBasePath } from "../../utils/media";

const evidenceStats = [
  {
    label: "Grade 12 GPA",
    value: `${academics.gpaSummary.entries[2].value} / 10`,
  },
  {
    label: "A-level results",
    value: academics.aLevels.entries
      .map((entry) => `${entry.subjectOrLabel} ${entry.value}`)
      .join(" · "),
  },
  { label: "Admission score", value: academics.admissionScore.value },
];

export function MedicalHero() {
  const [cvPreviewOpen, setCvPreviewOpen] = useState(false);

  return (
    <Box
      id="introduction"
      as="section"
      tabIndex={-1}
      aria-labelledby="introduction-heading"
      className="hero-bg"
      data-testid="introduction-section"
      pt={{ base: "140px", lg: "164px" }}
      pb={{ base: 20, lg: 28 }}
    >
      <Container maxW="1280px" px={{ base: 4, md: 8 }}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 12, lg: 16 }}
          align="center"
        >
          <VStack align="flex-start" gap={6} flex="1.08" className="reveal-up">
            <HStack gap={2} flexWrap="wrap">
              <Box
                as="span"
                className="field-code"
                px={3}
                py={1.5}
                borderRadius="full"
                bg="var(--active-bg)"
                border="1px solid"
                borderColor="var(--border-strong)"
                color="var(--brand-200)"
              >
                Incoming medical student · 2026
              </Box>
              <Box
                as="span"
                className="field-code"
                px={3}
                py={1.5}
                borderRadius="full"
                bg="var(--surface)"
                border="1px solid"
                borderColor="var(--border-soft)"
                color="var(--text-muted)"
              >
                Hanoi, Vietnam
              </Box>
            </HStack>
            <Box>
              <Text className="field-code" color="var(--blue-500)" mb={3}>
                Medicine begins with curiosity, evidence, and service
              </Text>
              <Heading
                id="introduction-heading"
                as="h1"
                className="editorial-font"
                fontSize={{ base: "4xl", sm: "5xl", md: "6xl", xl: "7xl" }}
                lineHeight="1.02"
                letterSpacing="-.04em"
                maxW="13ch"
                color="var(--text-strong)"
              >
                {identity.name}
              </Heading>
              <Text
                mt={4}
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight={600}
                color="var(--brand-200)"
              >
                {identity.statusStatement}
              </Text>
            </Box>
            <Text
              maxW="680px"
              color="var(--text-muted)"
              fontSize={{ base: "md", md: "lg" }}
              lineHeight="1.8"
            >
              {identity.valueStatement}
            </Text>
            <Box w="full" maxW="680px">
              <EditorialFigure
                illustration={editorialIllustrations.introduction}
                aspectRatio="16 / 6"
                loading="eager"
                objectPosition="center 58%"
              />
            </Box>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={3} w="full">
              {evidenceStats.map((stat) => (
                <Box
                  key={stat.label}
                  p={4}
                  borderRadius="md"
                  bg="var(--surface)"
                  border="1px solid"
                  borderColor="var(--border-soft)"
                  boxShadow="var(--shadow-sm)"
                >
                  <Text className="field-code" color="var(--text-muted)" mb={2}>
                    {stat.label}
                  </Text>
                  <Text
                    fontSize="lg"
                    fontWeight={800}
                    color="var(--text-strong)"
                  >
                    {stat.value}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
            <HStack gap={3} flexWrap="wrap">
              {identity.primaryCtas.map((cta, index) => (
                <Button
                  key={cta.targetSectionId}
                  asChild
                  bg={index === 0 ? "var(--brand-600)" : "var(--surface)"}
                  color={index === 0 ? "#fff" : "var(--text-strong)"}
                  border="1px solid"
                  borderColor={
                    index === 0 ? "var(--brand-600)" : "var(--border-strong)"
                  }
                  borderRadius="md"
                  px={5}
                  _hover={{
                    bg:
                      index === 0 ? "var(--brand-500)" : "var(--control-hover)",
                  }}
                  data-testid={`hero-cta-${cta.targetSectionId}`}
                >
                  <a
                    href={`#${cta.targetSectionId}`}
                    aria-label={cta.ariaLabel}
                  >
                    {cta.label}
                    <LuArrowRight />
                  </a>
                </Button>
              ))}
            </HStack>
            <HStack
              gap={3}
              flexWrap="wrap"
              aria-label="Curriculum vitae actions"
            >
              <Button
                variant="outline"
                borderColor="var(--border-strong)"
                color="var(--text-strong)"
                onClick={() => setCvPreviewOpen(true)}
                data-testid="hero-preview-cv"
              >
                <LuEye /> Preview CV
              </Button>
              <Button
                asChild
                variant="ghost"
                color="var(--brand-200)"
                _hover={{ bg: "var(--control-hover)" }}
              >
                <a
                  href={cvDocument.assetUrl}
                  download={cvDocument.downloadName}
                  aria-label="Download curriculum vitae"
                >
                  <LuDownload /> Download CV
                </a>
              </Button>
            </HStack>
          </VStack>

          <Box
            flex=".92"
            w="full"
            maxW={{ base: "680px", lg: "500px" }}
            className="reveal-up delay-1"
          >
            <Box
              bg="var(--surface)"
              border="1px solid"
              borderColor="var(--border-soft)"
              borderRadius="lg"
              boxShadow="var(--shadow-md)"
              overflow="hidden"
            >
              <Flex
                p={5}
                justify="space-between"
                align="center"
                borderBottom="1px solid"
                borderColor="var(--border-soft)"
                bg="var(--surface-subtle)"
              >
                <Box>
                  <Text className="field-code" color="var(--text-muted)">
                    Student profile
                  </Text>
                  <Text fontWeight={800} color="var(--text-strong)" mt={1}>
                    A foundation for medical study
                  </Text>
                </Box>
                <Flex
                  w="48px"
                  h="48px"
                  borderRadius="md"
                  bg="var(--brand-700)"
                  color="#fff"
                  align="center"
                  justify="center"
                >
                  <LuStethoscope size={25} />
                </Flex>
              </Flex>
              <Box
                position="relative"
                aspectRatio="4 / 5"
                overflow="hidden"
                bg="var(--surface-subtle)"
              >
                <Image
                  src={withBasePath(identity.profileImage.src)}
                  alt={identity.profileImage.alt}
                  data-testid="hero-profile-image"
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  objectPosition={identity.profileImage.objectPosition}
                  loading="eager"
                  fetchPriority="high"
                />
                <Box
                  position="absolute"
                  insetX={0}
                  bottom={0}
                  h="24%"
                  bg="linear-gradient(to top, color-mix(in srgb, var(--surface) 74%, transparent), transparent)"
                  pointerEvents="none"
                />
              </Box>
              <VStack align="stretch" gap={0} p={{ base: 5, md: 7 }}>
                {[
                  {
                    label: "Current stage",
                    value: "Beginning formal medical education",
                  },
                  {
                    label: "School foundation",
                    value: "Nguyễn Siêu School, Hanoi",
                  },
                  {
                    label: "Preparation",
                    value: "Sciences, English, and sustained community service",
                  },
                ].map((item) => (
                  <Flex
                    key={item.label}
                    gap={4}
                    py={4}
                    borderBottom="1px solid"
                    borderColor="var(--border-soft)"
                    align="flex-start"
                  >
                    <Flex
                      mt={0.5}
                      w="28px"
                      h="28px"
                      flex="0 0 auto"
                      borderRadius="full"
                      bg="var(--active-bg)"
                      color="var(--brand-200)"
                      align="center"
                      justify="center"
                    >
                      <LuCheck size={15} />
                    </Flex>
                    <Box>
                      <Text className="field-code" color="var(--text-muted)">
                        {item.label}
                      </Text>
                      <Text mt={1} fontWeight={600} color="var(--text-strong)">
                        {item.value}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Container>
      {cvPreviewOpen ? (
        <DocumentPreviewDialog
          document={cvDocument}
          onClose={() => setCvPreviewOpen(false)}
        />
      ) : null}
    </Box>
  );
}

export default MedicalHero;
