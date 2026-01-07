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
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Paper Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Authors
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Citations
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Publication Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Publisher
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DOI
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {publications.map((pub) => (
              <tr key={pub.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-900">{pub.title}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={pub.authorImg}
                      alt={pub.author}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-gray-900">{pub.author}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{pub.citations}</td>
                <td className="px-6 py-4 text-gray-600">
                  {pub.publicationType}
                </td>
                <td className="px-6 py-4 text-gray-600">{pub.year}</td>
                <td className="px-6 py-4 text-gray-600">{pub.publisher}</td>
                <td className="px-6 py-4 text-gray-600">{pub.doi}</td>
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
