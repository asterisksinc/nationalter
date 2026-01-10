import React from "react";
import Link from "next/link";
import { Search, Bell, Plus, ChevronRight, Menu } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface DashboardHeaderProps {
  breadcrumbItems: { label: string; href?: string }[];
  onRaiseTicket?: () => void;
  onMenuClick?: () => void;
}

export const DashboardHeader = ({
  breadcrumbItems,
  onRaiseTicket,
  onMenuClick,
}: DashboardHeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleRaise = () => {
    if (onRaiseTicket) {
      onRaiseTicket();
      return;
    }

    // If we're already on the tickets page, open modal via query param; otherwise navigate to tickets page with param
    const target = pathname?.includes("/tickets")
      ? `${pathname}?openCreate=true`
      : "/dashboard/researchers/tickets?openCreate=true";

    router.push(target);
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-[16px] gap-3 md:gap-0 md:h-[48px]">
      {/* Top row: Menu + Breadcrumbs + Search/Bell on mobile */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center gap-3">
          {/* Hamburger menu for mobile */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-[#E1E4EA] rounded-lg transition-colors -ml-2"
          >
            <Menu size={20} className="text-[#525866]" />
          </button>

          {/* Breadcrumbs */}
          <div className="flex items-center text-[12px] font-normal leading-[120%] text-[#525866]">
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-[#0E121B] cursor-pointer"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={
                      index === breadcrumbItems.length - 1
                        ? "text-[#0E121B] font-medium"
                        : ""
                    }
                  >
                    {item.label}
                  </span>
                )}
                {index < breadcrumbItems.length - 1 && (
                  <ChevronRight size={12} className="mx-[6px] text-[#8E8E93]" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Mobile: Search icon and User avatar */}
        <div className="flex md:hidden items-center gap-2">
          <button className="p-2 hover:bg-[#E1E4EA] rounded-lg transition-colors">
            <Search size={20} className="text-[#525866]" />
          </button>
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Desktop: Search, Bell, Raise Ticket */}
      <div className="hidden md:flex items-center gap-[12px]">
        <div className="relative w-[220px] h-[40px]">
          <Search
            className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[#525866]"
            size={20}
          />
          <input
            type="text"
            placeholder="Search"
            className="pl-[38px] pr-3 py-[10px] w-full h-full bg-[#F2F5F8] border border-[#E1E4EA] rounded-[6px] text-[14px] font-normal leading-[120%] text-[#525866] placeholder-[#525866] focus:bg-white focus:border-[#E1E4EA] focus:outline-none transition-all"
          />
        </div>

        <button className="p-2.5 bg-white border border-[#E1E4EA] rounded-md text-[#525866] hover:text-[#0E121B] hover:bg-[#F5F7FA] relative h-10 w-10 flex items-center justify-center">
          <Bell size={20} strokeWidth={1.5} />
          <span className="absolute top-1 right-3 w-1.5 h-1.5 bg-[#DF120B] rounded-full"></span>
        </button>

        <button
          onClick={handleRaise}
          className="flex items-center gap-[6px] bg-[#FF7A00] hover:bg-[#FF8D28] text-white px-[14px] py-[7px] rounded-[8px] text-[14px] font-semibold leading-[120%] tracking-[-0.04em] transition-colors w-[142px] h-[40px] justify-center"
        >
          <Plus size={14} strokeWidth={2.5} /> Raise Ticket
        </button>
      </div>
    </header>
  );
};
