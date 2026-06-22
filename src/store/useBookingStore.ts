import { create } from 'zustand';
import { BookingState, Appointment, Department, Doctor } from '@/types';
import { loadAppointments, saveAppointments } from '@/utils/storage';
import { generateId } from '@/utils/dateUtils';

export const useBookingStore = create<BookingState>((set, get) => ({
  selectedDepartment: null,
  selectedDoctor: null,
  selectedDate: null,
  selectedTime: null,
  appointments: loadAppointments(),

  setSelectedDepartment: (dept: Department | null) => {
    set({ selectedDepartment: dept, selectedDoctor: null });
  },

  setSelectedDoctor: (doctor: Doctor | null) => {
    set({ selectedDoctor: doctor });
  },

  setSelectedDate: (date: string | null) => {
    set({ selectedDate: date, selectedTime: null });
  },

  setSelectedTime: (time: string | null) => {
    set({ selectedTime: time });
  },

  addAppointment: (appointmentData: Omit<Appointment, 'id' | 'status' | 'createdAt'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: generateId(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    const updatedAppointments = [...get().appointments, newAppointment];
    set({ appointments: updatedAppointments });
    saveAppointments(updatedAppointments);
  },

  cancelAppointment: (id: string) => {
    const updatedAppointments = get().appointments.map((apt) =>
      apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
    );
    set({ appointments: updatedAppointments });
    saveAppointments(updatedAppointments);
  },

  clearSelection: () => {
    set({
      selectedDepartment: null,
      selectedDoctor: null,
      selectedDate: null,
      selectedTime: null,
    });
  },
}));
