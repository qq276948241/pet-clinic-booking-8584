export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Doctor {
  id: string;
  departmentId: string;
  name: string;
  title: string;
  avatar: string;
  description: string;
  experience: number;
}

export interface Appointment {
  id: string;
  departmentId: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  petName: string;
  petType: string;
  ownerName: string;
  phone: string;
  description: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface BookingState {
  selectedDepartment: Department | null;
  selectedDoctor: Doctor | null;
  selectedDate: string | null;
  selectedTimeSlot: string | null;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}
