import type { Department } from '../types';

export const departments: Department[] = [
  {
    id: '1',
    name: '内科',
    description: '诊治宠物内科疾病，包括消化系统、呼吸系统、心血管系统等疾病的诊断与治疗',
    icon: 'Heart',
    color: 'from-primary-400',
  },
  {
    id: '2',
    name: '外科',
    description: '宠物外科手术治疗，包括创伤处理、肿瘤切除、骨科手术等',
    icon: 'Stethoscope',
    color: 'from-primary-500',
  },
  {
    id: '3',
    name: '皮肤科',
    description: '诊治各类宠物皮肤病诊疗，皮肤过敏、真菌感染、寄生虫等皮肤问题',
    icon: 'Sparkles',
    color: 'from-rose-400',
  },
  {
    id: '4',
    name: '眼科',
    description: '宠物眼部疾病诊疗，白内障、青光眼、角膜溃疡等',
    icon: 'Eye',
    color: 'from-amber-400',
  },
  {
    id: '5',
    name: '牙科',
    description: '宠物口腔健康护理，洗牙、拔牙、口腔疾病治疗',
    icon: 'Smile',
    color: 'from-emerald-400',
  },
  {
    id: '6',
    name: '影像科',
    description: 'X光、B超、CT等影像检查，精准诊断宠物病情',
    icon: 'X',
    color: 'from-violet-400',
  },
];
