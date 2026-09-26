import type { ResearchProject } from "../types/medical";

export const researchProject = {
  title:
    "Nanoformulated Cordyceps militaris extract with enhanced water dispersibility and in-vitro cytotoxic activity",
  year: "2026",
  question:
    "Could a lecithin–maltodextrin nanoformulation improve the water dispersibility of Cordyceps militaris extract while retaining measurable activity in cell-line assays?",
  methods: [
    "Prepared an ethanol–water extract and formulated it with lecithin and maltodextrin.",
    "Used drying and ball milling to produce the formulation.",
    "Measured suspension behaviour, particle size distribution, and zeta potential.",
    "Reported in-vitro observations across HepG2, A549, MCF-7, and HL-60 human cancer cell lines.",
  ],
  reportedResults: [
    { subjectOrLabel: "Suspension OD600", value: "0.15 → 0.85" },
    { subjectOrLabel: "Mean particle size", value: "325 nm" },
    { subjectOrLabel: "Polydispersity index", value: "0.281" },
    { subjectOrLabel: "Zeta potential", value: "−23.3 mV" },
    { subjectOrLabel: "A549 reported IC50", value: "119.85 µg/mL" },
  ],
  scopeNote:
    "These are CV-reported results from an educational in-vitro project. They do not establish clinical efficacy, safety, or a treatment recommendation.",
} satisfies ResearchProject;
