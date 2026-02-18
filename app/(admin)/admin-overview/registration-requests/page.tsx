"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DashboardSidebar } from "../component/dashboardsidebar";
import { DashboardHeader } from "../component/DashboardHeader";
import { Search, Filter, ChevronDown, Download, Plus, Clock, Users, Stethoscope, Building2, Hourglass, ListFilter } from "lucide-react";
 

export default function RegistrationRequestsPage() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); 
  const [searchQuery, setSearchQuery] = useState("");

  // Logic to fetch from API instead of temporary data  
  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/registration/requests`, { credentials: "include" });
      const data = await response.json();
      // const data = {
      //   success: true,
      //   count: 3,
      //   data: [
      //     {
      //       id: 84,
      //       nationciteId: "REG202602182MDX",
      //       type: "MEDICAL",
      //       status: "PENDING",
      //       ticketId: "MED-20260218-0012",
      //       createdAt: "2026-02-18T06:04:28.224Z",
      //       name: "Yashwanth",
      //       email: "yash@kims.com",
      //       registrantData: {
      //         id: 23,
      //         registrationId: 84,
      //         nationciteId: "REG202602182MDX",
      //         name: "Yashwanth",
      //         medCouncilRegNo: "MCI-12345",
      //         stateCouncil: "Medical Council of India (MCI)",
      //         mobile: "9812837465 ",
      //         email: "yash@kims.com",
      //         primaryHospital: "Apollo Hospitals",
      //         specialty: "Neurology",
      //         researchFocus: "Clinical Trials",
      //         medicalDegreeUrl: null,
      //         regCertificateUrl: null,
      //         status: "PENDING",
      //         plan: "FREE"
      //       }
      //     },
      //     {
      //       id: 85,
      //       nationciteId: "RES202602185ABC",
      //       type: "RESEARCHER",
      //       status: "APPROVED",
      //       ticketId: "TCK-20260218-0013",
      //       createdAt: "2026-02-17T14:20:10.115Z",
      //       name: "Dr. Aditya Sharma",
      //       email: "aditya@iitd.ac.in",
      //       registrantData: {
      //         id: 24,
      //         registrationId: 85,
      //         institute: "IIT Delhi",
      //         orcidId: "0000-0002-1823-4567",
      //         mobile: "9988776655",
      //         email: "aditya@iitd.ac.in",
      //         primaryDomain: "Computer Science",
      //         googleScholarUrl: "https://scholar.google.com/citations?user=xyz",
      //         status: "APPROVED",
      //         plan: "PREMIUM"
      //       }
      //     },
      //     {
      //       id: 86,
      //       nationciteId: "ORG202602189ORG",
      //       type: "ORG",
      //       status: "REJECTED",
      //       ticketId: "ORG-20260218-0014",
      //       createdAt: "2026-02-16T09:15:45.000Z",
      //       name: "CSIR Labs",
      //       email: "info@csit.res.in",
      //       registrantData: {
      //         id: 25,
      //         registrationId: 86,
      //         institute: "CSIR-Central Institute",
      //         domain: "csit.res.in",
      //         mobile: "9123456789",
      //         email: "info@csit.res.in",
      //         status: "REJECTED",
      //         plan: "INSTITUTIONAL"
      //       }
      //     }
      //   ]
      // };
      setRegistrations(data.data || []);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <DashboardSidebar activePage="registrations" />

      <main className="flex-1 ml-[250px]">
        <DashboardHeader
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Registrations" },
          ]}
        />

        <div className="p-4 w-[97%] md:p-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start pb-4 gap-4 border-b border-gray-200 mb-4">
            <div>
              <h1 className="!text-2xl !md:text-3xl !font-bold !text-[#1E1E1E] !leading-tight !important">
                Registration Verification Dashboard
              </h1>
              <p className="!text-[10px] !sm:text-base !text-[#5C5C5C] !leading-relaxed !mt-2 !max-w-2xl !important">
                Review, approve, or reject new registrations from researchers, medical professionals, and organizations.
              </p>
            </div>
            <button className="flex items-center gap-2 bg-[#FF7F3E] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#e66a2e] transition-colors text-sm">
              <Plus size={18} />
              Add New User
            </button>
          </div>

          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
            {/* Pending Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative">
    <div className="flex justify-between items-start mb-4">
      <div className="flex gap-3 items-center">
        <div className="  bg-[#F8EDE8] rounded-lg">
          <Hourglass size={22} className="w-10 h-10 text-[#A34F25]"  />
        </div>
        <div className="flex flex-col">
          <span className="text-[13px] font-medium text-[#6B6B6B]">Pending</span>
          <span className="text-2xl font-bold text-[#1E1E1E] !important">182</span>
        </div>
      </div>
      <div className="w-24 h-10 pt-2">
        <svg viewBox="0 0 100 30" className="w-full h-full" fill="none">
          <path
            d="M0 20 Q 15 5, 25 18 T 45 10 T 65 22 T 85 8 T 100 15"
            stroke="#EF4444"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
    <div className="border-t border-gray-100 pt-4 mt-2">
      <div className="flex items-center gap-1.5 text-red-500 text-[13px] font-bold">
        <span>↓</span>
        <span>12 Today</span>
      </div>
    </div>
  </div>

            {/* Researchers Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative">
              <div className="flex gap-3 items-center mb-6">
                <div className="p-2.5 bg-[#F8EDE8] rounded-lg">
                  <Users size={22} className="text-[#A34F25]" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-medium text-[#6B6B6B]">Researchers</span>
                  <h4 className="  text-2xl! font-bold!  text-[#1E1E1E]!  ">142</h4>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-5 mt-2">
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-[#FFF5F0] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#FF7F3E] h-full rounded-full" style={{ width: '77%' }}></div>
                  </div>
                  <p className=" text-[11px]!  font-medium!  text-[#6B6B6B]!  whitespace-nowrap!  ">142/184</p>
                </div>
              </div>
            </div>

            {/* Medical Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative">
              <div className="flex gap-3 items-center mb-6">
                <div className="p-2.5 bg-[#F8EDE8] rounded-lg">
                  <Stethoscope size={22} className="text-[#A34F25]" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-medium text-[#6B6B6B]">Medical</span>
                  <h4 className="!text-2xl!  font-bold!  text-[#1E1E1E]!  ">28</h4>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-5 mt-2">
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-[#FFF5F0] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#FF7F3E] h-full rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <p className=" text-[11px]!  font-medium!  text-[#6B6B6B]!  whitespace-nowrap!  ">28/184</p>
                </div>
              </div>
            </div>

            {/* Organizations Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative">
              <div className="flex gap-3 items-center mb-6">
                <div className="p-2.5 bg-[#F8EDE8] rounded-lg">
                  <Building2 size={22} className="text-[#A34F25]" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-medium text-[#6B6B6B]">Organisations</span>
                  <h4 className=" text-2xl!  font-bold!  text-[#1E1E1E]!  ">14</h4>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-5 mt-2">
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-[#FFF5F0] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#FF7F3E] h-full rounded-full" style={{ width: '8%' }}></div>
                  </div>
                  <p className="text-[11px]! font-medium! text-[#6B6B6B]! whitespace-nowrap!  ">14/184</p>
                </div>
              </div>
            </div>
          </div>

          {/* Table Container Card */}
          <div className="bg-white rounded-2xl border p-2 border-gray-100 shadow-sm overflow-hidden">
            {/* Filters Bar */}
            <div className="p-5 flex flex-col lg:flex-row justify-between items-center gap-4 border-b border-gray-50">
              <div className="flex flex-wrap gap-3 items-center flex-1 w-full">
                <div className="relative flex-1 max-w-md min-w-[240px]">
                   <input
                    type="text"
                    placeholder="Search by name, email, or ID..."
                    className="w-full pl-10 pr-4 py-2 bg-[#F9FAFB] text-gray-700 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#FF7F3E]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-[#1E1E1E] hover:bg-gray-50 transition-colors">
                  <ListFilter size={16} />
                  Types
                  <ChevronDown size={14} className="text-gray-400" />
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-[#1E1E1E] hover:bg-gray-50 transition-colors">
                  <ListFilter size={16} />
                  Status
                  <ChevronDown size={14} className="text-gray-400" />
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-[#1E1E1E] hover:bg-gray-50 transition-colors w-full lg:w-auto justify-center">
                <Download size={16} />
                Export Users
              </button>
            </div>

            {/* Main Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-20 text-center text-gray-500 font-bold">Loading registrations...</div>
              ) : (
                <div className="w-full! overflow-x-auto! rounded-2xl! border! border-gray-100! shadow-sm!">
  <table className="w-full! table-auto! min-w-[1000px]! text-left! border-collapse!">
    <thead>
      <tr className="bg-[#F9FAFB]! text-[#6B6B6B]! text-[11px]! font-bold! uppercase! tracking-widest!">
        <th className="px-4! py-4! w-[15%]!">ID</th>
        <th className="px-4! py-4! w-[10%]!">Type</th>
        <th className="px-4! py-4! w-[25%]!">Primary Info</th>
        <th className="px-4! py-4! w-[20%]!">Secondary Info</th>
        <th className="px-4! py-4! w-[10%]!">Submitted</th>
        <th className="px-4! py-4! w-[10%]!">Status</th>
        <th className="px-4! py-4! w-[5%]!">Plan</th>
        <th className="px-4! py-4! w-[5%]!">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y! divide-gray-50!">
      {registrations
        .filter((r: any) => 
          r.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
          r.nationciteId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.ticketId?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((reg, index) => (
          <tr key={index} className="hover:bg-gray-50/50! transition-colors! group!">
            {/* ID Column */}
            <td className="px-4! py-4! text-sm! whitespace-nowrap  font-semibold! text-[#1E1E1E]!">
              {reg.ticketId}
            </td>

            {/* Type Column */}
            <td className="px-4! py-4!">
              <p className={`px-3! py-1! rounded-full! text-xs! font-semibold! w-fit! !important ${
                reg.type === 'ORG' ? 'bg-orange-50! text-orange-600!' : 
                reg.type === 'RESEARCHER' ? 'bg-blue-50! text-blue-600!' : 'bg-purple-50! text-purple-600!'
              }`}>
                {reg.type}
              </p>
            </td>

            {/* Primary Info */}
            <td className="px-4! py-4!">
              <h5 className="text-base!  sm:text-base! md:text-lg! text-[#1E1E1E]! leading-snug! !important">
                {reg.name}
              </h5>
              <p className="text-xs!   font-medium! text-[#6B6B6B]! !important">
                {reg.registrantData?.primaryHospital || reg.registrantData?.institute || "N/A"}
              </p>
            </td>

            {/* Secondary Info */}
            <td className="px-4! py-4!">
              <p className="text-sm!   sm:text-base! text-[#5C5C5C]! leading-relaxed! !important">
                {reg.email}
              </p>
            </td>

            {/* Submitted */}
            <td className="px-4! py-4!">
              <p className="text-sm!  text-[#5C5C5C]! font-medium! !important">
                {new Date(reg.createdAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </td>

            {/* Status Column */}
            <td className="px-4! py-4!">
              <div className={`flex! items-center! gap-1.5! px-2! py-1! rounded-md! border! w-fit! ${
                reg.status === 'APPROVED' ? 'bg-green-50! border-green-100! text-green-600!' :
                reg.status === 'REJECTED' ? 'bg-red-50! border-red-100! text-red-600!' :
                'bg-yellow-50! border-yellow-100! text-yellow-600!'
              }`}>
                <span className="text-[10px]! leading-none!">
                  {reg.status === 'APPROVED' ? '●' : reg.status === 'REJECTED' ? '✕' : 'ⓘ'}
                </span>
                <span className= { `${
                reg.status === 'APPROVED' ? 'bg-green-50! border-green-100! text-green-600!' :
                reg.status === 'REJECTED' ? 'bg-red-50! border-red-100! text-red-600!' :
                'bg-yellow-50! border-yellow-100! text-yellow-600!'
              }  font-medium text-[12px]! `}>
                  {reg.status}
                </span>
              </div>
            </td>

            {/* Plan Column */}
            <td className="px-4  py-4 ">
              <p className={ ` text-sm! font-bold! px-2! py-1! ${
                reg.status === 'APPROVED' ? 'bg-green-50! border-green-100! text-green-600!' :
                reg.status === 'REJECTED' ? 'bg-red-50! border-red-100! text-red-600!' :
                'bg-yellow-50! border-yellow-100! text-yellow-600!'
              } rounded! w-fit    `}>
                { "0/0"}
              </p>
            </td>

            {/* Action Column */}
            <td className="px-4! py-4!">
              <button 
                onClick={() => router.push(`/admin-overview/registration-requests/${reg.ticketId}`)}
                className="text-sm! font-bold! text-[#FF7F3E]! hover:underline!"
              >
                View
              </button>
            </td>
          </tr>
      ))}
    </tbody>
  </table>
</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}