import { Bell, CheckCircle2, Clock3, Settings2, ShieldCheck } from 'lucide-react';
const notifications = [
  { title: 'Morning dose verified', detail: 'Lisinopril · Sensor detected dose at 8:02 AM.', time: 'Today · 8:02 AM', type: 'success' },
  { title: 'Upcoming medicine reminder', detail: 'Metformin is scheduled for 12:30 PM.', time: 'Today · 11:45 AM', type: 'reminder' },
  { title: 'Care plan is up to date', detail: 'No changes have been made to the medicine list today.', time: 'Yesterday · 6:00 PM', type: 'info' },
  { title: 'Review missed event', detail: 'Atorvastatin was not verified on Monday evening.', time: 'Yesterday · 8:30 PM', type: 'warning' },
];
export default function Notifications() {
  return <div className="page notifications-page">
    <div className="eyebrow"><Bell size={12}/> CARE UPDATES</div>
    <div className="page-heading-row"><div><h1>Notifications.</h1><p>Useful reminders and care signals, in one calm place.</p></div><button className="secondary-button" onClick={() => alert('Notification preferences are a UI demo for now.')}><Settings2 size={14}/> Preferences</button></div>
    <section className="card notifications-card"><div className="section-heading"><div><h2>Recent updates</h2><p>Important activity from the care plan.</p></div><span className="unread-count">2 new</span></div>
      {notifications.map((n, i) => <div className="notification-row" key={n.title}><span className={`notification-icon ${n.type}`}>{n.type === 'success' ? <CheckCircle2 size={17}/> : n.type === 'reminder' ? <Clock3 size={17}/> : n.type === 'warning' ? <Bell size={17}/> : <ShieldCheck size={17}/>}</span><div><strong>{n.title}</strong><p>{n.detail}</p><small>{n.time}</small></div>{i < 2 && <span className="unread-dot"/>}</div>)}
    </section>
    <div className="subtle-note"><ShieldCheck size={15}/><span>These are sample notifications. Live push notifications will be connected after the frontend is linked to the backend.</span></div>
  </div>;
}
