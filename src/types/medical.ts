export type SectionId =
  | "introduction"
  | "medical-journey"
  | "academics"
  | "research"
  | "community-care"
  | "gallery"
  | "evidence"
  | "contact";

export type Cta = {
  label: string;
  targetSectionId: SectionId;
  ariaLabel: string;
};

export type Identity = {
  name: string;
  statusStatement: string;
  valueStatement: string;
  profileImage: {
    src: string;
    alt: string;
    objectPosition: string;
  };
  primaryCtas: Cta[];
};

export type NavDestination = {
  id: SectionId;
  label: string;
  hash: string;
};

export type LabeledScore = {
  subjectOrLabel: string;
  value: string;
  scaleNote?: string;
};

export type ScoreGroup = {
  label: string;
  scaleDescription: string;
  entries: LabeledScore[];
};

export type AcademicsContent = {
  igcse: ScoreGroup;
  aLevels: ScoreGroup;
  ielts: ScoreGroup;
  gpaSummary: ScoreGroup;
  grade12: ScoreGroup;
  recognitions: string[];
  admissionScore: LabeledScore;
};

export type JourneyMilestone = {
  id: string;
  label: string;
  description: string;
  period?: string;
};

export type CommunityStory = {
  id: string;
  title: string;
  date: string;
  summary: string;
  attribution: "collective" | "individual";
  relatedImageIds?: string[];
};

export type ResearchProject = {
  title: string;
  year: string;
  question: string;
  methods: string[];
  reportedResults: LabeledScore[];
  scopeNote: string;
};

export type EditorialIllustration = {
  id: string;
  sectionId: Extract<
    SectionId,
    "introduction" | "medical-journey" | "academics" | "research" | "contact"
  >;
  src: string;
  alt: string;
};

export type EvidencePage = {
  id: string;
  label: string;
  imageUrl: string;
  alt: string;
};

export type EvidencePublicationState =
  | "public-sanitized-evidence"
  | "verified-summary";

export type EvidenceDownloadPolicy = "download" | "view-only" | "none";

export type EvidenceDocument = {
  id: string;
  title: string;
  category: string;
  summary: string;
  sourceNote: string;
  availability: "preview-and-download" | "preview-only" | "summary-only";
  sourceType: string;
  publicationState: EvidencePublicationState;
  provenance: string;
  redactionNote: string;
  pageCount: number;
  pages: EvidencePage[];
  downloadPolicy: EvidenceDownloadPolicy;
  assetUrl?: string;
  downloadName?: string;
  thumbnailUrl?: string;
  thumbnailAlt?: string;
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  initiativeId: string;
  dateOrPeriod?: string;
};

export type ContactContent = {
  statement: string;
  privacyNote: string;
  draftHelper: string;
  draftButtonLabel: string;
  draftSubject: string;
};

export type SectionCopy = {
  eyebrow: string;
  title: string;
  intro: string;
};

export type ContentSectionId = Exclude<SectionId, "introduction">;

export type SectionCopyMap = Record<ContentSectionId, SectionCopy>;
