"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardSidebar } from "../component/dashboardsidebar";
import { DashboardHeader } from "../component/DashboardHeader";
import { ChevronDown, Download, Plus, Users, Stethoscope, Building2, Hourglass } from "lucide-react";

interface Registration {
  ticketId: string;
  type: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
  nationciteId?: string;
  registrantData?: {
    primaryHospital?: string;
    institute?: string;
    plan?: string;
  };
}

export default function RegistrationRequestsPage() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [allRegistrations, setAllRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterType !== "ALL") params.append("type", filterType);
      if (filterStatus !== "ALL") params.append("status", filterStatus);

      const response = await fetch(`/api/registration/requests?${params}`, { credentials: "include" });
      const data = await response.json();
      setRegistrations(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [filterType, filterStatus]);

  useEffect(() => {
    const fetchAllRegistrations = async () => {
      try {
        const response = await fetch("/api/registration/requests", { credentials: "include" });
        const data = await response.json();
        setAllRegistrations(data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllRegistrations();
  }, []);

  const total = allRegistrations.length;
  const pendingCount = allRegistrations.filter((r) => r.status === "PENDING").length;
  const researcherCount = allRegistrations.filter((r) => r.type === "RESEARCHER").length;
  const medicalCount = allRegistrations.filter((r) => r.type === "MEDICAL").length;
  const orgCount = allRegistrations.filter((r) => r.type === "ORG").length;
  const today = new Date().toDateString();
  const pendingToday = allRegistrations.filter(
    (r) => r.status === "PENDING" && new Date(r.createdAt).toDateString() === today,
  ).length;

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] relative">
      <DashboardSidebar
        activePage="registrations"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 transition-all duration-300 ml-0 md:ml-[260px] w-full overflow-x-hidden">
        <DashboardHeader
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Registrations" },
          ]}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <div className="p-4 md:p-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start pb-4 gap-4 border-b border-gray-200 mb-4">
            <div>
              <div className="text-xl md:text-2xl font-semibold text-gray-900">
                Registration Verification Dashboard
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Review, approve, or reject new registrations from researchers, medical professionals, and organizations.
              </div>
            </div>
            <button className="flex items-center gap-2 bg-[#FF7F3E] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#e66a2e] transition-colors text-sm">
              <Plus size={18} />
              Add New User
            </button>
          </div>

          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <StatCard
              icon={<Hourglass size={20} />}
              label="Pending"
              value={pendingCount.toString()}
              trend={`${pendingToday} Today`}
              trendColor={pendingToday > 0 ? "text-red-500" : "text-gray-500"}
            />
            <StatCard
              icon={<Users size={20} />}
              label="Researchers"
              value={researcherCount.toString()}
              progress={total > 0 ? Math.round((researcherCount / total) * 100) : 0}
            />
            <StatCard
              icon={<Stethoscope size={20} />}
              label="Medical"
              value={medicalCount.toString()}
              progress={total > 0 ? Math.round((medicalCount / total) * 100) : 0}
            />
            <StatCard
              icon={<Building2 size={20} />}
              label="Organisations"
              value={orgCount.toString()}
              progress={total > 0 ? Math.round((orgCount / total) * 100) : 0}
            />
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Filters Bar */}
            <div className="p-4 flex flex-col lg:flex-row justify-between items-center gap-4 border-b border-gray-100">
              <div className="flex flex-wrap gap-3 items-center flex-1 w-full">
                <input
                  type="text"
                  placeholder="Search by name, email, or ID..."
                  className="flex-1 max-w-md min-w-[200px] px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7F3E]/20 focus:border-[#FF7F3E]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="relative">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="appearance-none px-4 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7F3E]/20"
                  >
                    <option value="ALL">All Types</option>
                    <option value="RESEARCHER">Researcher</option>
                    <option value="MEDICAL">Medical</option>
                    <option value="ORG">Organization</option>
                  </select>
                  <ChevronDown size={14} className="text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="appearance-none px-4 py-2 pr-8 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7F3E]/20"
                  >
                    <option value="ALL">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                  <ChevronDown size={14} className="text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <Download size={16} />
                Export
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-16 text-center text-gray-500">Loading registrations...</div>
              ) : (
                <table className="w-full min-w-[900px] text-left">
                  <thead>
                    <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                      <th className="px-4 py-3 font-medium">ID</th>
                      <th className="px-4 py-3 font-medium">Type</th>
                      <th className="px-4 py-3 font-medium">Name / Institution</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Submitted</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {registrations
                      .filter((r) =>
                        r.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        r.nationciteId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        r.ticketId?.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((reg, index) => (
                        <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3 text-sm text-gray-900">{reg.ticketId}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              reg.type === 'ORG' ? 'bg-orange-50 text-orange-600' :
                              reg.type === 'RESEARCHER' ? 'bg-blue-50 text-blue-600' : 
                              'bg-purple-50 text-purple-600'
                            }`}>
                              {reg.type}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-sm text-gray-900">{reg.name}</div>
                            <div className="text-xs text-gray-500">
                              {reg.registrantData?.primaryHospital || reg.registrantData?.institute || "N/A"}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{reg.email}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {new Date(reg.createdAt).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              reg.status === 'APPROVED' ? 'bg-green-50 text-green-600' :
                              reg.status === 'REJECTED' ? 'bg-red-50 text-red-600' :
                              'bg-yellow-50 text-yellow-600'
                            }`}>
                              {reg.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => router.push(`/admin-overview/registration-requests/${reg.ticketId}`)}
                              className="text-sm text-[#FF7F3E] hover:underline"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, trend, trendColor, progress }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: string;
  trendColor?: string;
  progress?: number;
}) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200">
      <div className="flex gap-3 items-center mb-3">
        <div className="p-2 bg-orange-50 rounded-lg text-[#A34F25]">{icon}</div>
        <div>
          <div className="text-xs text-gray-500">{label}</div>
          <div className="text-xl font-semibold text-gray-900">{value}</div>
        </div>
      </div>
      {trend && (
        <div className={`text-xs ${trendColor}`}>{trend}</div>
      )}
      {progress !== undefined && (
        <div className="mt-2">
          <div className="h-1.5 bg-orange-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#FF7F3E] rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
}