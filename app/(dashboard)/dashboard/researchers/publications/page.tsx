"use client";

import React, { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
import { AddPublicationModal, PublicationsTable } from "./components";
import type { PublicationData, EditingPublication } from "./components";

export default function PublicationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPublication, setEditingPublication] =
    useState<EditingPublication | null>(null);

  // --- INTEGRATION STATES ---
  const [publications, setPublications] = useState<PublicationData[]>([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH FUNCTION ---
  const fetchPublications = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/publications");
      const result = await response.json();

      if (result.success) {
        const mappedData = result.publications.map((pub: any) => ({
          id: pub.id,
          title: pub.title,
          author: "Researcher",
          authorImg: "",
          citations: pub.citationsTotal || 0,
          publicationType: pub.field || "Journal",
          year: new Date(pub.datePublished).getFullYear(),
          publisher: pub.journalName,
          doi: pub.nationciteId,
          journalName: pub.journalName,
          field: pub.field || "",
        }));
        setPublications(mappedData);
      }
    } catch (error) {
      console.error("Fetch publications error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchPublications();
  }, []);

  // --- EDIT HANDLER ---
  const handleEdit = (pub: PublicationData) => {
    setEditingPublication({
      id: pub.id,
      title: pub.title,
      journalName: pub.journalName || pub.publisher,
      year: pub.year,
      field: pub.field || pub.publicationType,
      doi: pub.doi,
      publisher: pub.publisher,
      authors: pub.author,
    });
    setIsModalOpen(true);
  };

  // --- DELETE HANDLER ---
  const handleDelete = (id: number) => {
    // Remove from local state immediately after API confirms success
    setPublications((prev) => prev.filter((p) => p.id !== id));
  };

  // --- CLOSE MODAL ---
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPublication(null);
  };

  return (
    <>
      {/* Page Title */}
      <div className="mb-4 md:mb-6 pb-3 md:pb-4 border-b border-[#E1E4EA] -mx-4 md:-mx-6 px-4 md:px-6">
        <div className="text-[18px] md:text-[16px] font-bold md:font-semibold leading-5 tracking-[-0.006em] text-[#0E121B] mb-1">
          My Publications
        </div>
        <p className="text-[13px] md:text-[14px] font-normal leading-[150%] tracking-[-0.02em] text-[#525866]">
          View and manage your research output directly from the database
        </p>
      </div>

      {/* Search Bar & Actions */}
      <div className="flex flex-col md:flex-row justify-end items-stretch md:items-center mb-6 gap-4">
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => {
              setEditingPublication(null);
              setIsModalOpen(true);
            }}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 md:py-2.5 border border-[#FF8D28] rounded-lg bg-white text-[14px] font-semibold text-[#FF8D28] hover:bg-orange-50 transition-colors whitespace-nowrap"
          >
            <Plus size={18} /> Add Publication
          </button>
        </div>
      </div>

      {/* Dynamic Content: Loader or Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-[#525866]">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF8D28] mb-2" />
          <p className="text-sm">Loading publications...</p>
        </div>
      ) : (
        <PublicationsTable
          publications={publications}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Add / Edit Publication Modal */}
      <AddPublicationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={() => fetchPublications()}
        editingPublication={editingPublication}
      />
    </>
  );
}
