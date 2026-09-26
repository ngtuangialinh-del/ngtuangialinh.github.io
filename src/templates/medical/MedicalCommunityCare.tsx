import { Box, Button, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuCalendarDays, LuHeartHandshake, LuUsers } from "react-icons/lu";

import SectionShell from "../../components/shared/SectionShell";
import { Lightbox } from "../../components/ui/lightbox";
import { communityStories } from "../../data/communityCare";
import { galleryImages } from "../../data/gallery";
import { sectionCopy } from "../../data/sectionCopy";
import { withBasePath } from "../../utils/media";

export function MedicalCommunityCare() {
  const copy = sectionCopy["community-care"];
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  return (
    <SectionShell
      id="community-care"
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
        {communityStories.map((story, index) => {
          const documentaryImage = galleryImages.find((image) =>
            story.relatedImageIds?.includes(image.id),
          );
          const documentaryImageIndex = documentaryImage
            ? galleryImages.findIndex(
                (image) => image.id === documentaryImage.id,
              )
            : -1;

          return (
            <Box
              key={story.id}
              bg="var(--surface)"
              border="1px solid"
              borderColor="var(--border-soft)"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="var(--shadow-sm)"
              data-testid={`community-story-${story.id}`}
            >
              {documentaryImage ? (
                <Button
                  variant="plain"
                  type="button"
                  display="block"
                  w="100%"
                  h="auto"
                  p={0}
                  borderRadius={0}
                  overflow="hidden"
                  cursor="zoom-in"
                  onClick={() => setActiveImageIndex(documentaryImageIndex)}
                  aria-label={`Open full image: ${documentaryImage.caption}`}
                  data-testid={`community-image-${story.id}`}
                >
                  <Image
                    src={withBasePath(documentaryImage.src)}
                    alt={documentaryImage.alt}
                    loading="lazy"
                    decoding="async"
                    w="100%"
                    aspectRatio="4 / 3"
                    objectFit="cover"
                    transition="transform var(--motion-fast)"
                    _hover={{ transform: "scale(1.015)" }}
                  />
                </Button>
              ) : (
                <Box
                  h="8px"
                  bg={index === 1 ? "var(--blue-500)" : "var(--brand-500)"}
                />
              )}
              <Box p={{ base: 5, md: 6 }}>
                <Flex justify="space-between" align="flex-start" gap={4} mb={5}>
                  <Flex
                    w="44px"
                    h="44px"
                    borderRadius="md"
                    bg="var(--active-bg)"
                    color="var(--brand-200)"
                    align="center"
                    justify="center"
                  >
                    <LuHeartHandshake size={23} />
                  </Flex>
                  <Text className="field-code" color="var(--text-muted)">
                    Service {String(index + 1).padStart(2, "0")}
                  </Text>
                </Flex>
                <Text
                  fontSize="xl"
                  lineHeight="1.3"
                  fontWeight={800}
                  color="var(--text-strong)"
                >
                  {story.title}
                </Text>
                <Flex mt={3} gap={2} align="center" color="var(--text-muted)">
                  <LuCalendarDays size={16} />
                  <Text fontSize="sm">{story.date}</Text>
                </Flex>
                <Text mt={5} color="var(--text-muted)" lineHeight="1.75">
                  {story.summary}
                </Text>
                {story.attribution === "collective" ? (
                  <Flex
                    mt={5}
                    pt={4}
                    borderTop="1px solid"
                    borderColor="var(--border-soft)"
                    gap={2}
                    align="center"
                    color="var(--text-muted)"
                    data-testid={`collective-note-${story.id}`}
                  >
                    <LuUsers size={17} />
                    <Text fontSize="sm" fontWeight={600}>
                      Collective contribution with classmates and organizers
                    </Text>
                  </Flex>
                ) : null}
              </Box>
            </Box>
          );
        })}
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

export default MedicalCommunityCare;
