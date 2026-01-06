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
      group flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300
      ${isSelected
        ? "border-[var(--color-primary)] bg-gradient-to-br from-orange-50/50 to-white shadow-md scale-[1.02]"
        : "border-neutral-100 bg-white hover:border-orange-200 hover:bg-neutral-50 hover:shadow-sm"
      }
    `}
  >
    <div
      className={`
        w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
        ${isSelected
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
        w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all
        ${isSelected
          ? "bg-white text-[var(--color-primary)] shadow-sm border border-orange-100"
          : "bg-neutral-50 text-neutral-400 group-hover:bg-white group-hover:text-neutral-500"
        }
      `}
    >
      <Icon name={icon} size={20} />
    </div>
    <div className="flex-1">
      <h6
        className={`font-semibold text-sm leading-tight mb-0.5 transition-colors ${isSelected ? "text-neutral-900" : "text-neutral-700"
          }`}
      >
        {type}
      </h6>
      <p className="text-[11px] text-neutral-500 font-medium line-clamp-2">
        {description}
      </p>
    </div>
  </div>
);
