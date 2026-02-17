import React, { useState, useMemo } from "react";
import { Edit2, Trash2, Search, Filter, X } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    year: "",
    publicationType: "",
    minCitations: "",
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof PublicationData | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  // Get unique years and publication types for filter options
  const uniqueYears = useMemo(
    () => [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a),
    [publications]
  );
  const uniqueTypes = useMemo(
    () => [...new Set(publications.map((p) => p.publicationType))],
    [publications]
  );

  // Filter and search publications
  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.doi.toLowerCase().includes(searchQuery.toLowerCase());

      // Year filter
      const matchesYear =
        filters.year === "" || pub.year === parseInt(filters.year);

      // Publication type filter
      const matchesType =
        filters.publicationType === "" ||
        pub.publicationType === filters.publicationType;

      // Min citations filter
      const matchesCitations =
        filters.minCitations === "" ||
        pub.citations >= parseInt(filters.minCitations);

      return matchesSearch && matchesYear && matchesType && matchesCitations;
    });
  }, [publications, searchQuery, filters]);

  // Sort publications
  const sortedPublications = useMemo(() => {
    if (!sortConfig.key) return filteredPublications;

    return [...filteredPublications].sort((a, b) => {
      const aVal = a[sortConfig.key!];
      const bVal = b[sortConfig.key!];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      return sortConfig.direction === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [filteredPublications, sortConfig]);

  const handleSort = (key: keyof PublicationData) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilters({ year: "", publicationType: "", minCitations: "" });
  };

  const activeFilterCount = [
    filters.year,
    filters.publicationType,
    filters.minCitations,
  ].filter((f) => f !== "").length;

  const SortIcon = ({ columnKey }: { columnKey: keyof PublicationData }) => (
    <span className="ml-1 text-[10px] text-gray-400">
      {sortConfig.key === columnKey
        ? sortConfig.direction === "asc"
          ? "▲"
          : "▼"
        : "⇅"}
    </span>
  );

  return (
    <div className="bg-white rounded-lg border border-[#E1E4EA] overflow-hidden">
      {/* Search and Filter Bar */}
      <div className="p-4 border-b border-[#E1E4EA] space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#525866]"
            />
            <input
              type="text"
              placeholder="Search by title, publisher, or DOI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#E1E4EA] rounded-lg text-[14px] focus:outline-none focus:border-[#FF7A00] bg-white text-[#0E121B] placeholder-[#525866]"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-[#E1E4EA] rounded-lg text-[14px] hover:bg-gray-50 transition-colors relative text-[#0E121B]"
          >
            <Filter size={18} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF7A00] text-white rounded-full w-5 h-5 flex items-center justify-center text-[12px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter Dropdowns */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 pb-2">
            {/* Year Filter */}
            <select
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              className="px-3 py-2 border border-[#E1E4EA] rounded-lg text-[14px] focus:outline-none focus:border-[#FF7A00] bg-white text-[#0E121B]"
            >
              <option value="">All Years</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            {/* Publication Type Filter */}
            <select
              value={filters.publicationType}
              onChange={(e) =>
                setFilters({ ...filters, publicationType: e.target.value })
              }
              className="px-3 py-2 border border-[#E1E4EA] rounded-lg text-[14px] focus:outline-none focus:border-[#FF7A00] bg-white text-[#0E121B]"
            >
              <option value="">All Types</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {/* Min Citations Filter */}
            <input
              type="number"
              placeholder="Min citations..."
              value={filters.minCitations}
              onChange={(e) =>
                setFilters({ ...filters, minCitations: e.target.value })
              }
              className="px-3 py-2 border border-[#E1E4EA] rounded-lg text-[14px] focus:outline-none focus:border-[#FF7A00] bg-white text-[#0E121B]"
            />

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="md:col-span-3 flex items-center justify-center gap-2 px-3 py-2 text-[#FF7A00] hover:bg-orange-50 rounded-lg text-[14px] transition-colors"
              >
                <X size={16} />
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Results count */}
        {(searchQuery || activeFilterCount > 0) && (
          <div className="text-[12px] text-[#525866]">
            Showing {sortedPublications.length} of {publications.length}{" "}
            publications
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" style={{ minWidth: "500px" }}>
          <thead className="bg-[#F5F7FA] border-b border-[#E1E4EA]">
            <tr>
              <th
                className="px-1.5 md:px-4 py-2.5 text-left text-[11px] md:text-xs font-medium text-[#525866] uppercase tracking-wider w-[180px] md:w-[280px] cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("title")}
              >
                Title <SortIcon columnKey="title" />
              </th>
              <th
                className="px-1.5 md:px-4 py-2.5 text-left text-[11px] md:text-xs font-medium text-[#525866] uppercase tracking-wider w-[70px] md:w-[80px] cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("citations")}
              >
                Citations <SortIcon columnKey="citations" />
              </th>
              <th className="px-1.5 md:px-4 py-2.5 text-left text-[11px] md:text-xs font-medium text-[#525866] uppercase tracking-wider w-[100px] md:w-[120px]">
                Publication
              </th>
              <th
                className="px-1.5 md:px-4 py-2.5 text-left text-[11px] md:text-xs font-medium text-[#525866] uppercase tracking-wider w-[70px] cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("year")}
              >
                Year <SortIcon columnKey="year" />
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
            {sortedPublications.map((pub) => (
              <tr
                key={pub.id}
                className="bg-[#FDFDFD] hover:bg-gray-50 transition-colors"
                style={{ height: 54 }}
              >
                {/* Title */}
                <td className="px-1.5 md:px-4 py-3 align-middle">
                  <div className="text-[12px] md:text-[14px] font-medium text-[#222530] line-clamp-2 max-w-full">
                    {pub.title}
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

            {sortedPublications.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-[#525866]"
                >
                  {publications.length === 0
                    ? "No publications found."
                    : "No publications match your filters."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
