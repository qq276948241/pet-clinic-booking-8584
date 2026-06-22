import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Appointment, AppointmentForm } from '@/types';
import { mockAppointments } from '@/data/mockData';

interface AppointmentState {
  appointments: Appointment[];
  addAppointment: (form: AppointmentForm) => Appointment;
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
          departmentId: form.departmentId,
          departmentName: form.departmentName,
          doctorId: form.doctorId,
          doctorName: form.doctorName,
          doctorTitle: form.doctorTitle,
          date: form.date,
          timeSlot: form.timeSlot,
          petName: form.petName,
          petType: form.petType,
          petBreed: form.petBreed,
          petAge: form.petAge,
          petGender: form.petGender,
          ownerName: form.ownerName,
          phone: form.phone,
          description: form.description,
          status: 'pending',
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          appointments: [newAppointment, ...state.appointments],
        }));
        return newAppointment;
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
