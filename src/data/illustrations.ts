import type { EditorialIllustration } from "../types/medical";

export const editorialIllustrations = {
  introduction: {
    id: "introduction-learning-collage",
    sectionId: "introduction",
    src: "/illustrations/introduction-learning-collage.webp",
    alt: "Editorial collage of an open book, stethoscope, pulse line, leaves, and cellular forms",
  },
  journey: {
    id: "medical-journey-pathway",
    sectionId: "medical-journey",
    src: "/illustrations/medical-journey-pathway.webp",
    alt: "Editorial collage showing a flowing path from study through science toward medicine and care",
  },
  academics: {
    id: "academics-study-collage",
    sectionId: "academics",
    src: "/illustrations/academics-study-collage.webp",
    alt: "Editorial still life of blank study pages, a molecular model, prism, leaves, and cellular forms",
  },
  research: {
    id: "research-nanoformulation-collage",
    sectionId: "research",
    src: "/illustrations/research-nanoformulation-collage.webp",
    alt: "Editorial scientific collage of cordyceps-inspired forms, glassware, droplets, particles, and cells",
  },
  contact: {
    id: "contact-open-learning",
    sectionId: "contact",
    src: "/illustrations/contact-open-learning.webp",
    alt: "Editorial collage of an open book becoming a path toward a calm horizon",
  },
} satisfies Record<string, EditorialIllustration>;
