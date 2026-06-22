import type { Department, Doctor } from '@/types';

export const departments: Department[] = [
  { id: '1', name: '内科', icon: 'Heart', description: '宠物内科疾病诊治，包括消化系统、呼吸系统、心血管系统等', color: '#38BDF8' },
  { id: '2', name: '外科', icon: 'Scissors', description: '各类手术及外伤处理，软组织外科、骨科手术', color: '#0EA5E9' },
  { id: '3', name: '皮肤科', icon: 'Sparkles', description: '皮肤疾病与美容护理，过敏性皮炎、真菌感染等', color: '#06B6D4' },
  { id: '4', name: '牙科', icon: 'Tooth', description: '口腔健康检查与牙科手术，洗牙、拔牙等', color: '#0891B2' },
  { id: '5', name: '眼科', icon: 'Eye', description: '眼部疾病诊治，白内障、青光眼、角膜炎等', color: '#0284C7' },
  { id: '6', name: '体检中心', icon: 'ClipboardList', description: '全面健康检查，疫苗接种前后体检，老年宠物定期检查', color: '#7DD3FC' },
  { id: '7', name: '急诊', icon: 'AlertCircle', description: '24小时急诊服务，意外创伤、急性病症紧急处理', color: '#F87171' },
  { id: '8', name: '疫苗接种', icon: 'Syringe', description: '各类疫苗接种，狂犬、四联、六联疫苗等', color: '#34D399' },
];

export const doctors: Doctor[] = [
  { id: 'd1', name: '张医生', title: '主任医师', departmentId: '1', specialty: '犬猫内科疾病、消化系统疾病', avatar: '', experience: 15 },
  { id: 'd2', name: '李医生', title: '副主任医师', departmentId: '1', specialty: '呼吸系统疾病、心血管疾病', avatar: '', experience: 10 },
  { id: 'd3', name: '王医生', title: '主治医师', departmentId: '2', specialty: '软组织外科、外伤处理', avatar: '', experience: 8 },
  { id: 'd4', name: '刘医生', title: '主任医师', departmentId: '2', specialty: '骨科手术、神经外科', avatar: '', experience: 12 },
  { id: 'd5', name: '陈医生', title: '副主任医师', departmentId: '3', specialty: '过敏性皮肤病、真菌感染', avatar: '', experience: 9 },
  { id: 'd6', name: '赵医生', title: '主治医师', departmentId: '4', specialty: '口腔疾病诊治、牙科手术', avatar: '', experience: 7 },
  { id: 'd7', name: '孙医生', title: '主任医师', departmentId: '5', specialty: '眼科疾病诊治、眼科手术', avatar: '', experience: 14 },
  { id: 'd8', name: '周医生', title: '主治医师', departmentId: '6', specialty: '健康体检、预防医学', avatar: '', experience: 6 },
  { id: 'd9', name: '吴医生', title: '副主任医师', departmentId: '7', specialty: '急诊医学、重症监护', avatar: '', experience: 11 },
  { id: 'd10', name: '郑医生', title: '主治医师', departmentId: '8', specialty: '疫苗接种、免疫规划', avatar: '', experience: 5 },
];

export const getDoctorsByDepartment = (departmentId: string): Doctor[] => {
  return doctors.filter(d => d.departmentId === departmentId);
};

export const getDepartmentById = (id: string): Department | undefined => {
  return departments.find(d => d.id === id);
};

export const getDoctorById = (id: string): Doctor | undefined => {
  return doctors.find(d => d.id === id);
};

export const getTimeSlots = (date: string) => {
  const times = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30',
  ];
  return times.map((time, index) => ({
    id: `${date}-${time}`,
    date,
    time,
    available: Math.random() > 0.3 || index % 3 === 0,
  }));
};

export const getNext7Days = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    const weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];
    days.push({
      date: dateStr,
      day: date.getDate(),
      month: date.getMonth() + 1,
      weekDay,
      isToday: i === 0,
    });
  }
  return days;
};
