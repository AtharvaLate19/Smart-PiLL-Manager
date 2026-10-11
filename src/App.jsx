import { useMemo, useState } from 'react';
import { Bell, Menu, X } from 'lucide-react';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AddMedicine from './pages/AddMedicine.jsx';
import History from './pages/History.jsx';
import Profile from './pages/Profile.jsx';
import Schedules from './pages/Schedules.jsx';
import Notifications from './pages/Notifications.jsx';
import { initialHistory, initialMedicines } from './data/medicines.js';
import './App.css';

const pageTitles = {
  dashboard: 'Dashboard',
  add: 'Add medicine',
  schedules: 'Schedules',
  history: 'Medication history',
  notifications: 'Notifications',
  profile: 'Profile & connection',
};

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [medicines, setMedicines] = useState(initialMedicines);
  const [history, setHistory] = useState(initialHistory);
  const pageContent = useMemo(() => {
    const updateStatus = (id, status) => {
      const medicine = medicines.find(m => m.id === id);
      if (!medicine) return;
      setMedicines(prev => prev.map(m => m.id === id ? { ...m, status } : m));
      setHistory(prev => [{ id: Date.now(), name: medicine.name, dose: medicine.dose, date: `Today · ${medicine.time}`, status: status === 'Verified taken' ? 'Verified' : status, color: medicine.color }, ...prev]);
    };
    const addMedicine = (medicine) => {
      setMedicines(prev => [...prev, medicine].sort((a, b) => a.time.localeCompare(b.time)));
      setHistory(prev => [{ id: Date.now(), name: medicine.name, dose: medicine.dose, date: `Today · ${medicine.time}`, status: 'Scheduled', color: medicine.color }, ...prev]);
    };
    switch (page) {
      case 'add': return <AddMedicine onAdd={addMedicine} setPage={setPage}/>;
      case 'schedules': return <Schedules medicines={medicines} setPage={setPage} onStatus={updateStatus}/>;
      case 'history': return <History history={history}/>;
      case 'profile': return <Profile/>;
      case 'notifications': return <Notifications/>;
      default: return <Dashboard medicines={medicines} setPage={setPage} onStatus={updateStatus}/>;
    }
  }, [page, medicines, history]);

  const navigate = (id) => { setPage(id); setMobileNavOpen(false); };
  return <div className="app-shell">
    <div className={`mobile-overlay ${mobileNavOpen ? 'visible' : ''}`} onClick={() => setMobileNavOpen(false)}/>
    <div className={`sidebar-wrap ${mobileNavOpen ? 'open' : ''}`}><Sidebar page={page} setPage={navigate}/></div>
    <main className="main-area">
      <Topbar page={page} setPage={navigate}/>
      <div className="mobile-toolbar"><button onClick={() => setMobileNavOpen(v => !v)}>{mobileNavOpen ? <X size={18}/> : <Menu size={18}/>}<span>Menu</span></button><strong>{pageTitles[page]}</strong><button onClick={() => navigate('notifications')}><Bell size={17}/></button></div>
      <div className="page-container" key={page}>{pageContent}</div>
      <footer className="app-footer"><span>SMART PILL <b>·</b> CARE COMPANION</span><span>Designed for clearer, calmer care.</span></footer>
    </main>
  </div>;
}
