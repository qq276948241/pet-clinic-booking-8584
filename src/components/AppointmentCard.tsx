import { Appointment, Department, Doctor } from '@/types';
import { Calendar, Clock, User, Phone, PawPrint, X, FileText } from 'lucide-react';
import { getWeekday } from '@/utils/dateUtils';
import { cn } from '@/lib/utils';

interface AppointmentCardProps {
  appointment: Appointment;
  department?: Department;
  doctor?: Doctor;
  onCancel?: () => void;
}

const statusConfig = {
  pending: { label: '待就诊', color: 'bg-yellow-100 text-yellow-700' },
  cancelled: { label: '已取消', color: 'bg-gray-100 text-gray-500' },
  completed: { label: '已完成', color: 'bg-green-100 text-green-700' },
};

export default function AppointmentCard({
  appointment,
  department,
  doctor,
  onCancel,
}: AppointmentCardProps) {
  const status = statusConfig[appointment.status];

  return (
    <div className="card relative">
      <div className="absolute top-4 right-4">
        <span className={cn('px-3 py-1 rounded-full text-xs font-medium', status.color)}>
          {status.label}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              {department?.name || '科室信息'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-4 h-4 text-primary-500" />
              <span>医生：{doctor?.name || '未知'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4 text-primary-500" />
              <span>
                日期：{appointment.date} {getWeekday(appointment.date)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4 text-primary-500" />
              <span>时间：{appointment.time}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <PawPrint className="w-4 h-4 text-primary-500" />
              <span>
                宠物：{appointment.petName} ({appointment.petType}{appointment.petBreed ? ` · ${appointment.petBreed}` : ''})
              </span>
            </div>
            {appointment.petAge && (
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4 text-primary-500" />
                <span>年龄：{appointment.petAge}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4 text-primary-500" />
              <span>联系人：{appointment.ownerName} {appointment.phone}</span>
            </div>
          </div>
          {appointment.symptoms && (
            <div className="mt-3 flex items-start gap-2 text-sm text-gray-600">
              <FileText className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
              <span>症状：{appointment.symptoms}</span>
            </div>
          )}
        </div>

        {appointment.status === 'pending' && onCancel && (
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-danger gap-2"
            >
              <X className="w-4 h-4" />
              取消预约
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
