import { Box, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuExpand } from "react-icons/lu";

import SectionShell from "../../components/shared/SectionShell";
import { Lightbox } from "../../components/ui/lightbox";
import { galleryImages } from "../../data/gallery";
import { sectionCopy } from "../../data/sectionCopy";
import { withBasePath } from "../../utils/media";

export function MedicalGallery() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const copy = sectionCopy.gallery;

  return (
    <SectionShell
      id="gallery"
      eyebrow={copy.eyebrow}
      title={copy.title}
      intro={copy.intro}
      backgroundClassName="section-surface--alternate"
      maxW="1240px"
    >
      <SimpleGrid
        columns={{ base: 1, sm: 2, xl: 3 }}
        gap={5}
        className="reveal-up delay-1"
      >
        {galleryImages.map((image, index) => (
          <Box
            key={image.id}
            as="button"
            onClick={() => setActiveImageIndex(index)}
            textAlign="left"
            bg="var(--surface)"
            border="1px solid"
            borderColor="var(--border-soft)"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="var(--shadow-sm)"
            transition="transform var(--motion-fast), box-shadow var(--motion-fast)"
            _hover={{
              transform: "translateY(-3px)",
              boxShadow: "var(--shadow-md)",
            }}
            data-testid={`gallery-thumbnail-${image.id}`}
            aria-label={`Open gallery image ${index + 1}: ${image.caption}`}
          >
            <Box position="relative" overflow="hidden">
              <Image
                src={withBasePath(image.src)}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(50vw - 2rem), 620px"
                w="100%"
                aspectRatio="4 / 3"
                objectFit="cover"
              />
              <Flex
                position="absolute"
                right={3}
                bottom={3}
                w="36px"
                h="36px"
                borderRadius="full"
                bg="rgba(11,31,29,.78)"
                color="#fff"
                align="center"
                justify="center"
                aria-hidden="true"
              >
                <LuExpand size={18} />
              </Flex>
            </Box>
            <Box p={5}>
              <Text
                fontWeight={700}
                color="var(--text-strong)"
                lineHeight="1.5"
              >
                {image.caption}
              </Text>
              {image.dateOrPeriod ? (
                <Text mt={2} className="field-code" color="var(--text-muted)">
                  {image.dateOrPeriod}
                </Text>
              ) : null}
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <Lightbox
        items={galleryImages}
        activeIndex={activeImageIndex}
        onChange={setActiveImageIndex}
        onClose={() => setActiveImageIndex(null)}
      />
    </SectionShell>
  );
}

export default MedicalGallery;
