import { CalendarDays, Clock3, Plus, ArrowRight } from 'lucide-react';
export default function Schedules({ medicines, setPage, onStatus }) {
  const periods = ['Morning', 'Afternoon', 'Evening', 'Night'];
  return <div className="page schedules-page">
    <div className="eyebrow"><CalendarDays size={12}/> DAILY PLAN</div>
    <div className="page-heading-row"><div><h1>A schedule you can trust.</h1><p>See what's coming up and keep the care plan current.</p></div><button className="primary-button" onClick={() => setPage('add')}><Plus size={14}/> Add medicine</button></div>
    <div className="schedule-summary card"><div><span className="eyebrow">TODAY</span><h2>{medicines.length} scheduled medicines</h2><p>Reminders are planned events; verified intake is recorded separately.</p></div><div className="schedule-total"><strong>{medicines.filter(m => m.status === 'Verified taken').length}/{medicines.length}</strong><small>verified today</small></div></div>
    <div className="schedule-timeline">{periods.map(period => {
      const items = medicines.filter(m => m.period === period);
      return <section className="schedule-period" key={period}><div className="period-label"><span className="timeline-dot"/><h2>{period}</h2><span>{items.length} {items.length === 1 ? 'medicine' : 'medicines'}</span></div>
        {items.length ? items.map(m => <div className="card schedule-item" key={m.id}><span className={`medicine-symbol ${m.color}`}><span className="pill-glyph"><i/></span></span><div className="schedule-med-main"><strong>{m.name}</strong><small>{m.dose}</small>{m.note && <small className="schedule-note">{m.note}</small>}</div><span className="medicine-time"><Clock3 size={12}/>{m.time}</span><span className={`status ${m.status === 'Verified taken' ? 'verified' : 'scheduled'}`}>{m.status}</span>{m.status !== 'Verified taken' && <button className="text-action" onClick={() => onStatus(m.id, 'Verified taken')}>Mark taken</button>}</div>) : <div className="empty-period">Nothing planned for this part of the day.</div>}
      </section>;
    })}</div>
    <button className="link-button" onClick={() => setPage('history')}>Review medication history <ArrowRight size={14}/></button>
  </div>;
}
