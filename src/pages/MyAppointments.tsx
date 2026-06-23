import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ClipboardList, AlertCircle, CalendarPlus } from 'lucide-react';
import AppointmentCard from '@/components/AppointmentCard';
import { useBookingStore } from '@/store/useBookingStore';
import type { Appointment } from '@/types';

export default function MyAppointments() {
  const navigate = useNavigate();
  const { appointments, cancelAppointment, updateAppointmentStatuses } = useBookingStore();
  const [showCancelConfirm, setShowCancelConfirm] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    updateAppointmentStatuses();
  }, [updateAppointmentStatuses]);

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  const handleCancelClick = (id: string) => {
    setShowCancelConfirm(id);
  };

  const confirmCancel = (id: string) => {
    cancelAppointment(id);
    setShowCancelConfirm(null);
  };

  const stats = {
    all: appointments.length,
    pending: appointments.filter((a) => a.status === 'pending').length,
    completed: appointments.filter((a) => a.status === 'completed').length,
    cancelled: appointments.filter((a) => a.status === 'cancelled').length,
  };

  const renderCancelModal = () => {
    if (!showCancelConfirm) return null;

    const appointment = appointments.find((a) => a.id === showCancelConfirm);
    if (!appointment) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-bounce-subtle">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 text-center mb-2">确认取消预约？</h3>
          <p className="text-gray-500 text-center text-sm mb-6">
            您确定要取消 {appointment.date} {appointment.time} 的
            {appointment.departmentName}预约吗？
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowCancelConfirm(null)}
              className="btn-secondary flex-1 py-2.5"
            >
              再想想
            </button>
            <button
              onClick={() => confirmCancel(appointment.id)}
              className="btn-danger flex-1 py-2.5"
            >
              确认取消
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-8 animate-fade-in">
      {renderCancelModal()}

      <div className="container max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">我的预约</h1>
          <p className="text-gray-500">查看和管理您的预约记录</p>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { key: 'all', label: '全部', count: stats.all },
            { key: 'pending', label: '待就诊', count: stats.pending },
            { key: 'completed', label: '已完成', count: stats.completed },
            { key: 'cancelled', label: '已取消', count: stats.cancelled },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key as typeof filter)}
              className={`card p-4 text-center transition-all ${
                filter === item.key
                  ? 'border-primary-500 bg-primary-50'
                  : 'hover:border-primary-200'
              }`}
            >
              <div
                className={`text-2xl font-bold mb-1 ${
                  filter === item.key ? 'text-primary-600' : 'text-gray-800'
                }`}
              >
                {item.count}
              </div>
              <div
                className={`text-sm ${
                  filter === item.key ? 'text-primary-600' : 'text-gray-500'
                }`}
              >
                {item.label}
              </div>
            </button>
          ))}
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">暂无预约记录</h3>
            <p className="text-gray-500 mb-6">
              {filter === 'all' ? '您还没有任何预约记录' : `暂无${filter === 'pending' ? '待就诊' : filter === 'completed' ? '已完成' : '已取消'}的预约`}
            </p>
            <button
              onClick={() => navigate('/booking')}
              className="btn-primary inline-flex items-center gap-2"
            >
              <CalendarPlus className="w-5 h-5" />
              立即预约
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((apt: Appointment) => (
              <AppointmentCard
                key={apt.id}
                appointment={apt}
                onCancel={apt.status === 'pending' ? () => handleCancelClick(apt.id) : undefined}
              />
            ))}
          </div>
        )}

        {appointments.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/booking')}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              新增预约
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
