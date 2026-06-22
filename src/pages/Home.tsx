import { Link } from 'react-router-dom';
import { Heart, Shield, Clock, MapPin, Phone, Mail, PawPrint, CalendarCheck } from 'lucide-react';
import DepartmentCard from '@/components/DepartmentCard';
import { departments } from '@/data/departments';

export default function Home() {
  const features = [
    {
      icon: Heart,
      title: '专业医疗',
      description: '拥有10年以上临床经验的兽医团队',
    },
    {
      icon: Shield,
      title: '安全可靠',
      description: '先进的医疗设备和严格的消毒流程',
    },
    {
      icon: Clock,
      title: '24小时急诊',
      description: '全天候急诊服务，守护爱宠健康',
    },
  ];

  const hotDepartments = departments.slice(0, 6);

  return (
    <div className="pb-12">
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white py-16 sm:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <PawPrint className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              爱宠医院
            </h1>
            <p className="text-xl text-white/90 mb-8">
              专业、贴心、值得信赖的宠物健康守护者
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking" className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg">
                <CalendarCheck className="w-5 h-5 mr-2" />
                立即预约
              </Link>
              <a
                href="#contact"
                className="btn border-2 border-white text-white hover:bg-white/10 text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                联系我们
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 -mt-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">热门科室</h2>
            <p className="text-gray-500">为您的爱宠提供全方位的医疗服务</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotDepartments.map((dept) => (
              <DepartmentCard key={dept.id} department={dept} showLink />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/booking" className="btn btn-secondary">
              查看全部科室
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container">
          <div className="card max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">关于我们</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  爱宠医院成立于2010年，是一家致力于宠物健康医疗的专业机构。我们拥有一支由资深兽医组成的医疗团队，配备先进的医疗设备，为各类宠物提供全方位的医疗保健服务。
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  我们坚持"以宠物为中心"的服务理念，用专业的技术和真诚的爱心，为每一位毛孩子的健康保驾护航。多年来，我们已经为数以万计的宠物提供了优质的医疗服务，赢得了广大宠物主人的信赖和好评。
                </p>
                <p className="text-gray-600 leading-relaxed">
                  我们的使命是让每一只宠物都能享受到专业、温暖的医疗服务，让它们健康快乐地陪伴在主人身边。
                </p>
              </div>
              <div id="contact" className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">医院地址</h4>
                    <p className="text-gray-500">北京市朝阳区宠物街88号</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">联系电话</h4>
                    <p className="text-gray-500">400-888-8888</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">电子邮箱</h4>
                    <p className="text-gray-500">contact@aichong-pet.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">营业时间</h4>
                    <p className="text-gray-500">周一至周日 09:00-18:00</p>
                    <p className="text-gray-500">急诊 24小时</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
