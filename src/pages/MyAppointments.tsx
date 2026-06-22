import { useState } from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { departments } from '@/data/departments';
import { getDoctorById } from '@/data/doctors';
import AppointmentCard from '@/components/AppointmentCard';
import { ClipboardList, CalendarCheck, XCircle, CheckCircle, CalendarX } from 'lucide-react';
import { Appointment } from '@/types';

type FilterType = 'all' | 'pending' | 'cancelled' | 'completed';

const filterConfig = [
  { key: 'all' as FilterType, label: '全部', icon: ClipboardList },
  { key: 'pending' as FilterType, label: '待就诊', icon: CalendarCheck },
  { key: 'completed' as FilterType, label: '已完成', icon: CheckCircle },
  { key: 'cancelled' as FilterType, label: '已取消', icon: XCircle },
];

export default function MyAppointments() {
  const { appointments, cancelAppointment } = useBookingStore();
  const [filter, setFilter] = useState<FilterType>('all');
  const [showCancelConfirm, setShowCancelConfirm] = useState<string | null>(null);

  const filteredAppointments = appointments
    .filter((apt) => {
      if (filter === 'all') return true;
      return apt.status === filter;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const getDepartment = (deptId: string) => {
    return departments.find((d) => d.id === deptId);
  };

  const handleCancelClick = (id: string) => {
    setShowCancelConfirm(id);
  };

  const confirmCancel = (id: string) => {
    cancelAppointment(id);
    setShowCancelConfirm(null);
  };

  const counts = {
    all: appointments.length,
    pending: appointments.filter((a) => a.status === 'pending').length,
    completed: appointments.filter((a) => a.status === 'completed').length,
    cancelled: appointments.filter((a) => a.status === 'cancelled').length,
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <ClipboardList className="w-8 h-8 text-primary-500" />
            我的预约
          </h1>
          <p className="text-gray-500">查看和管理您的预约记录</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {filterConfig.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                filter === item.key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-primary-50 border border-gray-200'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  filter === item.key ? 'bg-white/20' : 'bg-gray-100'
                }`}
              >
                {counts[item.key]}
              </span>
            </button>
          ))}
        </div>

        {filteredAppointments.length > 0 ? (
          <div className="space-y-4">
            {filteredAppointments.map((appointment: Appointment) => (
              <div key={appointment.id}>
                <AppointmentCard
                  appointment={appointment}
                  department={getDepartment(appointment.departmentId)}
                  doctor={getDoctorById(appointment.doctorId)}
                  onCancel={
                    appointment.status === 'pending'
                      ? () => handleCancelClick(appointment.id)
                      : undefined
                  }
                />

                {showCancelConfirm === appointment.id && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="card max-w-md w-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CalendarX className="w-6 h-6 text-red-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">确认取消预约？</h3>
                          <p className="text-sm text-gray-500">
                            {getDepartment(appointment.departmentId)?.name} - {getDoctorById(appointment.doctorId)?.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {appointment.date} {appointment.time}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-6 text-sm">
                        取消后如需再次就诊，请重新预约。确定要取消这个预约吗？
                      </p>
                      <div className="flex gap-3 justify-end">
                        <button
                          type="button"
                          onClick={() => setShowCancelConfirm(null)}
                          className="btn btn-outline"
                        >
                          再想想
                        </button>
                        <button
                          type="button"
                          onClick={() => confirmCancel(appointment.id)}
                          className="btn btn-danger"
                        >
                          确认取消
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-16">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarCheck className="w-10 h-10 text-primary-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">暂无预约记录</h3>
            <p className="text-gray-500 mb-6">您还没有任何预约，现在就去预约吧！</p>
            <a href="/booking" className="btn btn-primary">
              立即预约
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
