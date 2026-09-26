import { useEffect, useState } from "react";

import type { SectionId } from "../types/medical";

export const scrollToSection = (sectionId: SectionId): void => {
  const section = document.getElementById(sectionId);

  section?.scrollIntoView({ behavior: "smooth" });
};

export const useActiveSection = (
  sectionIds: readonly SectionId[],
  fallbackSectionId: SectionId,
  offset = 150,
): SectionId => {
  const [activeSection, setActiveSection] = useState<SectionId>(
    sectionIds[0] ?? fallbackSectionId,
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = sectionIds.find((sectionId) => {
        const element = document.getElementById(sectionId);

        if (!element) {
          return false;
        }

        const rect = element.getBoundingClientRect();

        return rect.top <= offset && rect.bottom >= offset;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset, sectionIds]);

  return activeSection;
};
