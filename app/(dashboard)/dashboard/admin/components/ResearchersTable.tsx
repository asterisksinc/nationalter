"use client";

import { useState } from "react";
import { Search, Filter, Download } from "lucide-react";

interface RowData {
  id: string;
  type: "Organisation" | "Researcher" | "Medical Prof";
  primary: string;
  secondary: string;
  submitted: string;
  status: "Pending" | "Accepted" | "Rejected";
  uploads: string;
}

const data: RowData[] = [
  {
    id: "ORG-1192",
    type: "Organisation",
    primary: "CSIR Labs\nBangalore, Karnataka",
    secondary: "info@csir.res.in",
    submitted: "6h ago",
    status: "Pending",
    uploads: "1/2",
  },
  {
    id: "REG-2048",
    type: "Researcher",
    primary: "Dr. Aditya Sharma\nIIT Delhi",
    secondary: "aditya@iitd.ac.in",
    submitted: "4h ago",
    status: "Accepted",
    uploads: "4/4",
  },
  {
    id: "MED-0934",
    type: "Medical Prof",
    primary: "Dr Rajesh Malhotra\nKIMS Hospital",
    secondary: "r.malhotra@kims.in",
    submitted: "4h ago",
    status: "Rejected",
    uploads: "1/4",
  },
];

export default function ResearchersTable() {
  const [search, setSearch] = useState("");

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Accepted":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-600";
      default:
        return "";
    }
  };

  const getTypeStyle = (type: string) => {
    switch (type) {
      case "Organisation":
        return "bg-orange-100 text-orange-600";
      case "Researcher":
        return "bg-blue-100 text-blue-600";
      case "Medical Prof":
        return "bg-purple-100 text-purple-600";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">

      {/* Top Controls */}
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-72 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filters */}
          <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            <Filter size={16} />
            Types
          </button>

          <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            <Filter size={16} />
            Status
          </button>
        </div>

        {/* Export */}
        <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">
          <Download size={16} />
          Export Users
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-left">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Primary Info</th>
              <th className="px-4 py-3">Secondary Info</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Uploads</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 font-medium text-gray-700">
                  {row.id}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${getTypeStyle(
                      row.type
                    )}`}
                  >
                    {row.type}
                  </span>
                </td>

                <td className="px-4 py-3 text-gray-700 whitespace-pre-line">
                  {row.primary}
                </td>

                <td className="px-4 py-3 text-gray-500">
                  {row.secondary}
                </td>

                <td className="px-4 py-3 text-gray-500">
                  {row.submitted}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusStyle(
                      row.status
                    )}`}
                  >
                    {row.status}
                  </span>
                </td>

                <td className="px-4 py-3 font-medium text-orange-600">
                  {row.uploads}
                </td>

                <td className="px-4 py-3 text-orange-600 cursor-pointer hover:underline">
                  View
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
