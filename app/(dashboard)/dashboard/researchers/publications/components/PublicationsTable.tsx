import React from "react";
import { Edit2, Trash2 } from "lucide-react";

export interface PublicationData {
  id: string;
  title: string;
  author: string;
  authorImg: string;
  citations: number;
  publicationType: string;
  year: number;
  publisher: string;
  doi: string;
}

interface PublicationsTableProps {
  publications: PublicationData[];
}

export const PublicationsTable = ({ publications }: PublicationsTableProps) => {
  return (
    <div className="bg-white rounded-lg border border-[#E1E4EA] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm" style={{ minWidth: "500px" }}>
          <thead className="bg-[#F5F7FA] border-b border-[#E1E4EA]">
            <tr>
              <th className="px-1.5 md:px-4 py-2.5 text-left text-[11px] md:text-xs font-medium text-[#525866] uppercase tracking-wider w-[140px] md:w-[220px]">
                Authors
              </th>
              <th className="px-1.5 md:px-4 py-2.5 text-left text-[11px] md:text-xs font-medium text-[#525866] uppercase tracking-wider w-[70px] md:w-[80px]">
                Citations
              </th>
              <th className="px-1.5 md:px-4 py-2.5 text-left text-[11px] md:text-xs font-medium text-[#525866] uppercase tracking-wider w-[100px] md:w-[120px]">
                Publication
              </th>
              <th className="px-1.5 md:px-4 py-2.5 text-left text-[11px] md:text-xs font-medium text-[#525866] uppercase tracking-wider w-[70px]">
                Year
              </th>
              <th className="px-1.5 md:px-4 py-2.5 text-left text-[11px] md:text-xs font-medium text-[#525866] uppercase tracking-wider w-[110px]">
                Publisher
              </th>
              <th className="px-1.5 md:px-4 py-2.5 text-left text-[11px] md:text-xs font-medium text-[#525866] uppercase tracking-wider w-[140px]">
                DOI
              </th>
              <th className="px-1.5 md:px-4 py-2.5 text-right text-[11px] md:text-xs font-medium text-[#525866] uppercase tracking-wider w-[90px]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-[#E1E4EA]">
            {publications.map((pub) => (
              <tr
                key={pub.id}
                className="bg-[#FDFDFD] hover:bg-gray-50 transition-colors"
                style={{ height: 54 }}
              >
                {/* Author */}
                <td className="px-1.5 md:px-4 py-3 align-middle">
                  <div className="flex items-center gap-1.5 md:gap-3 overflow-hidden">
                    <img
                      src={pub.authorImg}
                      alt={pub.author}
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover shrink-0"
                    />
                    <div className="text-[12px] md:text-[14px] font-medium text-[#222530] truncate max-w-full overflow-hidden whitespace-nowrap">
                      {pub.author}
                    </div>
                  </div>
                </td>

                {/* Citations */}
                <td className="px-1.5 md:px-4 py-3 align-middle">
                  <div className="text-[13px] md:text-[14px] font-medium text-[#525866]">
                    {pub.citations}
                  </div>
                </td>

                {/* Publication Type */}
                <td className="px-1.5 md:px-4 py-3 align-middle">
                  <div className="text-[12px] md:text-[14px] font-normal text-[#525866] truncate max-w-full overflow-hidden whitespace-nowrap">
                    {pub.publicationType}
                  </div>
                </td>

                {/* Year */}
                <td className="px-1.5 md:px-4 py-3 align-middle">
                  <div className="text-[13px] md:text-[14px] font-normal text-[#525866]">
                    {pub.year}
                  </div>
                </td>

                {/* Publisher */}
                <td className="px-1.5 md:px-4 py-3 align-middle">
                  <div className="text-[13px] md:text-[14px] font-normal text-[#525866] truncate max-w-full overflow-hidden whitespace-nowrap">
                    {pub.publisher}
                  </div>
                </td>

                {/* DOI */}
                <td className="px-1.5 md:px-4 py-3 align-middle">
                  <div className="text-[13px] md:text-[14px] font-normal text-[#525866] truncate max-w-full overflow-hidden whitespace-nowrap">
                    {pub.doi}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-1.5 md:px-4 py-3 align-middle">
                  <div className="flex justify-end items-center gap-3">
                    <button
                      aria-label={`Edit ${pub.title}`}
                      title="Edit"
                      className="p-1.5 text-black hover:text-[#1D4ED8] transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      aria-label={`Delete ${pub.title}`}
                      title="Delete"
                      className="p-1.5 text-[#DC2626] hover:text-[#B91C1C] transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {publications.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-6 text-center text-[#525866]"
                >
                  No publications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
