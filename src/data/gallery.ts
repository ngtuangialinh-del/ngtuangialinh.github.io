import type { GalleryImage } from "../types/medical";

/**
 * Approved public curation. Raw documents, bedside patient images,
 * unnecessary close-ups, videos, and near-duplicates remain excluded.
 */
export const galleryImages = [
  {
    id: "hematology-1",
    src: "/gallery/pediatric-hematology-gift-giving-1.jpg",
    alt: "Group of student volunteers standing at the entrance of the National Institute of Hematology and Blood Transfusion",
    caption:
      "The volunteer group at the National Institute of Hematology and Blood Transfusion before the gift-giving activity.",
    initiativeId: "pediatric-hematology",
    dateOrPeriod: "30 July 2026",
  },
  {
    id: "cung-em-1",
    src: "/gallery/cung-em-vung-buoc-project-1.jpg",
    alt: "Children and a teacher standing together outside a brightly painted preschool building, holding donated supplies",
    caption:
      "Children at A Lù Preschool with donated supplies delivered through the class project.",
    initiativeId: "cung-em-vung-buoc",
    dateOrPeriod: "2022 – 2025",
  },
  {
    id: "cung-em-3",
    src: "/gallery/cung-em-vung-buoc-project-3.jpg",
    alt: "Students seated around classroom tables preparing materials for the school support project",
    caption: "Classroom preparation for the multi-year school support project.",
    initiativeId: "cung-em-vung-buoc",
    dateOrPeriod: "2022 – 2025",
  },
  {
    id: "cung-em-4",
    src: "/gallery/cung-em-vung-buoc-project-4.jpg",
    alt: "Students working together to sort donated clothing and supplies",
    caption: "Classmates sorting clothing and supplies before distribution.",
    initiativeId: "cung-em-vung-buoc",
    dateOrPeriod: "2022 – 2025",
  },
  {
    id: "cung-em-2",
    src: "/gallery/cung-em-vung-buoc-project-2.jpg",
    alt: "Children seated together at a long table sharing a meal",
    caption: "A shared afternoon meal supported by the project.",
    initiativeId: "cung-em-vung-buoc",
    dateOrPeriod: "2022 – 2025",
  },
  {
    id: "cung-em-5",
    src: "/gallery/cung-em-project-donated-clothing.jpg",
    alt: "Two labeled bags of donated clothing and supplies arranged in a preschool classroom",
    caption:
      "Prepared clothing and supplies at the preschool, selected as a no-face contextual record.",
    initiativeId: "cung-em-vung-buoc",
    dateOrPeriod: "2022 – 2025",
  },
  {
    id: "tet-1",
    src: "/gallery/lunar-new-year-support-2025-1.jpg",
    alt: "Student volunteers and program guests standing together on stage at the Lunar New Year gift-giving event",
    caption: "Student volunteers at the 2025 Lunar New Year gift-giving event.",
    initiativeId: "lunar-new-year-2025",
    dateOrPeriod: "5 January 2025",
  },
  {
    id: "tet-2",
    src: "/gallery/lunar-new-year-support-2025-2.jpg",
    alt: "Student volunteers gathered on stage in front of stacked gift boxes at the Lunar New Year event",
    caption: "Gifts prepared for distribution at the event.",
    initiativeId: "lunar-new-year-2025",
    dateOrPeriod: "5 January 2025",
  },
  {
    id: "tet-3",
    src: "/gallery/lunar-new-year-support-2025-3.jpg",
    alt: "Student volunteers standing beside stacked bags of prepared gifts outside the event venue",
    caption: "The volunteer group with prepared Lunar New Year gifts.",
    initiativeId: "lunar-new-year-2025",
    dateOrPeriod: "5 January 2025",
  },
  {
    id: "tet-4",
    src: "/gallery/lunar-new-year-support-2025-4.jpg",
    alt: "Student volunteers distributing packaged gifts in the courtyard of the community venue",
    caption: "Gift distribution underway at the community venue.",
    initiativeId: "lunar-new-year-2025",
    dateOrPeriod: "5 January 2025",
  },
] satisfies GalleryImage[];
