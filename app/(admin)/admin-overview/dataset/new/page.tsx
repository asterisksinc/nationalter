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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

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
          <div className="stepper-wrapper  mb-5">
            <div className="stepper">

              <div className="step active">
                <div className="step-circle active"> <div className="step-circle1"></div></div>
                <p className="step-title">Step 1</p>
                <span className="step-sub">Upload & Map</span>
              </div>

              <div className="step-line active"></div>

              <div className="step">
                <div className="step-circle"></div>
                <p className="step-title">Step 2</p>
                <span className="step-sub">Validate Data</span>
              </div>

              <div className="step-line"></div>

              <div className="step">
                <div className="step-circle"></div>
                <p className="step-title">Step 3</p>
                <span className="step-sub">Confirm & Import</span>
              </div>

            </div>
          </div>

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

          </div>

          <div className="stepper-wrapper  mb-5">

            <div className="footer-actions">
              <button className="filter-btn" onClick={() => router.push("/admin-overview")}>Back</button>

              <button className="primary-btn">
                Continue to Validation →
              </button>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
