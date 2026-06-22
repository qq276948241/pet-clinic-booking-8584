import type { Doctor } from '../types';

export const doctors: Doctor[] = [
  {
    id: '1',
    departmentId: '1',
    name: '张医生',
    title: '主任医师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    description: '从事宠物内科临床工作15年，擅长犬猫消化系统、泌尿系统疾病诊疗',
    experience: 15,
  },
  {
    id: '2',
    departmentId: '1',
    name: '李医生',
    title: '主治医师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    description: '擅长宠物心血管疾病、呼吸系统疾病的诊断与治疗',
    experience: 8,
  },
  {
    id: '3',
    departmentId: '2',
    name: '王医生',
    title: '副主任医师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    description: '宠物外科专家，擅长骨科手术、创伤修复、肿瘤切除',
    experience: 12,
  },
  {
    id: '4',
    departmentId: '2',
    name: '刘医生',
    title: '主治医师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    description: '软组织外科专家，擅长腹腔镜微创手术',
    experience: 6,
  },
  {
    id: '5',
    departmentId: '3',
    name: '陈医生',
    title: '主任医师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
    description: '皮肤病专家，擅长过敏性皮炎、真菌感染诊治',
    experience: 10,
  },
  {
    id: '6',
    departmentId: '4',
    name: '赵医生',
    title: '主治医师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=6',
    description: '眼科专家，擅长白内障、青光眼手术',
    experience: 7,
  },
  {
    id: '7',
    departmentId: '5',
    name: '孙医生',
    title: '主治医师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=7',
    description: '牙科专家，擅长口腔疾病治疗与牙齿护理',
    experience: 5,
  },
  {
    id: '8',
    departmentId: '6',
    name: '周医生',
    title: '影像医师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=8',
    description: '影像诊断专家，擅长B超、X光影像解读',
    experience: 9,
  },
];

export const timeSlots = [
  { time: '08:00', available: true },
  { time: '08:30', available: true },
  { time: '09:00', available: false },
  { time: '09:30', available: true },
  { time: '10:00', available: true },
  { time: '10:30', available: false },
  { time: '11:00', available: true },
  { time: '14:00', available: true },
  { time: '14:30', available: true },
  { time: '15:00', available: false },
  { time: '15:30', available: true },
  { time: '16:00', available: true },
  { time: '16:30', available: true },
  { time: '17:00', available: false },
];

export const getDoctorsByDepartment = (departmentId: string): Doctor[] => {
  return doctors.filter(d => d.departmentId === departmentId);
};
