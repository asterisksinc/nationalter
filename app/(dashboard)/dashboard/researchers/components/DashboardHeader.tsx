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

    const target = pathname?.includes("/tickets")
      ? `${pathname}?openCreate=true`
      : "/dashboard/researchers/tickets?openCreate=true";

    router.push(target);
  };

  return (
    <>
      {/* MOBILE HEADER STRUCTURE */}
      <div className="md:hidden flex flex-col w-full mb-6">
        {/* Row 1: Top Bar (Menu, Logo, Icons) */}
        <div className="flex items-center justify-between w-full h-[40px] mb-4">
          <div className="flex items-center gap-3">
            <button onClick={onMenuClick} className="p-1 -ml-1">
              <Menu size={24} className="text-[#0E121B]" />
            </button>
            <div className="flex flex-col">
              <img
                src="/logo.png"
                alt="NationCite"
                className="h-[40px] w-auto object-contain"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
           
            <button className="relative">
              <Bell size={20} className="text-[#0E121B]" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#DF120B] rounded-full border border-white"></span>
            </button>
            <button
              onClick={handleRaise}
              className="w-8 h-8 bg-[#FF7A00] rounded-md flex items-center justify-center"
            >
              <Plus size={18} className="text-white" />
            </button>
          </div>
        </div>

        {/* Row 2: Breadcrumbs */}
        <div className="flex items-center text-[13px] font-normal text-[#525866]">
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.href ? (
                <Link href={item.href} className="text-[#9ea3ae]">
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#0E121B] font-medium">{item.label}</span>
              )}
              {index < breadcrumbItems.length - 1 && (
                <ChevronRight size={14} className="mx-2 text-[#9ea3ae]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* DESKTOP HEADER STRUCTURE (Unchanged logic, verified) */}
      <header className="hidden md:flex flex-row justify-between items-start mb-[26px] h-[48px] border-b border-[#E1E4EA] -mx-6 px-6">
        <div className="flex items-center h-full">
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

        <div className="flex items-start  gap-[12px] h-full">
        

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
    </>
  );
};
