import { Box, Button, Dialog, Flex, Image, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import {
  LuChevronLeft,
  LuChevronRight,
  LuDownload,
  LuExternalLink,
  LuX,
} from "react-icons/lu";

import type { EvidenceDocument } from "../../types/medical";
import { withBasePath } from "../../utils/media";

type DocumentPreviewDialogProps = {
  document: EvidenceDocument | null;
  onClose: () => void;
  initialPageIndex?: number;
};

export function DocumentPreviewDialog({
  document,
  onClose,
  initialPageIndex = 0,
}: DocumentPreviewDialogProps) {
  const [selectedPageIndex, setSelectedPageIndex] = useState(initialPageIndex);

  const pages = document?.pages ?? [];
  const safeIndex = Math.min(
    Math.max(selectedPageIndex, 0),
    Math.max(pages.length - 1, 0),
  );
  const selectedPage = pages[safeIndex];
  const hasPrevious = safeIndex > 0;
  const hasNext = safeIndex < pages.length - 1;
  const publicationLabel =
    document?.publicationState === "public-sanitized-evidence"
      ? "Public sanitized evidence"
      : "Verified summary · private original retained";

  return (
    <Dialog.Root
      open={document !== null}
      onOpenChange={(event) => !event.open && onClose()}
      size="cover"
    >
      <Dialog.Backdrop bg="var(--modal-overlay-bg)" />
      <Dialog.Positioner p={{ base: 2, md: 6 }}>
        <Dialog.Content
          data-testid="document-preview-dialog"
          bg="var(--surface)"
          border="1px solid"
          borderColor="var(--border-soft)"
          borderRadius={{ base: "md", md: "lg" }}
          maxW="min(96vw, 1180px)"
          maxH="94vh"
          overflow="hidden"
        >
          <Dialog.Header
            borderBottom="1px solid"
            borderColor="var(--border-soft)"
            pr={14}
          >
            <Box>
              <Text className="field-code" color="var(--brand-200)">
                {publicationLabel}
              </Text>
              <Dialog.Title mt={1} color="var(--text-strong)">
                {document?.title}
              </Dialog.Title>
              {document ? (
                <Text mt={1} fontSize="sm" color="var(--text-muted)">
                  {document.sourceType} · {document.pageCount}{" "}
                  {document.pageCount === 1 ? "page" : "pages"}
                </Text>
              ) : null}
            </Box>
          </Dialog.Header>
          <Dialog.CloseTrigger
            data-testid="document-preview-close"
            aria-label="Close document review"
            color="var(--text-strong)"
          >
            <LuX />
          </Dialog.CloseTrigger>

          <Dialog.Body p={0} overflow="auto">
            {document && selectedPage ? (
              <Flex direction={{ base: "column", lg: "row" }} minH={0}>
                <Box
                  flex="1"
                  minW={0}
                  p={{ base: 3, md: 5 }}
                  bg="var(--surface-subtle)"
                  borderRight={{ base: "none", lg: "1px solid" }}
                  borderBottom={{ base: "1px solid", lg: "none" }}
                  borderColor="var(--border-soft)"
                >
                  <Flex justify="space-between" align="center" gap={3} mb={3}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSelectedPageIndex((index) => Math.max(0, index - 1))
                      }
                      disabled={!hasPrevious}
                      aria-label="View previous document page"
                      data-testid="document-page-previous"
                    >
                      <LuChevronLeft /> Previous
                    </Button>
                    <Text
                      className="field-code"
                      color="var(--text-muted)"
                      aria-live="polite"
                      data-testid="document-page-position"
                    >
                      Page {safeIndex + 1} of {pages.length}
                    </Text>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSelectedPageIndex((index) =>
                          Math.min(pages.length - 1, index + 1),
                        )
                      }
                      disabled={!hasNext}
                      aria-label="View next document page"
                      data-testid="document-page-next"
                    >
                      Next <LuChevronRight />
                    </Button>
                  </Flex>
                  <Flex
                    align="flex-start"
                    justify="center"
                    maxH={{ base: "58vh", lg: "72vh" }}
                    overflow="auto"
                    border="1px solid"
                    borderColor="var(--border-soft)"
                    borderRadius="md"
                    bg="#eef1ef"
                    p={{ base: 2, md: 4 }}
                  >
                    <Image
                      src={withBasePath(selectedPage.imageUrl)}
                      alt={selectedPage.alt}
                      maxW="100%"
                      h="auto"
                      loading="eager"
                      decoding="async"
                      boxShadow="var(--shadow-md)"
                      bg="#fff"
                      data-testid="document-selected-page"
                    />
                  </Flex>
                </Box>

                <Box
                  w={{ base: "100%", lg: "280px" }}
                  p={{ base: 4, md: 5 }}
                  flex="0 0 auto"
                >
                  <Text fontWeight={800} color="var(--text-strong)">
                    Document pages
                  </Text>
                  <Text mt={1} fontSize="sm" color="var(--text-muted)">
                    Select any page to review it at full size.
                  </Text>
                  <Flex
                    mt={4}
                    direction={{ base: "row", lg: "column" }}
                    gap={3}
                    overflowX={{ base: "auto", lg: "visible" }}
                    pb={{ base: 2, lg: 0 }}
                  >
                    {pages.map((page, index) => (
                      <Button
                        key={page.id}
                        variant="plain"
                        display="block"
                        flex={{ base: "0 0 128px", lg: "initial" }}
                        h="auto"
                        p={2}
                        border="2px solid"
                        borderColor={
                          index === safeIndex
                            ? "var(--brand-500)"
                            : "var(--border-soft)"
                        }
                        borderRadius="md"
                        bg={
                          index === safeIndex
                            ? "var(--active-bg)"
                            : "var(--surface)"
                        }
                        onClick={() => setSelectedPageIndex(index)}
                        aria-label={`View ${page.label} of ${document.title}`}
                        aria-pressed={index === safeIndex}
                        data-testid={`document-page-thumbnail-${page.id}`}
                      >
                        <Image
                          src={withBasePath(page.imageUrl)}
                          alt=""
                          w="100%"
                          aspectRatio="3 / 4"
                          objectFit="cover"
                          objectPosition="top"
                          loading="lazy"
                          decoding="async"
                          borderRadius="sm"
                        />
                        <Text
                          mt={2}
                          fontSize="xs"
                          color="var(--text-strong)"
                          textAlign="center"
                        >
                          {page.label}
                        </Text>
                      </Button>
                    ))}
                  </Flex>

                  <Box
                    mt={5}
                    pt={5}
                    borderTop="1px solid"
                    borderColor="var(--border-soft)"
                  >
                    <Text
                      fontSize="sm"
                      color="var(--text-muted)"
                      lineHeight="1.6"
                    >
                      {document.redactionNote}
                    </Text>
                    {document.assetUrl ? (
                      <Flex mt={4} direction="column" gap={2}>
                        <Button asChild variant="outline" size="sm">
                          <Link
                            href={document.assetUrl}
                            target="_blank"
                            rel="noreferrer"
                            data-testid="document-open-pdf"
                          >
                            <LuExternalLink /> Open full PDF
                          </Link>
                        </Button>
                        {document.downloadPolicy === "download" ? (
                          <Button
                            asChild
                            size="sm"
                            bg="var(--brand-600)"
                            color="#fff"
                          >
                            <a
                              href={document.assetUrl}
                              download={document.downloadName}
                              data-testid="document-download-pdf"
                            >
                              <LuDownload /> Download PDF
                            </a>
                          </Button>
                        ) : null}
                      </Flex>
                    ) : null}
                  </Box>
                </Box>
              </Flex>
            ) : null}
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}

export default DocumentPreviewDialog;
