import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Clock3, Plus, ShieldCheck } from 'lucide-react';

const blank = { name: '', dose: '', time: '08:00', period: 'Morning', frequency: 'Every day', quantity: '30', note: '' };
export default function AddMedicine({ onAdd, setPage }) {
  const [form, setForm] = useState(blank);
  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.dose.trim()) return;
    const [hour, minute] = form.time.split(':').map(Number);
    const time = `${String(hour % 12 || 12).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
    onAdd({ ...form, name: form.name.trim(), dose: form.dose.trim(), time, status: 'Scheduled', color: 'green', id: Date.now() });
    setForm(blank); setPage('dashboard');
  };
  return <div className="page form-page">
    <div className="eyebrow"><Plus size={12}/> NEW MEDICINE</div>
    <div className="page-heading-row form-title-row"><div><h1>Add to the care plan.</h1><p>Create a reminder for Atharva and keep the evidence trail ready when the dispenser is connected.</p></div><button className="back-button" onClick={() => setPage('dashboard')}><ArrowLeft size={14}/> Back</button></div>
    <form className="card medicine-form" onSubmit={submit}>
      <label>Medicine name<input value={form.name} onChange={e => update('name', e.target.value)} placeholder="e.g. Vitamin D" required/></label>
      <div className="form-grid two">
        <label>Dose and instructions<input value={form.dose} onChange={e => update('dose', e.target.value)} placeholder="e.g. 1000 IU · 1 tablet" required/></label>
        <label>Schedule time<div className="input-with-icon"><input type="time" value={form.time} onChange={e => update('time', e.target.value)} required/><Clock3 size={14}/></div></label>
        <label>Part of the day<select value={form.period} onChange={e => update('period', e.target.value)}><option>Morning</option><option>Afternoon</option><option>Evening</option><option>Night</option></select></label>
        <label>Frequency<select value={form.frequency} onChange={e => update('frequency', e.target.value)}><option>Every day</option><option>Weekdays</option><option>Every other day</option><option>Weekly</option></select></label>
        <label className="quantity-field">Quantity on hand<input type="number" min="0" value={form.quantity} onChange={e => update('quantity', e.target.value)} placeholder="30"/></label>
      </div>
      <label>Notes <span className="optional">(optional)</span><textarea rows="3" value={form.note} onChange={e => update('note', e.target.value)} placeholder="Food instructions, refill notes, or anything helpful..."/></label>
      <div className="form-info"><ShieldCheck size={16}/><span>This creates a reminder and leaves room for verification in the care timeline. The first event will show as upcoming at the scheduled time.</span></div>
      <div className="form-actions"><span className="form-hint"><CheckCircle2 size={13}/> You can update personal details from Profile.</span><button type="button" className="secondary-button" onClick={() => setPage('dashboard')}>Cancel</button><button type="submit" className="primary-button"><Plus size={14}/> Add medicine</button></div>
    </form>
  </div>;
}
