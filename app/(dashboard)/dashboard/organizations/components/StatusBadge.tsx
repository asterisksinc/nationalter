import { Check, Clock, Ban, Star, ShieldCheck } from "lucide-react";

type Status =
  | "Approved"
  | "Awaiting Review"
  | "Rejected"
  | "Under Review"
  | "Active";

const STATUS_CONFIG: Record<Status, { Icon: any; color: string }> = {
  Approved: {
    // Solid check icon as seen in image_61834f.png
    Icon: Check, 
    color: "#1FC16B",
  },
  "Awaiting Review": {
    // Standard clock icon
    Icon: Clock,
    color: "#FF7A00",
  },
  Rejected: {
    // Diagonal bar icon for rejection
    Icon: Ban,
    color: "#E82222",
  },
  "Under Review": {
    // Star icon for review status
    Icon: Star,
    color: "#FFE100",
  },
  Active: {
    // Shield with check for active/verified status
    Icon: ShieldCheck,
    color: "#1FC16B",
  },
};

export const StatusBadge = ({ status }: { status: Status }) => {
  const { Icon, color } = STATUS_CONFIG[status];
  
  return (
    <div className="inline-flex items-center gap-1 h-6 px-2 py-1 border border-[#E1E4EA] rounded-md bg-white">
      <div
        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
        style={{ background: color }}
      >
        {/* strokeWidth is increased to simulate the solid appearance in the images */}
        <Icon size={10} color="#ffffff" strokeWidth={3} />
      </div>

      <span className="text-[12px] font-medium leading-4 text-[#525866] whitespace-nowrap">
        {status}
      </span>
    </div>
  );
};