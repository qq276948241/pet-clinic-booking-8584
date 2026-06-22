import { Calendar, Clock, User, Phone, PawPrint, X } from 'lucide-react';
import type { Appointment } from '../types';
import { departments } from '../data/departments';
import { doctors } from '../data/doctors';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel?: () => void;
  showCancel?: boolean;
}

const statusConfig = {
  pending: { label: '待就诊', className: 'status-pending' },
  completed: { label: '已完成', className: 'status-completed' },
  cancelled: { label: '已取消', className: 'status-cancelled' },
};

export function AppointmentCard({ appointment, onCancel, showCancel }: AppointmentCardProps) {
  const department = departments.find((d) => d.id === appointment.departmentId);
  const doctor = doctors.find((d) => d.id === appointment.doctorId);
  const status = statusConfig[appointment.status];

  return (
    <div className="card p-6 animate-slide-up">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-md">
            <PawPrint className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{appointment.petName}</h3>
            <p className="text-sm text-gray-500">{appointment.petType}</p>
          </div>
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${status.className}`}>
          {status.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-primary-500" />
          <span>{appointment.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4 text-primary-500" />
          <span>{appointment.timeSlot}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="w-4 h-4 text-primary-500" />
          <span>{doctor?.name} - {department?.name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone className="w-4 h-4 text-primary-500" />
          <span>{appointment.phone}</span>
        </div>
      </div>

      {appointment.description && (
        <div className="bg-primary-50 rounded-xl p-3 mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">症状描述：</span>
            {appointment.description}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          提交时间：{new Date(appointment.createdAt).toLocaleString('zh-CN')}
        </p>
        {showCancel && appointment.status === 'pending' && (
          <button onClick={onCancel} className="btn-danger text-sm flex items-center gap-1">
            <X className="w-4 h-4" />
            取消预约
          </button>
        )}
      </div>
    </div>
  );
}
