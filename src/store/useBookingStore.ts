import { create } from 'zustand';
import type { Department, Doctor, TimeSlot, Appointment, BookingStep, BookingFormData } from '@/types';
import { loadAppointments, saveAppointments, generateId } from '@/utils/storage';

interface BookingState {
  currentStep: BookingStep;
  selectedDepartment: Department | null;
  selectedDoctor: Doctor | null;
  selectedTimeSlot: TimeSlot | null;
  formData: BookingFormData;
  appointments: Appointment[];
  lastAppointment: Appointment | null;

  setCurrentStep: (step: BookingStep) => void;
  selectDepartment: (dept: Department) => void;
  selectDoctor: (doctor: Doctor) => void;
  selectTimeSlot: (slot: TimeSlot) => void;
  setFormData: (data: Partial<BookingFormData>) => void;
  submitAppointment: () => Appointment;
  cancelAppointment: (id: string) => void;
  resetBooking: () => void;
  updateAppointmentStatuses: () => void;
}

const initialFormData: BookingFormData = {
  petName: '',
  petType: '',
  ownerName: '',
  ownerPhone: '',
};

export const useBookingStore = create<BookingState>((set, get) => {
  const initialAppointments = loadAppointments();

  const updateAppointmentStatuses = () => {
    const now = new Date();
    const appointments = get().appointments.map((apt) => {
      if (apt.status === 'pending') {
        const aptDateTime = new Date(`${apt.date}T${apt.time}`);
        if (aptDateTime < now) {
          return { ...apt, status: 'completed' as const };
        }
      }
      return apt;
    });
    set({ appointments });
    saveAppointments(appointments);
  };

  return {
    currentStep: 'department',
    selectedDepartment: null,
    selectedDoctor: null,
    selectedTimeSlot: null,
    formData: initialFormData,
    appointments: initialAppointments,
    lastAppointment: null,

    setCurrentStep: (step) => set({ currentStep: step }),

    selectDepartment: (dept) => set({ selectedDepartment: dept, currentStep: 'doctor' }),

    selectDoctor: (doctor) => set({ selectedDoctor: doctor, currentStep: 'time' }),

    selectTimeSlot: (slot) => set({ selectedTimeSlot: slot, currentStep: 'info' }),

    setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),

    submitAppointment: () => {
      const { selectedDepartment, selectedDoctor, selectedTimeSlot, formData, appointments } = get();

      if (!selectedDepartment || !selectedDoctor || !selectedTimeSlot) {
        throw new Error('Incomplete booking information');
      }

      const newAppointment: Appointment = {
        id: generateId(),
        departmentId: selectedDepartment.id,
        departmentName: selectedDepartment.name,
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        date: selectedTimeSlot.date,
        time: selectedTimeSlot.time,
        petName: formData.petName,
        petType: formData.petType,
        ownerName: formData.ownerName,
        ownerPhone: formData.ownerPhone,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      const updatedAppointments = [newAppointment, ...appointments];
      set({
        appointments: updatedAppointments,
        lastAppointment: newAppointment,
        currentStep: 'success',
      });
      saveAppointments(updatedAppointments);

      return newAppointment;
    },

    cancelAppointment: (id) => {
      const appointments = get().appointments.map((apt) =>
        apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
      );
      set({ appointments });
      saveAppointments(appointments);
    },

    resetBooking: () =>
      set({
        currentStep: 'department',
        selectedDepartment: null,
        selectedDoctor: null,
        selectedTimeSlot: null,
        formData: initialFormData,
        lastAppointment: null,
      }),

    updateAppointmentStatuses,
  };
});
