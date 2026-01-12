"use client";

import React, { useState } from "react";
import { Search, Plus, Filter } from "lucide-react";
import { AddPublicationModal, PublicationsTable } from "./components";
import type { PublicationData } from "./components";

// --- Types are now imported from components ---

// --- Mock Data ---

const publications: PublicationData[] = [
  {
    id: "1",
    title: "Deep Learning Applications in Healthcare",
    author: "Rachel Thompson",
    authorImg:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    citations: 127,
    publicationType: "Journal",
    year: 2023,
    publisher: "Nature",
    doi: "10.1038/s41586-023",
  },
  {
    id: "2",
    title: "Quantum Computing and Cryptography",
    author: "Michael Chen",
    authorImg:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    citations: 89,
    publicationType: "Conference",
    year: 2024,
    publisher: "IEEE",
    doi: "10.1109/SP.2024",
  },
  {
    id: "3",
    title: "Sustainable Energy Systems Analysis",
    author: "Emily Rodriguez",
    authorImg:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    citations: 156,
    publicationType: "Journal",
    year: 2022,
    publisher: "Elsevier",
    doi: "10.1016/j.energy.2022",
  },
  {
    id: "4",
    title: "Neural Network Optimization Techniques",
    author: "David Kim",
    authorImg:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    citations: 203,
    publicationType: "Journal",
    year: 2023,
    publisher: "ACM",
    doi: "10.1145/3580305",
  },
  {
    id: "5",
    title: "Blockchain Technology in Supply Chain",
    author: "Jennifer Martinez",
    authorImg:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    citations: 74,
    publicationType: "Conference",
    year: 2024,
    publisher: "Springer",
    doi: "10.1007/978-3-031",
  },
  {
    id: "6",
    title: "Climate Change Impact on Biodiversity",
    author: "Sarah Anderson",
    authorImg:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    citations: 178,
    publicationType: "Journal",
    year: 2023,
    publisher: "Wiley",
    doi: "10.1111/gcb.16789",
  },
  {
    id: "7",
    title: "Advanced Materials for Electronics",
    author: "Robert Wilson",
    authorImg:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    citations: 142,
    publicationType: "Journal",
    year: 2022,
    publisher: "ACS",
    doi: "10.1021/acsnano.2c",
  },
  {
    id: "8",
    title: "Machine Learning for Drug Discovery",
    author: "Lisa Taylor",
    authorImg:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    citations: 195,
    publicationType: "Journal",
    year: 2024,
    publisher: "Nature",
    doi: "10.1038/s41467-024",
  },
  {
    id: "9",
    title: "Autonomous Vehicle Navigation Systems",
    author: "James Brown",
    authorImg:
      "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    citations: 108,
    publicationType: "Conference",
    year: 2023,
    publisher: "IEEE",
    doi: "10.1109/ITSC.2023",
  },
  {
    id: "10",
    title: "Renewable Energy Grid Integration",
    author: "Amanda Garcia",
    authorImg:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    citations: 91,
    publicationType: "Journal",
    year: 2024,
    publisher: "Elsevier",
    doi: "10.1016/j.rser.2024",
  },
];

// --- Main Page Component ---

export default function PublicationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Page Title */}
      <div className="mb-6 border-b border-[#E1E4EA] pb-2">
        <div className="text-[16px] font-semibold leading-5 tracking-[-0.006em] text-[#0E121B] mb-1">
          My Publications
        </div>
        <p className="text-[14px] font-normal leading-[150%] tracking-[-0.02em] text-[#525866]">
          Manage and track your research publications and their impact metrics.
        </p>
      </div>

      {/* Search Bar & Actions */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="relative flex-1 max-w-2xl">
          <Search
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#525866]"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by ORCID, DOI..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E1E4EA] rounded text-[14px] font-normal leading-[120%] tracking-[-0.02em] focus:outline-none focus:border-[#FF8D28] text-[#333333] placeholder-[#525866]"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-2.5 py-2.5 border border-[#E1E4EA] rounded bg-white text-[14px] font-medium leading-[120%] text-[#222530] hover:bg-gray-50">
            <Filter size={20} /> Filter
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-[#FF8D28] rounded bg-white text-[14px] font-semibold leading-[120%] text-[#FF8D28] hover:bg-orange-50 transition-colors"
          >
            <Plus size={20} /> Add Missing Publication
          </button>
        </div>
      </div>

      {/* Publications Table */}
      <PublicationsTable publications={publications} />

      {/* Add Publication Modal */}
      <AddPublicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
