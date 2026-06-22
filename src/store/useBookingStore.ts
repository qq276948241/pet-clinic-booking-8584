import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Department, Doctor, TimeSlot, Appointment, BookingState } from '@/types';

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      selectedDepartment: null,
      selectedDoctor: null,
      selectedDate: null,
      selectedTimeSlot: null,
      appointments: [],

      setSelectedDepartment: (dept: Department | null) =>
        set({ selectedDepartment: dept, selectedDoctor: null, selectedTimeSlot: null }),

      setSelectedDoctor: (doctor: Doctor | null) =>
        set({ selectedDoctor: doctor, selectedTimeSlot: null }),

      setSelectedDate: (date: string | null) =>
        set({ selectedDate: date, selectedTimeSlot: null }),

      setSelectedTimeSlot: (slot: TimeSlot | null) =>
        set({ selectedTimeSlot: slot }),

      addAppointment: (appt) =>
        set((state) => ({
          appointments: [
            {
              ...appt,
              id: Date.now().toString(),
              status: 'pending',
              createdAt: new Date().toISOString(),
            },
            ...state.appointments,
          ],
        })),

      cancelAppointment: (id: string) =>
        set((state) => ({
          appointments: state.appointments.map((a) =>
            a.id === id ? { ...a, status: 'cancelled' as const } : a
          ),
        })),

      resetSelection: () =>
        set({
          selectedDepartment: null,
          selectedDoctor: null,
          selectedDate: null,
          selectedTimeSlot: null,
        }),
    }),
    {
      name: 'pet-hospital-storage',
      partialize: (state) => ({ appointments: state.appointments }),
    }
  )
);
