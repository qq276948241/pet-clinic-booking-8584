import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, Clock, Inbox, Plus, Filter } from 'lucide-react';
import { useBookingStore } from '@/store/useBookingStore';
import AppointmentCard from '@/components/AppointmentCard';

type FilterType = 'all' | 'pending' | 'completed' | 'cancelled';

const MyAppointments = () => {
  const navigate = useNavigate();
  const { appointments } = useBookingStore();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredAppointments = useMemo(() => {
    if (filter === 'all') return appointments;
    return appointments.filter(a => a.status === filter);
  }, [appointments, filter]);

  const stats = useMemo(() => {
    return {
      all: appointments.length,
      pending: appointments.filter(a => a.status === 'pending').length,
      completed: appointments.filter(a => a.status === 'completed').length,
      cancelled: appointments.filter(a => a.status === 'cancelled').length,
    };
  }, [appointments]);

  const filterTabs: { key: FilterType; label: string }[] = [
    { key: 'all', label: '全部' },
    { key: 'pending', label: '待就诊' },
    { key: 'completed', label: '已完成' },
    { key: 'cancelled', label: '已取消' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/50 to-white py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-800">我的预约</h1>
            <button
              onClick={() => navigate('/booking')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 transition-all"
            >
              <Plus className="w-5 h-5" />
              新增预约
            </button>
          </div>
          <p className="text-gray-500">查看和管理您的预约记录</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <CalendarCheck className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.all}</div>
                <div className="text-xs text-gray-500">全部预约</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.pending}</div>
                <div className="text-xs text-gray-500">待就诊</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <CalendarCheck className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.completed}</div>
                <div className="text-xs text-gray-500">已完成</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <CalendarCheck className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.cancelled}</div>
                <div className="text-xs text-gray-500">已取消</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">筛选</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === tab.key
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
                <span className="ml-1 opacity-70">({stats[tab.key]})</span>
              </button>
            ))}
          </div>
        </div>

        {filteredAppointments.length > 0 ? (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-card p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Inbox className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {filter === 'all' ? '暂无预约记录' : `暂无${filterTabs.find(t => t.key === filter)?.label}的预约`}
            </h3>
            <p className="text-gray-500 mb-6">
              {filter === 'all' ? '立即为您的爱宠预约专业的医疗服务吧' : '可以看看其他状态的预约记录'}
            </p>
            {filter === 'all' && (
              <button
                onClick={() => navigate('/booking')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 transition-all"
              >
                <Plus className="w-5 h-5" />
                立即预约
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
