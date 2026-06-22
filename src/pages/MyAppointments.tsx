import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, CalendarCheck, CalendarX, Plus } from 'lucide-react';
import AppointmentCard from '@/components/AppointmentCard';
import { useAppointmentStore } from '@/store/useAppointmentStore';
import { cn } from '@/lib/utils';

type FilterType = 'all' | 'pending' | 'completed' | 'cancelled';

const MyAppointments = () => {
  const navigate = useNavigate();
  const { appointments, cancelAppointment } = useAppointmentStore();
  const [filter, setFilter] = useState<FilterType>('all');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelId, setCancelId] = useState<string | null>(null);

  const filteredAppointments =
    filter === 'all'
      ? appointments
      : appointments.filter((apt) => apt.status === filter);

  const pendingCount = appointments.filter((a) => a.status === 'pending').length;
  const completedCount = appointments.filter(
    (a) => a.status === 'completed'
  ).length;
  const cancelledCount = appointments.filter(
    (a) => a.status === 'cancelled'
  ).length;

  const handleCancelClick = (id: string) => {
    setCancelId(id);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    if (cancelId) {
      cancelAppointment(cancelId);
    }
    setShowCancelModal(false);
    setCancelId(null);
  };

  const tabs = [
    { key: 'all', label: '全部', icon: CalendarDays, count: appointments.length },
    { key: 'pending', label: '待就诊', icon: CalendarCheck, count: pendingCount },
    { key: 'completed', label: '已完成', icon: CalendarCheck, count: completedCount },
    { key: 'cancelled', label: '已取消', icon: CalendarX, count: cancelledCount },
  ] as const;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">我的预约</h1>
          <p className="text-gray-500">
            共 {appointments.length} 条预约记录
          </p>
        </div>
        <button
          onClick={() => navigate('/appointment')}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          新增预约
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="card p-2 mb-6">
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as FilterType)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all',
                  filter === tab.key
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <IconComponent size={18} />
                <span>{tab.label}</span>
                <span
                  className={cn(
                    'px-2 py-0.5 rounded-full text-xs',
                    filter === tab.key
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-500'
                  )}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Appointment List */}
      {filteredAppointments.length > 0 ? (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onCancel={
                appointment.status === 'pending'
                  ? () => handleCancelClick(appointment.id)
                  : undefined
              }
            />
          ))}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <CalendarDays size={36} className="text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            暂无预约记录
          </h3>
          <p className="text-gray-400 mb-6">
            {filter === 'all'
              ? '还没有预约，快来预约吧'
              : `暂无${tabs.find((t) => t.key === filter)?.label}记录`}
          </p>
          <button
            onClick={() => navigate('/appointment')}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus size={18} />
            立即预约
          </button>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowCancelModal(false)}
          />
          <div className="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <CalendarX size={28} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
              确认取消预约？
            </h3>
            <p className="text-gray-500 text-center mb-6">
              取消后将无法恢复，您可以重新预约其他时间
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 btn-secondary"
              >
                再想想
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 bg-red-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:bg-red-600"
              >
                确认取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
