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
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-[14px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-[12px] font-medium leading-[120%] text-[#525866] uppercase tracking-wider">
                Paper Title
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-medium leading-[120%] text-[#525866] uppercase tracking-wider">
                Authors
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-medium leading-[120%] text-[#525866] uppercase tracking-wider">
                Citations
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-medium leading-[120%] text-[#525866] uppercase tracking-wider">
                Publication Type
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-medium leading-[120%] text-[#525866] uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-medium leading-[120%] text-[#525866] uppercase tracking-wider">
                Publisher
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-medium leading-[120%] text-[#525866] uppercase tracking-wider">
                DOI
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-medium leading-[120%] text-[#525866] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {publications.map((pub) => (
              <tr key={pub.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-[14px] font-normal leading-[120%] text-[#0E121B]">
                  {pub.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={pub.authorImg}
                      alt={pub.author}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-[14px] font-normal leading-[120%] text-[#0E121B]">
                      {pub.author}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[14px] font-normal leading-[120%] text-[#333333]">
                  {pub.citations}
                </td>
                <td className="px-6 py-4 text-[14px] font-normal leading-[120%] text-[#333333]">
                  {pub.publicationType}
                </td>
                <td className="px-6 py-4 text-[14px] font-normal leading-[120%] text-[#333333]">
                  {pub.year}
                </td>
                <td className="px-6 py-4 text-[14px] font-normal leading-[120%] text-[#333333]">
                  {pub.publisher}
                </td>
                <td className="px-6 py-4 text-[14px] font-normal leading-[120%] text-[#333333]">
                  {pub.doi}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
