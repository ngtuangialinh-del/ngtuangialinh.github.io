import {
  Badge,
  Box,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuDownload, LuEye, LuFileCheck2, LuShieldCheck } from "react-icons/lu";

import SectionShell from "../../components/shared/SectionShell";
import { DocumentPreviewDialog } from "../../components/ui/document-preview-dialog";
import { evidenceDocuments } from "../../data/evidence";
import { sectionCopy } from "../../data/sectionCopy";
import type { EvidenceDocument } from "../../types/medical";
import { withBasePath } from "../../utils/media";

export function MedicalEvidence() {
  const [previewDocument, setPreviewDocument] =
    useState<EvidenceDocument | null>(null);
  const copy = sectionCopy.evidence;

  return (
    <SectionShell
      id="evidence"
      eyebrow={copy.eyebrow}
      title={copy.title}
      intro={copy.intro}
      maxW="1240px"
    >
      <SimpleGrid
        columns={{ base: 1, md: 2, xl: 3 }}
        gap={5}
        className="reveal-up delay-1"
      >
        {evidenceDocuments.map((document) => {
          const downloadable =
            document.downloadPolicy === "download" &&
            Boolean(document.assetUrl);
          const statusLabel =
            document.publicationState === "public-sanitized-evidence"
              ? "Sanitized evidence"
              : "Verified summary";

          return (
            <Box
              key={document.id}
              bg="var(--surface)"
              border="1px solid"
              borderColor="var(--border-soft)"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="var(--shadow-sm)"
              data-testid={`evidence-${document.id}`}
            >
              {document.thumbnailUrl && document.thumbnailAlt ? (
                <Button
                  variant="plain"
                  type="button"
                  onClick={() => setPreviewDocument(document)}
                  position="relative"
                  display="block"
                  w="100%"
                  h="auto"
                  p={0}
                  bg="var(--surface-subtle)"
                  borderBottom="1px solid"
                  borderColor="var(--border-soft)"
                  overflow="hidden"
                  cursor="zoom-in"
                  _hover={{
                    "& img": { transform: "scale(1.015)" },
                    "& .preview-overlay": { opacity: 1 },
                  }}
                  aria-label={`Review ${document.title}`}
                  data-testid={`preview-thumbnail-${document.id}`}
                >
                  <Image
                    src={withBasePath(document.thumbnailUrl)}
                    alt={document.thumbnailAlt}
                    loading="lazy"
                    decoding="async"
                    w="100%"
                    aspectRatio="4 / 3"
                    objectFit="cover"
                    objectPosition="top"
                    transition="transform var(--motion-standard)"
                  />
                  <Flex
                    className="preview-overlay"
                    position="absolute"
                    inset={0}
                    align="center"
                    justify="center"
                    bg="rgba(3,15,14,.5)"
                    opacity={0}
                    transition="opacity var(--motion-fast)"
                    color="#fff"
                    aria-hidden="true"
                  >
                    <Flex
                      align="center"
                      gap={2}
                      px={4}
                      py={2.5}
                      borderRadius="full"
                      bg="rgba(3,15,14,.84)"
                      fontWeight={700}
                    >
                      <LuEye /> Review {document.pageCount}{" "}
                      {document.pageCount === 1 ? "page" : "pages"}
                    </Flex>
                  </Flex>
                </Button>
              ) : null}

              <Box p={6}>
                <Flex justify="space-between" align="flex-start" gap={4}>
                  <Flex
                    w="44px"
                    h="44px"
                    borderRadius="md"
                    bg="var(--active-bg)"
                    color="var(--brand-200)"
                    align="center"
                    justify="center"
                  >
                    {document.publicationState ===
                    "public-sanitized-evidence" ? (
                      <LuFileCheck2 size={23} />
                    ) : (
                      <LuShieldCheck size={22} />
                    )}
                  </Flex>
                  <Box textAlign="right">
                    <Text className="field-code" color="var(--text-muted)">
                      {document.category}
                    </Text>
                    <Text mt={1} fontSize="xs" color="var(--text-muted)">
                      {document.pageCount}{" "}
                      {document.pageCount === 1 ? "page" : "pages"}
                    </Text>
                  </Box>
                </Flex>

                <Badge mt={5} variant="subtle" colorPalette="teal">
                  {statusLabel}
                </Badge>
                <Text
                  mt={3}
                  fontSize="xl"
                  fontWeight={800}
                  color="var(--text-strong)"
                >
                  {document.title}
                </Text>
                <Text mt={3} color="var(--text-muted)" lineHeight="1.65">
                  {document.summary}
                </Text>
                <Text
                  mt={4}
                  pt={4}
                  borderTop="1px solid"
                  borderColor="var(--border-soft)"
                  fontSize="sm"
                  color="var(--text-muted)"
                >
                  {document.sourceNote}
                </Text>

                <Flex mt={5} gap={3} flexWrap="wrap">
                  <Button
                    variant="outline"
                    borderColor="var(--border-strong)"
                    color="var(--text-strong)"
                    onClick={() => setPreviewDocument(document)}
                    data-testid={`preview-${document.id}`}
                  >
                    <LuEye /> Review pages
                  </Button>
                  {downloadable && document.assetUrl ? (
                    <Button
                      asChild
                      bg="var(--brand-600)"
                      color="#fff"
                      _hover={{ bg: "var(--brand-500)" }}
                    >
                      <a
                        href={document.assetUrl}
                        download={document.downloadName}
                        aria-label={`Download ${document.title}`}
                      >
                        <LuDownload /> Download
                      </a>
                    </Button>
                  ) : null}
                </Flex>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
      {previewDocument ? (
        <DocumentPreviewDialog
          document={previewDocument}
          onClose={() => setPreviewDocument(null)}
        />
      ) : null}
    </SectionShell>
  );
}

export default MedicalEvidence;
