import type { Metadata } from "next";
import { Settings, Globe, Bell, Shield, Database, Save } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = { title: "System Settings" };

export default function AdminSettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 font-heading">System Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5">Platform-level configuration and preferences.</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* General */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-brand-600" />
              <h2 className="font-semibold text-slate-900">General Settings</h2>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input label="Platform Name" defaultValue={COMPANY.name} />
            <Input label="Support Email" type="email" defaultValue={COMPANY.email} />
            <Input label="Support Phone" defaultValue={COMPANY.phone} />
            <div>
              <label className="form-label">Disclaimer Text</label>
              <textarea className="form-input resize-none" rows={3} defaultValue={COMPANY.disclaimer} />
            </div>
            <Button><Save size={14} /> Save General Settings</Button>
          </CardBody>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-brand-600" />
              <h2 className="font-semibold text-slate-900">Email &amp; Notification Settings</h2>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input label="SMTP Host" placeholder="smtp.example.com" defaultValue="smtp.sendgrid.net" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="SMTP Port" type="number" defaultValue="587" />
              <Input label="From Address" defaultValue="noreply@avensaoverseas.com" />
            </div>
            <div className="flex items-center justify-between py-2 border-t border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-800">SMS Notifications (Twilio)</p>
                <p className="text-xs text-slate-500">Enable SMS for appointment reminders and urgent alerts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:bg-brand-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
              </label>
            </div>
            <Button><Save size={14} /> Save Notification Settings</Button>
          </CardBody>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-brand-600" />
              <h2 className="font-semibold text-slate-900">Security Settings</h2>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            {[
              { label: "Require MFA for Admin users", defaultChecked: true },
              { label: "Require MFA for Case Officers", defaultChecked: true },
              { label: "Enforce password complexity rules", defaultChecked: true },
              { label: "Session timeout after 60 minutes of inactivity", defaultChecked: true },
              { label: "Rate limiting on authentication endpoints", defaultChecked: true },
            ].map(({ label, defaultChecked }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-700">{label}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
                  <div className="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:bg-brand-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                </label>
              </div>
            ))}
            <Button><Save size={14} /> Save Security Settings</Button>
          </CardBody>
        </Card>

        {/* Data retention */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database size={16} className="text-brand-600" />
              <h2 className="font-semibold text-slate-900">Data Retention</h2>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Audit log retention (days)" type="number" defaultValue="2555" hint="~7 years" />
              <Input label="Draft application retention (days)" type="number" defaultValue="180" />
              <Input label="Completed application retention (years)" type="number" defaultValue="10" />
              <Input label="Document storage retention (years)" type="number" defaultValue="7" />
            </div>
            <p className="text-xs text-slate-400">
              Retention settings must comply with applicable data protection law and be reviewed with your legal/privacy team.
            </p>
            <Button><Save size={14} /> Save Retention Settings</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
