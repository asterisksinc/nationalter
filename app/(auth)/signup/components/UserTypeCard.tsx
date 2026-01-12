import { Icon } from "./Icon";

interface UserOptionProps {
  type: string;
  icon: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

export const UserTypeCard = ({
  type,
  icon,
  description,
  isSelected,
  onClick,
}: UserOptionProps) => (
  <div
    onClick={onClick}
    className={`
      group flex items-center gap-3 md:gap-4 p-3.5 md:p-4 rounded-xl md:rounded-2xl border-2 cursor-pointer transition-all duration-300 touch-manipulation
      ${
        isSelected
          ? "border-[var(--color-primary)] bg-gradient-to-br from-orange-50/50 to-white shadow-md md:scale-[1.02]"
          : "border-neutral-200 bg-white hover:border-orange-200 hover:bg-neutral-50 active:bg-neutral-50"
      }
    `}
  >
    <div
      className={`
        w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
        ${
          isSelected
            ? "border-[var(--color-primary)] bg-white"
            : "border-neutral-300 group-hover:border-[var(--color-primary)]/50"
        }
      `}
    >
      {isSelected && (
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)] animate-in fade-in zoom-in duration-300" />
      )}
    </div>
    <div
      className={`
        w-11 h-11 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 transition-all
        ${
          isSelected
            ? "bg-white text-[var(--color-primary)] shadow-none border border-orange-100"
            : "bg-neutral-50 text-neutral-400 group-hover:bg-white group-hover:text-neutral-500"
        }
      `}
    >
      <Icon name={icon} size={18} className="md:w-5 md:h-5" />
    </div>
    <div className="flex-1 min-w-0">
      <h6
        className={`font-semibold text-sm md:text-base leading-tight mb-0.5 transition-colors truncate ${
          isSelected ? "text-neutral-900" : "text-neutral-700"
        }`}
      >
        {type}
      </h6>
      <p className="text-[11px] md:text-xs text-neutral-500 font-medium line-clamp-1 md:line-clamp-2">
        {description}
      </p>
    </div>
  </div>
);
