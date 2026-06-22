import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Appointment, AppointmentForm } from '@/types';
import { mockAppointments } from '@/data/mockData';

interface AppointmentState {
  appointments: Appointment[];
  addAppointment: (form: AppointmentForm) => void;
  cancelAppointment: (id: string) => void;
  getAppointmentById: (id: string) => Appointment | undefined;
}

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    (set, get) => ({
      appointments: mockAppointments,

      addAppointment: (form) => {
        const newAppointment: Appointment = {
          id: Date.now().toString(),
          ...form,
          status: 'pending',
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          appointments: [newAppointment, ...state.appointments],
        }));
      },

      cancelAppointment: (id) => {
        set((state) => ({
          appointments: state.appointments.map((apt) =>
            apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
          ),
        }));
      },

      getAppointmentById: (id) => {
        return get().appointments.find((apt) => apt.id === id);
      },
    }),
    {
      name: 'pet-hospital-appointments',
    }
  )
);
