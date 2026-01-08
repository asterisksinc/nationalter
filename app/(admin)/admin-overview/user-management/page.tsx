// app/page.tsx
"use client";

import Image from 'next/image';
import '../adminstyle.css';
import { Pencil, Trash2, X } from "lucide-react";

// import { useState } from 'react';
import { DashboardSidebar } from '../component/dashboardsidebar';
import { DashboardHeader } from '../component/DashboardHeader';
import { useState } from 'react';
import EditUserModal from '../component/EditUserModal';
const menuItems = [
  { label: 'Dashboard', icon: 'one', key: 'dashboard' },
  { label: 'User Management', icon: '2', key: 'users' },
  { label: 'Analytics', icon: '3', key: 'analytics' },
  { label: 'Monetization', icon: '4', key: 'monetization' },
  { label: 'Compliance', icon: '5', key: 'compliance' },
];
const users = [
  {
    name: "Dianne Russell",
    email: "debra.holt@example.com",
    role: "Admin",
    status: "Active",
    plan: "Enterprise",
    lastLogin: "2 Min Ago",
    avatar: "/logos/user.png",
  },
  {
    name: "Albert Flores",
    email: "jackson.graham@example.com",
    role: "Editor",
    status: "Pending",
    plan: "Pro",
    lastLogin: "1 Day Ago",
    avatar: "/logos/user.png",
  },
  {
    name: "Courtney Henry",
    email: "tim.jennings@example.com",
    role: "Viewer",
    status: "Banned",
    plan: "Basic",
    lastLogin: "2 Weeks Ago",
    avatar: "/logos/user.png",
  },
  {
    name: "Brooklyn Simmons",
    email: "debbie.baker@example.com",
    role: "Editor",
    status: "Active",
    plan: "Enterprise",
    lastLogin: "5 Hours Ago",
    avatar: "/logos/user.png",
  },
  {
    name: "Cameron Williamson",
    email: "kenzi.lawson@example.com",
    role: "Viewer",
    status: "Pending",
    plan: "Pro",
    lastLogin: "6 Hours Ago",
    avatar: "/logos/user.png",
  },
];
function AddUserDrawer({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Overlay */}
      <div className="drawer-overlay" onClick={onClose} />

      {/* Drawer */}
      <div className="drawer-panel">
        <div className="drawer-header">
          <h3 style={{fontSize:'16px'}}>Add New User</h3>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          <div className="form-group">
            <label>Full Name</label>
            <input placeholder="e.g. John Doe" />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input placeholder="jane@company.com" />
            <p className="helper-text">
              User will receive an invitation at this address.
            </p>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Role</label>
              <select>
                <option>Select Role</option>
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
            </div>

            <div className="form-group">
              <label>Plan</label>
              <select>
                <option>Basic (Default)</option>
                <option>Pro</option>
                <option>Enterprise</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Initial Status</label>
            <select>
              <option>Active</option>
              <option>Pending</option>
            </select>
          </div>

          <div className="form-group">
            <label>Password Configuration</label>

            <div className="radio-item">
              <input type="radio" name="pwd" defaultChecked />
              <span>
                <strong style={{color:'#525866'}}>Auto-generate & Send Link</strong>
                <small>System will email a magic link</small>
              </span>
            </div>

            <div className="radio-item">
              <input type="radio" name="pwd" />
              <span>
                <strong style={{color:'#525866'}}>Set Manual Password</strong>
                <small>Admin sets a temporary password</small>
              </span>
            </div>
          </div>
        </div>

        <div className="drawer-footer" style={{marginBottom:'5px'}}>
          <button className="filter-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-btn">Create User</button>
        </div>
      </div>
    </>
  );
}

export default function HomePage() {
      const [showAddUser, setShowAddUser] = useState(false);
const [isEditOpen, setIsEditOpen] = useState(false);
const [selectedUser, setSelectedUser] = useState<any>(null);
    // const [activePage, setActivePage] = useState('dashboard');
  return (
    <div className="admin-layout">
      {/* Sidebar */}
         <DashboardSidebar activePage="usermanagement" />
   

      {/* Main content */}
      <main className="flex-1 ml-[260px] p-8 min-w-[1000px]">
        {/* Top bar */}
      <DashboardHeader
               breadcrumbItems={[
                 { label: "Home", href: "/" },
                 { label: "User Management" },
               ]}
             />

        {/* Content area */}
   <section className="admin-content">

              <div className="content-header">
                <div>
                  <h3 className='main-ct'>User Management</h3>
                  <p className="breadcrumb-current sub-ct">Manage users, monitor activity, and control access across the platform.</p>
                </div>
                <div className="content-header-right">
                  <button className="primary-btn"  onClick={() => setShowAddUser(true)}>+ Add New User</button>
                </div>
              </div>

              {/* Search and filters */}
              <div className="users-filters">
                <input 
                  type="text" 
                  placeholder="Search by name, email or ID" 
                  className="users-search"
                />
               <button className="filter-btn">
  <Image
    src="/logos/filter.png"
    alt="Filter"
    width={18}
    height={18}
  />
  <span>Filter</span>
</button>
   <button className="filter-btn">
  <Image
    src="/logos/export.png"
    alt="Filter"
    width={18}
    height={18}
  />
  <span>Export Users</span>
</button>
              </div>

              {/* Users table */}
          <div className="users-table-wrapper">
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
          {users.map((user, index) => (
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
                <span className={`role-pill ${user.role.toLowerCase()}`}>
                  {user.role}
                </span>
              </td>

              <td>
                <span className={`status-pill ${user.status.toLowerCase()}`}>
                  <span className="status-dot" />
                  {user.status}
                </span>
              </td>

              <td>{user.plan}</td>
              <td className="last-login">{user.lastLogin}</td>

              <td className="actions">
                <button className="icon-btn edit"   onClick={() => {
    setSelectedUser(user);
    setIsEditOpen(true);
  }}>
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
      {isEditOpen && (
  <EditUserModal
    user={selectedUser}
    onClose={() => setIsEditOpen(false)}
  />
)}

    </div>
     
</section>

      </main>
       {showAddUser && (
        <AddUserDrawer onClose={() => setShowAddUser(false)} />
      )}
    </div>
  );
}
 
