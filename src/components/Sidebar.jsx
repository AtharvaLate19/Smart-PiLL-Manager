import { Activity, Bell, CalendarDays, CircleUserRound, ClipboardList, HeartPulse, LayoutDashboard, Plus, ShieldCheck, Wifi } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'add', label: 'Add medicine', icon: Plus },
  { id: 'schedules', label: 'Schedules', icon: CalendarDays },
  { id: 'history', label: 'History', icon: ClipboardList },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'profile', label: 'Profile', icon: CircleUserRound },
];

export default function Sidebar({ page, setPage }) {
  return <aside className="sidebar">
    <button className="brand" onClick={() => setPage('dashboard')} aria-label="Smart Pill home">
      <span className="brand-mark"><HeartPulse size={17}/></span>
      <span><strong>smart pill</strong><small>CARE COMPANION</small></span>
    </button>
    <div className="nav-caption">CARE VIEW</div>
    <nav className="side-nav">
      {navItems.map(({id, label, icon: Icon}) => <button key={id} className={`nav-item ${page === id ? 'active' : ''}`} onClick={() => setPage(id)}>
        <Icon size={15} strokeWidth={1.8}/><span>{label}</span>
      </button>)}
    </nav>
    <button className="device-card" onClick={() => setPage('profile')}>
      <span className="device-title"><Wifi size={14}/> Connected device</span>
      <span className="device-copy">Atharva's smart dispenser is connected for local sync.</span>
      <span className="device-status"><i/> Ready · local-only mode</span>
    </button>
    <button className="sidebar-user" onClick={() => setPage('profile')}>
      <span className="avatar">AM</span><span><strong>Atharva</strong><small>Caregiver account</small></span>
    </button>
  </aside>;
}
