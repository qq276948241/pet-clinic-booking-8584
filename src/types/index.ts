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
  experience: string;
  specialties: string[];
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export type AppointmentStatus = 'pending' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  departmentId: string;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  doctorTitle: string;
  date: string;
  timeSlot: string;
  petName: string;
  petType: string;
  ownerName: string;
  phone: string;
  description: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface AppointmentForm {
  departmentId: string;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  doctorTitle: string;
  date: string;
  timeSlot: string;
  petName: string;
  petType: string;
  ownerName: string;
  phone: string;
  description: string;
}
