import React, { useState } from 'react';
import { TIME_SLOTS, TECHS } from '../constants';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  card: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-card)',
    border: '1px solid var(--cream-dark)',
    overflow: 'hidden',
  },
  cardHeader: {
    padding: '20px 24px 16px',
    borderBottom: '1px solid var(--cream-dark)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '12px',
    flexWrap: 'wrap',
  },
  dateTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '20px',
    color: 'var(--charcoal)',
    fontWeight: 500,
  },
  dateCount: {
    fontSize: '13px',
    color: 'var(--moss)',
    marginTop: '2px',
  },
  addBtn: {
    padding: '10px 18px',
    borderRadius: 'var(--radius-sm)',
    background: 'var(--moss)',
    color: 'var(--white)',
    fontSize: '14px',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  empty: {
    padding: '48px 24px',
    textAlign: 'center',
  },
  emptyIcon: {
    fontSize: '36px',
    marginBottom: '12px',
    display: 'block',
  },
  emptyText: {
    fontFamily: 'var(--font-display)',
    fontSize: '18px',
    color: 'var(--warm-gray)',
    marginBottom: '6px',
  },
  emptySub: {
    fontSize: '13px',
    color: 'var(--warm-gray)',
  },
  list: {
    padding: '8px',
  },
  timeSection: {
    marginBottom: '4px',
  },
  timeLabel: {
    padding: '6px 16px 2px',
    fontSize: '11px',
    color: 'var(--warm-gray)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    fontWeight: 500,
  },
  apptCard: {
    padding: '14px 16px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--cream-dark)',
    background: 'var(--cream)',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: '8px 16px',
    alignItems: 'start',
    marginBottom: '6px',
    cursor: 'pointer',
  },
  apptMain: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  apptService: {
    fontSize: '15px',
    fontFamily: 'var(--font-display)',
    color: 'var(--charcoal)',
    fontWeight: 500,
  },
  apptMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    alignItems: 'center',
  },
  techTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 500,
    background: 'var(--sage-pale)',
    color: 'var(--charcoal)',
  },
  phoneTag: {
    fontSize: '13px',
    color: 'var(--charcoal)',
  },
  nameTag: {
    fontSize: '13px',
    color: 'var(--bamboo)',
    fontWeight: 500,
  },
  actions: {
    display: 'flex',
    gap: '6px',
  },
  iconBtn: (danger) => ({
    width: '30px',
    height: '30px',
    borderRadius: 'var(--radius-sm)',
    border: danger ? '1px solid #DDB89A' : '1px solid var(--sand)',
    background: danger ? '#FBF1EA' : 'var(--white)',
    color: danger ? '#9A5C30' : 'var(--warm-gray)',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
  }),
  summaryBar: {
    padding: '14px 24px',
    borderTop: '1px solid var(--cream-dark)',
    background: 'var(--cream)',
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
  },
  statNum: {
    fontFamily: 'var(--font-display)',
    fontSize: '22px',
    color: 'var(--moss)',
    fontWeight: 500,
    lineHeight: 1,
  },
  statLabel: {
    fontSize: '11px',
    color: 'var(--warm-gray)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginTop: '2px',
  },
  weekToggleBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 20px',
    borderRadius: 'var(--radius-lg)',
    background: 'var(--white)',
    border: '1px solid var(--cream-dark)',
    boxShadow: 'var(--shadow-soft)',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--moss)',
    width: '100%',
    justifyContent: 'space-between',
  },
  weekCard: {
    background: 'var(--white)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-card)',
    border: '1px solid var(--cream-dark)',
    overflow: 'hidden',
  },
  weekHeader: {
    padding: '16px 24px 12px',
    borderBottom: '1px solid var(--cream-dark)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  weekTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '17px',
    color: 'var(--charcoal)',
    fontWeight: 500,
    flex: 1,
  },
  weekGrid: {
    padding: '16px 24px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
    gap: '12px',
  },
  weekStatCard: {
    background: 'var(--cream)',
    borderRadius: 'var(--radius-md)',
    padding: '12px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  weekStatNum: {
    fontFamily: 'var(--font-display)',
    fontSize: '26px',
    color: 'var(--moss)',
    fontWeight: 500,
    lineHeight: 1,
  },
  weekStatName: {
    fontSize: '12px',
    color: 'var(--warm-gray)',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
};

export default function DayView({ dateLabel, appointments, onAdd, onEdit, onDelete, allAppointments, selectedDate }) {
  const [showWeekly, setShowWeekly] = useState(false);

  const sorted = [...appointments].sort((a, b) => {
    const ai = TIME_SLOTS.indexOf(a.timeSlot);
    const bi = TIME_SLOTS.indexOf(b.timeSlot);
    return ai - bi;
  });

  const byTime = {};
  sorted.forEach(appt => {
    const t = appt.timeSlot || 'No time';
    if (!byTime[t]) byTime[t] = [];
    byTime[t].push(appt);
  });

  const techCountsToday = {};
  appointments.forEach(a => {
    if (a.tech) techCountsToday[a.tech] = (techCountsToday[a.tech] || 0) + 1;
  });

  const getWeekRange = (dateKey) => {
    const [y, m, d] = dateKey.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const day = date.getDay();
    const sunday = new Date(date);
    sunday.setDate(date.getDate() - day);
    const saturday = new Date(date);
    saturday.setDate(date.getDate() + (6 - day));
    return { sunday, saturday };
  };

  const { sunday, saturday } = getWeekRange(selectedDate);
  const weeklyTechCounts = {};

  Object.entries(allAppointments).forEach(([dateKey, appts]) => {
    const [y, m, d] = dateKey.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    if (date >= sunday && date <= saturday) {
      appts.forEach(a => {
        if (a.tech) weeklyTechCounts[a.tech] = (weeklyTechCounts[a.tech] || 0) + 1;
      });
    }
  });

  const weekLabel = (() => {
    const fmt = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${fmt(sunday)} – ${fmt(saturday)}`;
  })();

  const allTechs = TECHS;
  const hasWeeklyData = Object.keys(weeklyTechCounts).length > 0;

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <div style={styles.dateTitle}>{dateLabel}</div>
            <div style={styles.dateCount}>
              {appointments.length === 0
                ? 'No appointments'
                : `${appointments.length} appointment${appointments.length !== 1 ? 's' : ''}`}
            </div>
          </div>
          <button style={styles.addBtn} onClick={onAdd}>
            <span aria-hidden="true">＋</span> Add appointment
          </button>
        </div>

        {appointments.length === 0 ? (
          <div style={styles.empty}>
            <span style={styles.emptyIcon} aria-hidden="true">🌸</span>
            <div style={styles.emptyText}>Clear day</div>
            <div style={styles.emptySub}>Tap "Add appointment" to get started</div>
          </div>
        ) : (
          <div style={styles.list}>
            {Object.entries(byTime).map(([time, appts]) => (
              <div key={time} style={styles.timeSection}>
                <div style={styles.timeLabel}>{time}</div>
                {appts.map(appt => (
                  <div
                    key={appt.id}
                    style={styles.apptCard}
                    onClick={() => onEdit(appt)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && onEdit(appt)}
                  >
                    <div style={styles.apptMain}>
                      {appt.customerName && (
                        <span style={styles.nameTag}>{appt.customerName}</span>
                      )}
                      <span style={styles.apptService}>{appt.service}</span>
                      <div style={styles.apptMeta}>
                        {appt.tech && (
                          <span style={styles.techTag}>✦ {appt.tech}</span>
                        )}
                        {(appt.fullPhone || appt.phoneNum) && (
                          <span style={styles.phoneTag}>
                            <span style={{ filter: 'grayscale(1) brightness(0)' }}>📞</span> {appt.fullPhone || appt.phoneNum}
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={styles.actions} onClick={e => e.stopPropagation()}>
                      <button
                        style={styles.iconBtn(false)}
                        onClick={() => onEdit(appt)}
                        aria-label="Edit appointment"
                      >✎</button>
                      <button
                        style={styles.iconBtn(true)}
                        onClick={() => onDelete(appt.id)}
                        aria-label="Delete appointment"
                      >✕</button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {appointments.length > 0 && Object.keys(techCountsToday).length > 0 && (
          <div style={styles.summaryBar}>
            <div style={styles.stat}>
              <span style={styles.statNum}>{appointments.length}</span>
              <span style={styles.statLabel}>Total today</span>
            </div>
            {Object.entries(techCountsToday).map(([tech, count]) => (
              <div key={tech} style={styles.stat}>
                <span style={styles.statNum}>{count}</span>
                <span style={styles.statLabel}>{tech}</span>
              </div>
            ))}
          </div>
        )}
        {appointments.length > 0 && Object.keys(techCountsToday).length === 0 && (
          <div style={styles.summaryBar}>
            <div style={styles.stat}>
              <span style={styles.statNum}>{appointments.length}</span>
              <span style={styles.statLabel}>Total today</span>
            </div>
          </div>
        )}
      </div>

      <button style={styles.weekToggleBtn} onClick={() => setShowWeekly(v => !v)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span aria-hidden="true">📊</span>
          Weekly totals — {weekLabel}
        </span>
        <span style={{ fontSize: '18px', color: 'var(--sage)' }}>{showWeekly ? '▲' : '▼'}</span>
      </button>

      {showWeekly && (
        <div style={styles.weekCard}>
          <div style={styles.weekHeader}>
            <span style={styles.weekTitle}>Tech totals for the week</span>
            <button
              onClick={() => setShowWeekly(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--warm-gray)', fontSize: '20px', lineHeight: 1 }}
              aria-label="Close weekly totals"
            >×</button>
          </div>
          {!hasWeeklyData ? (
            <div style={{ padding: '20px 24px', fontSize: '13px', color: 'var(--warm-gray)' }}>
              No appointments with assigned techs this week yet.
            </div>
          ) : (
            <div style={styles.weekGrid}>
              {allTechs.map(tech => {
                const count = weeklyTechCounts[tech] || 0;
                if (count === 0) return null;
                return (
                  <div key={tech} style={styles.weekStatCard}>
                    <span style={styles.weekStatNum}>{count}</span>
                    <span style={styles.weekStatName}>{tech}</span>
                  </div>
                );
              })}
              {Object.entries(weeklyTechCounts)
                .filter(([tech]) => !allTechs.includes(tech))
                .map(([tech, count]) => (
                  <div key={tech} style={styles.weekStatCard}>
                    <span style={styles.weekStatNum}>{count}</span>
                    <span style={styles.weekStatName}>{tech}</span>
                  </div>
                ))
              }
            </div>
          )}
        </div>
      )}
    </div>
  );
}
