import { useNavigate } from 'react-router-dom';
import {
  PawPrint,
  Clock,
  Shield,
  Award,
  Phone,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import DepartmentCard from '@/components/DepartmentCard';
import { departments } from '@/data/mockData';

const Home = () => {
  const navigate = useNavigate();
  const hotDepartments = departments.filter((d) => d.isHot);

  const features = [
    {
      icon: Clock,
      title: '24小时急诊',
      desc: '全天候专业医疗服务，守护爱宠健康',
    },
    {
      icon: Shield,
      title: '专业团队',
      desc: '资深兽医团队，丰富临床经验',
    },
    {
      icon: Award,
      title: '先进设备',
      desc: '引进国际先进诊疗设备',
    },
    {
      icon: PawPrint,
      title: '贴心服务',
      desc: '温馨环境，用心呵护每一位毛孩子',
    },
  ];

  const handleDepartmentClick = (departmentId: string) => {
    navigate(`/appointment?department=${departmentId}`);
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 text-white py-16 px-8 md:py-20 md:px-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/3" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
            <PawPrint size={16} />
            <span>专业宠物医疗服务</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            关爱每一个毛孩子
            <br />
            <span className="text-primary-100">专业守护宠物健康</span>
          </h1>

          <p className="text-lg text-primary-100 mb-8 max-w-lg">
            我们拥有专业的兽医团队和先进的医疗设备，为您的爱宠提供全方位的医疗保健服务，让每一个小生命都能健康快乐地成长。
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/appointment')}
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-colors shadow-lg hover:shadow-xl"
            >
              立即预约
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('departments');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-colors"
            >
              了解更多
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 text-8xl opacity-30 hidden md:block">
          🐾
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="card p-6 text-center hover:-translate-y-1"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                  <IconComponent size={28} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Hot Departments */}
      <section id="departments">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              热门科室
            </h2>
            <p className="text-gray-500">选择科室，快速预约专家号</p>
          </div>
          <button
            onClick={() => navigate('/appointment')}
            className="text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1"
          >
            全部科室
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hotDepartments.map((department) => (
            <DepartmentCard
              key={department.id}
              department={department}
              onClick={() => handleDepartmentClick(department.id)}
            />
          ))}
        </div>
      </section>

      {/* Hospital Info */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              关于我们
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              萌宠医院成立于2015年，是一家集医疗、预防、保健、康复为一体的综合性宠物医院。我们拥有一支经验丰富、技术精湛的兽医团队，配备先进的诊疗设备，致力于为每一位毛孩子提供专业、贴心的医疗服务。
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <span>北京市朝阳区宠物街88号</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <span>400-888-8888</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
                  <Clock size={20} />
                </div>
                <span>周一至周日 09:00-20:00（急诊24小时）</span>
              </div>
            </div>
          </div>

          <div className="card p-8 bg-gradient-to-br from-primary-50 to-white">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              服务流程
            </h2>
            <div className="space-y-4">
              {[
                { step: '01', title: '在线预约', desc: '选择科室、医生和时间' },
                { step: '02', title: '到院就诊', desc: '按时到院，前台登记' },
                { step: '03', title: '专业诊疗', desc: '医生检查诊断治疗' },
                { step: '04', title: '康复随访', desc: '术后康复跟踪服务' },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
