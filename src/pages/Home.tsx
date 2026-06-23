import { useNavigate } from 'react-router-dom';
import { Clock, Phone, MapPin, Award, Calendar, ArrowRight, Shield, Heart, Users } from 'lucide-react';
import DepartmentCard from '@/components/DepartmentCard';
import { departments } from '@/data/departments';

export default function Home() {
  const navigate = useNavigate();
  const hotDepartments = departments.filter((d) => d.isHot);

  const features = [
    { icon: Shield, title: '专业医疗', desc: '持证兽医团队，设备先进齐全' },
    { icon: Heart, title: '用心呵护', desc: '关爱每一个毛孩子的健康' },
    { icon: Users, title: '经验丰富', desc: '年均接诊量超50000例' },
    { icon: Award, title: '口碑保障', desc: '98%客户满意度好评' },
  ];

  return (
    <div className="min-h-screen animate-fade-in">
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-12 md:py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Award className="w-4 h-4" />
                专业宠物医疗服务机构
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                为您的爱宠
                <br />
                <span className="text-primary-600">保驾护航</span>
              </h1>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                我们拥有专业的兽医团队和先进的医疗设备，为您的宠物提供全方位的健康服务。
                从常规体检到专科治疗，用心呵护每一个毛孩子。
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/booking')}
                  className="btn-primary flex items-center gap-2 text-base px-8"
                >
                  <Calendar className="w-5 h-5" />
                  立即预约
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('/my-appointments')}
                  className="btn-secondary flex items-center gap-2 text-base"
                >
                  我的预约
                </button>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute -top-6 -left-6 w-72 h-72 bg-primary-200 rounded-full opacity-30 blur-3xl" />
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary-300 rounded-full opacity-20 blur-3xl" />
              <div className="relative bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl p-8 text-white shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-1">15+</div>
                    <div className="text-primary-100 text-sm">年专业经验</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-1">50+</div>
                    <div className="text-primary-100 text-sm">专业医师</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-1">8</div>
                    <div className="text-primary-100 text-sm">特色科室</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-1">24h</div>
                    <div className="text-primary-100 text-sm">急诊服务</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card p-5 text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">热门科室</h2>
              <p className="text-gray-500">选择您需要的科室，快速预约挂号</p>
            </div>
            <button
              onClick={() => navigate('/booking')}
              className="hidden md:flex items-center gap-1 text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              查看全部 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {hotDepartments.map((dept, index) => (
              <div
                key={dept.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate('/booking')}
              >
                <DepartmentCard department={dept} showHotBadge />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-primary-50/50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            关于我们
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">医院地址</h3>
              <p className="text-gray-600">北京市朝阳区建国路88号爱宠大厦1层</p>
            </div>
            <div className="card p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">营业时间</h3>
              <p className="text-gray-600">周一至周日 08:00-20:00</p>
              <p className="text-gray-600">24小时急诊服务</p>
            </div>
            <div className="card p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">联系电话</h3>
              <p className="text-gray-600">预约热线：400-888-8888</p>
              <p className="text-gray-600">急诊电话：400-888-9999</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
