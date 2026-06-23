export interface Department {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  departmentId: string;
  description: string;
}

export interface TimeSlot {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  available: boolean;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Appointment {
  id: string;
  departmentId: string;
  doctorId: string;
  date: string;
  time: string;
  petName: string;
  petType: string;
  status: AppointmentStatus;
  createdAt: string;
}

export const departments: Department[] = [
  { id: 'd1', name: '内科', icon: 'Stethoscope', description: '宠物常见内科疾病诊治，消化呼吸泌尿等系统' },
  { id: 'd2', name: '外科', icon: 'Scissors', description: '软组织外科手术、肿瘤切除、创伤修复' },
  { id: 'd3', name: '骨科', icon: 'Bone', description: '骨折内固定、关节手术、脊椎疾病治疗' },
  { id: 'd4', name: '眼科', icon: 'Eye', description: '白内障、青光眼、角膜疾病及眼睑整形' },
  { id: 'd5', name: '牙科', icon: 'Smile', description: '洁牙、拔牙、口腔肿瘤及牙周病治疗' },
  { id: 'd6', name: '皮肤科', icon: 'ShieldCheck', description: '过敏性皮炎、真菌感染、寄生虫性皮肤病' },
];

export const doctors: Doctor[] = [
  { id: 'doc1', name: '张明远', title: '主任医师', avatar: '', departmentId: 'd1', description: '从业20年，擅长犬猫消化系统疾病与老年病管理' },
  { id: 'doc2', name: '李思涵', title: '副主任医师', avatar: '', departmentId: 'd1', description: '专注呼吸系统疾病，对猫咪哮喘有深入研究' },
  { id: 'doc3', name: '王建国', title: '主任医师', avatar: '', departmentId: 'd2', description: '15年外科经验，精通微创手术与肿瘤切除' },
  { id: 'doc4', name: '赵雅琴', title: '主治医师', avatar: '', departmentId: 'd2', description: '擅长软组织修复与急诊创伤处理' },
  { id: 'doc5', name: '陈志强', title: '主任医师', avatar: '', departmentId: 'd3', description: '骨科专家，擅长复杂骨折内固定与关节置换' },
  { id: 'doc6', name: '孙丽华', title: '副主任医师', avatar: '', departmentId: 'd4', description: '眼科博士，白内障超声乳化手术量超千例' },
  { id: 'doc7', name: '刘文博', title: '主治医师', avatar: '', departmentId: 'd5', description: '牙科专科医师，擅长牙周病治疗与口腔修复' },
  { id: 'doc8', name: '周晓燕', title: '副主任医师', avatar: '', departmentId: 'd6', description: '皮肤科骨干，对过敏性皮炎有独到诊疗方案' },
];

export function generateTimeSlots(doctorId: string): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
  const today = new Date();
  for (let i = 1; i <= 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    for (const time of times) {
      const available = Math.random() > 0.3;
      slots.push({
        id: `${doctorId}-${dateStr}-${time}`,
        doctorId,
        date: dateStr,
        time,
        available,
      });
    }
  }
  return slots;
}

export function getDoctorsByDepartment(departmentId: string): Doctor[] {
  return doctors.filter(d => d.departmentId === departmentId);
}

export function getDepartmentById(id: string): Department | undefined {
  return departments.find(d => d.id === id);
}

export function getDoctorById(id: string): Doctor | undefined {
  return doctors.find(d => d.id === id);
}
