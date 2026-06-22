import { useState } from 'react';
import { Calendar, Clock, User, Phone, Stethoscope, X, AlertTriangle } from 'lucide-react';
import type { Appointment } from '@/types';
import { getDepartmentById, getDoctorById } from '@/data/mockData';
import { useBookingStore } from '@/store/useBookingStore';

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { cancelAppointment } = useBookingStore();

  const department = getDepartmentById(appointment.departmentId);
  const doctor = getDoctorById(appointment.doctorId);

  const statusConfig = {
    pending: { label: '待就诊', color: 'bg-blue-100 text-blue-600' },
    completed: { label: '已完成', color: 'bg-green-100 text-green-600' },
    cancelled: { label: '已取消', color: 'bg-gray-100 text-gray-500' },
  };

  const status = statusConfig[appointment.status];

  const handleCancel = () => {
    cancelAppointment(appointment.id);
    setShowCancelModal(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];
    return `${date.getMonth() + 1}月${date.getDate()}日 ${weekDay}`;
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-5 shadow-card">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${department?.color || '#38BDF8'}20`, color: department?.color || '#38BDF8' }}
            >
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{department?.name}</h3>
              <p className="text-sm text-gray-500">{doctor?.name} · {doctor?.title}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
            {status.label}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 text-primary-500" />
            {formatDate(appointment.date)}
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4 text-primary-500" />
            {appointment.time}
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-4 h-4 text-primary-500" />
            {appointment.petName} · {appointment.petType}
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="w-4 h-4 text-primary-500" />
            {appointment.phone}
          </div>
        </div>

        {appointment.notes && (
          <div className="mb-4 p-3 bg-gray-50 rounded-xl text-sm text-gray-600">
            <span className="text-gray-400">备注：</span>{appointment.notes}
          </div>
        )}

        {appointment.status === 'pending' && (
          <div className="flex justify-end">
            <button
              onClick={() => setShowCancelModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors"
            >
              <X className="w-4 h-4" />
              取消预约
            </button>
          </div>
        )}
      </div>

      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">确认取消预约</h3>
                <p className="text-sm text-gray-500">取消后将无法恢复</p>
              </div>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-xl text-sm">
              <div className="font-medium text-gray-700 mb-2">预约信息</div>
              <div className="text-gray-600 space-y-1">
                <div>科室：{department?.name}</div>
                <div>医生：{doctor?.name}</div>
                <div>时间：{formatDate(appointment.date)} {appointment.time}</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-3 px-4 rounded-xl text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium transition-colors"
              >
                再想想
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 py-3 px-4 rounded-xl text-white bg-red-500 hover:bg-red-600 font-medium transition-colors"
              >
                确认取消
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentCard;
