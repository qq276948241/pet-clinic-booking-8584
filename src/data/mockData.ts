import type { Department, Doctor, Appointment, TimeSlot } from '@/types';

export const departments: Department[] = [
  {
    id: '1',
    name: '内科',
    icon: 'stethoscope',
    description: '宠物内科疾病诊断与治疗，包括消化系统、呼吸系统、心血管系统等常见病',
    isHot: true,
  },
  {
    id: '2',
    name: '外科',
    icon: 'scissors',
    description: '各类外科手术，包括绝育、肿瘤切除、骨折修复等',
    isHot: true,
  },
  {
    id: '3',
    name: '皮肤科',
    icon: 'sparkles',
    description: '宠物皮肤疾病诊疗，包括过敏、皮炎、真菌感染等',
    isHot: true,
  },
  {
    id: '4',
    name: '牙科',
    icon: 'tooth',
    description: '宠物口腔检查、洁牙、拔牙、牙周病治疗等',
    isHot: false,
  },
  {
    id: '5',
    name: '眼科',
    icon: 'eye',
    description: '宠物眼部疾病诊疗，包括结膜炎、白内障、青光眼等',
    isHot: false,
  },
  {
    id: '6',
    name: '骨科',
    icon: 'bone',
    description: '宠物骨骼关节疾病诊疗，包括骨折、关节炎、椎间盘突出等',
    isHot: false,
  },
  {
    id: '7',
    name: '预防保健科',
    icon: 'heart',
    description: '疫苗接种、驱虫、健康体检、营养咨询等预防保健服务',
    isHot: true,
  },
  {
    id: '8',
    name: '肿瘤科',
    icon: 'microscope',
    description: '宠物肿瘤诊断与治疗，包括化疗、手术切除等综合治疗方案',
    isHot: false,
  },
];

export const doctors: Doctor[] = [
  {
    id: '1',
    name: '张医生',
    departmentId: '1',
    title: '主治医师',
    avatar: '👨‍⚕️',
    experience: '10年临床经验',
    specialties: ['消化系统疾病', '呼吸系统疾病', '心脏病'],
  },
  {
    id: '2',
    name: '李医生',
    departmentId: '1',
    title: '副主任医师',
    avatar: '👩‍⚕️',
    experience: '15年临床经验',
    specialties: ['内分泌疾病', '肾病', '老年病'],
  },
  {
    id: '3',
    name: '王医生',
    departmentId: '2',
    title: '主任医师',
    avatar: '👨‍⚕️',
    experience: '20年临床经验',
    specialties: ['软组织手术', '肿瘤切除', '绝育手术'],
  },
  {
    id: '4',
    name: '陈医生',
    departmentId: '2',
    title: '主治医师',
    avatar: '👩‍⚕️',
    experience: '8年临床经验',
    specialties: ['微创手术', '急诊外科', '伤口处理'],
  },
  {
    id: '5',
    name: '刘医生',
    departmentId: '3',
    title: '主治医师',
    avatar: '👨‍⚕️',
    experience: '12年临床经验',
    specialties: ['过敏性皮炎', '真菌感染', '寄生虫性皮肤病'],
  },
  {
    id: '6',
    name: '赵医生',
    departmentId: '4',
    title: '主治医师',
    avatar: '👩‍⚕️',
    experience: '7年临床经验',
    specialties: ['洁牙', '拔牙', '牙周病'],
  },
  {
    id: '7',
    name: '孙医生',
    departmentId: '5',
    title: '副主任医师',
    avatar: '👨‍⚕️',
    experience: '18年临床经验',
    specialties: ['白内障', '青光眼', '角膜疾病'],
  },
  {
    id: '8',
    name: '周医生',
    departmentId: '6',
    title: '主任医师',
    avatar: '👨‍⚕️',
    experience: '22年临床经验',
    specialties: ['骨折修复', '关节置换', '脊柱手术'],
  },
  {
    id: '9',
    name: '吴医生',
    departmentId: '7',
    title: '主治医师',
    avatar: '👩‍⚕️',
    experience: '6年临床经验',
    specialties: ['疫苗接种', '健康体检', '营养咨询'],
  },
  {
    id: '10',
    name: '郑医生',
    departmentId: '8',
    title: '副主任医师',
    avatar: '👨‍⚕️',
    experience: '16年临床经验',
    specialties: ['肿瘤化疗', '免疫治疗', '疼痛管理'],
  },
];

export const generateTimeSlots = (): TimeSlot[] => {
  const morningSlots = [
    { id: 'm1', time: '09:00', available: true },
    { id: 'm2', time: '09:30', available: true },
    { id: 'm3', time: '10:00', available: false },
    { id: 'm4', time: '10:30', available: true },
    { id: 'm5', time: '11:00', available: true },
    { id: 'm6', time: '11:30', available: false },
  ];

  const afternoonSlots = [
    { id: 'a1', time: '14:00', available: true },
    { id: 'a2', time: '14:30', available: true },
    { id: 'a3', time: '15:00', available: true },
    { id: 'a4', time: '15:30', available: false },
    { id: 'a5', time: '16:00', available: true },
    { id: 'a6', time: '16:30', available: true },
  ];

  return [...morningSlots, ...afternoonSlots];
};

export const generateNextDays = (days: number) => {
  const result = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekDay = weekDays[date.getDay()];

    result.push({
      id: i.toString(),
      date: date.toISOString().split('T')[0],
      displayDate: `${month}月${day}日`,
      weekDay,
      isToday: i === 0,
    });
  }

  return result;
};

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    departmentId: '1',
    departmentName: '内科',
    doctorId: '1',
    doctorName: '张医生',
    doctorTitle: '主治医师',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '10:00',
    petName: '豆豆',
    petType: '狗狗',
    petBreed: '金毛',
    petAge: '3岁',
    petGender: '公',
    ownerName: '小明',
    phone: '13800138001',
    description: '最近食欲不振，精神不太好，有点拉肚子',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    departmentId: '7',
    departmentName: '预防保健科',
    doctorId: '9',
    doctorName: '吴医生',
    doctorTitle: '主治医师',
    date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0],
    timeSlot: '14:30',
    petName: '咪咪',
    petType: '猫咪',
    petBreed: '英短',
    petAge: '2岁',
    petGender: '母',
    ownerName: '小红',
    phone: '13800138002',
    description: '年度疫苗接种，顺便做个体检',
    status: 'completed',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: '3',
    departmentId: '3',
    departmentName: '皮肤科',
    doctorId: '5',
    doctorName: '刘医生',
    doctorTitle: '主治医师',
    date: new Date(Date.now() - 86400000 * 7).toISOString().split('T')[0],
    timeSlot: '09:30',
    petName: '旺财',
    petType: '狗狗',
    petBreed: '泰迪',
    petAge: '1岁',
    petGender: '公',
    ownerName: '小李',
    phone: '13800138003',
    description: '皮肤瘙痒，经常抓挠，耳朵有点臭',
    status: 'cancelled',
    createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
  },
];
