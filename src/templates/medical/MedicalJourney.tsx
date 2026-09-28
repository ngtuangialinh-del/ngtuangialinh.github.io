import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import {
  LuActivity,
  LuBookOpen,
  LuHeartHandshake,
  LuStethoscope,
} from "react-icons/lu";

import { academics, journeyMilestones } from "../../data/academics";
import { editorialIllustrations } from "../../data/illustrations";
import { sectionCopy } from "../../data/sectionCopy";
import SectionShell from "../../components/shared/SectionShell";
import EditorialFigure from "../../components/shared/EditorialFigure";
import { ScoreDisplay } from "./ScoreDisplay";

const milestoneIcons: Record<string, IconType> = {
  school: LuBookOpen,
  strengths: LuActivity,
  service: LuHeartHandshake,
  admission: LuStethoscope,
};

export function MedicalJourney() {
  const copy = sectionCopy["medical-journey"];

  return (
    <SectionShell
      id="medical-journey"
      eyebrow={copy.eyebrow}
      title={copy.title}
      intro={copy.intro}
      maxW="1240px"
    >
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "minmax(0,.85fr) minmax(0,1.15fr)",
        }}
        gap={{ base: 8, lg: 10 }}
        alignItems="start"
      >
        <Box
          className="reveal-up delay-1"
          position={{ lg: "sticky" }}
          top={{ lg: "150px" }}
        >
          <EditorialFigure
            illustration={editorialIllustrations.journey}
            aspectRatio="4 / 3"
            objectPosition="center"
          />
          <Text mt={4} color="var(--text-muted)" lineHeight="1.7">
            A learning path shaped by scientific preparation, collective
            service, and the beginning of formal medical education.
          </Text>
        </Box>
        <Box
          position="relative"
          pl={{ base: 10, md: 14 }}
          className="reveal-up delay-1"
        >
          <Box
            position="absolute"
            left={{ base: "18px", md: "26px" }}
            top="8px"
            bottom="8px"
            w="2px"
            bg="var(--line-500)"
          />
          {journeyMilestones.map((milestone, index) => {
            const Icon = milestoneIcons[milestone.id] ?? LuActivity;

            return (
              <Box
                key={milestone.id}
                position="relative"
                pb={index === journeyMilestones.length - 1 ? 0 : 10}
              >
                <Flex
                  position="absolute"
                  left={{ base: "-40px", md: "-56px" }}
                  top={0}
                  w={{ base: "36px", md: "44px" }}
                  h={{ base: "36px", md: "44px" }}
                  borderRadius="md"
                  bg="var(--primary-bg)"
                  color="var(--primary-text)"
                  align="center"
                  justify="center"
                  boxShadow="var(--shadow-sm)"
                  data-testid={`journey-icon-${milestone.id}`}
                >
                  <Icon size={18} />
                </Flex>
                <Box
                  bg="var(--surface)"
                  border="1px solid"
                  borderColor="var(--border-soft)"
                  borderRadius="lg"
                  p={{ base: 4, md: 5 }}
                  boxShadow="var(--shadow-sm)"
                  data-testid={`journey-milestone-${milestone.id}`}
                >
                  <Text
                    as="span"
                    className="field-code"
                    color="var(--accent-300)"
                  >
                    Step {index + 1}
                    {milestone.period ? ` · ${milestone.period}` : ""}
                  </Text>
                  <Text
                    fontWeight={700}
                    fontSize="lg"
                    color="var(--text-100)"
                    mt={1}
                  >
                    {milestone.label}
                  </Text>
                  <Text color="var(--text-300)" mt={2}>
                    {milestone.description}
                  </Text>
                  {milestone.id === "admission" ? (
                    <Box mt={3}>
                      <ScoreDisplay score={academics.admissionScore} />
                    </Box>
                  ) : null}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Grid>
    </SectionShell>
  );
}

export default MedicalJourney;
