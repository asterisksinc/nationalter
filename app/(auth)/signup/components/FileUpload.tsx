// components/FileUpload.tsx
"use client";

import React from "react";
import { Icon } from "./Icon";

interface FileUploadProps {
  label: string;
  subLabel?: string;
  onChange?: (file: File) => void;
  filename?: string;
  error?: string;
}

export const FileUpload = ({
  label,
  subLabel = "Support for a single or bulk upload. Allowed: PDF, JPG, PNG.",
  onChange,
  filename,
  error,
}: FileUploadProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (onChange) {
        onChange(file);
      }
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <label className="block text-xs md:text-sm font-medium text-neutral-700 mb-1.5 md:mb-2 font-sans">
        {label}
      </label>

      <div
        className="border-2 border-dashed border-neutral-200 rounded-xl bg-neutral-50 p-5 md:p-4 text-center flex flex-col items-center justify-center cursor-pointer group shadow-none touch-manipulation"
        onClick={handleBrowseClick}
      >
        <div className="bg-white border-2 border-neutral-100 rounded-full p-2.5 md:p-2 mb-2 md:mb-1.5 text-[var(--color-primary)] shadow-none">
          <Icon name="upload" size={20} className="md:w-4 md:h-4" />
        </div>

        <p className="font-medium text-xs md:text-sm text-neutral-800 mb-1.5 md:mb-1">
          Click or Drag File to This Area to Upload
        </p>

        <p className="text-[10px] md:text-xs text-neutral-500 mb-5 md:mb-4">
          {subLabel}
        </p>

        <button
          type="button"
          onClick={handleBrowseClick} // Prevent event bubbling to parent div
          className="px-4 py-2 md:px-3.5 md:py-1.5 bg-white border-2 border-neutral-200 rounded-lg text-xs md:text-sm font-medium text-neutral-600 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] active:scale-95 transition-all touch-manipulation"
        >
          Browse File
        </button>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          aria-label={`Upload ${label}`}
        // Optional: restrict file types
        // accept=".pdf,.jpg,.jpeg,.png"
        />
      </div>

      {/* Show current filename */}
      {filename && (
        <p className="text-xs text-neutral-700 mt-1 ml-1 truncate">
          Selected: {filename}
        </p>
      )}

      {/* Error message */}
      {error && (
        <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>
      )}
    </div>
  );
};
