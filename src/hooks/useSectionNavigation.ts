import { useCallback, useEffect, useMemo, useState } from "react";

import { DEFAULT_SECTION_ID, navDestinations } from "../data/navigation";
import type { SectionId } from "../types/medical";

const canonicalHashes = navDestinations.map((destination) => destination.hash);

export const resolveCanonicalHash = (hash: string): string => {
  const normalized = hash.trim();
  return canonicalHashes.includes(normalized) ? normalized : navDestinations[0].hash;
};

export const sectionIdFromHash = (hash: string): SectionId => resolveCanonicalHash(hash).slice(1) as SectionId;
export const hashForSectionId = (sectionId: SectionId): string => `#${sectionId}`;
const canUseBrowser = (): boolean => typeof window !== "undefined";
const preferredScrollBehavior = (): ScrollBehavior => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

const focusAndScrollToSection = (sectionId: SectionId): void => {
  const target = document.getElementById(sectionId);
  if (!target) return;
  target.scrollIntoView({ behavior: preferredScrollBehavior(), block: "start" });
  target.focus({ preventScroll: true });
};

export const useSectionNavigation = () => {
  const sectionIds = useMemo<SectionId[]>(() => navDestinations.map((destination) => destination.id), []);
  const [activeSectionId, setActiveSectionId] = useState<SectionId>(() => {
    if (!canUseBrowser()) return DEFAULT_SECTION_ID;
    const canonicalHash = resolveCanonicalHash(window.location.hash);
    if (canonicalHash !== window.location.hash) window.history.replaceState(null, "", canonicalHash);
    return sectionIdFromHash(canonicalHash);
  });

  const applyLocation = useCallback((shouldMoveFocus: boolean) => {
    if (!canUseBrowser()) return;
    const canonicalHash = resolveCanonicalHash(window.location.hash);
    if (canonicalHash !== window.location.hash) window.history.replaceState(null, "", canonicalHash);
    const sectionId = sectionIdFromHash(canonicalHash);
    setActiveSectionId(sectionId);
    if (shouldMoveFocus) window.requestAnimationFrame(() => focusAndScrollToSection(sectionId));
  }, []);

  useEffect(() => {
    if (window.location.hash.length > 0) window.requestAnimationFrame(() => focusAndScrollToSection(sectionIdFromHash(window.location.hash)));
    const onLocationChange = () => applyLocation(true);
    window.addEventListener("hashchange", onLocationChange);
    window.addEventListener("popstate", onLocationChange);
    return () => { window.removeEventListener("hashchange", onLocationChange); window.removeEventListener("popstate", onLocationChange); };
  }, [applyLocation]);

  useEffect(() => {
    const elements = sectionIds.map((id) => document.getElementById(id)).filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;
    const Observer = (window as unknown as { IntersectionObserver?: typeof IntersectionObserver }).IntersectionObserver;
    if (Observer) {
      const observer = new Observer((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible && sectionIds.includes(visible.target.id as SectionId)) setActiveSectionId(visible.target.id as SectionId);
      }, { rootMargin: "-18% 0px -58%", threshold: [0.05, 0.25, 0.5] });
      elements.forEach((element) => observer.observe(element));
      return () => observer.disconnect();
    }
    const updateFromGeometry = () => {
      const current = elements.find((element) => { const rect = element.getBoundingClientRect(); return rect.top <= 170 && rect.bottom > 170; });
      if (current) setActiveSectionId(current.id as SectionId);
    };
    updateFromGeometry();
    window.addEventListener("scroll", updateFromGeometry, { passive: true });
    return () => window.removeEventListener("scroll", updateFromGeometry);
  }, [sectionIds]);

  const navigateToSection = useCallback((sectionId: SectionId) => {
    const nextHash = hashForSectionId(sectionId);
    if (window.location.hash !== nextHash) window.history.pushState(null, "", nextHash);
    setActiveSectionId(sectionId);
    focusAndScrollToSection(sectionId);
  }, []);

  return { activeSectionId, destinations: navDestinations, navigateToSection };
};
