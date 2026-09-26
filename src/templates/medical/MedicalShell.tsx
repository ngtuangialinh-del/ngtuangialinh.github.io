import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { LuStethoscope } from "react-icons/lu";

import { useSectionNavigation } from "../../hooks/useSectionNavigation";
import { MedicalAcademics } from "./MedicalAcademics";
import { MedicalCommunityCare } from "./MedicalCommunityCare";
import { MedicalContact } from "./MedicalContact";
import { MedicalEvidence } from "./MedicalEvidence";
import { MedicalGallery } from "./MedicalGallery";
import { MedicalHero } from "./MedicalHero";
import { MedicalJourney } from "./MedicalJourney";
import { MedicalResearch } from "./MedicalResearch";
import { MedicalMobileNav } from "./MedicalMobileNav";
import { MedicalSidebar } from "./MedicalSidebar";
import { SkipLink } from "./SkipLink";

export function MedicalShell() {
  const { activeSectionId, destinations, navigateToSection } = useSectionNavigation();
  return (
    <Box className="medical-page" data-testid="medical-shell">
      <SkipLink />
      <MedicalSidebar destinations={destinations} activeSectionId={activeSectionId} onNavigate={navigateToSection} />
      <MedicalMobileNav destinations={destinations} activeSectionId={activeSectionId} onNavigate={navigateToSection} />
      <Box as="main" id="main-content" tabIndex={-1}>
        <MedicalHero />
        <MedicalJourney />
        <MedicalAcademics />
        <MedicalResearch />
        <MedicalCommunityCare />
        <MedicalGallery />
        <MedicalEvidence />
        <MedicalContact />
      </Box>
      <Box as="footer" borderTop="1px solid" borderColor="var(--border-soft)" bg="var(--surface-subtle)" py={7}>
        <Container maxW="1280px" px={{ base: 4, md: 8 }}><Flex direction={{ base: "column", sm: "row" }} align={{ base: "flex-start", sm: "center" }} justify="space-between" gap={3}><Flex align="center" gap={2} color="var(--text-strong)"><LuStethoscope /><Text fontWeight={700}>Gia Linh · Medical portfolio</Text></Flex><Text fontSize="sm" color="var(--text-muted)">Evidence-led, privacy-conscious, and prepared for the next stage of learning.</Text></Flex></Container>
      </Box>
    </Box>
  );
}

export default MedicalShell;
