import React, { useState, useRef, useEffect } from 'react';
import { SERVICES, TECHS, PHONE_PREFIXES, TIME_SLOTS, MONTH_NAMES } from '../constants';

const overlay = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(63, 74, 66, 0.55)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
};

const modal = {
  background: 'var(--white)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: '0 20px 60px rgba(63, 74, 66, 0.25)',
  width: '100%',
  maxWidth: '540px',
  maxHeight: '92vh',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
};

const modalHeader = {
  padding: '20px 24px 16px',
  borderBottom: '1px solid var(--cream-dark)',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  position: 'sticky',
  top: 0,
  background: 'var(--white)',
  zIndex: 1,
};

const body = {
  padding: '20px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
};

const label = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 500,
  color: 'var(--warm-gray)',
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
  marginBottom: '8px',
};

const optionalMark = {
  fontSize: '10px',
  fontWeight: 400,
  color: 'var(--sand)',
  marginLeft: '6px',
  textTransform: 'none',
  letterSpacing: 0,
};

const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  border: '1.5px solid var(--sand)',
  borderRadius: 'var(--radius-sm)',
  fontSize: '15px',
  color: 'var(--charcoal)',
  background: 'var(--cream)',
  outline: 'none',
  transition: 'border-color 0.15s',
  appearance: 'none',
};

const selectStyle = {
  ...inputStyle,
  cursor: 'pointer',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237A8478' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 14px center',
  paddingRight: '36px',
};

const prefixBtn = (active) => ({
  padding: '8px 14px',
  borderRadius: 'var(--radius-sm)',
  border: `1.5px solid ${active ? 'var(--moss)' : 'var(--sand)'}`,
  background: active ? 'var(--moss)' : 'var(--cream)',
  color: active ? 'var(--white)' : 'var(--moss)',
  fontSize: '14px',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.15s',
  fontFamily: 'var(--font-body)',
  whiteSpace: 'nowrap',
});

const techGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '8px',
};

const techBtn = (active) => ({
  padding: '10px 8px',
  borderRadius: 'var(--radius-sm)',
  border: `1.5px solid ${active ? 'var(--sage)' : 'var(--sand)'}`,
  background: active ? 'var(--sage-pale)' : 'var(--cream)',
  color: active ? 'var(--charcoal)' : 'var(--warm-gray)',
  fontSize: '14px',
  fontWeight: active ? 500 : 400,
  cursor: 'pointer',
  transition: 'all 0.15s',
  fontFamily: 'var(--font-body)',
  textAlign: 'center',
});

const serviceChip = (active) => ({
  padding: '8px 14px',
  borderRadius: '20px',
  border: `1.5px solid ${active ? 'var(--bamboo)' : 'var(--sand)'}`,
  background: active ? 'var(--bamboo)' : 'var(--cream)',
  color: active ? 'var(--white)' : 'var(--charcoal)',
  fontSize: '13px',
  fontWeight: active ? 500 : 400,
  cursor: 'pointer',
  transition: 'all 0.15s',
  fontFamily: 'var(--font-body)',
  whiteSpace: 'nowrap',
});

const footer = {
  padding: '16px 24px 20px',
  display: 'flex',
  gap: '12px',
  justifyContent: 'flex-end',
  borderTop: '1px solid var(--cream-dark)',
};

const btnPrimary = {
  padding: '12px 28px',
  borderRadius: 'var(--radius-sm)',
  background: 'var(--moss)',
  color: 'var(--white)',
  fontSize: '15px',
  fontWeight: 500,
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'var(--font-body)',
  transition: 'background 0.15s',
};

const btnSecondary = {
  padding: '12px 20px',
  borderRadius: 'var(--radius-sm)',
  background: 'transparent',
  color: 'var(--warm-gray)',
  fontSize: '15px',
  border: '1.5px solid var(--sand)',
  cursor: 'pointer',
  fontFamily: 'var(--font-body)',
};

const btnClose = {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  background: 'var(--cream)',
  border: '1px solid var(--sand)',
  color: 'var(--warm-gray)',
  fontSize: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  flexShrink: 0,
};

// Mini date picker helpers
function buildCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function MiniDatePicker({ value, onChange }) {
  const [y, m] = value.split('-').map(Number);
  const [viewYear, setViewYear] = useState(y);
  const [viewMonth, setViewMonth] = useState(m - 1);

  const cells = buildCalendar(viewYear, viewMonth);
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;

  const prevM = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(v => v - 1); }
    else setViewMonth(v => v - 1);
  };
  const nextM = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(v => v + 1); }
    else setViewMonth(v => v + 1);
  };

  const selectDay = (day) => {
    const key = `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    onChange(key);
  };

  return (
    <div style={{ background: 'var(--cream)', border: '1.5px solid var(--sand)', borderRadius: 'var(--radius-md)', padding: '12px', marginTop: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <button onClick={prevM} style={{ ...btnClose, width: '28px', height: '28px', fontSize: '16px' }}>‹</button>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: 'var(--charcoal)' }}>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button onClick={nextM} style={{ ...btnClose, width: '28px', height: '28px', fontSize: '16px' }}>›</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px', textAlign: 'center' }}>
        {['S','M','T','W','T','F','S'].map((dn, i) => (
          <div key={i} style={{ fontSize: '10px', color: 'var(--warm-gray)', paddingBottom: '4px', fontWeight: 500 }}>{dn}</div>
        ))}
        {cells.map((day, idx) => {
          if (!day) return <div key={`e${idx}`} />;
          const key = `${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
          const isSelected = key === value;
          const isToday = key === todayKey;
          return (
            <div
              key={key}
              onClick={() => selectDay(day)}
              style={{
                width: '28px', height: '28px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', cursor: 'pointer', margin: '0 auto',
                background: isSelected ? 'var(--moss)' : isToday ? 'var(--sage-pale)' : 'transparent',
                color: isSelected ? 'var(--white)' : 'var(--charcoal)',
                border: isToday && !isSelected ? '1px solid var(--sage-light)' : '1px solid transparent',
                fontWeight: isSelected ? 500 : 400,
              }}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AppointmentModal({ initialDate, onSave, onCancel, existing }) {
  const [selectedDate, setSelectedDate] = useState(existing?.date || initialDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customerName, setCustomerName] = useState(existing?.customerName || '');
  const [tech, setTech] = useState(existing?.tech || '');
  const [customTech, setCustomTech] = useState(existing?.customTech || '');
  const [services, setServices] = useState(existing?.services || []);
  const [timeSlot, setTimeSlot] = useState(existing?.timeSlot || '');
  const [prefix, setPrefix] = useState(existing?.prefix || PHONE_PREFIXES[0]);
  const [customPrefix, setCustomPrefix] = useState(existing?.customPrefix || '');
  const [phoneNum, setPhoneNum] = useState(existing?.phoneNum || '');
  const [useCustomPrefix, setUseCustomPrefix] = useState(
    existing ? !PHONE_PREFIXES.includes(existing.prefix) : false
  );

  const firstRef = useRef();
  useEffect(() => { firstRef.current?.focus(); }, []);

  // Format phone with auto-dash
  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 7);
    if (val.length > 3) val = val.slice(0, 3) + '-' + val.slice(3);
    setPhoneNum(val);
  };

  const toggleService = (s) => {
    setServices(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const handlePrefixClick = (p) => {
    setPrefix(p); setUseCustomPrefix(false); setCustomPrefix('');
  };
  const handleCustomPrefixToggle = () => {
    setUseCustomPrefix(true); setPrefix('');
  };

  const effectivePrefix = useCustomPrefix ? customPrefix : prefix;

  const displayDateLabel = () => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handleSave = () => {
    if (services.length === 0) { alert('Please select at least one service.'); return; }
    if (!timeSlot) { alert('Please select a time slot.'); return; }
    const appt = {
      id: existing?.id || Date.now().toString(),
      date: selectedDate,
      customerName,
      tech: tech === '__custom__' ? customTech : tech,
      services,
      service: services.join(', '),
      timeSlot,
      prefix: effectivePrefix,
      phoneNum,
      customPrefix,
      fullPhone: effectivePrefix ? `${effectivePrefix} ${phoneNum}` : phoneNum,
    };
    onSave(appt, selectedDate);
  };

  return (
    <div style={overlay}>
      <div style={modal} role="dialog" aria-modal="true" aria-label="Appointment">
        <div style={modalHeader}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--charcoal)', fontWeight: 500 }}>
              {existing ? 'Edit appointment' : 'New appointment'}
            </h2>
            <button
              onClick={() => setShowDatePicker(v => !v)}
              style={{
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                fontSize: '13px', color: 'var(--moss)', marginTop: '2px',
                fontFamily: 'var(--font-body)', textDecoration: 'underline', textUnderlineOffset: '2px',
              }}
            >
              {displayDateLabel()} ✎
            </button>
            {showDatePicker && (
              <MiniDatePicker
                value={selectedDate}
                onChange={(key) => { setSelectedDate(key); setShowDatePicker(false); }}
              />
            )}
          </div>
          <button style={btnClose} onClick={onCancel} aria-label="Close">×</button>
        </div>

        <div style={body}>
          {/* Time */}
          <div>
            <label style={label}>Time *</label>
            <select style={selectStyle} value={timeSlot} onChange={e => setTimeSlot(e.target.value)}>
              <option value="">Select time…</option>
              {TIME_SLOTS.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Customer name */}
          <div>
            <label style={label}>Customer name <span style={optionalMark}>optional</span></label>
            <input
              ref={firstRef}
              style={inputStyle}
              type="text"
              placeholder="e.g. Maria"
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
            />
          </div>

          {/* Tech */}
          <div>
            <label style={label}>Technician <span style={optionalMark}>optional</span></label>
            <div style={techGrid}>
              {TECHS.map(t => (
                <button
                  key={t}
                  style={techBtn(tech === t)}
                  onClick={() => setTech(tech === t ? '' : t)}
                  type="button"
                >
                  {t}
                </button>
              ))}
              <button
                style={techBtn(tech === '__custom__')}
                onClick={() => setTech('__custom__')}
                type="button"
              >
                + Other
              </button>
            </div>
            {tech === '__custom__' && (
              <input
                style={{ ...inputStyle, marginTop: '8px' }}
                type="text"
                placeholder="Enter tech name…"
                value={customTech}
                onChange={e => setCustomTech(e.target.value)}
                autoFocus
              />
            )}
          </div>

          {/* Services — multi-select chips */}
          <div>
            <label style={label}>
              Services *
              <span style={{ ...optionalMark, color: 'var(--sage)', fontStyle: 'italic' }}>
                {services.length > 0 ? ` — ${services.length} selected` : ' — pick one or more'}
              </span>
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {SERVICES.map(s => (
                <button
                  key={s}
                  style={serviceChip(services.includes(s))}
                  onClick={() => toggleService(s)}
                  type="button"
                >
                  {services.includes(s) ? '✓ ' : ''}{s}
                </button>
              ))}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label style={label}>Phone number <span style={optionalMark}>optional</span></label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
              {PHONE_PREFIXES.map(p => (
                <button
                  key={p}
                  style={prefixBtn(!useCustomPrefix && prefix === p)}
                  onClick={() => handlePrefixClick(p)}
                  type="button"
                >
                  {p}
                </button>
              ))}
              <button
                style={prefixBtn(useCustomPrefix)}
                onClick={handleCustomPrefixToggle}
                type="button"
              >
                + Other
              </button>
            </div>
            {useCustomPrefix && (
              <input
                style={{ ...inputStyle, marginBottom: '8px' }}
                type="text"
                placeholder="(225)"
                value={customPrefix}
                onChange={e => setCustomPrefix(e.target.value)}
                maxLength={7}
              />
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: 'var(--moss)', fontWeight: 500, minWidth: '52px' }}>
                {effectivePrefix}
              </span>
              <input
                style={{ ...inputStyle, flex: 1 }}
                type="tel"
                placeholder="000-0000"
                value={phoneNum}
                onChange={handlePhoneChange}
                maxLength={8}
              />
            </div>
          </div>
        </div>

        <div style={footer}>
          <button style={btnSecondary} onClick={onCancel}>Cancel</button>
          <button style={btnPrimary} onClick={handleSave}>
            {existing ? 'Save changes' : 'Add appointment'}
          </button>
        </div>
      </div>
    </div>
  );
}
