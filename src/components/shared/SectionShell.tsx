import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import type { ReactNode } from "react";

import type { ContentSectionId } from "../../types/medical";

type SectionShellProps = { id: ContentSectionId; eyebrow: string; title: string; intro: string; nextSectionId?: ContentSectionId; backgroundClassName?: string; maxW?: string; onDark?: boolean; children: ReactNode };

function SectionShell({ id, eyebrow, title, intro, backgroundClassName = "", maxW = "1120px", children }: SectionShellProps) {
  return (
    <Box id={id} as="section" tabIndex={-1} aria-labelledby={`${id}-heading`} w="100%" py={{ base: 20, md: 28 }} className={`section-surface ${backgroundClassName}`.trim()} data-testid={`${id}-section`}>
      <Container maxW={maxW} px={{ base: 4, md: 8 }}>
        <VStack align="stretch" gap={3} mb={{ base: 10, md: 14 }} maxW="780px" className="reveal-up">
          <Text as="span" className="field-code" color="var(--brand-200)">{eyebrow}</Text>
          <Heading id={`${id}-heading`} as="h2" className="editorial-font" fontSize={{ base: "3xl", md: "5xl" }} lineHeight="1.08" letterSpacing="-.025em" color="var(--text-strong)">{title}</Heading>
          <Text color="var(--text-muted)" fontSize={{ base: "md", md: "lg" }} lineHeight="1.75">{intro}</Text>
        </VStack>
        {children}
      </Container>
    </Box>
  );
}

export default SectionShell;
