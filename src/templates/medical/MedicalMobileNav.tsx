import { Box, Container, Drawer, Flex, IconButton, Link, Text, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { LuMenu, LuStethoscope, LuX } from "react-icons/lu";

import { ColorModeButton } from "../../components/ui/color-mode";
import { identity } from "../../data/identity";
import type { NavDestination, SectionId } from "../../types/medical";
import { SectionProgress } from "./MedicalSidebar";

type MedicalMobileNavProps = { destinations: readonly NavDestination[]; activeSectionId: SectionId; onNavigate: (sectionId: SectionId) => void };

export function MedicalMobileNav({ destinations, activeSectionId, onNavigate }: MedicalMobileNavProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  return (
    <Drawer.Root open={open} onOpenChange={(event) => { setOpen(event.open); if (!event.open) window.requestAnimationFrame(() => triggerRef.current?.focus()); }} placement="end">
      <Box as="header" position="fixed" insetInline={0} top={0} zIndex={1000} className="medical-header" display={{ base: "block", lg: "none" }} data-testid="mobile-navigation">
        <Container maxW="1280px" px={{ base: 4, md: 8 }}>
          <Flex h="64px" align="center" justify="space-between" gap={4}>
            <Link href="#introduction" onClick={(event) => { event.preventDefault(); onNavigate("introduction"); }} display="flex" alignItems="center" gap={2} minW={0} aria-label="Navigate to Introduction">
              <Flex w="36px" h="36px" borderRadius="md" bg="var(--brand-700)" color="#fff" align="center" justify="center"><LuStethoscope size={19} /></Flex>
              <Box minW={0}><Text className="field-code" color="var(--text-muted)" whiteSpace="nowrap">Medical portfolio</Text><Text fontSize="sm" fontWeight={700} color="var(--text-strong)" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">{identity.name}</Text></Box>
            </Link>
            <Flex align="center" gap={2} flex="0 0 auto">
              <ColorModeButton data-testid="color-mode-toggle-mobile" color="var(--text-strong)" border="1px solid" borderColor="var(--border-soft)" bg="var(--control-bg)" />
              <IconButton ref={triggerRef} aria-label="Open navigation menu" onClick={() => { triggerRef.current?.focus(); setOpen(true); }} variant="ghost" color="var(--text-strong)" border="1px solid" borderColor="var(--border-soft)" bg="var(--control-bg)" data-testid="mobile-nav-toggle"><LuMenu /></IconButton>
            </Flex>
          </Flex>
        </Container>
        <SectionProgress destinations={destinations} activeSectionId={activeSectionId} />
      </Box>

      <Drawer.Backdrop bg="var(--drawer-backdrop)" />
      <Drawer.Positioner>
        <Drawer.Content maxW="340px" bg="var(--surface)" borderLeft="1px solid" borderColor="var(--border-soft)" data-testid="mobile-nav-menu">
          <Drawer.Header borderBottom="1px solid" borderColor="var(--border-soft)">
            <Flex justify="space-between" align="center"><Box><Text className="field-code" color="var(--brand-200)">Sections</Text><Text fontWeight={700} color="var(--text-strong)">Portfolio navigation</Text></Box><Drawer.CloseTrigger asChild><IconButton aria-label="Close navigation menu" variant="ghost" color="var(--text-strong)" data-testid="mobile-nav-close"><LuX /></IconButton></Drawer.CloseTrigger></Flex>
          </Drawer.Header>
          <Drawer.Body py={5}>
            <VStack as="ul" listStyleType="none" align="stretch" gap={2}>
              {destinations.map((destination, index) => {
                const isActive = destination.id === activeSectionId;
                return <Box as="li" key={destination.id}><Link href={destination.hash} onClick={(event) => { event.preventDefault(); onNavigate(destination.id); close(); }} display="flex" alignItems="center" gap={3} px={3} py={3} borderRadius="md" border="1px solid" borderColor={isActive ? "var(--border-strong)" : "transparent"} bg={isActive ? "var(--active-bg)" : "transparent"} color={isActive ? "var(--text-strong)" : "var(--text-muted)"} aria-current={isActive ? "location" : undefined} data-testid={`mobile-nav-link-${destination.id}`}><Text className="field-code" color="var(--brand-200)">{String(index + 1).padStart(2, "0")}</Text><Text fontWeight={isActive ? 700 : 500}>{destination.label}</Text></Link></Box>;
              })}
            </VStack>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}

export default MedicalMobileNav;
