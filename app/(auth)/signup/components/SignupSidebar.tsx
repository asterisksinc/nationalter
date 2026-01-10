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

export const SignupSidebar = ({ currentStep }: SidebarProps) => {
  return (
    <div className="w-[355px] h-[calc(100vh-4rem)] px-6 py-5 flex flex-col">
      {/* Logo — top left, blended */}
      <div className="mb-10">
        <div className="inline-flex items-center justify-center px-2 py-1 rounded-md bg-inherit">
          <img
            src="/logo.png"
            alt="NationCite Logo"
            className="h-[100px] w-auto"
          />
        </div>
      </div>

      {/* Steps — top aligned */}
      <div className="flex flex-col gap-2">
        {STEPS_CONFIG.map((step, idx) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          const isPending = currentStep < step.id;

          return (
            <div key={step.id} className="flex flex-col">
              {/* Step Row */}
              <div className="flex items-start gap-4">
                {/* Icon Column */}
                <div className="w-12 flex flex-col items-center">
                  <div
                    className={`w-11 h-11 rounded-[6px] border p-[10px] flex items-center justify-center gap-[10px]
                      ${
                        isActive
                          ? "border-neutral-900 bg-neutral-100"
                          : isCompleted
                          ? "border-[#FF7A00] bg-[#FFF4E6]"
                          : "border-[#AEAEB2] bg-[#FFF4E6]"
                      }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center
                        ${
                          isActive
                            ? "text-neutral-900"
                            : isCompleted
                            ? "text-[#FF7A00]"
                            : "text-[#FF7A00]"
                        }`}
                    >
                      {isCompleted ? (
                        <Icon name="check" size={14} strokeWidth={3} />
                      ) : (
                        <Icon name={step.icon} size={14} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Text Column */}
                <div
                  className={`flex flex-col gap-[6px] ${
                    isPending ? "opacity-50" : "opacity-100"
                  }`}
                >
                  <div className="text-[12px] text-[#525866]">
                    Step {step.id}
                  </div>

                  <div
                    className={`text-[14px] leading-[120%]
                      ${
                        isActive
                          ? "font-semibold text-black"
                          : "font-medium text-black"
                      }`}
                  >
                    {step.title}
                  </div>

                  <div className="text-[12px] leading-[120%] text-[#525866]">
                    {step.description}
                  </div>
                </div>
              </div>

              {/* Connector */}
              {idx < STEPS_CONFIG.length - 1 && (
                <div className="flex">
                  <div className="w-12 flex justify-center">
                    <div
                      className={`w-px h-10 ${
                        isCompleted ? "bg-[#FF7A00]" : "bg-[#EAEAEA]"
                      }`}
                    />
                  </div>
                  <div className="flex-1" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer */}
      <div className="text-[12px] text-[#525866]">
        Already a user?
        <span
          className="ml-1 text-[#FF7A00] font-medium cursor-pointer hover:underline"
          onClick={() => (window.location.href = "/signin")}
        >
          Login
        </span>
      </div>
    </div>
  );
};
