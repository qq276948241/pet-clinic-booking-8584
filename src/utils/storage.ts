import { Appointment } from '@/types';

const APPOINTMENTS_KEY = 'pet_hospital_appointments';

export const saveAppointments = (appointments: Appointment[]): void => {
  try {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  } catch (error) {
    console.error('Failed to save appointments:', error);
  }
};

export const loadAppointments = (): Appointment[] => {
  try {
    const data = localStorage.getItem(APPOINTMENTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load appointments:', error);
    return [];
  }
};

export const clearAppointments = (): void => {
  try {
    localStorage.removeItem(APPOINTMENTS_KEY);
  } catch (error) {
    console.error('Failed to clear appointments:', error);
  }
};
