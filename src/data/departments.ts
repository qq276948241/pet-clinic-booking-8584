import type { Department } from '@/types';

export const departments: Department[] = [
  {
    id: '1',
    name: '内科',
    icon: 'Stethoscope',
    description: '诊治宠物内科疾病，包括消化系统、呼吸系统、心血管系统等',
    isHot: true,
  },
  {
    id: '2',
    name: '外科',
    icon: 'Scissors',
    description: '开展各类外科手术，包括绝育、肿瘤切除、骨折修复等',
    isHot: true,
  },
  {
    id: '3',
    name: '皮肤科',
    icon: 'Sparkles',
    description: '治疗宠物皮肤疾病，如皮炎、湿疹、真菌感染等',
    isHot: true,
  },
  {
    id: '4',
    name: '眼科',
    icon: 'Eye',
    description: '专业眼科诊疗，白内障、青光眼、角膜疾病等',
    isHot: false,
  },
  {
    id: '5',
    name: '牙科',
    icon: 'Tooth',
    description: '口腔健康检查、洁牙、拔牙、牙周疾病治疗',
    isHot: false,
  },
  {
    id: '6',
    name: '影像科',
    icon: 'X-Ray',
    description: 'X光、B超、CT等影像检查，精准诊断内部病变',
    isHot: false,
  },
  {
    id: '7',
    name: '检验科',
    icon: 'FlaskConical',
    description: '血液、尿液、粪便等常规检验，提供准确诊断依据',
    isHot: false,
  },
  {
    id: '8',
    name: '中兽医科',
    icon: 'Leaf',
    description: '中医针灸、中药调理，治疗慢性疾病和康复保健',
    isHot: true,
  },
];
