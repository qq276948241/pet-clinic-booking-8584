import type { Appointment } from '@/types';

const STORAGE_KEY = 'pet_hospital_appointments';

export function saveAppointments(appointments: Appointment[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  } catch (error) {
    console.error('Failed to save appointments:', error);
  }
}

export function loadAppointments(): Appointment[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load appointments:', error);
  }
  return [];
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
