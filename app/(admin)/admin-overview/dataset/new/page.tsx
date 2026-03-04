'use client';  // ← This line is already there

import { DashboardSidebar } from "../../component/dashboardsidebar";
import { DashboardHeader } from "../../component/DashboardHeader";
import { useRef, useState } from "react";
import './dstyle.css'
import '../../adminstyle.css';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { pickStoredUploadValue, uploadFileToS3 } from "@/lib/uploads/client";


export default function NewDatasetPage() {
  const [activePage, setActivePage] = useState('dashboard');
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");
  const [uploadedSource, setUploadedSource] = useState<string>("");

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setUploadError("");

    try {
      const uploaded = await uploadFileToS3(selectedFile, "datasets");
      setUploadedSource(pickStoredUploadValue(uploaded));
      setShowMappingPreview(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setUploadError(message);
    } finally {
      setIsUploading(false);
    }
  };
  const [selectedAction, setSelectedAction] = useState('append'); // Add this state

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowMappingPreview(false);
      setUploadError("");
      setUploadedSource("");
    }
  };
  // <section className="confirm-step-wrapper">

  //   <div className="import-action-grid">

  //     <div className="import-card danger-card">
  //       <div className="card-icon danger-icon">🗑</div>
  //       <h4 className="card-title">Overwrite</h4>
  //       <p className="card-desc">
  //         Replaces all existing records with this new dataset.
  //       </p>
  //       <span className="danger-label">Destructive Action</span>
  //     </div>

  //     <div className="import-card active-card">
  //       <div className="card-icon success-icon">➕</div>
  //       <h4 className="card-title">Append</h4>
  //       <p className="card-desc">
  //         Adds these rows to the end of the existing database.
  //         <br />
  //         <strong>Duplicate IDs may be rejected.</strong>
  //       </p>
  //     </div>

  //     <div className="import-card">
  //       <div className="card-icon info-icon">♻</div>
  //       <h4 className="card-title">Update</h4>
  //       <p className="card-desc">
  //         Replaces all existing records with this new dataset.
  //       </p>
  //     </div>

  //   </div>

  //   <div className="version-control-box">
  //     <div className="version-left">
  //       <h5 className="version-title">Version Control</h5>
  //       <p className="version-desc">
  //         A snapshot will be created before changes are applied.
  //       </p>
  //       <p className="version-note">
  //         You can restore v2.4.0 from the <span>Version History</span> page if needed.
  //       </p>
  //     </div>

  //     <div className="version-right">
  //       <div className="version-pill">
  //         <span className="pill-label">Current Version</span>
  //         <strong>v2.4.0</strong>
  //       </div>

  //       <span className="version-arrow">→</span>

  //       <div className="version-pill active-version">
  //         <span className="pill-label">New Target</span>
  //         <strong>v2.4.1</strong>
  //       </div>
  //     </div>
  //   </div>

  // </section>
  const openFilePicker = () => {
    fileInputRef.current?.click();
  };
  const [showMappingPreview, setShowMappingPreview] = useState(false);

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <DashboardSidebar activePage="datasets" />

      {/* Main content */}
      <main className="main-content2">
        <DashboardHeader
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "New Dataset" },
          ]}
        />

        <section className="dataset-container1">
          <div className="page-header4" style={{ marginBottom: '10px' }}>
            <div className="page-header-left">
              <Image onClick={() => {
    if (currentStep === 1) {
      router.push("/admin-overview");
    } else if (currentStep === 2) {
      // Move to step 1 (same route, different step state)
      setCurrentStep(1);
    } else if (currentStep === 3) {
      // Move to step 2
      setCurrentStep(2);
    }
  }}
                src="/logos/A.png"
                alt="Upload icon"
                width={20}
                height={20}
                priority
              />
              <h1 className="page-title" style={{ marginBottom: '0px' }}>New Data Integration Job</h1>
            </div>
          </div>
          <div className="stepper-wrapper mb-5">
            <div className="stepper">
              {/* Step 1 */}
              <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
                <div className={`step-circle ${currentStep === 1 ? "active" : ""}`}>
                  {currentStep > 1 ? (
                    <div className="step-circle1"></div>
                  ) : (
                    <div className="step-circle1"></div>
                  )}
                </div>
                <p className="step-title">Step 1</p>
                <span className="step-sub">Upload & Map</span>
              </div>

              <div className={`step-line ${currentStep > 1 ? "active" : ""}`}></div>

              {/* Step 2 */}
              <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
                <div className={`step-circle ${currentStep === 2 ? "active" : ""}`}>
                  {currentStep > 2 ? (
                    <div className="step-circle1"></div>
                  ) : (
                    <div className="step-circle1"></div>
                  )}
                </div>
                <p className="step-title">Step 2</p>
                <span className="step-sub">Validate Data</span>
              </div>

              <div className={`step-line ${currentStep > 2 ? "active" : ""}`}></div>

              {/* Step 3 */}
              <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
                <div className={`step-circle ${currentStep === 3 ? "active" : ""}`}>
                  {currentStep > 3 ? (
                    <div className="step-circle1"></div>
                  ) : (
                    <div className="step-circle1"></div>
                  )}
                </div>
                <p className="step-title">Step 3</p>
                <span className="step-sub">Confirm & Import</span>
              </div>
            </div>
          </div>



          {currentStep === 1 && (

            <div className="upload-card mb-5">
              <div className="leaderboard-top-filters">
                <div className="filter-group">
                  <label className="filter-label">Leaderboard Type</label>
                  <select className="top-filter-select">
                    <option>Regional Sales 2024</option>
                    <option>Q1 2024</option>
                    <option>Q2 2024</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">
                    Region Target <span className="optional">(Optional)</span>
                  </label>
                  <select className="top-filter-select">
                    <option>Global (All Regions)</option>
                    <option>North</option>
                    <option>South</option>
                  </select>
                </div>
              </div>

              <p className="upload-title">Source File</p>

              <div className="upload-box" onClick={() => fileInputRef.current?.click()}>
                <Image onClick={() => router.push("/admin-overview")}
                  src="/logos/u1.png"
                  alt="Upload icon"
                  width={24}
                  height={24}
                  priority
                />
                <div>
                  <p className="ppp">Click or Drag File to This Area to Upload</p>
                  <span>Support for a single or bulk upload. Strictly CSV format.</span></div>

                <button
                  className="filter-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  Browse File
                </button>

                <input
                  type="file"
                  accept=".csv"
                  ref={fileInputRef}
                  hidden
                  onChange={handleFileChange}
                />
              </div>

              {/* Selected file preview */}
              {selectedFile && (
                <div className="file-preview">
                  <div className="file-left">
                    <Image
                      src="/logos/file.png"
                      alt="Upload icon"
                      width={36}
                      height={36}
                      priority
                    />
                    <div>
                      <p className="file-name">{selectedFile.name}</p>
                      <span className="file-size">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>

                  <Image
                    src="/logos/RE.png"
                    alt="Upload icon"
                    width={32}
                    height={32}
                    priority
                    onClick={removeFile}
                  />
                </div>
              )}

              {selectedFile && !showMappingPreview && (
                <button className="upload-btn" onClick={handleUpload} disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Upload File"}
                </button>
              )}

              {uploadError && (
                <p style={{ color: "#b91c1c", fontSize: 12, marginTop: 10 }}>
                  {uploadError}
                </p>
              )}

              {uploadedSource && (
                <p style={{ color: "#0f766e", fontSize: 12, marginTop: 10 }}>
                  Uploaded: {uploadedSource.split("/").pop()}
                </p>
              )}
              {showMappingPreview && (
                <>
                  <div className="mapping-header mt-5">
                    <div className="mapping-title">
                      <Image
                        src="/logos/TICK.png"
                        alt="Upload icon"
                        width={20}
                        height={20}
                        priority
                        onClick={removeFile}
                      />
                      Auto-Mapping Preview
                    </div>

                    <span className="column-count">3 Columns Detected</span>
                  </div>
                  <div className="mapping-preview">

                    <table className="mapping-table">
                      <thead>
                        <tr>
                          <th>Source Column (CSV)</th>
                          <th>System Field</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="mmm">user_uuid</td>
                          <td className="mmm">→ ID</td>
                          <td className="hh">   <Image
                            src="/logos/TICK.png"
                            alt="Upload icon"
                            width={20}
                            height={20} style={{ marginRight: '8px' }}
                            priority
                            onClick={removeFile}
                          />Mapped</td>
                        </tr>
                        <tr>
                          <td className="mmm">total_score</td>
                          <td className="mmm">→ Score Value</td>
                          <td className="hh">   <Image
                            src="/logos/TICK.png"
                            alt="Upload icon"
                            width={20}
                            height={20}
                            priority style={{ marginRight: '8px' }}
                            onClick={removeFile}
                          />Mapped</td>
                        </tr>
                        <tr>
                          <td className="mmm">region_code</td>
                          <td className="mmm">→ Region</td>
                          <td className="hh">   <Image
                            src="/logos/TICK.png"
                            alt="Upload icon"
                            width={20} style={{ marginRight: '8px' }}
                            height={20}
                            priority
                            onClick={removeFile}
                          />Mapped</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>)}

            </div>)}
          {currentStep === 2 && (
            <div className="validation-wrapper mb-5">

              <div className="summary-grid">

                <div className="summary-card success-card">
                  <div className="summary-left">
                    <p className="summary-title">Valid Rows</p>
                    <h2 className="summary-count">10,380 <span className="summary-percent system-pill11">99.6%</span></h2>
                    <p className="summary-sub">Ready for Import</p>
                  </div>
                  <Image
                    src="/logos/TICK.png"
                    alt="Upload icon"
                    width={20}
                    height={20}
                    priority style={{ marginRight: '8px', height: '20px' }}
                    onClick={removeFile}
                  />    </div>

                <div className="summary-card error-card">
                  <div className="summary-left">
                    <p className="summary-title">Errors Found</p>
                    <h2 className="summary-count">40 <span className="summary-percent error-text system-pill12">0.4%</span></h2>
                    <p className="summary-sub error-text" style={{ color: '#E82222' }}>Requires Attention</p>
                  </div>
                  <Image
                    src="/logos/war.png"
                    alt="Upload icon"
                    width={20}
                    height={20}
                    priority style={{ marginRight: '8px', height: '20px' }}
                    onClick={removeFile}
                  />     </div>

              </div>

              <div className="error-header">
                <p className="error-title">Error Log (Showing 5 of 40)</p>
                <div className="error-actions">
                  <button className="filter-btn"><Image
                    src="/logos/export.png"
                    alt="Upload icon"
                    width={20}
                    height={20}
                    priority style={{ marginRight: '8px', height: '20px' }}
                  />  Export Errors</button>
                  <button className="filter-btn"><Image
                    src="/logos/filter.png"
                    alt="Upload icon"
                    width={20}
                    height={20}
                    priority style={{ marginRight: '8px', height: '20px' }}
                  />  Filter</button>
                </div>
              </div>

              <div className="error-table-wrapper">
                <table className="error-table">
                  <thead className="thead">
                    <tr>
                      <th>Row ID</th>
                      <th>Error Type</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Region</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="roe">#102</td>
                      <td><span className="badge badge-red">Invalid Date</span></td>
                      <td><span className="highlight error" style={{ color: '#E82222' }}>2023/13/01</span></td>

                      <td className="fu">$500.00</td>
                      <td className="fu">North</td>
                      <td className="action-col">

                        <Image
                          src="/logos/t.png"
                          alt="Upload icon"
                          width={11}
                          height={11}
                          priority style={{ marginRight: '8px', height: '20px' }}
                        /><Image
                          src="/logos/d.png"
                          alt="Upload icon"
                          width={16}
                          height={16}
                          priority style={{ marginRight: '8px', height: '20px' }}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="roe">#105</td>
                      <td><span className="badge badge-orange">Missing Value</span></td>
                      <td className="fu">2023/01/15</td>
                      <td><span className="highlight warning" style={{ color: '#FF7A00' }}>Required</span></td>
                      <td className="fu">South</td>
                      <td className="action-col">
                        <Image
                          src="/logos/t.png"
                          alt="Upload icon"
                          width={11}
                          height={11}
                          priority style={{ marginRight: '8px', height: '20px' }}
                        /><Image
                          src="/logos/d.png"
                          alt="Upload icon"
                          width={16}
                          height={16}
                          priority style={{ marginRight: '8px', height: '20px' }}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="roe">#110</td>
                      <td><span className="badge error" style={{ color: '#E82222' }}>Type Mismatch</span></td>
                      <td className="fu">2023/01/20</td>
                      <td><span className="highlight error" style={{ color: '#E82222' }}>Five Hundred</span></td>
                      <td className="fu">East</td>
                      <td className="action-col">
                        <Image
                          src="/logos/t.png"
                          alt="Upload icon"
                          width={11}
                          height={11}
                          priority style={{ marginRight: '8px', height: '20px' }}
                        /><Image
                          src="/logos/d.png"
                          alt="Upload icon"
                          width={16}
                          height={16}
                          priority style={{ marginRight: '8px', height: '20px' }}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="roe">#142</td>
                      <td><span className="badge badge-purple">Duplicate ID</span></td>
                      <td className="fu">2023/02/01</td>
                      <td className="fu">$120.50</td>
                      <td className="fu">West</td>
                      <td className="action-col">
                        <Image
                          src="/logos/t.png"
                          alt="Upload icon"
                          width={11}
                          height={11}
                          priority style={{ marginRight: '8px', height: '20px' }}
                        /><Image
                          src="/logos/d.png"
                          alt="Upload icon"
                          width={16}
                          height={16}
                          priority style={{ marginRight: '8px', height: '20px' }}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="roe">#156</td>
                      <td><span className="badge badge-blue">Invalid Region</span></td>
                      <td className="fu">2023/02/05</td>
                      <td className="fu">$900.00</td>
                      <td><span className="highlight info" style={{ color: "#1178EE" }}>North</span></td>
                      <td className="action-col">
                        <Image
                          src="/logos/t.png"
                          alt="Upload icon"
                          width={11}
                          height={11}
                          priority style={{ marginRight: '8px', height: '20px' }}
                        /><Image
                          src="/logos/d.png"
                          alt="Upload icon"
                          width={16}
                          height={16}
                          priority style={{ marginRight: '8px', height: '20px' }}
                        />
                      </td>
                    </tr>

                  </tbody>
                </table>

                <p className="scroll-hint">Scroll to see more errors or use filters</p>
              </div>

            </div>

          )}
          {currentStep === 3 && (
            <section className="confirm-step-wrapper mb-5">
            <div className="import-action-grid-new">

  {/* Overwrite */}
  <label className={`import-card-new danger ${selectedAction === 'overwrite' ? 'active' : ''}`}>
    
    <div className="card-left">
      <div className="card-text">
              <Image src="/logos/RE.png" alt="icon" width={32} height={32} />

        <h4 className="h4">Overwrite</h4>
        <p>Replaces all existing records with this new dataset.</p>
        <span className="danger-badge">
          <Image src="/logos/war.png" alt="warn" width={14} height={10} />
          Destructive Action
        </span>
      </div>
    </div>

    <input
      type="radio"
      name="import-action"
      value="overwrite"
      checked={selectedAction === 'overwrite'}
      onChange={(e) => setSelectedAction(e.target.value)}
      className="radio-right"
    />
  </label>

  {/* Append */}
  <label className={`import-card-new success ${selectedAction === 'append' ? 'active' : ''}`}>
    <div className="card-left">
      <div className="card-text">
              <Image src="/logos/me.png" alt="icon" width={32} height={32} />

        <h4  className="h4">Append</h4>
        <p>
          Adds these rows to the end of the existing database.
          <br />
          <strong>Duplicate IDs may be rejected.</strong>
        </p>
      </div>
    </div>

    <input
      type="radio"
      name="import-action"
      value="append"
      checked={selectedAction === 'append'}
      onChange={(e) => setSelectedAction(e.target.value)}
      className="radio-right"
    />
  </label>

  {/* Update */}
  <label className={`import-card-new info ${selectedAction === 'update' ? 'active' : ''}`}>
    <div className="card-left">
      <div className="card-text">
              <Image src="/logos/br.png" alt="icon" width={32} height={32} />

        <h4  className="h4">Update</h4>
        <p>Replaces all existing records with this new dataset.</p>
      </div>
    </div>

    <input
      type="radio"
      name="import-action"
      value="update"
      checked={selectedAction === 'update'}
      onChange={(e) => setSelectedAction(e.target.value)}
      className="radio-right"
    />
  </label>

</div>


              {/* Version Control - unchanged */}
              <div className="version-control-box">
                <div className="version-left">
                  <h5 className="version-title">Version Control</h5>
                  <p className="version-desc">
                    A snapshot will be created before changes are applied.
                  </p>
                  <div className="version-note" style={{ display: 'flex' }}>
                    <Image
                      src="/logos/i.png"
                      alt="Upload icon"
                      width={13}
                      height={10}
                      priority style={{ marginRight: '5px' }}
                    />      You can restore v2.4.0 from the <span>Version History</span> page if needed.
                  </div>
                </div>
                <div className="version-right" style={{ paddingBottom: '45px' }}>
                  <div className="version-pill">
                    <div>
                      <span className="pill-label">Current Version</span>
                      <strong style={{ color: '#0E121B' }}>v2.4.0</strong></div>
                    <span className="version-arrow">→</span>
                    <div>
                      <span className="pill-label2">New Target</span>
                      <strong style={{ color: '#FF7A00' }}>v2.4.1</strong></div>
                  </div>
                </div>
              </div>
            </section>

          )}

          <div className="stepper-wrapper  mb-5">

            <div className="footer-actions">
<button 
  className="filter-btn" 
  onClick={() => {
    if (currentStep === 1) {
      router.push("/admin-overview");
    } else if (currentStep === 2) {
      // Move to step 1 (same route, different step state)
      setCurrentStep(1);
    } else if (currentStep === 3) {
      // Move to step 2
      setCurrentStep(2);
    }
  }}
>
  Back
</button>
              {currentStep === 1 && (
                <button
                  className="primary-btn"
                  onClick={() => setCurrentStep(2)}
                >
                  Continue to Validation →
                </button>
              )}

              {currentStep === 2 && (
                <div style={{ display: 'flex' }}>
                  <button
                    className="filter-btn"

                  >
                    <Image
                      src="/logos/Vector (28).png"
                      alt="Upload icon"
                      width={16}
                      height={16}
                      priority style={{ marginRight: '8px', height: '20px' }}
                    />  Re-Validate
                  </button>
                  <button
                    className="primary-btn"
                    onClick={() => setCurrentStep(3)}
                  >
                    Continue to Confirm →
                  </button></div>
              )}

              {currentStep === 3 && (
                <button className="primary-btn">
                  Publish to Production  <Image
                    src="/logos/be.png"
                    alt="Upload icon"
                    width={16}
                    height={16}
                    priority style={{ marginRight: '8px', height: '20px' }}
                  />
                </button>
              )}

            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
