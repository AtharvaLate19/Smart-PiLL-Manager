import { ArrowRight, Check, CheckCircle2, ChevronDown, Clock3, Plus, ShieldCheck, Sparkles } from 'lucide-react';

function Status({ status }) {
  const cls = status === 'Verified taken' || status === 'Verified' ? 'verified' : status === 'Missed' ? 'missed' : status === 'Upcoming' ? 'upcoming' : 'scheduled';
  return <span className={`status ${cls}`}><i/>{status}</span>;
}
export default function Dashboard({ medicines, setPage, onStatus }) {
  const verified = medicines.filter(m => m.status === 'Verified taken').length;
  return <div className="page dashboard-page">
    <div className="page-date"><span className="eyebrow"><Sparkles size={12}/> TUESDAY, SEPTEMBER 29</span></div>
    <div className="page-heading-row">
      <div><h1>Good morning, Atharva.</h1><p>Here's how Atharva's health plan is moving today. Every check-in is one less thing to wonder about.</p></div>
      <button className="primary-button" onClick={() => setPage('add')}><Plus size={15}/> Add medicine</button>
    </div>
    <div className="overview-grid">
      <section className="card care-plan-card">
        <div className="card-kicker"><span className="soft-icon green"><ShieldCheck size={15}/></span><span>TODAY'S CARE PLAN</span><span className="mini-dot"/></div>
        <div className="patient-name">Atharva</div>
        <div className="plan-progress-row"><strong>{verified} <span>/ {medicines.length}</span></strong><span>1/3 doses verified</span></div>
        <div className="progress-track"><span style={{width: `${medicines.length ? verified / medicines.length * 100 : 0}%`}}/></div>
        <div className="card-footnote"><ShieldCheck size={13}/> Verification is based on dispenser events, not just a reminder.</div>
        <div className="care-badge"><span>DEVICE STATUS</span><strong><i/> Connected</strong><small>Ready for next dose</small></div>
      </section>
      <section className="card signal-card">
        <div className="card-kicker"><span>CARE SIGNAL</span><span className="soft-icon green"><ActivityIcon/></span></div>
        <h2>All steady</h2>
        <p>Plans have matched the morning check-in. The next signal is 12:30 PM.</p>
        <div className="signal-next"><Clock3 size={13}/><span>Next check-in: <strong>12:30 PM</strong></span><button onClick={() => setPage('schedules')} aria-label="View schedule"><ArrowRight size={14}/></button></div>
      </section>
    </div>
    <section className="card medication-card">
      <div className="section-heading"><div><h2>Today's medication</h2><p>A clear list from reminder to verified intake.</p></div><div className="legend"><span><i className="legend-green"/> Verified</span><span><i className="legend-amber"/> Scheduled</span></div></div>
      <div className="medication-list">
        {medicines.map(m => <div className="medication-row" key={m.id}>
          <span className={`medicine-symbol ${m.color}`}><PillGlyph/></span>
          <div className="medicine-main"><strong>{m.name}</strong><small>{m.dose}</small>{m.status === 'Verified taken' && <span className="verified-note"><CheckCircle2 size={12}/> Sensor detected dose <span>·</span> Confirmed at 8:02 AM</span>}</div>
          <span className="medicine-time"><Clock3 size={12}/>{m.time}</span>
          <Status status={m.status}/>
          <button className="row-chevron" onClick={() => setPage('schedules')} aria-label={`View ${m.name}`}><ChevronDown size={15}/></button>
          {m.status !== 'Verified taken' && <div className="row-actions"><button className="text-action" onClick={() => onStatus(m.id, 'Verified taken')}><Check size={13}/> Mark taken</button></div>}
        </div>)}
      </div>
    </section>
    <div className="dashboard-bottom">
      <div className="subtle-note"><ShieldCheck size={15}/><span><strong>Care, with context.</strong> A reminder is not proof of intake. Verified doses are based on connected-device events.</span></div>
      <button className="link-button" onClick={() => setPage('history')}>View medication history <ArrowRight size={14}/></button>
    </div>
  </div>;
}
function ActivityIcon() { return <ShieldCheck size={15}/>; }
function PillGlyph() { return <span className="pill-glyph"><i/></span>; }
