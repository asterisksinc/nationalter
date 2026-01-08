import Image from "next/image";
import { X } from "lucide-react";

export default function EditUserModal({ user, onClose }: any) {
  if (!user) return null;

  return (
   <div className="modal-backdrop">
  <div className="edit-user-drawer">

        
        {/* Header */}
        <div className="modal-header">
          <div className="user-header">
            <Image src="/logos/user.png" alt="user" width={36} height={36} />
            <div>
              <h3 style={{fontSize:'16px', paddingBottom:'0px'}}>{user.name}</h3>
              <p style={{color:'#525866', fontSize:'14px'}}>ID: #839201-UK</p>
            </div>
          </div>
          <button onClick={onClose} style={{color:'black'}}><X size={18} /></button>
        </div>

        {/* Body */}
        <div className="modal-body">

          <div className="info-box">
            <div>
              <small style={{color:'#525866'}}>Joined</small>
              <p style={{fontSize:'14px'}}>Oct 24, 2023</p>
            </div>
            <div>
              <small style={{color:'#525866'}}>Last IP</small>
              <p style={{fontSize:'14px'}}>192.168.1.42</p>
            </div>
          </div>

  <h4 className="profile-section-title">Profile Information</h4>
<div className="profile-divider" />

<div className="profile-grid-2">
  <input className="profile-input" placeholder="First Name" defaultValue="Dianne" />
  <input className="profile-input" placeholder="Last Name" defaultValue="Dianne" />
</div>

<input
  className="profile-input profile-input-full"
  placeholder="Email Address"
  defaultValue="jane@company.com"
/>

<div className="profile-grid-2">
  <select className="profile-select">
    <option>Admin</option>
    <option>Editor</option>
    <option>Viewer</option>
  </select>

  <select className="profile-select">
    <option>Basic (Default)</option>
    <option>Pro</option>
    <option>Enterprise</option>
  </select>
</div>

<h4 className="profile-section-title">Permissions & Security</h4>
<div className="profile-divider" />

<div className="permission-row">
  <div className="permission-text">
    <span className="permission-title">Verified Badge</span>
    <span className="permission-subtitle">
      Display verified checkmark on profile
    </span>
  </div>

  <label className="permission-toggle">
    <input type="checkbox" defaultChecked />
    <span className="permission-slider" />
  </label>
</div>

<button className="action-secondary-btn" style={{color:'#222530'}}>Send Password Reset</button>
<button className="action-danger-outline-btn">
  Ban User from Platform
</button>
</div>
        {/* Footer */}
        <div className="modal-footer" style={{marginBottom:'5px'}}>
          <button onClick={onClose}>Cancel</button>
          <button className="primary-btn">Save Changes</button>
        </div>

      </div>
    </div>
  );
}
