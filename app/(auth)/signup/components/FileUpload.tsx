import { Icon } from "./Icon";

interface FileUploadProps {
  label: string;
  subLabel?: string;
}

export const FileUpload = ({
  label,
  subLabel = "Support for a single or bulk upload. Allowed: PDF, JPG, PNG.",
}: FileUploadProps) => {
  return (
    <div className="w-full">
      <label className="block text-xs md:text-sm font-medium text-neutral-700 mb-1.5 md:mb-2 font-sans">
        {label}
      </label>
      <div className="border-2 border-dashed border-neutral-200 rounded-xl bg-neutral-50 p-5 md:p-4 text-center flex flex-col items-center justify-center hover:bg-white hover:border-[var(--color-primary)] active:bg-white active:border-[var(--color-primary)] transition-all duration-300 cursor-pointer group shadow-none hover:shadow-md touch-manipulation">
        <div className="bg-white border-2 border-neutral-100 rounded-full p-2.5 md:p-2 mb-2 md:mb-1.5 text-[var(--color-primary)] shadow-none group-hover:scale-110 transition-transform">
          <Icon name="upload" size={20} className="md:w-4 md:h-4" />
        </div>
        <p className="font-medium text-xs md:text-sm text-neutral-800 mb-1.5 md:mb-1">
          Click or Drag File to This Area to Upload
        </p>
        <p className="text-[10px] md:text-xs text-neutral-500 mb-3 md:mb-2.5">
          {subLabel}
        </p>
        <button
          type="button"
          className="px-4 py-2 md:px-3.5 md:py-1.5 bg-white border-2 border-neutral-200 rounded-lg text-xs md:text-sm font-medium text-neutral-600 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] active:scale-95 transition-all touch-manipulation"
        >
          Browse File
        </button>
      </div>
    </div>
  );
};
