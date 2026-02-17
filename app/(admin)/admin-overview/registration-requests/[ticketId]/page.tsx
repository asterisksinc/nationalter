"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { DashboardSidebar } from "../../component/dashboardsidebar";
import { DashboardHeader } from "../../component/DashboardHeader";
import { ArrowLeft, Check, X, MessageCircle, ExternalLink, FileText, CheckCircle2, CircleCheck } from "lucide-react";

interface RegistrationData {
  registration: {
    type: "RESEARCHER" | "ORG" | "MEDICAL";
    status: string;
    ticketId: string;
  };
  registrantData: {
    name: string;
    email: string;
    institute?: string;
    orcidId?: string;
    googleScholarUrl?: string;
    officialDomain?: string;
    adminName?: string;
    adminMobile?: string;
    adminEmail?: string;
    medCouncilRegNo?: string;
    stateCouncil?: string;
    primaryHospital?: string;
    specialty?: string;
    researchFocus?: string;
    researchCategories?: string[];
    referral?: string;
    purpose?: string;
    hIndex?: number;
    citations?: string;
  };
}

export default function RegistrationReviewPage() {
  const router = useRouter();
  const params = useParams();
  const ticketId = params.ticketId as string;

  const [data, setData] = useState<RegistrationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [activeModal, setActiveModal] = useState<"APPROVE" | "REJECT" | "REQUEST" | null>(null);
  useEffect(() => {
    // Mocking data based on ticketId for design demonstration
    const mockFetch = () => {
      let type: "RESEARCHER" | "ORG" | "MEDICAL" = "RESEARCHER";
      if (ticketId?.startsWith("ORG")) type = "ORG";
      if (ticketId?.startsWith("MED")) type = "MEDICAL";

      setData({
        registration: { type, status: "PENDING", ticketId: ticketId || "REG-2048" },
        registrantData: {
          name: "Dr. Aditya Sharma",
          email: "aditya@iitd.ac.in",
          institute: "IIT Delhi",
          orcidId: "0000-0002-1823-4567",
          googleScholarUrl: "#",
          officialDomain: "iitd.ac.in",
          adminName: "Dr. Rajesh Kumar",
          adminMobile: "+91 98765 43210",
          adminEmail: "rajesh.kumar@iitd.ac.in",
          medCouncilRegNo: "MCI-12345",
          stateCouncil: "Tamil Nadu Medical Council",
          primaryHospital: "Apollo Hospital Chennai",
          specialty: "Cardiology",
          researchFocus: "Cardiovascular Disease Prevention",
          researchCategories: ["AI/AM", "Computer Vision"],
          referral: "IIT Newsletter",
          purpose: "H-index Tracking for Promotion and Research Impact Measurement",
          hIndex: 24,
          citations: "1,240"
        }
      });
      setLoading(false);
    };
    mockFetch();
  }, [ticketId]);

 

  if (loading || !data) return <div className="p-10 text-center">Loading...</div>;

  const type = data.registration.type;

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <DashboardSidebar activePage="registrations" />

      <main className="flex-1 ml-[260px]">
        <DashboardHeader
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Registrations", href: "/admin-overview/registration-requests" },
            { label: ticketId || "Review" },
          ]}
        />

        <div className="p-4">
          {/* Header & Back Button */}
          <div className="flex items-center mb-6">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <h1 className="!text-lg !font-bold !text-gray-900  ">{ticketId}</h1>
          </div>

          <div className="space-y-6">
            {/* SCREEN 1: RESEARCHER DESIGN */}
            {type === "RESEARCHER" && (
              <>
                {/* Profile Card */}
                <div className="bg-white border border-gray-100 rounded-2xl p-8 flex gap-8 items-center shadow-sm">
                  <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-gray-100">
                    <Image src="/api/placeholder/112/112" alt="Profile" fill className="object-cover" />
                  </div>
                  <div className="grid grid-cols-2 flex-1 gap-y-4">
                    <div>
                      <p className=" text-xs!  font-medium!  text-gray-400!  uppercase!  mb-1!">Name</p>
                      <h3 className=" text-base!  font-bold!  text-gray-900! ">{data.registrantData.name}</h3>
                    </div>
                    <div>
                      <p className="text-xs! font-medium! text-gray-400! uppercase! mb-1">Institution</p>
                      <p className=" text-sm!  font-semibold! text-gray-900!">{data.registrantData.institute}</p>
                    </div>
                    <div>
                      <p className=" text-xs! font-medium! text-gray-400! uppercase! mb-1!">Email</p>
                      <p className="text-sm! font-semibold! text-gray-900!">{data.registrantData.email}</p>
                    </div>
                    <div>
                      <p className="text-xs! font-medium! text-gray-400! uppercase! mb-1!">ORCID</p>
                      <p className="text-sm! font-semibold! text-gray-900!">{data.registrantData.orcidId}</p>
                    </div>
                    <div>
                      <p className="text-xs! font-medium! text-gray-400! uppercase! mb-1!">Google Scholar</p>
                      <a href="#" className="text-sm font-bold text-[#FF7F3E] flex items-center gap-1 hover:underline">
                        View Profile <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Documents Section */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-base! font-bold! text-gray-900! mb-1!  ">Uploaded Documents</h3>
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-2 border border-gray-100 rounded-xl">
                          <div className="flex items-center gap-1">
                            <div className="p-2 bg-red-50 text-red-500 rounded-lg"><FileText size={20} /></div>
                            <div>
                              <p className="text-sm! font-bold! text-gray-900!">document.pdf</p>
                              <p className="text-[11px]! text-gray-400! font-medium!">3 MB</p>
                            </div>
                          </div>
                          <button className="text-sm font-bold text-[#FF7F3E] hover:underline">View</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Research Info Card */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <p className="text-[11px]! font-bold! text-gray-400! uppercase! mb-2!">Research Categories</p>
                          <div className="flex gap-2">
                            {data.registrantData.researchCategories?.map(cat => (
                              <span key={cat} className="px-3 py-1 bg-blue-50 text-blue-600 text-[11px] font-bold rounded-full">{cat}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-[11px]! font-bold! text-gray-400! uppercase! mb-2!">Referral</p>
                          <p className="text-sm! font-bold! text-gray-900!">"{data.registrantData.referral}"</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[11px]! font-bold! text-gray-400! uppercase! mb-2!">Purpose</p>
                        <p className="text-sm! font-bold! text-gray-900! leading-relaxed!">"{data.registrantData.purpose}"</p>
                      </div>
                    </div>

                    {/* Impact Card Preview */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                      <h3 className="text-base! font-bold! text-gray-900! mb-3! !important">Impact Card Preview</h3>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-[11px]! font-bold! text-gray-400! uppercase! mb-1!">H-Index</p>
                          <p className="text-xl! font-bold! text-gray-900!">{data.registrantData.hIndex}</p>
                        </div>
                        <div className="text-right border-l pl-2 border-gray-300 ">
                          <p className="text-[11px]! font-bold! text-gray-400! uppercase! mb-1!">Citations</p>
                          <p className="text-xl! font-bold! text-gray-900!">{data.registrantData.citations}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* SCREEN 2: ORGANIZATION DESIGN */}
            {type === "ORG" && (
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="space-y-3">
          <div>
            <p className="text-[11px]! font-bold! text-gray-400! uppercase! mb-1!">Official Domain</p>
            <p className="text-sm! font-bold! text-gray-900!">{data.registrantData.officialDomain}</p>
          </div>
          <div>
            <p className="text-[11px]! font-bold! text-gray-400! uppercase! mb-1!">Institution</p>
            <p className="text-sm! font-bold! text-gray-900!">{data.registrantData.institute}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm! font-bold! text-gray-900! mb-2! ">Admin Contact</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="border-r border-gray-300 " >
            <p className="text-[11px]! font-bold! text-gray-400! uppercase! mb-1!">Name</p>
            <p className="text-sm! font-bold! text-gray-900!">{data.registrantData.adminName}</p>
           </div>
          
          <div className="border-r border-gray-300 ">
            <p className="text-[11px]! font-bold! text-gray-400! uppercase! mb-1!">Mobile</p>
            <p className="text-sm! font-bold! text-gray-900!">{data.registrantData.adminMobile}</p>
          </div>
          <div>
            <p className="text-[11px]! font-bold! text-gray-400! uppercase! mb-1!">Email</p>
            <p className="text-sm! font-bold! text-gray-900!">{data.registrantData.adminEmail}</p>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-fit">
        <h3 className="text-sm! font-bold! text-gray-900! mb-2! !important">Uploaded Documents</h3>
        <div className="flex items-center justify-between p-2 border border-gray-200 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 text-red-500 rounded-lg"><FileText size={20} /></div>
            <div>
              <p className="text-sm! font-bold! text-gray-900!">document.pdf</p>
              <p className="text-[11px]! text-gray-400!">3 MB</p>
            </div>
          </div>
          <button className="text-sm font-bold text-[#FF7F3E] hover:underline">View</button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
        <h3 className="text-sm! font-bold! text-gray-900! mb-3! !important">Impact Card Preview</h3>
        <div className="grid grid-cols-2 gap-y-4">
          {["Computer Science", "Electrical Engineering", "Physics", "Mechanical Engineering", "Mathematics"].map(subj => (
            <div key={subj} className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Check size={14} className="text-green-500" /> 
              <p className="text-sm! font-bold! text-gray-600!">{subj}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}

            {/* SCREEN 3: MEDICAL PROFESSIONAL DESIGN */}
            {type === "MEDICAL" && (
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <p className="text-[11px]! font-bold! text-gray-400! uppercase! mb-1!">Name</p>
            <p className="text-sm! font-bold! text-gray-900!">Dr. Priya Rao</p>
          </div>
          <div>
            <p className="text-[11px]! font-bold! text-gray-400! uppercase! mb-1!">Primary Hospital</p>
            <p className="text-sm! font-bold! text-gray-900!">{data.registrantData.primaryHospital}</p>
          </div>
          <div>
            <p className="text-[11px]! font-bold! text-gray-400! uppercase! mb-1!">Specialty</p>
            <p className="text-sm! font-bold! text-gray-900!">{data.registrantData.specialty}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-green-50 border border-green-100 p-4 rounded-xl flex justify-between items-center">
          <div className="flex items-center gap-2 text-green-700 text-sm font-bold">
             <CircleCheck  className="w-4 h-4 rounded-full bg-green-500"/>             <p className="text-sm! font-bold! text-green-700!">priya@apollo.com</p>
          </div>
          <p className="text-[11px]! font-bold! text-green-700!">Email is Verified</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm ">
          <h3 className="text-sm! font-bold! text-gray-900! mb-3!  ">Medical Council</h3>
          <div className="flex gap-16">
            <div>
              <p className="text-[11px]! font-bold! text-gray-400! uppercase! mb-1!">Registration #</p>
              <p className="text-sm! font-bold! text-gray-900!">{data.registrantData.medCouncilRegNo}</p>
            </div>
            <div>
              <p className="text-[11px]! font-bold! text-gray-400! uppercase! mb-1!">State Council</p>
              <p className="text-sm! font-bold! text-gray-900!">{data.registrantData.stateCouncil}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm! font-bold! text-gray-900! mb-3! !important">Uploaded Documents</h3>
        <div className="flex items-center justify-between p-2 border border-gray-100 rounded-xl relative">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-red-50 text-red-500 rounded-lg"><FileText size={20} /></div>
            <div>
              <p className="text-sm! font-bold! text-gray-900!">document.pdf</p>
              <p className="text-[11px]! text-gray-400!">3 MB</p>
            </div>
          </div>
          <button className="text-sm font-bold text-[#FF7F3E] hover:underline">View</button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <p className="text-[11px]! font-bold! text-gray-400! uppercase! mb-2!">Research Focus</p>
        <p className="text-sm! font-bold! text-gray-900! leading-relaxed!">{data.registrantData.researchFocus}</p>
      </div>
    </div>
  </div>
)}

            {/* Bottom Decision Bar */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex justify-between items-center mt-8">
              <h3 className="text-base! font-bold! text-gray-900!  ">Final Decision:</h3>
              <div className="flex! gap-4!">
              {/* APPROVE BUTTON & MODAL */}
              <button 
                onClick={() => setActiveModal("APPROVE")} 
                className="bg-[#10B981]! hover:bg-[#059669]! text-white! px-8! py-2.5! rounded-lg! flex! items-center! gap-2! font-bold! transition-colors!"
              >
                <p className="text-sm! font-bold! text-white!">Approve</p> <Check size={18} />
              </button>
              <ApproveModal 
                isOpen={activeModal === "APPROVE"}
                onClose={() => setActiveModal(null)}
                registrantId={data.registration.ticketId}
                registrantType={data.registration.type}
              />

              {/* REJECT BUTTON & MODAL */}
              <button 
                onClick={() => setActiveModal("REJECT")} 
                className="bg-[#EF4444]! hover:bg-[#DC2626]! text-white! px-8! py-2.5! rounded-lg! flex! items-center! gap-2! font-bold! transition-colors!"
              >
                <p className="text-sm! font-bold! text-white!">Reject</p> <X size={18} />
              </button>
              <RejectModal 
                isOpen={activeModal === "REJECT"}
                onClose={() => setActiveModal(null)}
                registrantId={data.registration.ticketId}
              />

              {/* REQUEST MORE DETAILS BUTTON & MODAL */}
              <button 
                onClick={() => setActiveModal("REQUEST")} 
                className="bg-[#FF7F3E]! hover:bg-[#E66A2E]! text-white! px-8! py-2.5! rounded-lg! flex! items-center! gap-2! font-bold! transition-colors!"
              >
                <p className="text-sm! font-bold! text-white!">Request More Details ⓘ </p>  
              </button>
              <RequestDetailsModal 
                isOpen={activeModal === "REQUEST"}
                onClose={() => setActiveModal(null)}
                registrantId={data.registration.ticketId}
              />
            </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
 


interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  registrantId: string;
  registrantType: string;
}

export function ApproveModal({ isOpen, onClose, registrantId, registrantType }: ApproveModalProps) {
  const [template, setTemplate] = useState("");
  const [customMessage, setCustomMessage] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed! inset-0! z-50! flex! items-center! justify-center! bg-black/50! backdrop-blur-sm!">
      <div className="bg-white! w-full! max-w-[560px]! rounded-2xl! shadow-2xl! overflow-hidden! animate-in! fade-in! zoom-in! duration-200!">
        {/* Modal Header */}
        <div className="flex! items-center! justify-between! p-6! border-b! border-gray-100!">
          <div>
            <h2 className="text-lg! font-bold! text-gray-900! leading-tight! !important">
              Approve
            </h2>
            <p className="text-xs! font-medium! text-gray-500! mt-1! !important">
              {registrantType} ID: {registrantId}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2! hover:bg-gray-100! rounded-full! transition-colors! text-gray-400!"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4! space-y-6!">
          {/* Template Selection */}
          <div>
            <p className="text-sm! font-bold! text-gray-900! mb-2! !important">
              Template
            </p>
            <div className="relative!">
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="w-full! p-3! bg-white! border! border-gray-200! rounded-xl! text-sm! font-medium! text-gray-700! appearance-none! focus:outline-none! focus:ring-2! focus:ring-[#10B981]/20! focus:border-[#10B981]! transition-all!"
              >
                <option value="" disabled >Select a Template</option>
                <option value="standard">Standard Approval</option>
                <option value="welcome">Welcome Onboard</option>
                <option value="priority">Priority Research Access</option>
              </select>
              <div className="absolute! inset-y-0! right-4! flex! items-center! pointer-events-none! text-gray-400!">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Custom Message */}
          <div>
            <p className="text-sm! font-bold! text-gray-900! mb-2! !important">
              Custom Message
            </p>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Or write a custom message..."
              className="w-full! min-h-[140px]! p-4! bg-white! border! border-gray-200! rounded-xl! text-sm! font-medium! text-gray-700! placeholder:text-gray-400! focus:outline-none! focus:ring-2! focus:ring-[#10B981]/20! focus:border-[#10B981]! transition-all! resize-none!"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex! items-center! justify-end! gap-3! p-6! bg-gray-50/50! border-t! border-gray-100!">
          <button
            onClick={onClose}
            className="px-6! py-2.5! bg-white! border! border-gray-200! rounded-lg! text-sm! font-bold! text-gray-600! hover:bg-gray-50! transition-all!"
          >
            Cancel
          </button>
          <button
            className="px-6! py-2.5! bg-[#10B981]! hover:bg-[#059669]! text-white! rounded-lg! text-sm! font-bold! transition-all! shadow-sm! shadow-[#10B981]/20!"
          >
            Confirm Approve
          </button>
        </div>
      </div>
    </div>
  );
}
 

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  registrantId: string;
}

export function RejectModal({ isOpen, onClose, registrantId }: RejectModalProps) {
  const [reason, setReason] = useState("");
  const [template, setTemplate] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed! inset-0! z-50! flex! items-center! justify-center! bg-black/50! backdrop-blur-sm!">
      <div className="bg-white! w-full! max-w-[560px]! rounded-2xl! shadow-2xl! animate-in! fade-in! zoom-in! duration-200!">
        <div className="flex! items-center! justify-between! p-4! border-b! border-gray-100!">
          <div>
            <h2 className="text-lg! font-bold! text-gray-900! !important">Reject</h2>
            <p className="text-xs! font-medium! text-gray-500! mt-1! !important">Researcher ID: {registrantId}</p>
          </div>
          <button onClick={onClose} className="p-2! hover:bg-gray-100! rounded-full! text-gray-400!"><X size={20} /></button>
        </div>

        <div className="p-4! space-y-5!">
          {/* Reason Select */}
          <div>
            <p className="text-sm! font-bold! text-gray-900! mb-2! !important">Reason</p>
            <select 
              value={reason} 
              onChange={(e) => setReason(e.target.value)}
              className="w-full! p-3! text-black border! border-gray-200! rounded-xl! text-sm! font-medium!"
            >
              <option value="">Select a Reason</option>
              <option value="invalid_docs">Invalid Documents</option>
              <option value="mismatch">Identity Mismatch</option>
            </select>
          </div>

          {/* Template Select */}
          <div>
            <p className="text-sm! font-bold! text-gray-900! mb-2! !important">Template</p>
            <select 
              value={template} 
              onChange={(e) => setTemplate(e.target.value)}
              className="w-full! p-3! border! text-black border-gray-200! rounded-xl! text-sm! font-medium!"
            >
              <option value="">Select a Template</option>
              <option value="std_reject">Standard Rejection</option>
            </select>
          </div>

          <div>
            <p className="text-sm! font-bold! text-gray-900! mb-2! !important">Custom Message</p>
            <textarea 
              placeholder="Or write a custom message..."
              className="w-full! min-h-[120px]! p-4! border! text-black border-gray-200! rounded-xl! text-sm! font-medium! resize-none!"
            />
          </div>
        </div>

        <div className="flex! items-center! justify-end! gap-3! p-6! bg-gray-50/50! border-t! border-gray-100!">
          <button onClick={onClose} className="px-6! py-2.5! bg-white! border! border-gray-200! rounded-lg! text-sm! font-bold! text-gray-600!">Cancel</button>
          <button className="px-6! py-2.5! bg-[#EF4444]! text-white! rounded-lg! text-sm! font-bold!">Confirm Reject</button>
        </div>
      </div>
    </div>
  );
}
 
interface RequestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  registrantId: string;
}

export  function RequestDetailsModal({ isOpen, onClose, registrantId }: RequestDetailsModalProps) {
  if (!isOpen) return null;

  const items = ["Letterhead", "ORCID", "ID Proof", "Publications"];

  return (
    <div className="fixed! inset-0! z-50! flex! items-center! justify-center! bg-black/50! backdrop-blur-sm!">
      <div className="bg-white!  w-full! max-w-[560px]! rounded-2xl! shadow-2xl! animate-in! fade-in! zoom-in! duration-200!">
        <div className="flex! items-center! justify-between! p-4! border-b! border-gray-100!">
          <div>
            <h2 className="text-lg! font-bold! text-gray-900! !important">Request More Details</h2>
            <p className="text-xs! font-medium! text-gray-500! mt-1! !important">Researcher ID: {registrantId}</p>
          </div>
          <button onClick={onClose} className="p-2! hover:bg-gray-100! rounded-full! text-gray-400!"><X size={20} /></button>
        </div>

        <div className="p-4! space-y-6!">
          {/* Checklist Section */}
          <div className="p-5! bg-gray-50/50! border! border-gray-100! rounded-xl!">
            <p className="text-sm! font-bold! text-gray-900! mb-4! !important">Missing</p>
            <div className="grid! grid-cols-2! gap-4!">
              {items.map((item) => (
                <label key={item} className="flex! items-center! gap-3! cursor-pointer!">
                  <input type="checkbox" className="w-4! h-4! rounded! border-gray-300! text-[#FF7F3E]! focus:ring-[#FF7F3E]!" />
                  <p className="text-sm! font-medium! text-gray-600! !important">{item}</p>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm! font-bold! text-gray-900! mb-2! !important">Template</p>
            <select className="w-full! p-3! border! text-black border-gray-200! rounded-xl! text-sm! font-medium!">
              <option value="">Select a Template</option>
            </select>
          </div>

          <div>
            <p className="text-sm! font-bold! text-gray-900! mb-2! !important">Custom Message</p>
            <textarea 
              placeholder="Or write a custom message..."
              className="w-full! min-h-[120px]! p-4!  text-black  border! border-gray-200! rounded-xl! text-sm! font-medium! resize-none!"
            />
          </div>
        </div>

        <div className="flex! items-center! justify-end! gap-3! p-6! bg-gray-50/50! border-t! border-gray-100!">
          <button onClick={onClose} className="px-6! py-2.5! bg-white! border! border-gray-200! rounded-lg! text-sm! font-bold! text-gray-600!">Cancel</button>
          <button className="px-6! py-2.5! bg-[#FF7F3E]! text-white! rounded-lg! text-sm! font-bold!">Request More Details</button>
        </div>
      </div>
    </div>
  );
}