"use client";

import { useState } from "react";
import ResearchersTable from "./ResearchersTable"
import styles from "./dashboard.module.css";
interface Researcher {
  id: string;
  name: string;
  avatar: string;
  department: string;
  hIndex: number;
  citations: number;
  contribution: string;
  status: string;
  isVerified: boolean;
}

// --- Mock Data ---

const mockResearchers: Researcher[] = [
  {
    id: "RES-001",
    name: "Dianne Russell",
    avatar: "/avatars/dianne.jpg",
    department: "Lorem ipsum",
    hIndex: 33,
    citations: 40,
    contribution: "Lorem ipsum lorem ipsum",
    status: "Journal",
    isVerified: false,
  },
  {
    id: "RES-002",
    name: "Albert Flores",
    avatar: "/avatars/albert.jpg",
    department: "Lorem ipsum",
    hIndex: 42,
    citations: 40,
    contribution: "Lorem ipsum lorem ipsum",
    status: "Journal",
    isVerified: false,
  },
  {
    id: "RES-003",
    name: "Courtney Henry",
    avatar: "/avatars/courtney.jpg",
    department: "Lorem ipsum",
    hIndex: 42,
    citations: 40,
    contribution: "Lorem ipsum lorem ipsum",
    status: "Journal",
    isVerified: false,
  },
  {
    id: "RES-004",
    name: "Brooklyn Simmons",
    avatar: "/avatars/brooklyn.jpg",
    department: "Lorem ipsum",
    hIndex: 42,
    citations: 40,
    contribution: "Lorem ipsum lorem ipsum",
    status: "Journal",
    isVerified: true,
  },
  {
    id: "RES-005",
    name: "Cameron Williamson",
    avatar: "/avatars/cameron.jpg",
    department: "Lorem ipsum",
    hIndex: 42,
    citations: 40,
    contribution: "Lorem ipsum lorem ipsum",
    status: "Journal",
    isVerified: false,
  },
  {
    id: "RES-006",
    name: "Annette Black",
    avatar: "/avatars/annette.jpg",
    department: "Lorem ipsum",
    hIndex: 42,
    citations: 40,
    contribution: "Lorem ipsum lorem ipsum",
    status: "Journal",
    isVerified: true,
  },
  {
    id: "RES-007",
    name: "Eleanor Pena",
    avatar: "/avatars/eleanor.jpg",
    department: "Lorem ipsum",
    hIndex: 42,
    citations: 40,
    contribution: "Lorem ipsum lorem ipsum",
    status: "Journal",
    isVerified: true,
  },
  {
    id: "RES-008",
    name: "Jacob Jones",
    avatar: "/avatars/jacob.jpg",
    department: "Lorem ipsum",
    hIndex: 42,
    citations: 40,
    contribution: "Lorem ipsum lorem ipsum",
    status: "Journal",
    isVerified: true,
  },
  {
    id: "RES-009",
    name: "Savannah Nguyen",
    avatar: "/avatars/savannah.jpg",
    department: "Lorem ipsum",
    hIndex: 42,
    citations: 40,
    contribution: "Lorem ipsum lorem ipsum",
    status: "Journal",
    isVerified: false,
  },
  {
    id: "RES-010",
    name: "Marvin McKinney",
    avatar: "/avatars/marvin.jpg",
    department: "Lorem ipsum",
    hIndex: 42,
    citations: 40,
    contribution: "Lorem ipsum lorem ipsum",
    status: "Journal",
    isVerified: false,
  },
];

export default function Dashboard() {
    const [researchers, setResearchers] = useState<Researcher[]>(mockResearchers);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
      const handleRemoveResearcher = (id: string) => {
    setResearchers((prev) => prev.filter((r) => r.id !== id));
    setSelectedIds((prev) => prev.filter((sid) => sid !== id));
  };

  const handleSelectionChange = (ids: string[]) => {
    setSelectedIds(ids);
  };
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <h2 >Registration Verification Dashboard</h2>
        </div>

        <div className={styles.rightHeader}>
          <span className={styles.status}>Ready for Decision</span>
          <span className={styles.code}>MS-2025-001</span>
        </div>
      </div>

      {/* Card */}
      <div className={styles.card}>
        {/* Pending Section */}
        <div className={styles.pendingSection}>
          <h4>Pending</h4>
          <h2>182</h2>
          <p className={styles.subText}>vs Last Month ($118k)</p>

          <div className={styles.graphPlaceholder}></div>
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Researchers */}
        <div className={styles.statSection}>
          <h4>Researchers</h4>
          <p>142 out of 184</p>
          <div className={styles.progressBar}>
            <div className={styles.progressFill}></div>
          </div>
        </div>

        {/* Medical */}
        <div className={styles.statSection}>
          <h4>Medical</h4>
          <p>28 out of 184</p>
          <span className={styles.lowest}>Lowest in 6 Months</span>
        </div>

        {/* Organisations */}
        <div className={styles.statSection}>
          <h4>Organisations</h4>
          <p>28 out of 184</p>
          <span className={styles.lowest}>Lowest in 6 Months</span>
        </div>
      </div>
            <ResearchersTable
             
            />
    </div>
  );
}
