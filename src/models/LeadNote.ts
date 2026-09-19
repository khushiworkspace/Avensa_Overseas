import mongoose, { Document, Schema, Model } from "mongoose";

/* ─── Types ──────────────────────────────────────────────────────── */
export interface ILeadNote extends Document {
  leadId:    mongoose.Types.ObjectId;
  adminId?:  string;
  adminName: string;
  content:   string;
  createdAt: Date;
  updatedAt: Date;
}

/* ─── Schema ─────────────────────────────────────────────────────── */
const LeadNoteSchema = new Schema<ILeadNote>(
  {
    leadId: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
      index: true,
    },
    adminId:   { type: String },
    adminName: { type: String, required: true, default: "Admin" },
    content:   { type: String, required: true, trim: true, maxlength: 5000 },
  },
  { timestamps: true }
);

/* ─── Model ──────────────────────────────────────────────────────── */
const LeadNote: Model<ILeadNote> =
  mongoose.models.LeadNote ??
  mongoose.model<ILeadNote>("LeadNote", LeadNoteSchema);

export default LeadNote;
