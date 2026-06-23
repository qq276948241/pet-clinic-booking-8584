import { Calendar, Clock, User, PawPrint, Phone, X } from 'lucide-react';
import type { Appointment } from '@/types';
import { formatDateDisplay } from '@/utils/timeSlots';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel?: () => void;
}

const statusConfig = {
  pending: { label: '待就诊', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  completed: { label: '已完成', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  cancelled: { label: '已取消', color: 'bg-gray-100 text-gray-500', dot: 'bg-gray-400' },
};

export default function AppointmentCard({ appointment, onCancel }: AppointmentCardProps) {
  const status = statusConfig[appointment.status];

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${status.dot}`} />
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.color}`}>
            {status.label}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          {formatDateDisplay(appointment.date)}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <PawPrint className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">宠物信息</p>
            <p className="font-medium text-gray-800">
              {appointment.petName} · {appointment.petType}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">就诊信息</p>
            <p className="font-medium text-gray-800">
              {appointment.departmentName} · {appointment.doctorName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary-600" />
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs text-gray-500">就诊日期</p>
              <p className="font-medium text-gray-800">{appointment.date}</p>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-primary-500" />
              <span className="font-medium text-gray-800">{appointment.time}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Phone className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">联系方式</p>
            <p className="font-medium text-gray-800">
              {appointment.ownerName} · {appointment.ownerPhone}
            </p>
          </div>
        </div>
      </div>

      {appointment.status === 'pending' && onCancel && (
        <div className="mt-5 pt-4 border-t border-gray-100">
          <button
            onClick={onCancel}
            className="btn-danger w-full flex items-center justify-center gap-2 py-2.5"
          >
            <X className="w-4 h-4" />
            取消预约
          </button>
        </div>
      )}
    </div>
  );
}
