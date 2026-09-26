import type { Identity } from "../types/medical";

export const identity = {
  name: "Nguyễn Tuấn Gia Linh",
  statusStatement:
    "Incoming medical student, admitted to the Medicine program at the University of Medicine and Pharmacy, Thai Nguyen University.",
  valueStatement:
    "I am preparing to study medicine after years of steady academic work and sustained community service — a path built on evidence, not proclamation.",
  profileImage: {
    src: "/profile/gia-linh-profile.jpg",
    alt: "Portrait of Nguyễn Tuấn Gia Linh in Nguyễn Siêu School uniform",
    objectPosition: "50% 30%",
  },
  primaryCtas: [
    {
      label: "My Medical Journey",
      targetSectionId: "medical-journey",
      ariaLabel: "Scroll to the Medical Journey section",
    },
    {
      label: "Community Care",
      targetSectionId: "community-care",
      ariaLabel: "Scroll to the Community Care section",
    },
  ],
} satisfies Identity;
