"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, X } from "lucide-react";

interface SearchableSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  loading?: boolean;
  required?: boolean;
}

export const SearchableSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Search or select...",
  error,
  loading = false,
  required = false,
}: SearchableSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isManualEntry, setIsManualEntry] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
    setIsManualEntry(false);
  };

  const handleManualEntry = () => {
    setIsManualEntry(true);
    setIsOpen(false);
    onChange("");
  };

  const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const clearSelection = () => {
    onChange("");
    setIsManualEntry(false);
    setSearchTerm("");
  };

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-xs font-medium text-neutral-700 mb-1.5 font-sans tracking-wide">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {isManualEntry ? (
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={handleManualInputChange}
            placeholder="Enter manually..."
            className={`w-full px-3 py-2.5 text-sm border rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all ${
              error ? "border-red-500" : "border-neutral-200"
            }`}
          />
          <button
            type="button"
            onClick={clearSelection}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-3 py-2.5 text-sm border rounded-xl bg-white cursor-pointer flex items-center justify-between transition-all ${
            error ? "border-red-500" : "border-neutral-200"
          } ${isOpen ? "ring-2 ring-[var(--color-primary)] border-transparent" : ""}`}
        >
          <span
            className={value ? "text-black font-medium" : "text-neutral-400"}
          >
            {value || placeholder}
          </span>
          <ChevronDown
            size={16}
            className={`text-neutral-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      )}

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-neutral-200 rounded-xl shadow-lg max-h-64 overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-neutral-100">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to search..."
                className="w-full pl-8 pr-3 py-2 text-sm text-black border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-48 overflow-y-auto">
            {/* Enter Manually Option - Always First */}
            <div
              onClick={handleManualEntry}
              className="px-3 py-2.5 text-sm cursor-pointer hover:bg-neutral-50 flex items-center gap-2 border-b border-neutral-100 text-[var(--color-primary)] font-medium"
            >
              <span className="text-lg">+</span>
              Enter Manually
            </div>

            {loading ? (
              <div className="px-3 py-4 text-sm text-neutral-400 text-center">
                Loading options...
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="px-3 py-4 text-sm text-neutral-400 text-center">
                No matches found. Use "Enter Manually" above.
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(option)}
                  className={`px-3 py-2.5 text-sm cursor-pointer hover:bg-neutral-50 ${
                    value === option
                      ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium"
                      : "text-black"
                  }`}
                >
                  {option}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
