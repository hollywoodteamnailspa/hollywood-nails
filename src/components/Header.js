import React from 'react';

const styles = {
  header: {
    background: 'var(--white)',
    borderBottom: '1px solid var(--sand)',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '72px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: 'var(--shadow-soft)',
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  leaf: {
    fontSize: '28px',
    lineHeight: 1,
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  salon: {
    fontFamily: 'var(--font-display)',
    fontSize: '22px',
    fontWeight: 600,
    color: 'var(--charcoal)',
    letterSpacing: '0.02em',
    lineHeight: 1,
  },
  tagline: {
    fontSize: '11px',
    color: 'var(--warm-gray)',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    fontWeight: 400,
  },
  today: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '2px',
  },
  todayLabel: {
    fontSize: '11px',
    color: 'var(--warm-gray)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  todayDate: {
    fontFamily: 'var(--font-display)',
    fontSize: '16px',
    color: 'var(--moss)',
    fontWeight: 500,
  },
};

export default function Header() {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  });

  return (
    <header style={styles.header}>
      <div style={styles.logoWrap}>
        <span style={styles.leaf} aria-hidden="true">🌿</span>
        <div style={styles.logoText}>
          <span style={styles.salon}>Hollywood Team Nail Spa</span>
          <span style={styles.tagline}>Appointment Scheduler</span>
        </div>
      </div>
      <div style={styles.today}>
        <span style={styles.todayLabel}>Today</span>
        <span style={styles.todayDate}>{dateStr}</span>
      </div>
    </header>
  );
}
