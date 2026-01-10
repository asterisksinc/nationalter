'use client';  // ← This line is already there

import { DashboardSidebar } from "../../component/dashboardsidebar";
import { DashboardHeader } from "../../component/DashboardHeader";
import { useRef, useState } from "react";
import './dstyle.css'
import '../../adminstyle.css';
import Image from 'next/image';
import { useRouter } from "next/navigation";


export default function NewDatasetPage() {
  const [activePage, setActivePage] = useState('dashboard');
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleUpload = () => {
    // simulate upload success
    setShowMappingPreview(true);
  };
const [selectedAction, setSelectedAction] = useState('append'); // Add this state

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  <section className="confirm-step-wrapper">

  <div className="import-action-grid">

    <div className="import-card danger-card">
      <div className="card-icon danger-icon">🗑</div>
      <h4 className="card-title">Overwrite</h4>
      <p className="card-desc">
        Replaces all existing records with this new dataset.
      </p>
      <span className="danger-label">Destructive Action</span>
    </div>

    <div className="import-card active-card">
      <div className="card-icon success-icon">➕</div>
      <h4 className="card-title">Append</h4>
      <p className="card-desc">
        Adds these rows to the end of the existing database.
        <br />
        <strong>Duplicate IDs may be rejected.</strong>
      </p>
    </div>

    <div className="import-card">
      <div className="card-icon info-icon">♻</div>
      <h4 className="card-title">Update</h4>
      <p className="card-desc">
        Replaces all existing records with this new dataset.
      </p>
    </div>

  </div>

  <div className="version-control-box">
    <div className="version-left">
      <h5 className="version-title">Version Control</h5>
      <p className="version-desc">
        A snapshot will be created before changes are applied.
      </p>
      <p className="version-note">
        You can restore v2.4.0 from the <span>Version History</span> page if needed.
      </p>
    </div>

    <div className="version-right">
      <div className="version-pill">
        <span className="pill-label">Current Version</span>
        <strong>v2.4.0</strong>
      </div>

      <span className="version-arrow">→</span>

      <div className="version-pill active-version">
        <span className="pill-label">New Target</span>
        <strong>v2.4.1</strong>
      </div>
    </div>
  </div>

</section>
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
          <div className="page-header4" style={{ marginBottom: '0px' }}>
            <div className="page-header-left">
              <Image onClick={() => router.push("/admin-overview")}
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
            <p className="upload-title">Source File</p>

            <div className="upload-box" onClick={() => fileInputRef.current?.click()}>
              <p>Click or Drag File to This Area to Upload</p>
              <span>Support for a single or bulk upload. Strictly CSV format.</span>

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
              <button className="upload-btn" onClick={handleUpload}>
                Upload File
              </button>
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
        <h2 className="summary-count">10,380 <span className="summary-percent">99.6%</span></h2>
        <p className="summary-sub">Ready for Import</p>
      </div>
      <div className="summary-icon success-icon">✔</div>
    </div>

    <div className="summary-card error-card">
      <div className="summary-left">
        <p className="summary-title">Errors Found</p>
        <h2 className="summary-count">40 <span className="summary-percent error-text">0.4%</span></h2>
        <p className="summary-sub error-text">Requires Attention</p>
      </div>
      <div className="summary-icon error-icon">⚠</div>
    </div>

  </div>

  <div className="error-header">
    <p className="error-title">Error Log (Showing 5 of 40)</p>
    <div className="error-actions">
      <button className="ghost-btn">⬇ Export Errors</button>
      <button className="ghost-btn">⚙ Filter</button>
    </div>
  </div>

  <div className="error-table-wrapper">
    <table className="error-table">
      <thead>
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
          <td>#102</td>
          <td><span className="badge badge-red">Invalid Date</span></td>
          <td>2023/13/01</td>
          <td>$500.00</td>
          <td>North</td>
          <td className="action-col">
            <span className="action-ok">✔</span>
            <span className="action-delete">🗑</span>
          </td>
        </tr>

        <tr>
          <td>#105</td>
          <td><span className="badge badge-orange">Missing Value</span></td>
          <td>2023/01/15</td>
          <td><span className="highlight warning">Required</span></td>
          <td>South</td>
          <td className="action-col">
            <span className="action-ok">✔</span>
            <span className="action-delete">🗑</span>
          </td>
        </tr>

        <tr>
          <td>#110</td>
          <td><span className="badge badge-pink">Type Mismatch</span></td>
          <td>2023/01/20</td>
          <td><span className="highlight error">Five Hundred</span></td>
          <td>East</td>
          <td className="action-col">
            <span className="action-ok">✔</span>
            <span className="action-delete">🗑</span>
          </td>
        </tr>

        <tr>
          <td>#142</td>
          <td><span className="badge badge-purple">Duplicate ID</span></td>
          <td>2023/02/01</td>
          <td>$120.50</td>
          <td>West</td>
          <td className="action-col">
            <span className="action-ok">✔</span>
            <span className="action-delete">🗑</span>
          </td>
        </tr>

        <tr>
          <td>#156</td>
          <td><span className="badge badge-blue">Invalid Region</span></td>
          <td>2023/02/05</td>
          <td>$900.00</td>
          <td><span className="highlight info">North</span></td>
          <td className="action-col">
            <span className="action-ok">✔</span>
            <span className="action-delete">🗑</span>
          </td>
        </tr>

      </tbody>
    </table>

    <p className="scroll-hint">Scroll to see more errors or use filters</p>
  </div>

</div>

)}
{currentStep === 3 && (
<section className="confirm-step-wrapper"> 
  <div className="import-action-grid">
    {/* Overwrite - Danger */}
    <label className="import-radio-card danger-radio inactive-radio">
      <input
        type="radio"
        name="import-action"
        value="overwrite"
        checked={selectedAction === 'overwrite'}
        onChange={(e) => setSelectedAction(e.target.value)}
        className="radio-input"
      />
      <div className="radio-content">
        <div className="card-icon danger-icon">🗑</div>
        <div className="card-text">
          <h4 className="card-title">Overwrite</h4>
          <p className="card-desc">
            Replaces all existing records with this new dataset.
          </p>
          <span className="danger-label">Destructive Action</span>
        </div>
      </div>
    </label>

    {/* Append - Active */}
    <label className="import-radio-card active-radio selected-radio">
      <input
        type="radio"
        name="import-action"
        value="append"
        checked={selectedAction === 'append'}
        onChange={(e) => setSelectedAction(e.target.value)}
        className="radio-input"
      />
      <div className="radio-content">
        <div className="card-icon success-icon">➕</div>
        <div className="card-text">
          <h4 className="card-title">Append</h4>
          <p className="card-desc">
            Adds these rows to the end of the existing database.
            <br />
            <strong>Duplicate IDs may be rejected.</strong>
          </p>
        </div>
      </div>
    </label>

    {/* Update */}
    <label className="import-radio-card info-radio inactive-radio">
      <input
        type="radio"
        name="import-action"
        value="update"
        checked={selectedAction === 'update'}
        onChange={(e) => setSelectedAction(e.target.value)}
        className="radio-input"
      />
      <div className="radio-content">
        <div className="card-icon info-icon">♻</div>
        <div className="card-text">
          <h4 className="card-title">Update</h4>
          <p className="card-desc">
            Replaces all existing records with this new dataset.
          </p>
        </div>
      </div>
    </label>
  </div>

  {/* Version Control - unchanged */}
  <div className="version-control-box">
    <div className="version-left">
      <h5 className="version-title">Version Control</h5>
      <p className="version-desc">
        A snapshot will be created before changes are applied.
      </p>
      <p className="version-note">
        You can restore v2.4.0 from the <span>Version History</span> page if needed.
      </p>
    </div>
    <div className="version-right">
      <div className="version-pill">
        <span className="pill-label">Current Version</span>
        <strong>v2.4.0</strong>
      </div>
      <span className="version-arrow">→</span>
      <div className="version-pill active-version">
        <span className="pill-label">New Target</span>
        <strong>v2.4.1</strong>
      </div>
    </div>
  </div>
</section>

)}

          <div className="stepper-wrapper  mb-5">

            <div className="footer-actions">
              <button className="filter-btn" onClick={() => router.push("/admin-overview")}>Back</button>

           {currentStep === 1  && (
    <button 
      className="primary-btn"
      onClick={() => setCurrentStep(2)}
    >
      Continue to Validation →
    </button>
  )}

  {currentStep === 2 && (
    <button 
      className="primary-btn"
      onClick={() => setCurrentStep(3)}
    >
      Continue to Confirm →
    </button>
  )}

  {currentStep === 3 && (
    <button className="primary-btn">
      Start Import
    </button>
  )}

            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
