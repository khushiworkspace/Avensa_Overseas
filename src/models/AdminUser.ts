import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

/* ─── Types ──────────────────────────────────────────────────────── */
export type AdminRole = "super_admin" | "admin" | "viewer";

export interface IAdminUser extends Document {
  name:        string;
  email:       string;
  password:    string;
  role:        AdminRole;
  isActive:    boolean;
  lastLoginAt: Date | null;
  createdAt:   Date;
  updatedAt:   Date;
  comparePassword(candidate: string): Promise<boolean>;
}

/* ─── Schema ─────────────────────────────────────────────────────── */
const AdminUserSchema = new Schema<IAdminUser>(
  {
    name:  { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 8, select: false },
    role: {
      type: String,
      enum: ["super_admin", "admin", "viewer"],
      default: "admin",
    },
    isActive:    { type: Boolean, default: true },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true }
);

/* ─── Hash password before save ──────────────────────────────────── */
AdminUserSchema.pre("save", async function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = this as any;
  if (!doc.isModified("password")) return;
  const salt = await bcrypt.genSalt(12);
  doc.password = await bcrypt.hash(doc.password as string, salt);
});

/* ─── Instance method ─────────────────────────────────────────────── */
AdminUserSchema.methods.comparePassword = async function (
  candidate: string
): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

/* ─── Model ──────────────────────────────────────────────────────── */
const AdminUser: Model<IAdminUser> =
  mongoose.models.AdminUser ??
  mongoose.model<IAdminUser>("AdminUser", AdminUserSchema);

export default AdminUser;
