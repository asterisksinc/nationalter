"use client";

import Image from "next/image";
import { Pencil, Trash2, X } from "lucide-react";
import { DashboardSidebar } from "../component/dashboardsidebar";
import { DashboardHeader } from "../component/DashboardHeader";
import { useState, useEffect } from "react";
import EditUserModal from "../component/EditUserModal";
import "../adminstyle.css";


function AddUserDrawer({ onClose }: { onClose: () => void }) {
  type RegistrationTab = "researcher" | "institution" | "medical";
  type Step = 1 | 2 | 3 | 4;

  const [activeTab, setActiveTab] = useState<RegistrationTab>("researcher");
  const [steps, setSteps] = useState<Record<RegistrationTab, Step>>({
    researcher: 1,
    institution: 1,
    medical: 1,
  });
  const currentStep = steps[activeTab];

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [inviteResult, setInviteResult] = useState<
    | null
    | {
      email: string;
      flowLabel: string;
    }
  >(null);

  // Researcher flow (matches app/(auth)/signup)
  const [researcherForm, setResearcherForm] = useState({
    name: "",
    institution: "",
    instituteEmail: "",
    orcidId: "",
    institutionalIdCardFile: null as File | null,
    primaryDomain: "",
    googleScholarUrl: "",
    profilePhotoFile: null as File | null,
    useCase: "",
    heardFrom: "",
  });

  // Institution flow (matches app/(auth)/signup)
  const [institutionForm, setInstitutionForm] = useState({
    domainName: "",
    adminName: "",
    email: "",
    mobile: "",
    otp: ["", "", "", ""] as [string, string, string, string],
    letterOfAuthorizationFile: null as File | null,
    accreditationProofFile: null as File | null,
    keyDepartments: "",
  });
  const [institutionOtpSent, setInstitutionOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);

  // Medical flow (matches app/(auth)/signup)
  const [medicalForm, setMedicalForm] = useState({
    name: "",
    medCouncilRegNo: "",
    stateCouncil: "",
    email: "",
    mobile: "",
    primaryHospital: "",
    specialty: "",
    researchFocus: "",
    medicalDegreeFile: null as File | null,
    regCertificateFile: null as File | null,
    plan: "STANDARD" as "STANDARD" | "PREMIUM",
  });

  const stepMeta: Record<Step, { label: string; helper: string }> = {
    1: {
      label: "Identity",
      helper: "Basic identity / org details",
    },
    2: {
      label: "Authentication",
      helper: "Contact verification details",
    },
    3: {
      label: "Profile",
      helper: "Supporting documents",
    },
    4: {
      label: "Welcome",
      helper: "Final preferences",
    },
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const setStepForActiveTab = (nextStep: Step) => {
    setSteps((prev) => ({ ...prev, [activeTab]: nextStep }));
  };

  const goBack = () => {
    setInviteResult(null);
    setErrors({});
    if (currentStep > 1) {
      setStepForActiveTab((currentStep - 1) as Step);
    }
  };

  const goNext = () => {
    setInviteResult(null);
    setErrors({});
    if (currentStep < 4) {
      setStepForActiveTab((currentStep + 1) as Step);
    }
  };

  // OTP timer (institution flow)
  useEffect(() => {
    if (!institutionOtpSent) return;
    if (otpTimer <= 0) return;
    const id = window.setInterval(() => setOtpTimer((t) => t - 1), 1000);
    return () => window.clearInterval(id);
  }, [institutionOtpSent, otpTimer]);

  const getFlowLabel = (tab: RegistrationTab) => {
    if (tab === "researcher") return "Researcher";
    if (tab === "institution") return "Institution / Organisation";
    return "Medical Professional";
  };

  const getInviteEmailForTab = (tab: RegistrationTab) => {
    if (tab === "researcher") return researcherForm.instituteEmail.trim();
    if (tab === "institution") return institutionForm.email.trim();
    return medicalForm.email.trim();
  };

  const validateStep = (tab: RegistrationTab, step: Step) => {
    const nextErrors: Record<string, string> = {};

    if (tab === "researcher") {
      if (step === 1) {
        if (!researcherForm.name.trim()) nextErrors.name = "Full name is required";
        if (!researcherForm.institution.trim())
          nextErrors.institution = "Institution is required";
      }
      if (step === 2) {
        if (!researcherForm.instituteEmail.trim()) {
          nextErrors.instituteEmail = "Institutional email is required";
        } else if (!validateEmail(researcherForm.instituteEmail.trim())) {
          nextErrors.instituteEmail = "Enter a valid email";
        }
        if (!researcherForm.orcidId.trim()) nextErrors.orcidId = "ORCID ID is required";
      }
      if (step === 3) {
        if (!researcherForm.primaryDomain.trim())
          nextErrors.primaryDomain = "Primary domain is required";
        if (!researcherForm.googleScholarUrl.trim())
          nextErrors.googleScholarUrl = "Google Scholar URL is required";
      }
    }

    if (tab === "medical") {
      if (step === 1) {
        if (!medicalForm.name.trim()) nextErrors.name = "Full name is required";
        if (!medicalForm.medCouncilRegNo.trim())
          nextErrors.medCouncilRegNo = "Registration number is required";
        if (!medicalForm.stateCouncil.trim())
          nextErrors.stateCouncil = "State council is required";
        if (!medicalForm.email.trim()) nextErrors.email = "Email is required";
        else if (!validateEmail(medicalForm.email.trim()))
          nextErrors.email = "Enter a valid email";
        if (!medicalForm.mobile.trim()) nextErrors.mobile = "Mobile number is required";
      }
      if (step === 2) {
        if (!medicalForm.primaryHospital.trim())
          nextErrors.primaryHospital = "Primary hospital/clinic is required";
        if (!medicalForm.specialty.trim()) nextErrors.specialty = "Specialty is required";
        if (!medicalForm.researchFocus.trim())
          nextErrors.researchFocus = "Research focus is required";
      }
    }

    if (tab === "institution") {
      if (step === 1) {
        if (!institutionForm.domainName.trim())
          nextErrors.domainName = "Official domain name is required";
      }
      if (step === 2) {
        if (!institutionForm.adminName.trim())
          nextErrors.adminName = "Administrator name is required";
        if (!institutionForm.email.trim()) nextErrors.email = "Email is required";
        else if (!validateEmail(institutionForm.email.trim()))
          nextErrors.email = "Enter a valid email";
        if (!institutionForm.mobile.trim()) nextErrors.mobile = "Mobile number is required";
        if (institutionOtpSent) {
          const otpJoined = institutionForm.otp.join("").trim();
          if (otpJoined.length !== 4) nextErrors.otp = "Enter the 4-digit code";
        }
      }
    }

    return nextErrors;
  };

  const validateAllForTab = (tab: RegistrationTab) => {
    // Validate in step order and return first failing step for a better UX.
    for (const step of [1, 2, 3, 4] as Step[]) {
      const stepErrors = validateStep(tab, step);
      if (Object.keys(stepErrors).length > 0) {
        return { valid: false as const, step, errors: stepErrors };
      }
    }
    return { valid: true as const, step: 4 as Step, errors: {} as Record<string, string> };
  };

  const handlePrimaryAction = () => {
    if (activeTab === "institution" && currentStep === 2) {
      const stepErrors = validateStep("institution", 2);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }

      if (!institutionOtpSent) {
        setInstitutionOtpSent(true);
        setOtpTimer(60);
        return;
      }

      // otpSent: treat as verified and proceed
      setErrors({});
      goNext();
      return;
    }

    const stepErrors = validateStep(activeTab, currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    if (currentStep < 4) {
      goNext();
      return;
    }

    // Step 4: finalize & "send email" (UI-ready only)
    const fullValidation = validateAllForTab(activeTab);
    if (!fullValidation.valid) {
      setStepForActiveTab(fullValidation.step);
      setErrors(fullValidation.errors);
      return;
    }

    const email = getInviteEmailForTab(activeTab);
    setInviteResult({ email, flowLabel: getFlowLabel(activeTab) });
  };

  const renderError = (key: string) => {
    if (!errors[key]) return null;
    return (
      <p className="helper-text" style={{ color: "#dc3545" }}>
        {errors[key]}
      </p>
    );
  };

  const renderResearcherStep = (step: Step) => {
    if (step === 1) {
      return (
        <>
          <div className="form-group">
            <label>
              Full Name <span style={{ color: "#FF7A00" }}>*</span>
            </label>
            <input
              placeholder="e.g. Dr. Aditi Sharma"
              value={researcherForm.name}
              onChange={(e) =>
                setResearcherForm((p) => ({ ...p, name: e.target.value }))
              }
            />
            {renderError("name")}
          </div>

          <div className="form-group">
            <label>
              Institution <span style={{ color: "#FF7A00" }}>*</span>
            </label>
            <input
              placeholder="e.g. University of Example"
              value={researcherForm.institution}
              onChange={(e) =>
                setResearcherForm((p) => ({
                  ...p,
                  institution: e.target.value,
                }))
              }
            />
            {renderError("institution")}
          </div>
        </>
      );
    }

    if (step === 2) {
      return (
        <>
          <div className="form-group">
            <label>
              Institutional Email ID <span style={{ color: "#FF7A00" }}>*</span>
            </label>
            <input
              type="email"
              placeholder="name@institute.edu.in"
              value={researcherForm.instituteEmail}
              onChange={(e) =>
                setResearcherForm((p) => ({
                  ...p,
                  instituteEmail: e.target.value,
                }))
              }
            />
            {renderError("instituteEmail")}
            <p className="helper-text">
              User will receive an invitation at this address.
            </p>
          </div>

          <div className="form-group">
            <label>
              ORCID ID <span style={{ color: "#FF7A00" }}>*</span>
            </label>
            <input
              placeholder="e.g. 0000-0002-1825-0097"
              value={researcherForm.orcidId}
              onChange={(e) =>
                setResearcherForm((p) => ({ ...p, orcidId: e.target.value }))
              }
            />
            {renderError("orcidId")}
          </div>

          <div className="form-group">
            <label>Institutional ID Card (Upload)</label>
            <input
              type="file"
              onChange={(e) =>
                setResearcherForm((p) => ({
                  ...p,
                  institutionalIdCardFile:
                    e.target.files && e.target.files[0]
                      ? e.target.files[0]
                      : null,
                }))
              }
            />
            {researcherForm.institutionalIdCardFile && (
              <p className="helper-text">
                Selected: {researcherForm.institutionalIdCardFile.name}
              </p>
            )}
          </div>
        </>
      );
    }

    if (step === 3) {
      return (
        <>
          <div className="form-group">
            <label>
              Primary Research Domain <span style={{ color: "#FF7A00" }}>*</span>
            </label>
            <input
              placeholder="e.g. Computer Science"
              value={researcherForm.primaryDomain}
              onChange={(e) =>
                setResearcherForm((p) => ({
                  ...p,
                  primaryDomain: e.target.value,
                }))
              }
            />
            {renderError("primaryDomain")}
          </div>

          <div className="form-group">
            <label>
              Google Scholar Profile URL <span style={{ color: "#FF7A00" }}>*</span>
            </label>
            <input
              placeholder="https://scholar.google.com/citations?user=..."
              value={researcherForm.googleScholarUrl}
              onChange={(e) =>
                setResearcherForm((p) => ({
                  ...p,
                  googleScholarUrl: e.target.value,
                }))
              }
            />
            {renderError("googleScholarUrl")}
          </div>

          <div className="form-group">
            <label>Profile Photo (Upload)</label>
            <input
              type="file"
              onChange={(e) =>
                setResearcherForm((p) => ({
                  ...p,
                  profilePhotoFile:
                    e.target.files && e.target.files[0]
                      ? e.target.files[0]
                      : null,
                }))
              }
            />
            {researcherForm.profilePhotoFile && (
              <p className="helper-text">Selected: {researcherForm.profilePhotoFile.name}</p>
            )}
          </div>
        </>
      );
    }

    // step 4
    return (
      <>
        <div className="form-group">
          <label>What will you be using Nationcite for?</label>
          <select
            value={researcherForm.useCase}
            onChange={(e) =>
              setResearcherForm((p) => ({ ...p, useCase: e.target.value }))
            }
          >
            <option value="">Select</option>
            <option value="Academic Research">Academic Research</option>
            <option value="Grant Applications">Grant Applications</option>
            <option value="Collaboration">Collaboration</option>
            <option value="Teaching Resources">Teaching Resources</option>
          </select>
        </div>

        <div className="form-group">
          <label>How did you hear about us?</label>
          <select
            value={researcherForm.heardFrom}
            onChange={(e) =>
              setResearcherForm((p) => ({ ...p, heardFrom: e.target.value }))
            }
          >
            <option value="">Select</option>
            <option value="Social Media">Social Media</option>
            <option value="Colleague">Colleague</option>
            <option value="University Portal">University Portal</option>
            <option value="Search Engine">Search Engine</option>
          </select>
        </div>
      </>
    );
  };

  const renderMedicalStep = (step: Step) => {
    if (step === 1) {
      return (
        <>
          <div className="form-group">
            <label>
              Full Name <span style={{ color: "#FF7A00" }}>*</span>
            </label>
            <input
              placeholder="e.g. Dr. Rajesh Kumar"
              value={medicalForm.name}
              onChange={(e) =>
                setMedicalForm((p) => ({ ...p, name: e.target.value }))
              }
            />
            {renderError("name")}
          </div>

          <div className="form-group">
            <label>
              Medical Council Registration Number{" "}
              <span style={{ color: "#FF7A00" }}>*</span>
            </label>
            <input
              placeholder="e.g. MCI-12345"
              value={medicalForm.medCouncilRegNo}
              onChange={(e) =>
                setMedicalForm((p) => ({
                  ...p,
                  medCouncilRegNo: e.target.value,
                }))
              }
            />
            {renderError("medCouncilRegNo")}
          </div>

          <div className="form-group">
            <label>
              State Medical Council <span style={{ color: "#FF7A00" }}>*</span>
            </label>
            <input
              placeholder="e.g. Maharashtra Medical Council"
              value={medicalForm.stateCouncil}
              onChange={(e) =>
                setMedicalForm((p) => ({ ...p, stateCouncil: e.target.value }))
              }
            />
            {renderError("stateCouncil")}
          </div>

          <div className="form-group">
            <label>
              Email ID <span style={{ color: "#FF7A00" }}>*</span>
            </label>
            <input
              type="email"
              placeholder="name@hospital.org"
              value={medicalForm.email}
              onChange={(e) =>
                setMedicalForm((p) => ({ ...p, email: e.target.value }))
              }
            />
            {renderError("email")}
            <p className="helper-text">
              User will receive an invitation at this address.
            </p>
          </div>

          <div className="form-group">
            <label>
              Mobile Number <span style={{ color: "#FF7A00" }}>*</span>
            </label>
            <input
              type="tel"
              placeholder="e.g. 9876543210"
              value={medicalForm.mobile}
              onChange={(e) =>
                setMedicalForm((p) => ({ ...p, mobile: e.target.value }))
              }
            />
            {renderError("mobile")}
          </div>
        </>
      );
    }

    if (step === 2) {
      return (
        <>
          <div className="form-group">
            <label>
              Primary Hospital/Clinic <span style={{ color: "#FF7A00" }}>*</span>
            </label>
            <input
              placeholder="e.g. City General Hospital"
              value={medicalForm.primaryHospital}
              onChange={(e) =>
                setMedicalForm((p) => ({
                  ...p,
                  primaryHospital: e.target.value,
                }))
              }
            />
            {renderError("primaryHospital")}
          </div>

          <div className="form-group">
            <label>
              Specialty <span style={{ color: "#FF7A00" }}>*</span>
            </label>
            <input
              placeholder="e.g. Cardiology"
              value={medicalForm.specialty}
              onChange={(e) =>
                setMedicalForm((p) => ({ ...p, specialty: e.target.value }))
              }
            />
            {renderError("specialty")}
          </div>

          <div className="form-group">
            <label>
              Research Focus <span style={{ color: "#FF7A00" }}>*</span>
            </label>
            <input
              placeholder="e.g. Interventional cardiology"
              value={medicalForm.researchFocus}
              onChange={(e) =>
                setMedicalForm((p) => ({ ...p, researchFocus: e.target.value }))
              }
            />
            {renderError("researchFocus")}
          </div>
        </>
      );
    }

    if (step === 3) {
      return (
        <>
          <div className="form-group">
            <label>Medical Degree (Upload)</label>
            <input
              type="file"
              onChange={(e) =>
                setMedicalForm((p) => ({
                  ...p,
                  medicalDegreeFile:
                    e.target.files && e.target.files[0]
                      ? e.target.files[0]
                      : null,
                }))
              }
            />
            {medicalForm.medicalDegreeFile && (
              <p className="helper-text">Selected: {medicalForm.medicalDegreeFile.name}</p>
            )}
          </div>

          <div className="form-group">
            <label>Registration Certificate (Upload)</label>
            <input
              type="file"
              onChange={(e) =>
                setMedicalForm((p) => ({
                  ...p,
                  regCertificateFile:
                    e.target.files && e.target.files[0]
                      ? e.target.files[0]
                      : null,
                }))
              }
            />
            {medicalForm.regCertificateFile && (
              <p className="helper-text">Selected: {medicalForm.regCertificateFile.name}</p>
            )}
          </div>
        </>
      );
    }

    // step 4
    return (
      <>
        <div className="form-group">
          <label>Plan</label>
          <div className="radio-item" style={{ gap: "14px" }}>
            <label className="radio-option" style={{ cursor: "pointer" }}>
              <input
                type="radio"
                name="medical-plan"
                checked={medicalForm.plan === "STANDARD"}
                onChange={() =>
                  setMedicalForm((p) => ({ ...p, plan: "STANDARD" }))
                }
              />
              <span>
                Standard (Free)
                <small>Basic Listing</small>
              </span>
            </label>
          </div>
          <div className="radio-item" style={{ gap: "14px" }}>
            <label className="radio-option" style={{ cursor: "pointer" }}>
              <input
                type="radio"
                name="medical-plan"
                checked={medicalForm.plan === "PREMIUM"}
                onChange={() =>
                  setMedicalForm((p) => ({ ...p, plan: "PREMIUM" }))
                }
              />
              <span>
                Premium (Paid)
                <small>Enhanced patient visibility & analytics</small>
              </span>
            </label>
          </div>
        </div>
      </>
    );
  };

  const renderInstitutionStep = (step: Step) => {
    if (step === 1) {
      return (
        <>
          <div className="form-group">
            <label>
              Official Domain Name <span style={{ color: "#FF7A00" }}>*</span>
            </label>
            <input
              placeholder="e.g. university.edu.in"
              value={institutionForm.domainName}
              onChange={(e) =>
                setInstitutionForm((p) => ({
                  ...p,
                  domainName: e.target.value,
                }))
              }
            />
            {renderError("domainName")}
            <p className="helper-text">
              Domain verification will be automated when the backend is connected.
            </p>
          </div>
        </>
      );
    }

    if (step === 2) {
      return (
        <>
          {!institutionOtpSent ? (
            <>
              <div className="form-group">
                <label>
                  Administrator Full Name{" "}
                  <span style={{ color: "#FF7A00" }}>*</span>
                </label>
                <input
                  placeholder="e.g. Registrar Name"
                  value={institutionForm.adminName}
                  onChange={(e) =>
                    setInstitutionForm((p) => ({
                      ...p,
                      adminName: e.target.value,
                    }))
                  }
                />
                {renderError("adminName")}
              </div>

              <div className="form-group">
                <label>
                  Official Email Address{" "}
                  <span style={{ color: "#FF7A00" }}>*</span>
                </label>
                <input
                  type="email"
                  placeholder="registrar@university.ac.in"
                  value={institutionForm.email}
                  onChange={(e) =>
                    setInstitutionForm((p) => ({ ...p, email: e.target.value }))
                  }
                />
                {renderError("email")}
                <p className="helper-text">
                  User will receive an invitation at this address.
                </p>
              </div>

              <div className="form-group">
                <label>
                  Registered Mobile Number{" "}
                  <span style={{ color: "#FF7A00" }}>*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={institutionForm.mobile}
                  onChange={(e) =>
                    setInstitutionForm((p) => ({
                      ...p,
                      mobile: e.target.value,
                    }))
                  }
                />
                {renderError("mobile")}
              </div>

              <div className="helper-text">
                OTP sending is UI-only for now (no backend).
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label>
                  Enter Verification Code{" "}
                  <span style={{ color: "#FF7A00" }}>*</span>
                </label>
                <div style={{ display: "flex", gap: "10px" }}>
                  {institutionForm.otp.map((digit, idx) => (
                    <input
                      key={idx}
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      style={{
                        width: "56px",
                        textAlign: "center",
                        fontWeight: 600,
                      }}
                      onChange={(e) => {
                        const next = [...institutionForm.otp] as [
                          string,
                          string,
                          string,
                          string,
                        ];
                        next[idx] = e.target.value.replace(/\D/g, "").slice(0, 1);
                        setInstitutionForm((p) => ({ ...p, otp: next }));
                      }}
                    />
                  ))}
                </div>
                {renderError("otp")}
                <div
                  className="helper-text"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "8px",
                  }}
                >
                  <span>
                    Expires in: <span style={{ fontWeight: 600 }}>00:{String(otpTimer).padStart(2, "0")}</span>
                  </span>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => {
                      setOtpTimer(60);
                      setInstitutionForm((p) => ({ ...p, otp: ["", "", "", ""] }));
                    }}
                    disabled={otpTimer > 0}
                    style={{
                      color: otpTimer > 0 ? "#94a3b8" : "#FF7A00",
                      cursor: otpTimer > 0 ? "not-allowed" : "pointer",
                    }}
                  >
                    Resend Code
                  </button>
                </div>

                <button
                  type="button"
                  className="filter-btn"
                  onClick={() => {
                    setInstitutionOtpSent(false);
                    setOtpTimer(60);
                    setInstitutionForm((p) => ({ ...p, otp: ["", "", "", ""] }));
                    setErrors({});
                  }}
                  style={{ marginTop: "12px" }}
                >
                  Change Contact Details
                </button>
              </div>
            </>
          )}
        </>
      );
    }

    if (step === 3) {
      return (
        <>
          <div className="form-group">
            <label>Letter of Authorization (Upload)</label>
            <input
              type="file"
              onChange={(e) =>
                setInstitutionForm((p) => ({
                  ...p,
                  letterOfAuthorizationFile:
                    e.target.files && e.target.files[0]
                      ? e.target.files[0]
                      : null,
                }))
              }
            />
            {institutionForm.letterOfAuthorizationFile && (
              <p className="helper-text">
                Selected: {institutionForm.letterOfAuthorizationFile.name}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>NAAC/ NIRF Accreditation Proof (Upload)</label>
            <input
              type="file"
              onChange={(e) =>
                setInstitutionForm((p) => ({
                  ...p,
                  accreditationProofFile:
                    e.target.files && e.target.files[0]
                      ? e.target.files[0]
                      : null,
                }))
              }
            />
            {institutionForm.accreditationProofFile && (
              <p className="helper-text">
                Selected: {institutionForm.accreditationProofFile.name}
              </p>
            )}
          </div>
        </>
      );
    }

    // step 4
    return (
      <>
        <div className="form-group">
          <label>Add your key departments</label>
          <input
            placeholder="e.g. Computer Science, Physics"
            value={institutionForm.keyDepartments}
            onChange={(e) =>
              setInstitutionForm((p) => ({
                ...p,
                keyDepartments: e.target.value,
              }))
            }
          />
        </div>
      </>
    );
  };

  const renderActiveStep = () => {
    if (activeTab === "researcher") return renderResearcherStep(currentStep);
    if (activeTab === "institution") return renderInstitutionStep(currentStep);
    return renderMedicalStep(currentStep);
  };

  const primaryLabel = () => {
    if (activeTab === "institution" && currentStep === 2) {
      return institutionOtpSent ? "Verify & Proceed" : "Send Verification OTP";
    }
    if (currentStep === 4) return "Send Invitation Email";
    return "Next";
  };

  return (
    <>
      {/* Overlay */}
      <div className="drawer-overlay" onClick={onClose} />

      {/* Drawer */}
      <div className="drawer-panel">
        <div className="drawer-header">
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <div style={{ fontSize: "16px", fontWeight: 600 }}>Add New User</div>
            <div className="helper-text" style={{ margin: 0 }}>
              Admin-led registration (manual entry)
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          {/* Tabs */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
            {(
              [
                { key: "researcher", label: "Researcher" },
                { key: "institution", label: "Institution" },
                { key: "medical", label: "Medical" },
              ] as const
            ).map((t) => {
              const isActive = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  className="filter-btn"
                  onClick={() => {
                    setInviteResult(null);
                    setErrors({});
                    setActiveTab(t.key);
                  }}
                  style={{
                    borderColor: isActive ? "#FFB347" : undefined,
                    color: isActive ? "#FF7A00" : undefined,
                    fontWeight: isActive ? 600 : undefined,
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Step header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              padding: "10px 12px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              marginBottom: "16px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>
                {getFlowLabel(activeTab)} — Step {currentStep} of 4
              </div>
              <div className="helper-text" style={{ margin: 0 }}>
                {stepMeta[currentStep].label}: {stepMeta[currentStep].helper}
              </div>
            </div>
            <div className="helper-text" style={{ margin: 0 }}>
              Role: {activeTab === "institution" ? "ORG" : "SCHOLAR"}
            </div>
          </div>

          {/* Success state */}
          {inviteResult && (
            <div
              style={{
                padding: "12px",
                border: "1px solid #d1fae5",
                background: "#ecfdf5",
                borderRadius: "10px",
                marginBottom: "14px",
                color: "#065f46",
                fontSize: "13px",
              }}
            >
              Invitation prepared for <strong>{inviteResult.email}</strong> ({inviteResult.flowLabel}).
              <div style={{ marginTop: "4px", color: "#047857", fontSize: "12px" }}>
                Email sending is UI-ready; wire backend/API later.
              </div>
            </div>
          )}

          {/* Step content */}
          {renderActiveStep()}
        </div>

        <div className="drawer-footer" style={{ marginBottom: "5px" }}>
          <button className="filter-btn" onClick={onClose}>
            Cancel
          </button>

          {currentStep > 1 && (
            <button className="filter-btn" type="button" onClick={goBack}>
              Back
            </button>
          )}

          <button className="primary-btn" type="button" onClick={handlePrimaryAction}>
            {primaryLabel()}
          </button>
        </div>
      </div>
    </>
  );
}

export default function HomePage() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    role: "",
    status: "",
    plan: "",
  });

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data.data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err instanceof Error ? err.message : "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Get unique values for filter options
  const uniqueRoles = [...new Set(users.map((u) => u.role))];
  const uniqueStatuses = [...new Set(users.map((u) => u.status))];
  const uniquePlans = [...new Set(users.map((u) => u.plan))];

  // Filter users based on search term and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filters.role === "" || user.role === filters.role;
    const matchesStatus =
      filters.status === "" || user.status === filters.status;
    const matchesPlan = filters.plan === "" || user.plan === filters.plan;

    return matchesSearch && matchesRole && matchesStatus && matchesPlan;
  });

  const activeFilterCount = [filters.role, filters.status, filters.plan].filter(
    (f) => f !== "",
  ).length;

  const clearFilters = () => {
    setFilters({ role: "", status: "", plan: "" });
    setSearchTerm("");
  };

  const handleExport = () => {
    // Export users as CSV
    const headers = [
      "Name",
      "Email",
      "Role",
      "Status",
      "Plan",
      "Last Login",
    ].join(",");
    const rows = filteredUsers.map((user) =>
      [
        user.name,
        user.email,
        user.role,
        user.status,
        user.plan,
        user.lastLogin,
      ].join(","),
    );
    const csv = [headers, ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users-export-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <DashboardSidebar activePage="usermanagement" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main content */}
      <main
        className="flex-1 ml-0 md:ml-[260px] overflow-x-hidden"
        style={{ paddingLeft: "0px", paddingTop: "0px", paddingRight: "0px" }}
      >
        {/* Top bar */}
        <DashboardHeader
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "User Management" },
          ]}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {/* Content area */}
        <section className="admin-content">
          <div className="content-header">
            <div>
              <h3 className="main-ct">User Management</h3>
              <p className="breadcrumb-current sub-ct">
                Manage users, monitor activity, and control access across the
                platform.
              </p>
            </div>
            <div className="content-header-right">
              <button
                className="primary-btn"
                onClick={() => setShowAddUser(true)}
                style={{ borderRadius: "6px" }}
              >
                + Add New User
              </button>
            </div>
          </div>

          {/* Search and filters */}
          <div
            className="users-filters"
            style={{ paddingLeft: "32px", paddingRight: "32px" }}
          >
            <input
              type="text"
              placeholder="Search by name, email or ID"
              className="users-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="filter-btn"
              onClick={() => setShowFilters(!showFilters)}
              style={{ position: "relative" }}
            >
              <Image
                src="/logos/filter.png"
                alt="Filter"
                width={18}
                height={18}
              />
              <span>Filter</span>
              {activeFilterCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    backgroundColor: "#FF7A00",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>
            <button className="filter-btn" onClick={handleExport}>
              <Image
                src="/logos/export.png"
                alt="Export"
                width={18}
                height={18}
              />
              <span>Export Users</span>
            </button>
          </div>

          {/* Filter Dropdowns */}
          {showFilters && (
            <div
              style={{
                padding: "0 32px 16px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "12px",
              }}
            >
              <select
                value={filters.role}
                onChange={(e) =>
                  setFilters({ ...filters, role: e.target.value })
                }
                className="filter-btn"
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #e5e5e5",
                }}
              >
                <option value="">All Roles</option>
                {uniqueRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>

              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="filter-btn"
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #e5e5e5",
                }}
              >
                <option value="">All Statuses</option>
                {uniqueStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <select
                value={filters.plan}
                onChange={(e) =>
                  setFilters({ ...filters, plan: e.target.value })
                }
                className="filter-btn"
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #e5e5e5",
                }}
              >
                <option value="">All Plans</option>
                {uniquePlans.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan}
                  </option>
                ))}
              </select>

              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "transparent",
                    color: "#FF7A00",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}

          {/* Results count */}
          {(searchTerm || activeFilterCount > 0) && !loading && !error && (
            <div
              style={{
                padding: "0 32px 8px",
                fontSize: "12px",
                color: "#666",
              }}
            >
              Showing {filteredUsers.length} of {users.length} users
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div
              style={{
                padding: "40px",
                textAlign: "center",
                color: "#666",
                marginLeft: "32px",
                marginRight: "32px",
              }}
            >
              Loading users...
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div
              style={{
                padding: "40px",
                textAlign: "center",
                color: "#dc3545",
                marginLeft: "32px",
                marginRight: "32px",
              }}
            >
              Error: {error}
            </div>
          )}

          {/* Users table */}
          {!loading && !error && (
            <div
              className="users-table-wrapper"
              style={{ marginLeft: "32px", marginRight: "32px" }}
            >
              {filteredUsers.length === 0 ? (
                <div
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "#666",
                  }}
                >
                  No users found
                </div>
              ) : (
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Plan</th>
                      <th>Last Login</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <tr key={index}>
                        <td className="user-cell">
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            width={36}
                            height={36}
                            className="user-avatar"
                          />
                          <span className="user-name">{user.name}</span>
                        </td>

                        <td className="user-email">{user.email}</td>

                        <td>
                          <span
                            className={`role-pill ${user.role.toLowerCase()}`}
                          >
                            {user.role}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`status-pill ${user.status.toLowerCase()}`}
                          >
                            <span className="status-dot" />
                            {user.status}
                          </span>
                        </td>

                        <td>{user.plan}</td>
                        <td className="last-login">{user.lastLogin}</td>

                        <td className="actions">
                          <button
                            className="icon-btn edit"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsEditOpen(true);
                            }}
                          >
                            <Pencil size={16} />
                          </button>
                          <button className="icon-btn delete">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {isEditOpen && (
                <EditUserModal
                  user={selectedUser}
                  onClose={() => setIsEditOpen(false)}
                />
              )}
            </div>
          )}
        </section>
      </main>

      {showAddUser && <AddUserDrawer onClose={() => setShowAddUser(false)} />}
    </div>
  );
}
