"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Lock, Shield, Bell, Save } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { NATIONALITIES } from "@/lib/constants";

const tabs = ["Personal Details", "Security", "Notifications", "Privacy"] as const;
type Tab = (typeof tabs)[number];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("Personal Details");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const nationalityOptions = NATIONALITIES.map((n) => ({ value: n, label: n }));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 font-heading">Profile</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your personal details and account settings.</p>
      </div>

      {/* Avatar row */}
      <Card className="p-5 mb-6">
        <div className="flex items-center gap-5">
          <div className="h-16 w-16 rounded-full bg-brand-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
            P
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-lg">Priya Sharma</p>
            <p className="text-sm text-slate-500">priya.sharma@email.com</p>
            <p className="text-xs text-slate-400 mt-0.5">Applicant · Member since Jan 2024</p>
          </div>
          <Button variant="secondary" size="sm" className="ml-auto">
            Change Photo
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "border-brand-600 text-brand-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Personal Details */}
      {activeTab === "Personal Details" && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User size={16} className="text-brand-600" />
              <h2 className="font-semibold text-slate-900">Personal Information</h2>
            </div>
          </CardHeader>
          <CardBody className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="First Name" defaultValue="Priya" />
              <Input label="Last Name" defaultValue="Sharma" />
            </div>
            <Input label="Email Address" type="email" defaultValue="priya.sharma@email.com" />
            <Input label="Phone Number" type="tel" defaultValue="+91 98765 43210" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="Date of Birth" type="date" defaultValue="1990-05-15" />
              <Select label="Nationality" options={nationalityOptions} defaultValue="Indian" />
            </div>
            <Input label="Passport Number" defaultValue="N1234567" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="Passport Expiry" type="date" defaultValue="2028-05-14" />
              <Input label="Country of Residence" defaultValue="India" />
            </div>
            <Input label="Home Address" defaultValue="123 MG Road, Bangalore" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Input label="City" defaultValue="Bangalore" />
              <Input label="State / Province" defaultValue="Karnataka" />
              <Input label="Postal Code" defaultValue="560001" />
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave}>
                <Save size={15} /> {saved ? "Saved!" : "Save Changes"}
              </Button>
              <Button variant="secondary">Discard</Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Security */}
      {activeTab === "Security" && (
        <div className="space-y-5">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-brand-600" />
                <h2 className="font-semibold text-slate-900">Change Password</h2>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <Input label="Current Password" type="password" placeholder="••••••••" />
              <Input label="New Password" type="password" placeholder="••••••••"
                hint="Minimum 8 characters, must include uppercase and a number" />
              <Input label="Confirm New Password" type="password" placeholder="••••••••" />
              <Button onClick={handleSave}>Update Password</Button>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-brand-600" />
                <h2 className="font-semibold text-slate-900">Two-Factor Authentication</h2>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-800">Authenticator App (TOTP)</p>
                  <p className="text-xs text-slate-500 mt-0.5">Not enabled. We strongly recommend enabling MFA for your account.</p>
                </div>
                <Button variant="secondary" size="sm">Enable MFA</Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="font-semibold text-slate-900">Active Sessions</h2>
            </CardHeader>
            <CardBody>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-slate-800">Chrome · Windows — Current Session</p>
                  <p className="text-xs text-slate-400">203.0.113.42 · Last active now</p>
                </div>
                <span className="text-xs bg-green-100 text-green-700 rounded-full px-2 py-0.5 font-medium">Active</span>
              </div>
              <Button variant="danger" size="sm" className="mt-3">Sign Out All Other Sessions</Button>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Notifications */}
      {activeTab === "Notifications" && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-brand-600" />
              <h2 className="font-semibold text-slate-900">Notification Preferences</h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {[
                { label: "Application status changes", email: true, sms: false, push: true },
                { label: "Document requests and updates", email: true, sms: true, push: true },
                { label: "Appointment reminders", email: true, sms: true, push: true },
                { label: "Payment confirmations", email: true, sms: false, push: false },
                { label: "Immigration news and updates", email: false, sms: false, push: false },
                { label: "Platform announcements", email: true, sms: false, push: false },
              ].map((pref) => (
                <div key={pref.label} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <span className="text-sm font-medium text-slate-700">{pref.label}</span>
                  <div className="flex gap-5">
                    {(["email", "sms", "push"] as const).map((channel) => (
                      <label key={channel} className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={pref[channel]}
                          className="h-4 w-4 rounded border-slate-300 text-brand-600"
                        />
                        <span className="text-xs text-slate-500 uppercase tracking-wide">{channel}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Button className="mt-5" onClick={handleSave}>
              <Save size={15} /> Save Preferences
            </Button>
          </CardBody>
        </Card>
      )}

      {/* Privacy */}
      {activeTab === "Privacy" && (
        <div className="space-y-5">
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-slate-900">Data & Privacy</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                <p className="text-sm font-medium text-slate-800 mb-1">Download My Data</p>
                <p className="text-xs text-slate-500 mb-3">Export a copy of all your personal data, applications and document metadata stored on Avensa Overseas.</p>
                <Button variant="secondary" size="sm">Request Data Export</Button>
              </div>
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                <p className="text-sm font-medium text-slate-800 mb-1">Delete My Account</p>
                <p className="text-xs text-slate-500 mb-3">
                  This permanently deletes your account and associated data where legally permissible. Active applications must be withdrawn first.
                </p>
                <Button variant="danger" size="sm">Request Account Deletion</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
