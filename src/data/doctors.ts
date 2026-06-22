import { Doctor } from '@/types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: '张伟',
    departmentId: '1',
    title: '主任医师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    description: '从事宠物临床工作15年，擅长消化系统疾病诊治',
  },
  {
    id: '2',
    name: '李娜',
    departmentId: '1',
    title: '副主任医师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    description: '专注于宠物内分泌和代谢疾病研究',
  },
  {
    id: '3',
    name: '王强',
    departmentId: '2',
    title: '主任医师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    description: '骨科专家，完成各类骨科手术500余例',
  },
  {
    id: '4',
    name: '刘芳',
    departmentId: '2',
    title: '主治医师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    description: '擅长软组织外科和微创手术',
  },
  {
    id: '5',
    name: '陈明',
    departmentId: '3',
    title: '副主任医师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
    description: '皮肤病专家，对过敏性皮炎有深入研究',
  },
  {
    id: '6',
    name: '赵丽',
    departmentId: '4',
    title: '主治医师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=6',
    description: '专注于宠物眼科疾病诊治',
  },
  {
    id: '7',
    name: '孙伟',
    departmentId: '5',
    title: '主治医师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=7',
    description: '宠物牙科专家，擅长牙齿清洁和口腔手术',
  },
  {
    id: '8',
    name: '周琳',
    departmentId: '6',
    title: '主任医师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=8',
    description: '资深兽医，擅长宠物体检和健康管理',
  },
  {
    id: '9',
    name: '吴杰',
    departmentId: '7',
    title: '主治医师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=9',
    description: '疫苗接种和传染病预防专家',
  },
  {
    id: '10',
    name: '郑雪',
    departmentId: '8',
    title: '副主任医师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=10',
    description: '急诊专家，处理各类突发疾病经验丰富',
  },
];

export const getDoctorsByDepartment = (departmentId: string): Doctor[] => {
  return doctors.filter((doctor) => doctor.departmentId === departmentId);
};

export const getDoctorById = (id: string): Doctor | undefined => {
  return doctors.find((doctor) => doctor.id === id);
};
