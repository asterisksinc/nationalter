import { Icon } from "./Icon";

const STEPS_CONFIG = [
  {
    id: 1,
    title: "Identity Verification",
    description: "Find Your Academic Footprint.",
    icon: "user",
  },
  {
    id: 2,
    title: "Authentication",
    description: "Verify Your Identity.",
    icon: "id-card",
  },
  {
    id: 3,
    title: "Profile Enrichment",
    description: "Complete Your Digital Persona.",
    icon: "star",
  },
  {
    id: 4,
    title: "Welcome onboard!",
    description: "Get started with your Dashboard",
    icon: "rocket",
  },
];

interface SidebarProps {
  currentStep: number;
}

export const SignupSidebar = ({ currentStep }: SidebarProps) => (
  <div className="w-full h-[calc(100vh-4rem)] p-4 md:p-6 lg:p-8 flex flex-col justify-between relative z-10 overflow-hidden">
    <div className="mb-1">
      <img src="/logo.png" alt="NationCite Logo" className="h-28 w-auto" />
    </div>
    <div className="flex-1 flex flex-col justify-center max-w-sm overflow-auto">
      {STEPS_CONFIG.map((step) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        const isPending = currentStep < step.id;

        return (
          <div key={step.id} className="relative pl-12 pb-10 min-h-[64px]">
            {step.id < 4 && (
              <div
                className={`absolute left-[15px] top-[36px] w-0.5 h-[calc(100%-36px)] transition-all duration-500 ${
                  isCompleted ? "bg-[var(--color-primary)]" : "bg-neutral-300"
                }`}
              ></div>
            )}
            <div
              className={`absolute left-0 top-0 w-9 h-9 rounded-lg border-2 flex items-center justify-center transition-all duration-500 z-10
                  ${
                    isActive
                      ? "border-neutral-800 bg-neutral-800 text-white shadow-lg scale-110"
                      : ""
                  }
                  ${
                    isCompleted
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-md"
                      : ""
                  }
                  ${
                    isPending
                      ? "border-neutral-300 bg-white/50 text-neutral-400"
                      : ""
                  }
                `}
            >
              {isCompleted ? (
                <Icon name="check" size={14} strokeWidth={3} />
              ) : (
                <Icon name={step.icon} size={14} />
              )}
            </div>
            <div
              className={`transition-all duration-500 ${
                isPending ? "opacity-60" : "opacity-100"
              }`}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <div
                  className={`text-[10px]  uppercase tracking-widest font-semibold ${
                    isActive
                      ? "text-[var(--color-primary)]"
                      : "text-neutral-500"
                  }`}
                >
                  Step 0{step.id}
                </div>
                  
                <h5
                  className={`text-base font-medium leading-tight ${
                    isActive ? "text-neutral-900" : "text-neutral-700"
                  }`}
                >
                  {step.title}
                </h5>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-[400px]">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
    <div className="hidden md:block opacity-60">
      <p className="text-[10px] text-neutral-500">
        © 2025 NationCite. All rights reserved.
      </p>
    </div>
  </div>
);
