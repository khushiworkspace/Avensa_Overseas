/**
 * seed-admin.mjs — creates the first super-admin in MongoDB Atlas
 * Usage: node scripts/seed-admin.mjs
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import dns from "dns";

/* Force Google DNS so Windows ISP DNS issues don't block Atlas SRV */
dns.setServers(["8.8.8.8", "8.8.4.4"]);

/* ── Load .env.local ── */
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath   = resolve(__dirname, "../.env.local");

try {
  const envFile = readFileSync(envPath, "utf-8");
  for (const line of envFile.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
} catch {
  console.error("❌  Could not read .env.local");
  process.exit(1);
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI || MONGODB_URI.includes("YOUR_PASSWORD_HERE") || MONGODB_URI.includes("XXXXX")) {
  console.error("❌  MONGODB_URI is not set correctly in .env.local");
  process.exit(1);
}

const mongoose = (await import("mongoose")).default;
const bcrypt   = (await import("bcryptjs")).default;

const ADMIN_NAME     = process.env.ADMIN_NAME     ?? "Khushi";
const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    ?? "admin@avensaoverseas.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Admin@1234";

console.log("\n🔗  Connecting to MongoDB Atlas…");

await mongoose.connect(MONGODB_URI, {
  bufferCommands: false,
  serverSelectionTimeoutMS: 15000,
  family: 4, // force IPv4
});

console.log("✅  Connected!\n");

const AdminUserSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true },
    email:       { type: String, required: true, unique: true, lowercase: true },
    password:    { type: String, required: true },
    role:        { type: String, default: "super_admin" },
    isActive:    { type: Boolean, default: true },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const AdminUser =
  mongoose.models.AdminUser ??
  mongoose.model("AdminUser", AdminUserSchema);

const existing = await AdminUser.findOne({ email: ADMIN_EMAIL });
if (existing) {
  console.log(`ℹ️   Admin already exists: ${ADMIN_EMAIL}`);
  await mongoose.disconnect();
  process.exit(0);
}

const salt   = await bcrypt.genSalt(12);
const hashed = await bcrypt.hash(ADMIN_PASSWORD, salt);

await AdminUser.create({
  name:     ADMIN_NAME,
  email:    ADMIN_EMAIL,
  password: hashed,
  role:     "super_admin",
  isActive: true,
});

console.log("🎉  Super Admin created successfully!\n");
console.log("┌─────────────────────────────────────────────┐");
console.log(`│  Name     : ${ADMIN_NAME.padEnd(31)} │`);
console.log(`│  Email    : ${ADMIN_EMAIL.padEnd(31)} │`);
console.log(`│  Password : ${ADMIN_PASSWORD.padEnd(31)} │`);
console.log(`│  Role     : super_admin                     │`);
console.log("└─────────────────────────────────────────────┘");
console.log("\n⚠️   Save these credentials! Login: http://localhost:3000/admin/login\n");

await mongoose.disconnect();
