import hematologyAcknowledgementUrl from "../assets/documents/hematology-volunteering-acknowledgement.pdf";
import cvUrl from "../assets/documents/nguyen-tuan-gia-linh-cv.pdf";
import researchAwardCertificateUrl from "../assets/documents/research-gold-medal-certificate.pdf";
import type { EvidenceDocument } from "../types/medical";

export const evidenceDocuments = (
  [
    {
      id: "curriculum-vitae",
      significanceRank: 6,
      title: "Curriculum Vitae",
      category: "Profile",
      summary:
        "Two-page overview of education, research, service, and extracurricular experience.",
      sourceNote:
        "Public copy reviewed for contact and identity information. Its IELTS 7.5 entry now aligns with the latest official report.",
      availability: "preview-and-download",
      sourceType: "Owner-supplied curriculum vitae",
      publicationState: "public-sanitized-evidence",
      provenance:
        "Reviewed two-page CV supplied separately by the portfolio owner.",
      redactionNote:
        "Reviewed public copy; no private contact details are exposed.",
      pageCount: 2,
      pages: [
        {
          id: "cv-page-1",
          label: "Page 1",
          imageUrl: "/documents/pages/cv-01.jpg",
          alt: "Page 1 of Nguyễn Tuấn Gia Linh's curriculum vitae",
        },
        {
          id: "cv-page-2",
          label: "Page 2",
          imageUrl: "/documents/pages/cv-02.jpg",
          alt: "Page 2 of Nguyễn Tuấn Gia Linh's curriculum vitae",
        },
      ],
      downloadPolicy: "download",
      assetUrl: cvUrl,
      downloadName: "nguyen-tuan-gia-linh-cv.pdf",
      thumbnailUrl: "/documents/pages/cv-01.jpg",
      thumbnailAlt:
        "First page preview of Nguyễn Tuấn Gia Linh's curriculum vitae",
    },
    {
      id: "hematology-acknowledgement",
      significanceRank: 8,
      title: "Hematology volunteering acknowledgement",
      category: "Community service",
      summary:
        "Acknowledgement of the 30 July 2026 pediatric gift-giving activity.",
      sourceNote:
        "Rasterized public-safe copy with the source document's external link removed.",
      availability: "preview-and-download",
      sourceType: "Institutional acknowledgement",
      publicationState: "public-sanitized-evidence",
      provenance:
        "Sanitized derivative of the acknowledgement supplied in the hematology activity folder.",
      redactionNote:
        "External action link removed; substantive acknowledgement preserved.",
      pageCount: 1,
      pages: [
        {
          id: "hematology-page-1",
          label: "Page 1",
          imageUrl: "/documents/pages/hematology-01.jpg",
          alt: "Sanitized hematology volunteering acknowledgement page",
        },
      ],
      downloadPolicy: "download",
      assetUrl: hematologyAcknowledgementUrl,
      downloadName: "hematology-volunteering-acknowledgement.pdf",
      thumbnailUrl: "/documents/pages/hematology-01.jpg",
      thumbnailAlt:
        "First page preview of the hematology volunteering acknowledgement letter",
    },
    {
      id: "school-record",
      significanceRank: 5,
      title: "Upper-secondary academic record",
      category: "Academic record",
      summary:
        "Verified Grade 10–12 GPA, recognition, and subject-result highlights.",
      sourceNote:
        "Verified summary: the private eight-page source includes a portrait and personal record details.",
      availability: "preview-only",
      sourceType: "Private school record",
      publicationState: "verified-summary",
      provenance:
        "Values cross-checked against the supplied Grade 10–12 record.",
      redactionNote:
        "Designed summary used instead of redacting the original portrait and identifiers.",
      pageCount: 2,
      pages: [
        {
          id: "school-record-summary-1",
          label: "Summary 1",
          imageUrl: "/documents/pages/school-record-summary-01.svg",
          alt: "Verified summary of Grade 10 to 12 GPA and excellent-student recognition",
        },
        {
          id: "school-record-summary-2",
          label: "Summary 2",
          imageUrl: "/documents/pages/school-record-summary-02.svg",
          alt: "Verified summary of Grade 12 subject highlights",
        },
      ],
      downloadPolicy: "none",
      thumbnailUrl: "/documents/pages/school-record-summary-01.svg",
      thumbnailAlt: "Verified upper-secondary academic record summary",
    },
    {
      id: "igcse-statement",
      significanceRank: 4,
      title: "Cambridge IGCSE statement",
      category: "Qualification",
      summary:
        "Verified five subject grades and percentage uniform marks from June 2024.",
      sourceNote:
        "Verified summary: the private original contains birth and candidate identifiers.",
      availability: "preview-only",
      sourceType: "Private official result statement",
      publicationState: "verified-summary",
      provenance:
        "Grades and percentage uniform marks cross-checked against the supplied statement.",
      redactionNote:
        "Designed summary used instead of publishing candidate and birth identifiers.",
      pageCount: 1,
      pages: [
        {
          id: "igcse-summary",
          label: "Summary",
          imageUrl: "/documents/pages/igcse-summary.svg",
          alt: "Verified Cambridge IGCSE grade and percentage uniform mark summary",
        },
      ],
      downloadPolicy: "none",
      thumbnailUrl: "/documents/pages/igcse-summary.svg",
      thumbnailAlt: "Verified Cambridge IGCSE result summary",
    },
    {
      id: "ielts-result",
      significanceRank: 3,
      title: "IELTS Academic result",
      category: "Qualification",
      summary:
        "Official overall band 7.5 with Listening 8.5, Reading 8.0, Writing 7.0, Speaking 6.5, and CEFR C1.",
      sourceNote:
        "Official result is authoritative; the private original contains a portrait and candidate identifiers.",
      availability: "preview-only",
      sourceType: "Private official IELTS report",
      publicationState: "verified-summary",
      provenance:
        "Scores cross-checked against the owner-supplied official result document dated 14 August 2026.",
      redactionNote:
        "Designed summary used instead of publishing the official portrait and identifiers.",
      pageCount: 1,
      pages: [
        {
          id: "ielts-summary",
          label: "Summary",
          imageUrl: "/documents/pages/ielts-summary.svg",
          alt: "Verified IELTS Academic overall and component score summary",
        },
      ],
      downloadPolicy: "none",
      thumbnailUrl: "/documents/pages/ielts-summary.svg",
      thumbnailAlt: "Verified IELTS Academic result summary",
    },
    {
      id: "research-gold-medal",
      significanceRank: 1,
      title: "Research project Gold Medal certificate",
      category: "Research recognition",
      summary:
        "Gold Medal awarded to the four-person project team for the nanoformulated Cordyceps militaris research project at the Innoverse Invention & Innovation Expo.",
      sourceNote:
        "Public certificate dated 24 August 2026; the team attribution and project title are preserved.",
      availability: "preview-and-download",
      sourceType: "Research award certificate",
      publicationState: "public-sanitized-evidence",
      provenance:
        "Owner-supplied one-page certificate reviewed visually against the existing research project title.",
      redactionNote:
        "Flattened public copy removes source-file metadata while preserving the award, team names, signatures, and public verification mark.",
      pageCount: 1,
      pages: [
        {
          id: "research-gold-medal-page-1",
          label: "Page 1",
          imageUrl: "/documents/pages/research-gold-medal-certificate.jpg",
          alt: "Gold Medal certificate for the nanoformulated Cordyceps militaris research project",
        },
      ],
      downloadPolicy: "download",
      assetUrl: researchAwardCertificateUrl,
      downloadName: "research-gold-medal-certificate.pdf",
      thumbnailUrl: "/documents/pages/research-gold-medal-certificate.jpg",
      thumbnailAlt: "Preview of the research project Gold Medal certificate",
    },
    {
      id: "admission-and-graduation",
      significanceRank: 2,
      title: "Admission and graduation records",
      category: "Milestones",
      summary:
        "Verified 2026 upper-secondary completion and Medicine program admission with a score of 27.20.",
      sourceNote:
        "Verified summaries: the private originals contain birth, identity, enrolment, financial, QR, and register details.",
      availability: "preview-only",
      sourceType: "Private diploma and admission notice",
      publicationState: "verified-summary",
      provenance:
        "Milestones cross-checked against the supplied diploma and admission notice.",
      redactionNote:
        "Designed summaries used because safe redaction would leave misleading fragments.",
      pageCount: 2,
      pages: [
        {
          id: "admission-summary",
          label: "Admission",
          imageUrl: "/documents/pages/admission-summary.svg",
          alt: "Verified summary of 2026 Medicine program admission and score 27.20",
        },
        {
          id: "graduation-summary",
          label: "Graduation",
          imageUrl: "/documents/pages/graduation-summary.svg",
          alt: "Verified summary of 2026 upper-secondary school completion",
        },
      ],
      downloadPolicy: "none",
      thumbnailUrl: "/documents/pages/admission-summary.svg",
      thumbnailAlt: "Verified Medicine program admission summary",
    },
    {
      id: "community-project-records",
      significanceRank: 7,
      title: "Community project records",
      category: "Community service",
      summary:
        "Verified collective outcomes from the multi-year school project and 2025 Lunar New Year support program.",
      sourceNote:
        "Verified summaries: private documents and screenshots contain contact, financial, donor, or third-party details.",
      availability: "preview-only",
      sourceType: "Private DOCX records and documentary screenshots",
      publicationState: "verified-summary",
      provenance:
        "Facts cross-checked against both project documents, supporting screenshots, and the formal thank-you record.",
      redactionNote:
        "Designed summaries exclude bank, contact, donor, and unnecessary third-party details.",
      pageCount: 3,
      pages: [
        {
          id: "community-project-summary-1",
          label: "Project 1",
          imageUrl: "/documents/pages/community-project-summary-01.svg",
          alt: "Verified summary of the Walking With You to School project and support for 50 children",
        },
        {
          id: "community-project-summary-2",
          label: "Project 2",
          imageUrl: "/documents/pages/community-project-summary-02.svg",
          alt: "Verified summary of collective school and wider community project outcomes",
        },
        {
          id: "lunar-new-year-summary",
          label: "Lunar New Year",
          imageUrl: "/documents/pages/lunar-new-year-summary.svg",
          alt: "Verified summary of the 2025 Lunar New Year support program and 165 gifts",
        },
      ],
      downloadPolicy: "none",
      thumbnailUrl: "/documents/pages/community-project-summary-01.svg",
      thumbnailAlt: "Verified community project records summary",
    },
  ] satisfies EvidenceDocument[]
).sort((first, second) => first.significanceRank - second.significanceRank);

const curriculumVitaeDocument = evidenceDocuments.find(
  (document) => document.id === "curriculum-vitae",
);

if (!curriculumVitaeDocument) {
  throw new Error("Curriculum vitae evidence document is required");
}

export const cvDocument = curriculumVitaeDocument;
