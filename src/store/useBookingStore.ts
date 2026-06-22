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
      petInfo: {
        petName: '',
        petType: '',
        petBreed: '',
        petAge: 0,
        petSymptoms: '',
      },
      appointments: [],

      setSelectedDepartment: (dept: Department | null) =>
        set((state) => {
          if (state.selectedDepartment?.id === dept?.id) return {};
          return { selectedDepartment: dept, selectedDoctor: null, selectedTimeSlot: null, selectedDate: null };
        }),

      setSelectedDoctor: (doctor: Doctor | null) =>
        set((state) => {
          if (state.selectedDoctor?.id === doctor?.id) return {};
          return { selectedDoctor: doctor, selectedTimeSlot: null };
        }),

      setSelectedDate: (date: string | null) =>
        set((state) => {
          if (state.selectedDate === date) return {};
          return { selectedDate: date, selectedTimeSlot: null };
        }),

      setSelectedTimeSlot: (slot: TimeSlot | null) =>
        set({ selectedTimeSlot: slot }),

      setPetInfo: (info) =>
        set((state) => ({
          petInfo: { ...state.petInfo, ...info },
        })),

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
          petInfo: {
            petName: '',
            petType: '',
            petBreed: '',
            petAge: 0,
            petSymptoms: '',
          },
        }),
    }),
    {
      name: 'pet-hospital-storage',
      partialize: (state) => ({ appointments: state.appointments }),
    }
  )
);
