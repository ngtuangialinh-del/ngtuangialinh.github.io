import type { NavDestination, SectionId } from "../types/medical";

export const sectionIds = [
  "introduction",
  "medical-journey",
  "academics",
  "research",
  "community-care",
  "gallery",
  "evidence",
  "contact",
] as const satisfies readonly SectionId[];

export const navDestinations = [
  { id: "introduction", label: "Introduction", hash: "#introduction" },
  { id: "medical-journey", label: "Medical Journey", hash: "#medical-journey" },
  { id: "academics", label: "Academics", hash: "#academics" },
  { id: "research", label: "Research", hash: "#research" },
  { id: "community-care", label: "Community Care", hash: "#community-care" },
  { id: "gallery", label: "Gallery", hash: "#gallery" },
  { id: "evidence", label: "Evidence", hash: "#evidence" },
  { id: "contact", label: "Contact", hash: "#contact" },
] satisfies NavDestination[];

export const DEFAULT_SECTION_ID: SectionId = "introduction";
