export interface Department {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  specialty: string;
  avatar: string;
  experience: number;
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
  doctorId: string;
  date: string;
  time: string;
  petName: string;
  petType: string;
  petAge: number;
  ownerName: string;
  phone: string;
  notes: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface BookingState {
  selectedDepartment: Department | null;
  selectedDoctor: Doctor | null;
  selectedDate: string | null;
  selectedTimeSlot: TimeSlot | null;
  appointments: Appointment[];
  setSelectedDepartment: (dept: Department | null) => void;
  setSelectedDoctor: (doctor: Doctor | null) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedTimeSlot: (slot: TimeSlot | null) => void;
  addAppointment: (appt: Omit<Appointment, 'id' | 'status' | 'createdAt'>) => void;
  cancelAppointment: (id: string) => void;
  resetSelection: () => void;
}
