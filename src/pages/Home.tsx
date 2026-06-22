import { useNavigate } from 'react-router-dom';
import { PawPrint, Heart, Shield, Clock, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { DepartmentCard } from '../components/DepartmentCard';
import { departments } from '../data/departments';
import { useAppointmentStore } from '../store/useAppointmentStore';
import type { Department } from '../types';

export default function Home() {
  const navigate = useNavigate();
  const setDepartment = useAppointmentStore((state) => state.setDepartment);

  const handleDepartmentClick = (department: Department) => {
    setDepartment(department);
    navigate('/booking');
  };

  const features = [
    { icon: Shield, title: '专业医疗团队', desc: '10年以上经验兽医坐诊' },
    { icon: Clock, title: '24小时急诊', desc: '全天候守护爱宠健康' },
    { icon: Heart, title: '贴心服务', desc: '一对一专属诊疗服务' },
    { icon: Star, title: '先进设备', desc: '进口医疗设备精准诊断' },
  ];

  return (
    <div className="min-h-screen animate-fade-in">
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-primary-50 to-white" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary-200 rounded-full blur-3xl opacity-50 animate-float" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary-300 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                <PawPrint className="w-4 h-4" />
                <span>专业宠物医院 · 值得信赖</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                用心呵护
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">
                  每一位毛孩子
                </span>
                <br />的健康
              </h1>

              <p className="text-lg text-gray-600 max-w-lg">
                我们拥有专业的兽医团队和先进的医疗设备，为您的爱宠提供全方位、高品质的医疗保健服务。在线预约，省时省心。
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/booking')}
                  className="btn-primary flex items-center gap-2 text-lg"
                >
                  立即预约
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate('/my-appointments')}
                  className="btn-secondary flex items-center gap-2"
                >
                  查看预约
                </button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-primary-300 to-primary-500 flex items-center justify-center text-white text-sm font-medium shadow-md"
                    >
                      {['🐱', '🐶', '🐰', '🐦'][i - 1]}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">10000+ 宠物家庭的选择</p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">4.9 好评</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative z-10">
                <img
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20veterinary%20clinic%20interior%20with%20bright%20lighting%20and%20clean%20white%20walls&image_size=landscape_16_9"
                  alt="宠物医院"
                  className="w-full h-[400px] object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-primary-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">今日可预约</p>
                      <p className="text-sm text-gray-500">还有 12 个号源</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-primary-50 border border-primary-100 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-md">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">热门科室</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              选择您需要的科室，我们的专业医生将为您的爱宠提供最优质的诊疗服务
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <div key={dept.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <DepartmentCard
                  department={dept}
                  onClick={() => handleDepartmentClick(dept)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <img
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=veterinarian%20examining%20a%20cute%20dog%20in%20modern%20clinic&image_size=landscape_16_9"
                alt="医院环境"
                className="w-full h-[400px] object-cover rounded-3xl shadow-xl"
              />
            </div>
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">关于我们</h2>
              <p className="text-gray-600 leading-relaxed">
                爱心宠物医院成立于2010年，是一家集医疗、预防、保健、康复为一体的综合性宠物医院。
                我们始终秉承"专业、关爱、守护"的服务理念，为每一位毛孩子提供最优质的医疗服务。
              </p>
              <p className="text-gray-600 leading-relaxed">
                医院配备了先进的诊疗设备，包括数字化X光机、彩色超声诊断仪、全自动生化分析仪等，
                能够开展内科、外科、皮肤科、眼科、牙科等多个专科的诊疗服务。
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-4 bg-primary-50 rounded-xl">
                  <p className="text-3xl font-bold text-primary-600">15+</p>
                  <p className="text-sm text-gray-500">专业医师</p>
                </div>
                <div className="text-center p-4 bg-primary-50 rounded-xl">
                  <p className="text-3xl font-bold text-primary-600">10000+</p>
                  <p className="text-sm text-gray-500">服务案例</p>
                </div>
                <div className="text-center p-4 bg-primary-50 rounded-xl">
                  <p className="text-3xl font-bold text-primary-600">13</p>
                  <p className="text-sm text-gray-500">年服务经验</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <PawPrint className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">爱心宠物医院</h3>
                  <p className="text-gray-400 text-sm">专业·关爱·守护</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                24小时服务热线：400-888-8888<br />
                地址：北京市朝阳区宠物大街123号
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">服务项目</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>疾病诊疗</li>
                <li>疫苗接种</li>
                <li>体检保健</li>
                <li>宠物美容</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">营业时间</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>周一至周五：08:00 - 20:00</li>
                <li>周六周日：09:00 - 18:00</li>
                <li>24小时急诊服务</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
            © 2024 爱心宠物医院 版权所有
          </div>
        </div>
      </footer>
    </div>
  );
}
