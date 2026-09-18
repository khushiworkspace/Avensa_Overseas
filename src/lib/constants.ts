import type {
  Country,
  ImmigrationRoute,
  ImmigrationCategory,
} from "@/types";

// ─── Company ──────────────────────────────────────────────────────────────────

export const COMPANY = {
  name: "Avensa Overseas",
  tagline: "Your Trusted EU Immigration Partner",
  email: "avensaoverseas@gmail.com",
  phone: "+370 656 90429",
  whatsapp: "https://wa.me/37065690429",
  address: "Vilnius, Lithuania  ·  Mumbai, India",
  locations: [
    { city: "Vilnius", country: "Lithuania", region: "Europe" },
    { city: "Mumbai",  country: "India",     region: "Asia"   },
  ],
  socials: {
    instagram: "https://www.instagram.com/avensaoverseas",
    facebook:  "https://www.facebook.com/share/1HGewZnS5T/",
    whatsapp:  "https://wa.me/370656904293",
  },
  disclaimer:
    "Avensa Overseas provides informational guidance only. All immigration decisions are made by the competent national authority of the destination country. Information on this portal does not constitute legal advice. Rule versions and effective dates are displayed for reference. Always verify requirements with official government sources.",
} as const;

// ─── Countries ────────────────────────────────────────────────────────────────

export const COUNTRIES: Country[] = [
  {
    id: "de",
    code: "DE",
    name: "Germany",
    flagUrl: "https://flagcdn.com/w80/de.png",
    capital: "Berlin",
    languages: ["German"],
    currency: "EUR",
    schengen: true,
    eu: true,
    supportedRoutes: ["work", "study", "family", "residence", "visit"],
    officialImmigrationUrl: "https://www.make-it-in-germany.com",
    description:
      "Germany offers one of Europe's most structured immigration frameworks, with the Skilled Worker Act opening doors for qualified professionals worldwide.",
    processingInfo: "Typical processing: 4–12 weeks depending on route.",
    status: "active",
  },
  {
    id: "fr",
    code: "FR",
    name: "France",
    flagUrl: "https://flagcdn.com/w80/fr.png",
    capital: "Paris",
    languages: ["French"],
    currency: "EUR",
    schengen: true,
    eu: true,
    supportedRoutes: ["work", "study", "family", "residence", "visit"],
    officialImmigrationUrl: "https://www.service-public.fr",
    description:
      "France provides diverse immigration pathways through its Talent Passport and family reunification programs.",
    processingInfo: "Typical processing: 6–16 weeks depending on route.",
    status: "active",
  },
  {
    id: "nl",
    code: "NL",
    name: "Netherlands",
    flagUrl: "https://flagcdn.com/w80/nl.png",
    capital: "Amsterdam",
    languages: ["Dutch"],
    currency: "EUR",
    schengen: true,
    eu: true,
    supportedRoutes: ["work", "study", "family", "residence", "visit"],
    officialImmigrationUrl: "https://www.ind.nl/en",
    description:
      "The Netherlands is a gateway for highly skilled migrants and international students, with English widely spoken.",
    processingInfo: "Typical processing: 4–10 weeks depending on route.",
    status: "active",
  },
  {
    id: "be",
    code: "BE",
    name: "Belgium",
    flagUrl: "https://flagcdn.com/w80/be.png",
    capital: "Brussels",
    languages: ["French", "Dutch", "German"],
    currency: "EUR",
    schengen: true,
    eu: true,
    supportedRoutes: ["work", "study", "family", "residence", "visit"],
    officialImmigrationUrl: "https://dofi.ibz.be",
    description:
      "Belgium, home to EU institutions, offers various permits for professionals, students, and families.",
    processingInfo: "Typical processing: 5–14 weeks depending on route.",
    status: "active",
  },
  {
    id: "se",
    code: "SE",
    name: "Sweden",
    flagUrl: "https://flagcdn.com/w80/se.png",
    capital: "Stockholm",
    languages: ["Swedish"],
    currency: "SEK",
    schengen: true,
    eu: true,
    supportedRoutes: ["work", "study", "family", "residence"],
    officialImmigrationUrl: "https://www.migrationsverket.se/en",
    description:
      "Sweden is known for high quality of life and strong labor market, welcoming skilled workers and researchers.",
    processingInfo: "Typical processing: 4–16 weeks depending on route.",
    status: "active",
  },
  {
    id: "es",
    code: "ES",
    name: "Spain",
    flagUrl: "https://flagcdn.com/w80/es.png",
    capital: "Madrid",
    languages: ["Spanish"],
    currency: "EUR",
    schengen: true,
    eu: true,
    supportedRoutes: ["work", "study", "family", "residence", "visit", "special"],
    officialImmigrationUrl: "https://extranjeros.inclusion.gob.es",
    description:
      "Spain offers Digital Nomad visas, Entrepreneur permits, and Non-Lucrative residency options.",
    processingInfo: "Typical processing: 6–20 weeks depending on route.",
    status: "active",
  },
  {
    id: "it",
    code: "IT",
    name: "Italy",
    flagUrl: "https://flagcdn.com/w80/it.png",
    capital: "Rome",
    languages: ["Italian"],
    currency: "EUR",
    schengen: true,
    eu: true,
    supportedRoutes: ["work", "study", "family", "residence", "visit"],
    officialImmigrationUrl: "https://vistoperitalia.esteri.it",
    description:
      "Italy's Decreto Flussi sets annual quotas for work permits; it also offers residency for self-employed and investors.",
    processingInfo: "Typical processing: 8–24 weeks depending on route.",
    status: "active",
  },
  {
    id: "pt",
    code: "PT",
    name: "Portugal",
    flagUrl: "https://flagcdn.com/w80/pt.png",
    capital: "Lisbon",
    languages: ["Portuguese"],
    currency: "EUR",
    schengen: true,
    eu: true,
    supportedRoutes: ["work", "study", "family", "residence", "special"],
    officialImmigrationUrl: "https://imigrante.sef.pt",
    description:
      "Portugal offers the Digital Nomad Visa (D8), job-seeker visa, and pathways for retirees and investors.",
    processingInfo: "Typical processing: 4–12 weeks depending on route.",
    status: "active",
  },
  {
    id: "pl",
    code: "PL",
    name: "Poland",
    flagUrl: "https://flagcdn.com/w80/pl.png",
    capital: "Warsaw",
    languages: ["Polish"],
    currency: "PLN",
    schengen: true,
    eu: true,
    supportedRoutes: ["work", "study", "family", "residence"],
    officialImmigrationUrl: "https://www.gov.pl/web/mswia",
    description:
      "Poland has seen significant labor immigration growth, with streamlined work permit processes.",
    processingInfo: "Typical processing: 3–8 weeks depending on route.",
    status: "active",
  },
  {
    id: "at",
    code: "AT",
    name: "Austria",
    flagUrl: "https://flagcdn.com/w80/at.png",
    capital: "Vienna",
    languages: ["German"],
    currency: "EUR",
    schengen: true,
    eu: true,
    supportedRoutes: ["work", "study", "family", "residence"],
    officialImmigrationUrl: "https://www.migration.gv.at",
    description:
      "Austria's Red-White-Red Card system provides points-based immigration for skilled workers.",
    processingInfo: "Typical processing: 4–12 weeks depending on route.",
    status: "active",
  },
  {
    id: "fi",
    code: "FI",
    name: "Finland",
    flagUrl: "https://flagcdn.com/w80/fi.png",
    capital: "Helsinki",
    languages: ["Finnish", "Swedish"],
    currency: "EUR",
    schengen: true,
    eu: true,
    supportedRoutes: ["work", "study", "family", "residence"],
    officialImmigrationUrl: "https://migri.fi/en",
    description:
      "Finland actively recruits skilled workers and researchers, especially in tech and healthcare sectors.",
    processingInfo: "Typical processing: 3–8 weeks depending on route.",
    status: "active",
  },
  {
    id: "lt",
    code: "LT",
    name: "Lithuania",
    flagUrl: "https://flagcdn.com/w80/lt.png",
    capital: "Vilnius",
    languages: ["Lithuanian"],
    currency: "EUR",
    schengen: true,
    eu: true,
    supportedRoutes: ["work", "study", "family", "residence"],
    officialImmigrationUrl: "https://www.migracija.lt/en",
    description:
      "Lithuania offers straightforward work and residency permits, with a growing startup ecosystem.",
    processingInfo: "Typical processing: 2–6 weeks depending on route.",
    status: "active",
  },
  {
    id: "ee",
    code: "EE",
    name: "Estonia",
    flagUrl: "https://flagcdn.com/w80/ee.png",
    capital: "Tallinn",
    languages: ["Estonian"],
    currency: "EUR",
    schengen: true,
    eu: true,
    supportedRoutes: ["work", "study", "family", "residence", "special"],
    officialImmigrationUrl: "https://www.politsei.ee/en/",
    description:
      "Estonia is a digital-first country offering e-Residency and Digital Nomad Visa for remote workers.",
    processingInfo: "Typical processing: 2–5 weeks depending on route.",
    status: "active",
  },
];

// ─── Immigration Routes ───────────────────────────────────────────────────────

export const IMMIGRATION_ROUTES: ImmigrationRoute[] = [
  {
    id: "de-skilled-worker",
    countryId: "de",
    category: "work",
    name: "Skilled Worker Visa",
    slug: "skilled-worker",
    shortDescription: "For qualified professionals with a recognised degree and a job offer.",
    description:
      "The German Skilled Worker Visa (Fachkräftezuzug) is designed for non-EU nationals with a recognised foreign professional qualification or academic degree. Applicants must have a concrete job offer or employment contract from a German employer.",
    eligibilityHighlights: [
      "Recognised foreign degree or vocational qualification",
      "Job offer from a German employer",
      "Salary meets sectoral minimum (or Skilled Worker Act salary threshold)",
      "Adequate health insurance",
      "Sufficient German language skills for the role",
    ],
    typicalDuration: "Initial: up to 4 years; renewable",
    processingTime: "4–8 weeks",
    fees: [
      { label: "Visa Application Fee", amount: 75, currency: "EUR", type: "government" },
      { label: "Avensa Service Fee", amount: 199, currency: "EUR", type: "service" },
    ],
    requiredDocuments: [
      "Valid passport",
      "Completed application form",
      "Biometric photo",
      "Recognised degree/qualification certificate",
      "Employment contract",
      "Statement of comparability (if required)",
      "Health insurance proof",
      "CV/Resume",
    ],
    status: "active",
    effectiveFrom: "2024-01-01",
    sourceUrl: "https://www.make-it-in-germany.com/en/visa-residence/skilled-immigration-act",
    version: "2024.1",
    updatedAt: "2024-01-15",
  },
  {
    id: "de-eu-blue-card",
    countryId: "de",
    category: "work",
    name: "EU Blue Card",
    slug: "eu-blue-card",
    shortDescription: "High-qualification work permit for university graduates earning above the salary threshold.",
    description:
      "The EU Blue Card is an EU-wide work and residence permit for highly qualified non-EU workers. In Germany, applicants must hold a recognised university degree and receive a salary of at least €45,300 per year (or €41,041.80 for shortage occupations as of 2024).",
    eligibilityHighlights: [
      "University degree (at least 3 years of study)",
      "Job offer with salary ≥ €45,300 p.a. (general) or ≥ €41,041.80 (shortage occupations)",
      "Binding job offer or employment contract",
      "Health insurance",
    ],
    typicalDuration: "Up to 4 years; permanent residence after 27 months (21 with B1 German)",
    processingTime: "4–10 weeks",
    fees: [
      { label: "Residence Permit Fee", amount: 100, currency: "EUR", type: "government" },
      { label: "Avensa Service Fee", amount: 249, currency: "EUR", type: "service" },
    ],
    requiredDocuments: [
      "Valid passport",
      "Biometric photo",
      "University degree certificate",
      "Employment contract with salary details",
      "Health insurance proof",
      "Proof of accommodation in Germany",
    ],
    status: "active",
    effectiveFrom: "2024-01-01",
    sourceUrl: "https://www.bamf.de/EN/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Migrathek/BlaueKarte/blaue-karte-node.html",
    version: "2024.1",
    updatedAt: "2024-01-15",
  },
  {
    id: "de-job-seeker",
    countryId: "de",
    category: "work",
    name: "Job Seeker Visa",
    slug: "job-seeker",
    shortDescription: "Allows qualified professionals to enter Germany for up to 6 months to look for work.",
    description:
      "The German Job Seeker Visa allows non-EU nationals with a recognised degree to enter Germany for up to 6 months to search for a suitable job. A job offer is not required at the time of application.",
    eligibilityHighlights: [
      "Recognised university or vocational qualification",
      "Sufficient German or English proficiency",
      "Proof of financial means (min. ~€1,500/month)",
      "Health insurance for the stay",
    ],
    typicalDuration: "Up to 6 months (non-extendable for job seeking)",
    processingTime: "3–6 weeks",
    fees: [
      { label: "Visa Application Fee", amount: 75, currency: "EUR", type: "government" },
      { label: "Avensa Service Fee", amount: 149, currency: "EUR", type: "service" },
    ],
    requiredDocuments: [
      "Valid passport",
      "Biometric photo",
      "Recognised degree certificate",
      "Proof of financial means",
      "Health insurance",
      "Motivation letter",
      "CV/Resume",
    ],
    status: "active",
    effectiveFrom: "2024-01-01",
    sourceUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/job-seeker-visa",
    version: "2024.1",
    updatedAt: "2024-01-15",
  },
  {
    id: "de-student",
    countryId: "de",
    category: "study",
    name: "Student Visa (National)",
    slug: "student-visa",
    shortDescription: "For students accepted at a German university or higher education institution.",
    description:
      "The German Student Visa allows non-EU nationals to study at a German higher education institution. An unconditional letter of admission is required.",
    eligibilityHighlights: [
      "Unconditional admission to a German university",
      "Proof of financial means (€934/month or blocked account)",
      "Health insurance",
      "Adequate German or English language skills for the course",
    ],
    typicalDuration: "For duration of studies; extendable",
    processingTime: "4–8 weeks",
    fees: [
      { label: "Visa Application Fee", amount: 75, currency: "EUR", type: "government" },
      { label: "Avensa Service Fee", amount: 129, currency: "EUR", type: "service" },
    ],
    requiredDocuments: [
      "Valid passport",
      "University admission letter",
      "Proof of financial means / blocked account",
      "Health insurance",
      "Language proficiency certificate",
      "Academic transcripts",
      "Motivation letter",
    ],
    status: "active",
    effectiveFrom: "2024-01-01",
    sourceUrl: "https://www.study-in-germany.de",
    version: "2024.1",
    updatedAt: "2024-01-15",
  },
  {
    id: "nl-highly-skilled",
    countryId: "nl",
    category: "work",
    name: "Highly Skilled Migrant",
    slug: "highly-skilled-migrant",
    shortDescription: "Fast-track permit for high-earning professionals sponsored by a recognised employer.",
    description:
      "The Netherlands Highly Skilled Migrant (HSM) permit is available to non-EU nationals employed by a recognised sponsor employer earning above the salary threshold.",
    eligibilityHighlights: [
      "Employment by a recognised IND sponsor",
      "Salary ≥ €5,008/month (under 30) or ≥ €6,764/month (30+) for 2024",
      "Valid passport",
    ],
    typicalDuration: "Up to 5 years; renewable",
    processingTime: "2–4 weeks",
    fees: [
      { label: "IND Application Fee", amount: 285, currency: "EUR", type: "government" },
      { label: "Avensa Service Fee", amount: 199, currency: "EUR", type: "service" },
    ],
    requiredDocuments: [
      "Valid passport",
      "Employment contract",
      "Employer sponsor reference number (IND)",
      "Diploma/degree (if applicable)",
    ],
    status: "active",
    effectiveFrom: "2024-01-01",
    sourceUrl: "https://ind.nl/en/work/working_in_the_Netherlands/Pages/Highly-skilled-migrant.aspx",
    version: "2024.1",
    updatedAt: "2024-01-15",
  },
  {
    id: "es-digital-nomad",
    countryId: "es",
    category: "special",
    name: "Digital Nomad Visa",
    slug: "digital-nomad",
    shortDescription: "For remote workers and freelancers working for non-Spanish companies or clients.",
    description:
      "Spain's Digital Nomad Visa (Visado para teletrabajadores de carácter internacional) allows remote workers to live in Spain while working for foreign employers or clients.",
    eligibilityHighlights: [
      "Work remotely for companies outside Spain (max 20% Spanish income)",
      "Monthly income ≥ 200% of Spanish minimum wage (~€2,646/month for 2024)",
      "Health insurance in Spain",
      "Clean criminal record",
      "Minimum 1 year with current employer (employed) or established remote business",
    ],
    typicalDuration: "1 year; extendable to 3+2 years",
    processingTime: "4–8 weeks",
    fees: [
      { label: "Visa Application Fee", amount: 80, currency: "EUR", type: "government" },
      { label: "Avensa Service Fee", amount: 179, currency: "EUR", type: "service" },
    ],
    requiredDocuments: [
      "Valid passport",
      "Proof of employment / client contracts",
      "Proof of income (3 months payslips or bank statements)",
      "Health insurance",
      "Criminal background check",
      "Company registration documents (if self-employed)",
    ],
    status: "active",
    effectiveFrom: "2023-01-01",
    sourceUrl: "https://extranjeros.inclusion.gob.es/es/VisadosNacionales/regimen/trabajadores_cuenta_ajena/digital_nomad/index.html",
    version: "2024.1",
    updatedAt: "2024-03-01",
  },
  {
    id: "pt-d8-digital-nomad",
    countryId: "pt",
    category: "special",
    name: "Digital Nomad Visa (D8)",
    slug: "d8-digital-nomad",
    shortDescription: "Portugal's passive income and remote work visa for non-EU nationals.",
    description:
      "The Portuguese D8 visa (formerly the passive income visa, now officially the Digital Nomad Visa) allows remote workers with income from abroad to live in Portugal.",
    eligibilityHighlights: [
      "Prove remote work income ≥ 4× Portuguese minimum wage (~€3,280/month for 2024)",
      "Health insurance valid in Portugal",
      "Clean criminal record",
      "Proof of accommodation",
    ],
    typicalDuration: "1 year; renewable for 2+2 years",
    processingTime: "4–10 weeks",
    fees: [
      { label: "Visa Application Fee", amount: 90, currency: "EUR", type: "government" },
      { label: "Avensa Service Fee", amount: 169, currency: "EUR", type: "service" },
    ],
    requiredDocuments: [
      "Valid passport",
      "Proof of remote income",
      "Health insurance",
      "Criminal record certificate",
      "Proof of accommodation",
      "Bank statements (3 months)",
    ],
    status: "active",
    effectiveFrom: "2022-10-01",
    sourceUrl: "https://imigrante.sef.pt/solicitar/vistos/visto-de-residencia/d8/",
    version: "2024.1",
    updatedAt: "2024-01-15",
  },
];

// ─── Categories ───────────────────────────────────────────────────────────────

export const CATEGORY_LABELS: Record<ImmigrationCategory, string> = {
  work: "Work",
  study: "Study",
  family: "Family",
  residence: "Residence",
  visit: "Visit",
  special: "Special Permits",
};

export const CATEGORY_DESCRIPTIONS: Record<ImmigrationCategory, string> = {
  work: "Employment-based visas and work permits",
  study: "Student visas and academic exchange programs",
  family: "Family reunification and dependent visas",
  residence: "Long-term and permanent residence permits",
  visit: "Tourism, business travel, and short stays",
  special: "Digital nomad, entrepreneur, researcher and other permits",
};

export const CATEGORY_ICONS: Record<ImmigrationCategory, string> = {
  work: "Briefcase",
  study: "GraduationCap",
  family: "Users",
  residence: "Home",
  visit: "Plane",
  special: "Star",
};

export const CATEGORY_COLORS: Record<ImmigrationCategory, string> = {
  work: "bg-blue-100 text-blue-700",
  study: "bg-purple-100 text-purple-700",
  family: "bg-green-100 text-green-700",
  residence: "bg-orange-100 text-orange-700",
  visit: "bg-sky-100 text-sky-700",
  special: "bg-gold-100 text-gold-700",
};

// ─── Application statuses ─────────────────────────────────────────────────────

import type { ApplicationStatus } from "@/types";

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  draft: "Draft",
  submitted: "Submitted",
  document_review: "Document Review",
  additional_documents: "Additional Documents Required",
  appointment_scheduled: "Appointment Scheduled",
  biometrics: "Biometrics",
  under_review: "Under Review",
  decision_made: "Decision Made",
  approved: "Approved",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
  completed: "Completed",
};

export const APPLICATION_STATUS_COLORS: Record<ApplicationStatus, string> = {
  draft: "badge-slate",
  submitted: "badge-blue",
  document_review: "badge-yellow",
  additional_documents: "badge-yellow",
  appointment_scheduled: "badge-blue",
  biometrics: "badge-blue",
  under_review: "badge-purple",
  decision_made: "badge-purple",
  approved: "badge-green",
  rejected: "badge-red",
  withdrawn: "badge-slate",
  completed: "badge-green",
};

// ─── Document types ───────────────────────────────────────────────────────────

import type { DocumentType, DocumentStatus } from "@/types";

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  passport: "Passport",
  photo: "Biometric Photo",
  degree: "Degree / Academic Certificate",
  employment_contract: "Employment Contract",
  salary_slip: "Salary Slip / Payslip",
  bank_statement: "Bank Statement",
  insurance: "Health / Travel Insurance",
  police_clearance: "Police Clearance Certificate",
  accommodation: "Proof of Accommodation",
  birth_certificate: "Birth Certificate",
  marriage_certificate: "Marriage Certificate",
  job_offer: "Job Offer Letter",
  language_certificate: "Language Proficiency Certificate",
  tax_return: "Tax Return",
  other: "Other Document",
};

export const DOCUMENT_STATUS_COLORS: Record<DocumentStatus, string> = {
  required: "badge-yellow",
  uploaded: "badge-blue",
  under_review: "badge-purple",
  accepted: "badge-green",
  rejected: "badge-red",
  replacement_required: "badge-red",
};

// ─── Nationalities (sample) ───────────────────────────────────────────────────

export const NATIONALITIES = [
  "Afghan", "Albanian", "Algerian", "American", "Argentinian", "Australian",
  "Austrian", "Bangladeshi", "Belgian", "Brazilian", "British", "Bulgarian",
  "Canadian", "Chilean", "Chinese", "Colombian", "Croatian", "Czech",
  "Danish", "Egyptian", "Ethiopian", "Finnish", "French", "German", "Ghanaian",
  "Greek", "Hungarian", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish",
  "Israeli", "Italian", "Japanese", "Jordanian", "Kenyan", "Korean",
  "Lebanese", "Lithuanian", "Malaysian", "Mexican", "Moroccan", "Dutch",
  "New Zealander", "Nigerian", "Norwegian", "Pakistani", "Peruvian",
  "Filipino", "Polish", "Portuguese", "Romanian", "Russian", "Saudi",
  "Serbian", "Singaporean", "South African", "Spanish", "Sri Lankan",
  "Swedish", "Swiss", "Syrian", "Thai", "Turkish", "Ukrainian", "Emirati",
  "Venezuelan", "Vietnamese", "Zimbabwean",
].sort();

// ─── Education levels ─────────────────────────────────────────────────────────

export const EDUCATION_LEVELS = [
  { value: "none", label: "No Formal Education" },
  { value: "primary", label: "Primary / Elementary" },
  { value: "secondary", label: "Secondary / High School" },
  { value: "vocational", label: "Vocational / Trade Qualification" },
  { value: "bachelor", label: "Bachelor's Degree" },
  { value: "master", label: "Master's Degree" },
  { value: "phd", label: "PhD / Doctorate" },
  { value: "postdoc", label: "Post-Doctoral" },
];

// ─── Language proficiency levels ──────────────────────────────────────────────

export const LANGUAGE_LEVELS = [
  { value: "none", label: "None" },
  { value: "a1", label: "A1 - Beginner" },
  { value: "a2", label: "A2 - Elementary" },
  { value: "b1", label: "B1 - Intermediate" },
  { value: "b2", label: "B2 - Upper Intermediate" },
  { value: "c1", label: "C1 - Advanced" },
  { value: "c2", label: "C2 - Proficient" },
  { value: "native", label: "Native / Bilingual" },
];

// ─── Navigation ───────────────────────────────────────────────────────────────

export const PUBLIC_NAV_LINKS = [
  { label: "Countries", href: "/countries" },
  { label: "Routes", href: "/routes" },
  { label: "Eligibility Check", href: "/eligibility" },
  { label: "Short-Stay Calculator", href: "/calculator" },
  { label: "Knowledge Base", href: "/knowledge-base" },
  { label: "News", href: "/news" },
  { label: "Team", href: "/#team" },
  { label: "Contact", href: "/contact" },
];

export const APPLICANT_NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "My Applications", href: "/dashboard/applications", icon: "FileText" },
  { label: "Documents", href: "/dashboard/documents", icon: "FolderOpen" },
  { label: "Appointments", href: "/dashboard/appointments", icon: "Calendar" },
  { label: "Payments", href: "/dashboard/payments", icon: "CreditCard" },
  { label: "Notifications", href: "/dashboard/notifications", icon: "Bell" },
  { label: "Profile", href: "/dashboard/profile", icon: "User" },
  { label: "Help", href: "/dashboard/help", icon: "HelpCircle" },
];

export const OFFICER_NAV_LINKS = [
  { label: "Queue", href: "/officer", icon: "List" },
  { label: "Cases", href: "/officer/cases", icon: "Briefcase" },
  { label: "Documents", href: "/officer/documents", icon: "FileCheck" },
  { label: "Notes", href: "/officer/notes", icon: "StickyNote" },
];

export const ADMIN_NAV_LINKS = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Users", href: "/admin/users", icon: "Users" },
  { label: "Roles", href: "/admin/roles", icon: "Shield" },
  { label: "Countries", href: "/admin/countries", icon: "Globe" },
  { label: "Routes", href: "/admin/routes", icon: "Map" },
  { label: "Rules Engine", href: "/admin/rules", icon: "Settings2" },
  { label: "Applications", href: "/admin/applications", icon: "FileText" },
  { label: "Appointments", href: "/admin/appointments", icon: "Calendar" },
  { label: "Payments", href: "/admin/payments", icon: "DollarSign" },
  { label: "CMS / Content", href: "/admin/cms", icon: "Edit" },
  { label: "Notifications", href: "/admin/notifications", icon: "Bell" },
  { label: "Audit Logs", href: "/admin/audit", icon: "Activity" },
  { label: "Settings", href: "/admin/settings", icon: "Settings" },
];
