import { create } from 'zustand';
import type { Department, Doctor, Appointment, BookingState } from '../types';

interface AppointmentStore {
  booking: BookingState;
  appointments: Appointment[];
  setDepartment: (department: Department) => void;
  setDoctor: (doctor: Doctor) => void;
  setDate: (date: string) => void;
  setTimeSlot: (timeSlot: string) => void;
  resetBooking: () => void;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status' | 'createdAt'>) => void;
  cancelAppointment: (id: string) => void;
  loadAppointments: () => void;
}

const STORAGE_KEY = 'pet-hospital-appointments';

const initialBookingState: BookingState = {
  selectedDepartment: null,
  selectedDoctor: null,
  selectedDate: null,
  selectedTimeSlot: null,
};

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  booking: initialBookingState,
  appointments: [],

  setDepartment: (department) =>
    set((state) => ({
      booking: {
        ...state.booking,
        selectedDepartment: department,
        selectedDoctor: null,
        selectedDate: null,
        selectedTimeSlot: null,
      },
    })),

  setDoctor: (doctor) =>
    set((state) => ({
      booking: {
        ...state.booking,
        selectedDoctor: doctor,
        selectedDate: null,
        selectedTimeSlot: null,
      },
    })),

  setDate: (date) =>
    set((state) => ({
      booking: {
        ...state.booking,
        selectedDate: date,
        selectedTimeSlot: null,
      },
    })),

  setTimeSlot: (timeSlot) =>
    set((state) => ({
      booking: {
        ...state.booking,
        selectedTimeSlot: timeSlot,
      },
    })),

  resetBooking: () =>
    set({
      booking: initialBookingState,
    }),

  addAppointment: (appointmentData) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    set((state) => {
      const updatedAppointments = [newAppointment, ...state.appointments];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAppointments));
      return { appointments: updatedAppointments };
    });

    get().resetBooking();
  },

  cancelAppointment: (id) => {
    set((state) => {
      const updatedAppointments = state.appointments.map((apt) =>
        apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAppointments));
      return { appointments: updatedAppointments };
    });
  },

  loadAppointments: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        set({ appointments: JSON.parse(stored) });
      }
    } catch (e) {
      console.error('Failed to load appointments:', e);
    }
  },
}));
