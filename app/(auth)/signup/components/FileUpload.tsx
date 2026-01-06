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
      <label className="block text-xs font-medium text-neutral-700 mb-1.5 font-sans tracking-wide">
        {label}
      </label>
      <div className="border-2 border-dashed border-neutral-200 rounded-xl bg-neutral-50 p-4 text-center flex flex-col items-center justify-center hover:bg-white hover:border-[var(--color-primary)] transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md">
        <div className="bg-white border-2 border-neutral-100 rounded-full p-2 mb-1.5 text-[var(--color-primary)] shadow-sm group-hover:scale-110 transition-transform">
          <Icon name="upload" size={16} />
        </div>
        <p className="font-medium text-xs text-neutral-800 mb-1">
          Click or Drag File to This Area to Upload
        </p>
        <p className="text-[10px] text-neutral-500 mb-2.5">{subLabel}</p>
        <button
          type="button"
          className="px-3.5 py-1.5 bg-white border-2 border-neutral-200 rounded-lg text-xs font-medium text-neutral-600 shadow-sm hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all"
        >
          Browse File
        </button>
      </div>
    </div>
  );
};
