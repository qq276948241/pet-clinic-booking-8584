import { useNavigate } from 'react-router-dom';
import { Stethoscope, Shield, Clock, Award, Heart, ChevronRight } from 'lucide-react';
import { departments } from '@/data/mockData';
import DepartmentCard from '@/components/DepartmentCard';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: '专业医疗团队',
      description: '10+位资深执业兽医，平均经验10年以上',
      color: '#38BDF8',
    },
    {
      icon: Clock,
      title: '24小时急诊',
      description: '全天候急诊服务，守护爱宠健康每一刻',
      color: '#0EA5E9',
    },
    {
      icon: Award,
      title: '先进设备',
      description: '进口医疗设备，精准诊断，科学治疗',
      color: '#06B6D4',
    },
  ];

  const hotDepartments = departments.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/50 to-white">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100/60 via-primary-50 to-white" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full text-primary-600 text-sm font-medium mb-6 shadow-sm">
              <Heart className="w-4 h-4 text-red-400" />
              专业宠物诊疗 · 用心呵护
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              为爱宠健康
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">
                保驾护航
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
              爱宠医院拥有专业的医疗团队和先进的诊疗设备，
              提供内科、外科、皮肤科、牙科等全方位宠物医疗服务，
              让您的爱宠享受最优质的医疗护理。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate('/booking')}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 hover:-translate-y-0.5 transition-all duration-300"
              >
                立即预约挂号
              </button>
              <button
                onClick={() => navigate('/my-appointments')}
                className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-gray-200"
              >
                查看我的预约
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">为什么选择我们</h2>
            <p className="text-gray-500">专业、贴心、高效的医疗服务</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feature.color}15`, color: feature.color }}
                >
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">热门科室</h2>
              <p className="text-gray-500">选择您需要的科室，快速预约挂号</p>
            </div>
            <button
              onClick={() => navigate('/booking')}
              className="hidden sm:flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium transition-colors"
            >
              全部科室
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hotDepartments.map((dept) => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <button
              onClick={() => navigate('/booking')}
              className="inline-flex items-center gap-2 text-primary-500 font-medium"
            >
              查看全部科室
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-primary-50 to-white">
        <div className="container mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card text-center max-w-4xl mx-auto">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Stethoscope className="w-8 h-8 text-primary-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              爱宠的健康，是我们最大的心愿
            </h2>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto">
              立即预约，为您的爱宠预约专业的医疗服务。
              我们将以最专业的态度和最温暖的服务，守护每一个毛茸茸的家庭成员。
            </p>
            <button
              onClick={() => navigate('/booking')}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 hover:-translate-y-0.5 transition-all duration-300"
            >
              现在就预约
            </button>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          <p>© 2026 爱宠医院 版权所有</p>
          <p className="mt-1">24小时服务热线：400-888-8888</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
