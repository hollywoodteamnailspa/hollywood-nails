import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';
import DayView from './components/DayView';
import AppointmentModal from './components/AppointmentModal';
import { formatDateKey, formatDisplayDate } from './constants';
import {
  loadAppointmentsFromDB,
  saveAppointmentToDB,
  deleteAppointmentFromDB,
} from './supabase';

const layout = {
  main: {
    maxWidth: '1140px',
    margin: '0 auto',
    padding: '24px 20px 48px',
    display: 'grid',
    gridTemplateColumns: 'minmax(280px, 340px) 1fr',
    gap: '24px',
    alignItems: 'start',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    position: 'sticky',
    top: '88px',
  },
  hint: {
    textAlign: 'center',
    fontSize: '12px',
    color: 'var(--warm-gray)',
    padding: '4px 12px',
    letterSpacing: '0.03em',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
    fontFamily: 'var(--font-display)',
    fontSize: '20px',
    color: 'var(--moss)',
  },
};

export default function App() {
  const [appointments, setAppointments] = useState({});
  const [loading, setLoading] = useState(true);
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(formatDateKey(today));
  const [modal, setModal] = useState(null);

  useEffect(() => {
    loadAppointmentsFromDB().then(data => {
      setAppointments(data);
      setLoading(false);
    });
  }, []);

  const dayAppts = appointments[selectedDate] || [];
  const displayDate = formatDisplayDate(selectedDate);

  const handleSave = useCallback(async (appt, targetDate) => {
    const tDate = targetDate || selectedDate;
    appt.date = tDate;

    await saveAppointmentToDB(appt);

    setAppointments(prev => {
      const updated = { ...prev };
      if (modal?.editing) {
        const oldDate = modal.editing.date || selectedDate;
        if (oldDate !== tDate) {
          updated[oldDate] = (updated[oldDate] || []).filter(a => a.id !== appt.id);
        }
      }
      const dayList = updated[tDate] || [];
      const exists = dayList.find(a => a.id === appt.id);
      updated[tDate] = exists
        ? dayList.map(a => a.id === appt.id ? appt : a)
        : [...dayList, appt];
      return updated;
    });

    setModal(null);
    setSelectedDate(tDate);
  }, [selectedDate, modal]);

  const handleToggleComplete = useCallback(async (id) => {
    const dayList = appointments[selectedDate] || [];
    const appt = dayList.find(a => a.id === id);
    if (!appt) return;
    const updated = { ...appt, completed: !appt.completed };
    await saveAppointmentToDB(updated);
    setAppointments(prev => ({
      ...prev,
      [selectedDate]: (prev[selectedDate] || []).map(a => a.id === id ? updated : a),
    }));
  }, [appointments, selectedDate]);
    if (!window.confirm('Remove this appointment?')) return;
    await deleteAppointmentFromDB(id);
    setAppointments(prev => ({
      ...prev,
      [selectedDate]: (prev[selectedDate] || []).filter(a => a.id !== id),
    }));
  }, [selectedDate]);

  const [narrow, setNarrow] = useState(window.innerWidth < 700);
  useEffect(() => {
    const handle = () => setNarrow(window.innerWidth < 700);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  const responsiveLayout = narrow
    ? { ...layout.main, gridTemplateColumns: '1fr' }
    : layout.main;

  const leftStyle = narrow
    ? { display: 'flex', flexDirection: 'column', gap: '16px' }
    : layout.left;

  if (loading) {
    return (
      <>
        <Header />
        <div style={layout.loading}>🌿 Loading appointments…</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main style={responsiveLayout}>
        <aside style={leftStyle} aria-label="Calendar navigation">
          <Calendar
            appointments={appointments}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
          <p style={layout.hint}>Tap a date to view or add appointments</p>
        </aside>

        <section aria-label="Day schedule">
          <DayView
            dateLabel={displayDate}
            appointments={dayAppts}
            allAppointments={appointments}
            selectedDate={selectedDate}
            onAdd={() => setModal({ editing: null })}
            onEdit={(appt) => setModal({ editing: appt })}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
          />
        </section>
      </main>

      {modal && (
        <AppointmentModal
          initialDate={selectedDate}
          existing={modal.editing}
          onSave={handleSave}
          onCancel={() => setModal(null)}
        />
      )}
    </>
  );
}