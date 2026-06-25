import React, { useState } from 'react';
import { MONTH_NAMES, DAY_NAMES, getMonthDays, formatDateKey } from '../constants';

const styles = {
  card: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-card)',
    padding: '24px',
    border: '1px solid var(--cream-dark)',
  },
  navRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  navBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'var(--cream)',
    border: '1px solid var(--sand)',
    color: 'var(--bamboo)',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background 0.15s',
    fontWeight: 500,
  },
  monthTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '20px',
    color: 'var(--charcoal)',
    fontWeight: 500,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '4px',
  },
  dayName: {
    textAlign: 'center',
    fontSize: '11px',
    color: 'var(--warm-gray)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    padding: '4px 0 8px',
    fontWeight: 500,
  },
  dayCell: (isToday, isSelected, isPast, hasAppts) => ({
    position: 'relative',
    aspectRatio: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-sm)',
    cursor: isPast ? 'default' : 'pointer',
    background: isSelected
      ? 'var(--bamboo)'
      : isToday
      ? 'var(--sage-pale)'
      : 'transparent',
    border: isToday && !isSelected ? '1.5px solid var(--sage-light)' : '1px solid transparent',
    opacity: isPast ? 0.45 : 1,
    transition: 'background 0.15s, transform 0.1s',
  }),
  dayNum: (isSelected) => ({
    fontSize: '14px',
    fontWeight: isSelected ? 500 : 400,
    color: isSelected ? 'var(--white)' : 'var(--charcoal)',
    lineHeight: 1,
  }),
  dot: (isSelected) => ({
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: isSelected ? 'rgba(255,255,255,0.75)' : 'var(--sage)',
    marginTop: '3px',
  }),
  countBadge: (isSelected) => ({
    position: 'absolute',
    top: '2px',
    right: '3px',
    fontSize: '9px',
    fontWeight: 500,
    color: isSelected ? 'rgba(255,255,255,0.9)' : 'var(--sage)',
  }),
};

export default function Calendar({ appointments, selectedDate, onSelectDate }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const { firstDay, daysInMonth } = getMonthDays(viewYear, viewMonth);
  const todayKey = formatDateKey(today);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div style={styles.card}>
      <div style={styles.navRow}>
        <button style={styles.navBtn} onClick={prevMonth} aria-label="Previous month">‹</button>
        <span style={styles.monthTitle}>{MONTH_NAMES[viewMonth]} {viewYear}</span>
        <button style={styles.navBtn} onClick={nextMonth} aria-label="Next month">›</button>
      </div>
      <div style={styles.grid}>
        {DAY_NAMES.map(d => (
          <div key={d} style={styles.dayName}>{d}</div>
        ))}
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} />;
          const dateKey = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const cellDate = new Date(viewYear, viewMonth, day);
          const isPast = cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const isToday = dateKey === todayKey;
          const isSelected = dateKey === selectedDate;
          const dayAppts = appointments[dateKey] || [];
          const count = dayAppts.length;

          return (
            <div
              key={dateKey}
              style={styles.dayCell(isToday, isSelected, isPast, count > 0)}
              onClick={() => !isPast && onSelectDate(dateKey)}
              role={isPast ? undefined : 'button'}
              aria-label={`${MONTH_NAMES[viewMonth]} ${day}${count > 0 ? `, ${count} appointment${count !== 1 ? 's' : ''}` : ''}`}
              aria-pressed={isSelected}
            >
              {count > 0 && (
                <span style={styles.countBadge(isSelected)}>{count}</span>
              )}
              <span style={styles.dayNum(isSelected)}>{day}</span>
              {count > 0 && <div style={styles.dot(isSelected)} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
