import { Box, Container, Flex, Link, Text } from "@chakra-ui/react";
import { LuStethoscope } from "react-icons/lu";

import { ColorModeButton } from "../../components/ui/color-mode";
import { identity } from "../../data/identity";
import type { NavDestination, SectionId } from "../../types/medical";

type MedicalSidebarProps = { destinations: readonly NavDestination[]; activeSectionId: SectionId; onNavigate: (sectionId: SectionId) => void };

export function SectionProgress({ destinations, activeSectionId }: Omit<MedicalSidebarProps, "onNavigate">) {
  const activeIndex = Math.max(destinations.findIndex((destination) => destination.id === activeSectionId), 0);
  const active = destinations[activeIndex];
  const progress = ((activeIndex + 1) / destinations.length) * 100;
  return (
    <Box aria-label={`Section ${activeIndex + 1} of ${destinations.length}: ${active.label}`}>
      <Container maxW="1280px" px={{ base: 4, md: 8 }}>
        <Flex h="28px" align="center" justify="space-between" gap={4}>
          <Text className="field-code" color="var(--text-muted)">{active.label}</Text>
          <Text fontSize="xs" color="var(--text-muted)">{activeIndex + 1} / {destinations.length}</Text>
        </Flex>
      </Container>
      <Box className="section-progress-track" aria-hidden="true"><Box className="section-progress-value" style={{ width: `${progress}%` }} /></Box>
    </Box>
  );
}

export function MedicalSidebar({ destinations, activeSectionId, onNavigate }: MedicalSidebarProps) {
  return (
    <Box as="header" position="fixed" insetInline={0} top={0} zIndex={1000} className="medical-header" display={{ base: "none", lg: "block" }} data-testid="desktop-navigation">
      <Container maxW="1280px" px={{ base: 4, md: 8 }}>
        <Flex as="nav" aria-label="Main navigation" h="72px" align="center" justify="space-between" gap={5}>
          <Link href="#introduction" onClick={(event) => { event.preventDefault(); onNavigate("introduction"); }} display="flex" alignItems="center" gap={3} minW="210px" aria-label="Navigate to Introduction">
            <Flex w="40px" h="40px" borderRadius="md" bg="var(--brand-700)" color="#fff" align="center" justify="center"><LuStethoscope size={21} /></Flex>
            <Box><Text className="field-code" color="var(--text-muted)">Medical portfolio</Text><Text fontWeight={700} color="var(--text-strong)">{identity.name}</Text></Box>
          </Link>
          <Flex as="ul" listStyleType="none" align="center" gap={1}>
            {destinations.map((destination) => {
              const isActive = destination.id === activeSectionId;
              return <Box as="li" key={destination.id}><Link href={destination.hash} onClick={(event) => { event.preventDefault(); onNavigate(destination.id); }} aria-current={isActive ? "location" : undefined} px={3} py={2} borderRadius="md" border="1px solid" borderColor={isActive ? "var(--border-strong)" : "transparent"} bg={isActive ? "var(--active-bg)" : "transparent"} color={isActive ? "var(--text-strong)" : "var(--text-muted)"} fontSize="sm" fontWeight={isActive ? 700 : 500} _hover={{ color: "var(--text-strong)", bg: "var(--control-hover)" }} data-testid={`nav-link-${destination.id}`}>{destination.label}</Link></Box>;
            })}
          </Flex>
          <ColorModeButton data-testid="color-mode-toggle-desktop" color="var(--text-strong)" border="1px solid" borderColor="var(--border-soft)" bg="var(--control-bg)" _hover={{ bg: "var(--control-hover)" }} />
        </Flex>
      </Container>
      <SectionProgress destinations={destinations} activeSectionId={activeSectionId} />
    </Box>
  );
}

export default MedicalSidebar;
