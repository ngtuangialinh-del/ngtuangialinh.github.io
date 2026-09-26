import { Box, Image } from "@chakra-ui/react";

import type { EditorialIllustration } from "../../types/medical";
import { withBasePath } from "../../utils/media";

type EditorialFigureProps = {
  illustration: EditorialIllustration;
  aspectRatio?: string;
  loading?: "eager" | "lazy";
  objectPosition?: string;
};

export function EditorialFigure({
  illustration,
  aspectRatio = "3 / 2",
  loading = "lazy",
  objectPosition = "center",
}: EditorialFigureProps) {
  return (
    <Box
      as="figure"
      m={0}
      bg="var(--surface)"
      border="1px solid"
      borderColor="var(--border-soft)"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="var(--shadow-sm)"
      data-testid={`editorial-figure-${illustration.id}`}
    >
      <Image
        src={withBasePath(illustration.src)}
        alt={illustration.alt}
        w="100%"
        aspectRatio={aspectRatio}
        objectFit="cover"
        objectPosition={objectPosition}
        loading={loading}
        decoding="async"
      />
    </Box>
  );
}

export default EditorialFigure;
