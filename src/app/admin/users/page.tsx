import type { Metadata } from "next";
import { UserPlus, Search, Shield, CheckCircle, XCircle } from "lucide-react";
import { MOCK_USERS } from "@/lib/mock-data";
import { formatDate, titleCase } from "@/lib/utils";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "User Management" };

const roleColor: Record<string, "blue" | "purple" | "red" | "green" | "yellow" | "slate"> = {
  applicant: "blue",
  case_officer: "purple",
  document_verifier: "yellow",
  appointment_manager: "green",
  finance: "yellow",
  content_admin: "green",
  super_admin: "red",
};

export default function UsersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">User Management</h1>
          <p className="text-slate-500 text-sm mt-0.5">{MOCK_USERS.length} users registered</p>
        </div>
        <Button size="sm"><UserPlus size={15} /> Invite User</Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="form-input pl-9" placeholder="Search users..." />
        </div>
        <select className="form-input w-48">
          <option value="">All Roles</option>
          <option value="applicant">Applicant</option>
          <option value="case_officer">Case Officer</option>
          <option value="super_admin">Super Admin</option>
        </select>
        <select className="form-input w-36">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      <Card>
        <CardBody className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>MFA</th>
                <th>Joined</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_USERS.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-xs font-bold shrink-0">
                        {user.firstName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge variant={roleColor[user.role] ?? "slate"}>
                      {titleCase(user.role.replace("_", " "))}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      {user.status === "active"
                        ? <CheckCircle size={13} className="text-green-500" />
                        : <XCircle size={13} className="text-red-400" />}
                      <span className={`text-xs font-medium ${user.status === "active" ? "text-green-700" : "text-red-600"}`}>
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td>
                    {user.mfaEnabled
                      ? <Shield size={14} className="text-green-500" />
                      : <Shield size={14} className="text-slate-300" />}
                  </td>
                  <td className="text-xs text-slate-500">{formatDate(user.createdAt)}</td>
                  <td className="text-xs text-slate-400">
                    {user.lastLogin ? formatDate(user.lastLogin) : "Never"}
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">
                        {user.status === "active" ? "Suspend" : "Activate"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
