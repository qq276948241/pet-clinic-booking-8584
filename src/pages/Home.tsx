import { Link } from 'react-router-dom';
import {
  Stethoscope,
  Scissors,
  Bone,
  Eye,
  Smile,
  ShieldCheck,
  Heart,
  Clock,
  Award,
  ArrowRight,
  PawPrint,
  Sparkles,
} from 'lucide-react';
import { departments } from '@/data/mockData';

const iconMap: Record<string, React.ElementType> = {
  Stethoscope,
  Scissors,
  Bone,
  Eye,
  Smile,
  ShieldCheck,
};

const features = [
  { icon: Award, label: '三甲资质', desc: '国家认证宠物医院' },
  { icon: Clock, label: '全年无休', desc: '24小时急诊服务' },
  { icon: Heart, label: '专业团队', desc: '30+资深兽医师' },
  { icon: Sparkles, label: '先进设备', desc: '进口诊疗仪器' },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-white">
            <PawPrint className="w-20 h-20 rotate-[-15deg]" />
          </div>
          <div className="absolute top-32 right-20 text-white">
            <PawPrint className="w-14 h-14 rotate-[20deg]" />
          </div>
          <div className="absolute bottom-8 left-1/3 text-white">
            <PawPrint className="w-16 h-16 rotate-[-30deg]" />
          </div>
          <div className="absolute bottom-20 right-10 text-white">
            <PawPrint className="w-10 h-10 rotate-[45deg]" />
          </div>
        </div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              值得信赖的宠物医疗伙伴
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              给毛孩子
              <br />
              <span className="text-white/90">最贴心的健康守护</span>
            </h1>
            <p className="text-primary-100 text-lg mb-8 leading-relaxed">
              宠爱宠物医院，专注宠物健康 15 年。专业团队、先进设备，
              <br className="hidden md:block" />
              为您的爱宠提供全方位医疗服务。
            </p>
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary-600 rounded-2xl font-semibold text-base shadow-lg shadow-primary-700/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 no-underline"
            >
              立即预约挂号
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface-100 to-transparent" />
      </section>

      <section className="container mx-auto px-4 -mt-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="card-base p-5 flex flex-col items-center text-center card-hover"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center mb-3">
                <Icon className="w-6 h-6 text-primary-500" />
              </div>
              <span className="font-semibold text-gray-800 text-sm">{label}</span>
              <span className="text-xs text-gray-400 mt-1">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">热门科室</h2>
            <p className="text-sm text-gray-400 mt-1">选择科室，为爱宠预约专业诊疗</p>
          </div>
          <Link
            to="/appointment"
            className="flex items-center gap-1 text-primary-500 text-sm font-medium no-underline hover:gap-2 transition-all"
          >
            全部科室 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {departments.map((dept) => {
            const Icon = iconMap[dept.icon] || Stethoscope;
            return (
              <Link
                key={dept.id}
                to={`/appointment?dept=${dept.id}`}
                className="card-base p-5 card-hover no-underline group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center mb-3 group-hover:from-primary-100 group-hover:to-primary-200 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="font-semibold text-gray-800 text-base">{dept.name}</h3>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                  {dept.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <div className="card-base p-8 bg-gradient-to-r from-primary-50 to-white border border-primary-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">还有疑问？</h2>
              <p className="text-sm text-gray-400 mt-1">
                拨打咨询热线，专业客服为您解答
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-2xl font-bold text-primary-600">400-888-9999</p>
                <p className="text-xs text-gray-400">工作日 8:00-20:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
