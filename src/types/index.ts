// ─── User & Auth ─────────────────────────────────────────────────────────────

export type UserRole =
  | "applicant"
  | "case_officer"
  | "document_verifier"
  | "appointment_manager"
  | "finance"
  | "content_admin"
  | "super_admin";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: "active" | "inactive" | "suspended";
  avatar?: string;
  mfaEnabled: boolean;
  createdAt: string;
  lastLogin?: string;
}

// ─── Country & Routes ─────────────────────────────────────────────────────────

export type ImmigrationCategory =
  | "work"
  | "study"
  | "family"
  | "residence"
  | "visit"
  | "special";

export interface Country {
  id: string;
  code: string; // ISO 3166-1 alpha-2
  name: string;
  flagUrl: string;
  capital: string;
  languages: string[];
  currency: string;
  schengen: boolean;
  eu: boolean;
  supportedRoutes: ImmigrationCategory[];
  officialImmigrationUrl: string;
  description: string;
  processingInfo: string;
  status: "active" | "coming_soon";
}

export interface ImmigrationRoute {
  id: string;
  countryId: string;
  category: ImmigrationCategory;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  eligibilityHighlights: string[];
  typicalDuration: string;
  processingTime: string;
  fees: RouteFee[];
  requiredDocuments: string[];
  status: "active" | "draft" | "archived";
  effectiveFrom: string;
  sourceUrl: string;
  version: string;
  updatedAt: string;
}

export interface RouteFee {
  label: string;
  amount: number;
  currency: string;
  type: "government" | "service";
  note?: string;
}

// ─── Eligibility ──────────────────────────────────────────────────────────────

export interface EligibilityRule {
  id: string;
  routeId: string;
  criterionName: string;
  condition: "equals" | "gte" | "lte" | "in" | "not_in" | "required";
  value: string | number | string[];
  required: boolean;
  documentDependency?: string;
  effectiveFrom: string;
  effectiveTo?: string;
  sourceUrl: string;
  version: string;
  priority: number;
  notes?: string;
}

export interface EligibilityInput {
  nationality: string;
  residenceCountry: string;
  destinationCountry: string;
  purpose: ImmigrationCategory;
  age: number;
  education: string;
  occupation: string;
  yearsExperience: number;
  hasJobOffer: boolean;
  employerName?: string;
  annualSalary?: number;
  languageProficiency: string;
  familyStatus: string;
  currentImmigrationStatus: string;
  passportValidity: string;
}

export interface EligibilityResult {
  eligibleRoutes: EligibilityRouteResult[];
  ineligibleRoutes: EligibilityRouteResult[];
  ruleVersion: string;
  effectiveDate: string;
  disclaimer: string;
  assessedAt: string;
}

export interface EligibilityRouteResult {
  route: ImmigrationRoute;
  score: number;
  missingCriteria: string[];
  requiredDocuments: string[];
  nextSteps: string[];
}

// ─── Application ──────────────────────────────────────────────────────────────

export type ApplicationStatus =
  | "draft"
  | "submitted"
  | "document_review"
  | "additional_documents"
  | "appointment_scheduled"
  | "biometrics"
  | "under_review"
  | "decision_made"
  | "approved"
  | "rejected"
  | "withdrawn"
  | "completed";

export interface Application {
  id: string;
  applicantId: string;
  routeId: string;
  countryId: string;
  status: ApplicationStatus;
  currentStep: number;
  personalDetails: PersonalDetails;
  educationEmployment: EducationEmployment;
  familyInfo?: FamilyInfo;
  financialInfo?: FinancialInfo;
  travelHistory?: TravelHistory;
  ruleSnapshot: string; // JSON snapshot of rules used
  submittedAt?: string;
  createdAt: string;
  updatedAt: string;
  assignedOfficerId?: string;
  notes?: string;
  referenceNumber: string;
}

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface EducationEmployment {
  highestEducation: string;
  fieldOfStudy: string;
  institution: string;
  graduationYear: string;
  occupation: string;
  currentEmployer?: string;
  yearsExperience: number;
  hasJobOffer: boolean;
  jobOfferEmployer?: string;
  jobOfferPosition?: string;
  annualSalary?: number;
  currency?: string;
}

export interface FamilyInfo {
  maritalStatus: string;
  spouseName?: string;
  spouseNationality?: string;
  dependents: Dependent[];
}

export interface Dependent {
  relationship: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  accompanying: boolean;
}

export interface FinancialInfo {
  monthlyIncome: number;
  currency: string;
  bankBalance: number;
  sponsorshipAvailable: boolean;
  sponsorName?: string;
  sponsorRelationship?: string;
}

export interface TravelHistory {
  previousVisaRejections: boolean;
  rejectionDetails?: string;
  previousSchengenStays: SchengenStay[];
  currentResidenceStatus: string;
}

export interface SchengenStay {
  country: string;
  entryDate: string;
  exitDate: string;
}

export interface ApplicationStatusHistory {
  id: string;
  applicationId: string;
  status: ApplicationStatus;
  actor: string;
  actorRole: UserRole;
  timestamp: string;
  note?: string;
}

// ─── Documents ───────────────────────────────────────────────────────────────

export type DocumentStatus =
  | "required"
  | "uploaded"
  | "under_review"
  | "accepted"
  | "rejected"
  | "replacement_required";

export type DocumentType =
  | "passport"
  | "photo"
  | "degree"
  | "employment_contract"
  | "salary_slip"
  | "bank_statement"
  | "insurance"
  | "police_clearance"
  | "accommodation"
  | "birth_certificate"
  | "marriage_certificate"
  | "job_offer"
  | "language_certificate"
  | "tax_return"
  | "other";

export interface Document {
  id: string;
  applicationId: string;
  applicantId: string;
  type: DocumentType;
  name: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  storageKey: string;
  status: DocumentStatus;
  expiryDate?: string;
  uploadedAt: string;
  reviewedAt?: string;
  reviewedById?: string;
  rejectionReason?: string;
  ocrExtracted?: Record<string, string>;
}

export interface DocumentVerification {
  id: string;
  documentId: string;
  verifierId: string;
  result: "accepted" | "rejected" | "needs_review";
  reason?: string;
  ocrData?: Record<string, string>;
  verifiedAt: string;
}

// ─── Appointments ─────────────────────────────────────────────────────────────

export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "rescheduled"
  | "cancelled"
  | "completed"
  | "no_show";

export interface Appointment {
  id: string;
  applicationId: string;
  applicantId: string;
  type: "biometrics" | "interview" | "document_submission" | "pickup";
  location: string;
  address: string;
  date: string;
  time: string;
  duration: number; // minutes
  status: AppointmentStatus;
  confirmationCode: string;
  reminderSent: boolean;
  notes?: string;
  createdAt: string;
}

// ─── Payments ─────────────────────────────────────────────────────────────────

export type PaymentStatus =
  | "pending"
  | "processing"
  | "succeeded"
  | "failed"
  | "refunded"
  | "partially_refunded";

export interface Payment {
  id: string;
  applicationId: string;
  applicantId: string;
  type: "government_fee" | "service_fee";
  amount: number;
  currency: string;
  status: PaymentStatus;
  transactionId?: string;
  provider: string;
  invoiceNumber: string;
  description: string;
  createdAt: string;
  completedAt?: string;
  refundAmount?: number;
  refundedAt?: string;
  idempotencyKey: string;
}

// ─── Notifications ────────────────────────────────────────────────────────────

export type NotificationChannel = "email" | "sms" | "push" | "in_app";
export type NotificationType =
  | "application_submitted"
  | "document_requested"
  | "document_accepted"
  | "document_rejected"
  | "appointment_booked"
  | "appointment_reminder"
  | "status_changed"
  | "message_received"
  | "payment_received"
  | "general";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  channel: NotificationChannel;
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
  readAt?: string;
}

// ─── Case Management ──────────────────────────────────────────────────────────

export interface CaseAssignment {
  id: string;
  applicationId: string;
  officerId: string;
  officerName: string;
  queue: string;
  priority: "low" | "medium" | "high" | "urgent";
  assignedAt: string;
  dueDate?: string;
  status: "active" | "escalated" | "completed" | "transferred";
}

export interface CaseNote {
  id: string;
  applicationId: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  content: string;
  internal: boolean;
  createdAt: string;
}

// ─── Audit ────────────────────────────────────────────────────────────────────

export interface AuditLog {
  id: string;
  actorId: string;
  actorEmail: string;
  actorRole: UserRole;
  action: string;
  resource: string;
  resourceId: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// ─── CMS / Content ────────────────────────────────────────────────────────────

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  status: "draft" | "published" | "archived";
  countryIds?: string[];
  routeIds?: string[];
  featuredImage?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  countryIds?: string[];
  routeIds?: string[];
  order: number;
  status: "active" | "archived";
}

// ─── Short-Stay Calculator ────────────────────────────────────────────────────

export interface StayPeriod {
  id: string;
  country: string;
  entryDate: string;
  exitDate: string;
}

export interface SchengenCalculationResult {
  daysUsed: number;
  daysRemaining: number;
  nextEligibleDate?: string;
  violations: string[];
  calculatedAt: string;
  periods: StayPeriod[];
  windowStart: string;
  windowEnd: string;
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export interface AnalyticsMetric {
  label: string;
  value: number;
  change: number; // percentage
  trend: "up" | "down" | "neutral";
}

export interface ChartDataPoint {
  name: string;
  value: number;
  secondary?: number;
}

// ─── API Response Wrappers ────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}
