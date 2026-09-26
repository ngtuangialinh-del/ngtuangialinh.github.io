import { Box, Button, Dialog, Flex, Image, Text } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";

import type { GalleryImage } from "../../types/medical";
import { withBasePath } from "../../utils/media";

type LightboxProps = {
  items: GalleryImage[];
  activeIndex: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
};

export function Lightbox({
  items,
  activeIndex,
  onChange,
  onClose,
}: LightboxProps) {
  const item = activeIndex === null ? null : items[activeIndex];
  const hasPrevious = activeIndex !== null && activeIndex > 0;
  const hasNext = activeIndex !== null && activeIndex < items.length - 1;

  const showPrevious = () => {
    if (activeIndex !== null && hasPrevious) onChange(activeIndex - 1);
  };

  const showNext = () => {
    if (activeIndex !== null && hasNext) onChange(activeIndex + 1);
  };

  return (
    <Dialog.Root
      open={item !== null}
      onOpenChange={(event) => !event.open && onClose()}
      size="cover"
    >
      <Dialog.Backdrop
        data-testid="gallery-lightbox-backdrop"
        bg="var(--modal-overlay-bg)"
      />
      <Dialog.Positioner p={{ base: 2, md: 6 }}>
        <Dialog.Content
          data-testid="gallery-lightbox"
          bg="var(--surface-900)"
          borderRadius={{ base: "md", md: "lg" }}
          maxW="min(94vw, 1080px)"
          maxH="94vh"
          overflow="hidden"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" && hasPrevious) {
              event.preventDefault();
              showPrevious();
            }
            if (event.key === "ArrowRight" && hasNext) {
              event.preventDefault();
              showNext();
            }
          }}
        >
          <Dialog.CloseTrigger
            data-testid="gallery-lightbox-close"
            aria-label="Close expanded gallery image"
            color="var(--text-strong)"
          >
            <LuX />
          </Dialog.CloseTrigger>
          {item && activeIndex !== null ? (
            <Box p={{ base: 3, md: 7 }}>
              <Flex
                justify="space-between"
                align="center"
                gap={3}
                pr={12}
                mb={4}
              >
                <Text
                  className="field-code"
                  color="var(--text-muted)"
                  aria-live="polite"
                  data-testid="gallery-lightbox-position"
                >
                  Image {activeIndex + 1} of {items.length}
                </Text>
                <Text fontSize="sm" color="var(--text-muted)">
                  {item.dateOrPeriod}
                </Text>
              </Flex>
              <Flex
                align="center"
                justify="center"
                minH={{ base: "260px", md: "480px" }}
                maxH="68vh"
                bg="rgba(0,0,0,.18)"
                borderRadius="md"
                overflow="hidden"
              >
                <Image
                  src={withBasePath(item.src)}
                  alt={item.alt}
                  maxW="100%"
                  maxH="68vh"
                  objectFit="contain"
                  loading="eager"
                  data-testid="gallery-lightbox-image"
                />
              </Flex>
              <Text
                mt={4}
                fontSize="sm"
                color="var(--text-300)"
                lineHeight="1.6"
              >
                {item.caption}
              </Text>
              <Flex mt={5} justify="space-between" gap={3}>
                <Button
                  variant="outline"
                  onClick={showPrevious}
                  disabled={!hasPrevious}
                  aria-label="View previous gallery image"
                  data-testid="gallery-lightbox-previous"
                >
                  <LuChevronLeft /> Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={showNext}
                  disabled={!hasNext}
                  aria-label="View next gallery image"
                  data-testid="gallery-lightbox-next"
                >
                  Next <LuChevronRight />
                </Button>
              </Flex>
            </Box>
          ) : null}
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}

export default Lightbox;
