import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vgmxvnickoywcvirefpt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnbXh2bmlja295d2N2aXJlZnB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNDM1NjAsImV4cCI6MjA5NzkxOTU2MH0.tDuXjP2Nkt-GhnetoZB5jUerxV54LklbSsHeMQLwqB4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const loadAppointmentsFromDB = async () => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*');
  if (error) { console.error('Load error:', error); return {}; }
  const grouped = {};
  data.forEach(row => {
    if (!grouped[row.date]) grouped[row.date] = [];
    grouped[row.date].push({
      id: row.id,
      date: row.date,
      customerName: row.customer_name,
      tech: row.tech,
      service: row.service,
      services: row.services || [],
      timeSlot: row.time_slot,
      prefix: row.prefix,
      phoneNum: row.phone_num,
      fullPhone: row.full_phone,
    });
  });
  return grouped;
};

export const saveAppointmentToDB = async (appt) => {
  const { error } = await supabase
    .from('appointments')
    .upsert({
      id: appt.id,
      date: appt.date,
      customer_name: appt.customerName || null,
      tech: appt.tech || null,
      service: appt.service || null,
      services: appt.services || [],
      time_slot: appt.timeSlot || null,
      prefix: appt.prefix || null,
      phone_num: appt.phoneNum || null,
      full_phone: appt.fullPhone || null,
    });
  if (error) console.error('Save error:', error);
};

export const deleteAppointmentFromDB = async (id) => {
  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id);
  if (error) console.error('Delete error:', error);
};