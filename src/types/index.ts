export interface Department {
  id: string;
  name: string;
  icon: string;
  description: string;
  isHot: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  departmentId: string;
  title: string;
  avatar: string;
  description: string;
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  departmentId: string;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  petName: string;
  petType: string;
  ownerName: string;
  ownerPhone: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export type BookingStep = 'department' | 'doctor' | 'time' | 'info' | 'success';

export interface BookingFormData {
  petName: string;
  petType: string;
  ownerName: string;
  ownerPhone: string;
}
