import { useMemo, useState } from 'react';
import { Search, ChevronDown, CheckCircle2, Clock3, AlertCircle, CalendarDays } from 'lucide-react';
export default function History({ history }) {
  const [filter, setFilter] = useState('All events');
  const [query, setQuery] = useState('');
  const tabs = ['All events', 'Verified', 'Scheduled', 'Missed', 'Upcoming'];
  const shown = useMemo(() => history.filter(item => (filter === 'All events' || item.status.toLowerCase().includes(filter.toLowerCase())) && `${item.name} ${item.dose}`.toLowerCase().includes(query.toLowerCase())), [history, filter, query]);
  return <div className="page history-page">
    <div className="eyebrow"><CalendarDays size={12}/> CARE TIMELINE</div>
    <div className="page-heading-row"><div><h1>Medication history.</h1><p>A readable record of what was planned, accessed, and verified.</p></div></div>
    <div className="stats-grid">
      <div className="card stat-card"><span>VERIFIED EVENTS</span><strong>4</strong><small>Sensor-confirmed intake</small></div>
      <div className="card stat-card"><span>ADHERENCE</span><strong>80<small>%</small></strong><small>5 completed or missed events</small></div>
      <div className="card stat-card"><span>NEEDS REVIEW</span><strong className="orange-text">1</strong><small>Missed events to check in</small></div>
    </div>
    <section className="card history-card">
      <div className="section-heading history-heading"><div><h2>Event history</h2><p>Search across medicines and evidence notes.</p></div><div className="history-tools"><label className="search-box"><Search size={14}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search history"/></label><label className="select-wrap"><select value={filter} onChange={e => setFilter(e.target.value)}>{tabs.map(t => <option key={t}>{t}</option>)}</select><ChevronDown size={13}/></label></div></div>
      <div className="filter-tabs">{tabs.map(t => <button key={t} className={filter === t ? 'selected' : ''} onClick={() => setFilter(t)}>{t}</button>)}</div>
      <div className="history-list">{shown.map(item => <div className="history-row" key={item.id}>
        <span className={`medicine-symbol small-symbol ${item.color}`}><span className="pill-glyph"><i/></span></span>
        <div className="history-main"><strong>{item.name}</strong><small>{item.date}</small><small className="evidence-line">Sensor detected dose · No additional note</small></div>
        <span className={`status ${statusClass(item.status)}`}>{statusIcon(item.status)}{item.status}</span>
      </div>)}{shown.length === 0 && <div className="empty-state">No events match this search.</div>}</div>
    </section>
  </div>;
}
function statusClass(s) { return s === 'Verified' ? 'verified' : s === 'Missed' ? 'missed' : s === 'Upcoming' ? 'upcoming' : 'scheduled'; }
function statusIcon(s) { return s === 'Verified' ? <CheckCircle2 size={12}/> : s === 'Missed' ? <AlertCircle size={12}/> : <Clock3 size={12}/>; }
