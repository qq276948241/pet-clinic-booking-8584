import { Calendar, Clock, User, X } from 'lucide-react';
import type { Appointment } from '@/types';
import { cn } from '@/lib/utils';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel?: () => void;
}

const statusConfig = {
  pending: {
    label: '待就诊',
    className: 'bg-yellow-100 text-yellow-700',
    dotClass: 'bg-yellow-500',
  },
  completed: {
    label: '已完成',
    className: 'bg-green-100 text-green-700',
    dotClass: 'bg-green-500',
  },
  cancelled: {
    label: '已取消',
    className: 'bg-gray-100 text-gray-500',
    dotClass: 'bg-gray-400',
  },
};

const AppointmentCard = ({ appointment, onCancel }: AppointmentCardProps) => {
  const status = statusConfig[appointment.status];

  return (
    <div className="card p-6 hover:shadow-card-hover transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-2xl">
            🐾
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
              {appointment.departmentName}
            </h3>
            <p className="text-sm text-gray-500">
              {appointment.doctorName} · {appointment.doctorTitle}
            </p>
          </div>
        </div>
        <span
          className={cn(
            'px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5',
            status.className
          )}
        >
          <span className={cn('w-1.5 h-1.5 rounded-full', status.dotClass)} />
          {status.label}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={16} className="text-primary-500" />
          <span>{appointment.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock size={16} className="text-primary-500" />
          <span>{appointment.timeSlot}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User size={16} className="text-primary-500" />
          <span>
            {appointment.petName}（{appointment.petType}）
          </span>
        </div>
      </div>

      {appointment.description && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">症状描述：</span>
            {appointment.description}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-400">
          预约时间：{new Date(appointment.createdAt).toLocaleDateString()}
        </span>

        {appointment.status === 'pending' && onCancel && (
          <button
            onClick={onCancel}
            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            <X size={16} />
            取消预约
          </button>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
