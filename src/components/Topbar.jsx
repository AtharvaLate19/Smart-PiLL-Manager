import { Bell, ChevronDown, CircleHelp } from 'lucide-react';

const labels = { dashboard: 'Dashboard', add: 'Add medicine', schedules: 'Schedules', history: 'Medication history', notifications: 'Notifications', profile: 'Profile' };
export default function Topbar({ page, setPage }) {
  return <header className="topbar">
    <div className="breadcrumbs"><span>Caregiver view</span><span className="crumb-slash">/</span><strong>{labels[page] || 'Dashboard'}</strong></div>
    <div className="top-actions">
      <button className="icon-button" title="Help" onClick={() => setPage('notifications')}><CircleHelp size={16}/></button>
      <button className="icon-button notification-button" title="Notifications" onClick={() => setPage('notifications')}><Bell size={16}/><i/></button>
      <button className="account-button" onClick={() => setPage('profile')}><span className="avatar small">AM</span><span><strong>Atharva</strong><small>Caregiver</small></span><ChevronDown size={13}/></button>
    </div>
  </header>;
}
