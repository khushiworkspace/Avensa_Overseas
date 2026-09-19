import mongoose, { Document, Schema, Model } from "mongoose";

/* ─── Types ──────────────────────────────────────────────────────── */
export type LeadType    = "eligibility" | "contact" | "short-stay";
export type LeadStatus  = "PARTIAL" | "COMPLETED" | "CONTACTED" | "FOLLOW_UP" | "CONVERTED" | "CLOSED";

export interface ILead extends Document {
  leadType:           LeadType;
  status:             LeadStatus;
  name?:              string;
  email?:             string;
  phone?:             string;
  formData:           Record<string, unknown>;
  completionPercent:  number;
  lastStep:           number;
  totalSteps:         number;
  source:             string;
  assignedTo?:        string;
  ipAddress?:         string;
  userAgent?:         string;
  createdAt:          Date;
  updatedAt:          Date;
}

/* ─── Schema ─────────────────────────────────────────────────────── */
const LeadSchema = new Schema<ILead>(
  {
    leadType: {
      type: String,
      enum: ["eligibility", "contact", "short-stay"],
      required: true,
    },
    status: {
      type: String,
      enum: ["PARTIAL", "COMPLETED", "CONTACTED", "FOLLOW_UP", "CONVERTED", "CLOSED"],
      default: "PARTIAL",
    },
    name:  { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },

    // Flexible field — stores all form answers as a sub-document
    formData: { type: Schema.Types.Mixed, default: {} },

    completionPercent: { type: Number, default: 0, min: 0, max: 100 },
    lastStep:          { type: Number, default: 1 },
    totalSteps:        { type: Number, default: 5 },

    source:     { type: String, default: "website" },
    assignedTo: { type: String }, // admin user id / name
    ipAddress:  { type: String },
    userAgent:  { type: String },
  },
  {
    timestamps: true, // auto-manages createdAt / updatedAt
  }
);

/* ─── Indexes ────────────────────────────────────────────────────── */
LeadSchema.index({ email: 1 });
LeadSchema.index({ phone: 1 });
LeadSchema.index({ status: 1 });
LeadSchema.index({ leadType: 1 });
LeadSchema.index({ createdAt: -1 });

/* ─── Model (singleton-safe for hot-reload) ─────────────────────── */
const Lead: Model<ILead> =
  mongoose.models.Lead ?? mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
