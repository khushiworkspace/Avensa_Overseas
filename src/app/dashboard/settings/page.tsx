"use client";

import { useState } from "react";
import { Bell, Shield, Globe, Save, Trash2 } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 font-heading">Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your account preferences.</p>
      </div>

      <div className="space-y-5 max-w-2xl">
        {/* Language */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-brand-600" />
              <h2 className="font-semibold text-slate-900">Language &amp; Region</h2>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <label className="form-label">Interface Language</label>
              <select className="form-input">
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="fr">Français</option>
                <option value="nl">Nederlands</option>
                <option value="es">Español</option>
                <option value="it">Italiano</option>
                <option value="pl">Polski</option>
              </select>
            </div>
            <div>
              <label className="form-label">Date Format</label>
              <select className="form-input">
                <option>DD MMM YYYY (01 Jan 2024)</option>
                <option>MM/DD/YYYY (01/01/2024)</option>
                <option>YYYY-MM-DD (2024-01-01)</option>
              </select>
            </div>
            <Button onClick={save}><Save size={14} /> {saved ? "Saved!" : "Save"}</Button>
          </CardBody>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-brand-600" />
              <h2 className="font-semibold text-slate-900">Notifications</h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {[
                { label: "Email me on application status changes", checked: true },
                { label: "Email me on document requests", checked: true },
                { label: "SMS appointment reminders", checked: false },
                { label: "In-app notifications", checked: true },
              ].map(({ label, checked }) => (
                <label key={label} className="flex items-center justify-between cursor-pointer py-2 border-b border-slate-100 last:border-0">
                  <span className="text-sm text-slate-700">{label}</span>
                  <input type="checkbox" defaultChecked={checked}
                    className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                </label>
              ))}
            </div>
            <Button className="mt-4" onClick={save}><Save size={14} /> Save</Button>
          </CardBody>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-brand-600" />
              <h2 className="font-semibold text-slate-900">Security</h2>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input label="Current Password" type="password" placeholder="••••••••" />
            <Input label="New Password" type="password" placeholder="••••••••"
              hint="Min 8 characters, must include uppercase and a number" />
            <Input label="Confirm New Password" type="password" placeholder="••••••••" />
            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-sm font-medium text-slate-800">Two-Factor Authentication</p>
                <p className="text-xs text-slate-500">Not enabled</p>
              </div>
              <Button variant="secondary" size="sm">Enable MFA</Button>
            </div>
            <Button onClick={save}><Save size={14} /> Update Password</Button>
          </CardBody>
        </Card>

        {/* Danger zone */}
        <Card className="border-red-200">
          <CardHeader className="bg-red-50 rounded-t-xl">
            <h2 className="font-semibold text-red-700 flex items-center gap-2">
              <Trash2 size={15} /> Danger Zone
            </h2>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-slate-600 mb-4">
              Deleting your account will permanently remove all your data. Active applications must be withdrawn first.
            </p>
            <Button variant="danger" size="sm">Request Account Deletion</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
