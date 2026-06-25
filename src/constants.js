export const SERVICES = [
  'Full Set',
  'Refill',
  'Deluxe Pedicure',
  'Dip Powder Nails',
  'French Manicure',
  'Manicure (French)',
  'Manicure (Gel)',
  'Manicure (Regular)',
  'Nail Repair',
  'Polish Change (Hands)',
  'Polish Change (Toes)',
  'Kids Manicure',
  'Kids Pedicure',
  'Wax - Eyebrow',
  'Wax - Lip',
];

export const TECHS = [
  'Henry',
  'Katie',
  'Lily',
  'Lisa',
  'Ti',
  'Vic',
];

export const PHONE_PREFIXES = ['(504)', '(985)'];

export const TIME_SLOTS = (() => {
  const slots = [];
  for (let h = 9; h <= 18; h++) {
    if (h === 18) {
      slots.push('6:00 PM');
      break;
    }
    const hour12 = h > 12 ? h - 12 : h;
    const ampm = h >= 12 ? 'PM' : 'AM';
    slots.push(`${hour12}:00 ${ampm}`);
    if (h < 17 || (h === 17)) {
      slots.push(`${hour12}:30 ${ampm}`);
    }
  }
  return slots;
})();

// Storage key
export const STORAGE_KEY = 'hollywoodNailsAppointments';

export const loadAppointments = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

export const saveAppointments = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Could not save appointments', e);
  }
};

export const formatDateKey = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const formatDisplayDate = (dateKey) => {
  const [y, m, d] = dateKey.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
};

export const getMonthDays = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { firstDay, daysInMonth };
};

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
