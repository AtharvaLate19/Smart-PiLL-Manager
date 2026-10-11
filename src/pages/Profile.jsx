import { useState } from 'react';
import { Check, CheckCircle2, HeartPulse, MapPin, Pencil, Phone, ShieldCheck, Wifi, X } from 'lucide-react';
export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('Atharva');
  const [location, setLocation] = useState('Pune, Maharashtra');
  const [caregiver, setCaregiver] = useState('Atharva');
  return <div className="page profile-page">
    <div className="eyebrow"><HeartPulse size={12}/> A SHARED CARE PROFILE</div>
    <div className="page-heading-row"><div><h1>Profile & connection.</h1><p>Keep the people and device behind Atharva's care plan up to date.</p></div><button className="secondary-button" onClick={() => setEditing(v => !v)}>{editing ? <X size={14}/> : <Pencil size={14}/>} {editing ? 'Cancel' : 'Edit profile'}</button></div>
    <div className="profile-grid">
      <section className="card patient-card"><div className="profile-person"><span className="avatar large">AM</span><div><span className="eyebrow">PATIENT</span><h2>{name}</h2><span className="profile-tag">Care plan active</span></div></div>
        <div className="profile-details">
          <div><span className="detail-icon"><MapPin size={15}/></span><span><small>LOCATION</small>{editing ? <input value={location} onChange={e => setLocation(e.target.value)}/> : location}</span></div>
          <div><span className="detail-icon"><CircleIcon/></span><span><small>CAREGIVER</small>{editing ? <input value={caregiver} onChange={e => setCaregiver(e.target.value)}/> : caregiver}</span></div>
          <div><span className="detail-icon"><Phone size={15}/></span><span><small>EMERGENCY CONTACT</small>+91 98765 43210</span></div>
        </div>
        {editing && <button className="primary-button save-profile" onClick={() => setEditing(false)}><Check size={14}/> Save changes</button>}
      </section>
      <div className="profile-side">
        <section className="card connection-card"><div className="section-heading"><div><span className="eyebrow">CONNECTED DEVICE</span><h2>Smart dispenser</h2></div><span className="soft-icon green"><Wifi size={16}/></span></div><div className="connection-status"><i/><strong>Connected</strong></div><p>Ready to record dispenser access. Hardware sync is represented as a local demo in this UI.</p><button className="text-action" onClick={() => alert('Device check complete: local demo is ready.')}>Run connection check <span>→</span></button></section>
        <section className="card sharing-card"><div className="section-heading"><span className="soft-icon green"><ShieldCheck size={15}/></span><h2>A caregiver who shares care</h2></div><p>{caregiver} sees the care signal without needing to call for every dose. Smart Pill keeps a simple chain of evidence: scheduled, accessed, and verified.</p><span className="privacy-note"><CheckCircle2 size={12}/> Only care plan details are shared.</span></section>
      </div>
    </div>
  </div>;
}
function CircleIcon() { return <HeartPulse size={15}/>; }
