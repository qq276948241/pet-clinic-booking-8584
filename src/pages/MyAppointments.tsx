import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, ClipboardList, AlertTriangle, ArrowRight } from 'lucide-react';
import { AppointmentCard } from '../components/AppointmentCard';
import { useAppointmentStore } from '../store/useAppointmentStore';

type FilterType = 'all' | 'pending' | 'completed' | 'cancelled';

export default function MyAppointments() {
  const navigate = useNavigate();
  const { appointments, loadAppointments, cancelAppointment } = useAppointmentStore();
  const [filter, setFilter] = useState<FilterType>('all');
  const [showCancelModal, setShowCancelModal] = useState<string | null>(null);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  const handleCancelClick = (id: string) => {
    setShowCancelModal(id);
  };

  const handleConfirmCancel = () => {
    if (showCancelModal) {
      cancelAppointment(showCancelModal);
      setShowCancelModal(null);
    }
  };

  const filterConfig = [
    { key: 'all', label: '全部', count: appointments.length },
    { key: 'pending', label: '待就诊', count: appointments.filter(a => a.status === 'pending').length },
    { key: 'completed', label: '已完成', count: appointments.filter(a => a.status === 'completed').length },
    { key: 'cancelled', label: '已取消', count: appointments.filter(a => a.status === 'cancelled').length },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
          <ClipboardList className="w-4 h-4" />
          <span>我的预约</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">预约记录</h1>
        <p className="text-gray-600">查看和管理您的所有预约</p>
      </div>

      <div className="card p-2 mb-6 flex flex-wrap gap-2">
        {filterConfig.map((item) => (
          <button
            key={item.key}
            onClick={() => setFilter(item.key as FilterType)}
            className={`flex-1 min-w-[80px] px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
              filter === item.key
                ? 'bg-primary-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-primary-50'
            }`}
          >
            {item.label}
            <span className="ml-1 opacity-75">({item.count})</span>
          </button>
        ))}
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center">
            <CalendarDays className="w-10 h-10 text-primary-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {filter === 'all' ? '暂无预约记录' : `暂无${filterConfig.find(f => f.key === filter)?.label}记录`}
          </h3>
          <p className="text-gray-500 mb-6">
            {filter === 'all'
              ? '您还没有任何预约，立即预约为您的爱宠保驾护航'
              : '当前筛选条件下没有记录'}
          </p>
          {filter === 'all' && (
            <button
              onClick={() => navigate('/booking')}
              className="btn-primary inline-flex items-center gap-2"
            >
              立即预约
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((apt, index) => (
            <div key={apt.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <AppointmentCard
                appointment={apt}
                showCancel={true}
                onCancel={() => handleCancelClick(apt.id)}
              />
            </div>
          ))}
        </div>
      )}

      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
          <div className="card p-6 max-w-md w-full animate-slide-up">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">确认取消预约？</h3>
                <p className="text-sm text-gray-500">取消后将无法恢复</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6 text-sm">
              如需取消预约，建议提前2小时操作，以便我们将号源释放给其他需要的宠主。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(null)}
                className="btn-secondary flex-1"
              >
                再想想
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 bg-red-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:bg-red-600 hover:shadow-lg active:scale-95"
              >
                确认取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
