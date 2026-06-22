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

export type PetType = '狗狗' | '猫咪' | '兔子' | '仓鼠' | '鸟类' | '其他';

export type DogBreed = '金毛' | '拉布拉多' | '泰迪' | '比熊' | '柯基' | '哈士奇' | '萨摩耶' | '边牧' | '其他';
export type CatBreed = '英短' | '美短' | '布偶' | '暹罗' | '橘猫' | '狸花猫' | '加菲' | '其他';

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
  petType: PetType;
  petBreed: string;
  petAge: string;
  petGender: '公' | '母';
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
  petType: PetType;
  petBreed: string;
  petAge: string;
  petGender: '公' | '母';
  ownerName: string;
  phone: string;
  description: string;
}
