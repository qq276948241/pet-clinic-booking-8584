import { Calendar, Clock, User, X, Baby, UserRound, Phone } from 'lucide-react';
import type { Appointment, PetType } from '@/types';
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

const petEmoji: Record<PetType, string> = {
  '狗狗': '🐕',
  '猫咪': '🐈',
  '兔子': '🐰',
  '仓鼠': '🐹',
  '鸟类': '🐦',
  '其他': '🐾',
};

const AppointmentCard = ({ appointment, onCancel }: AppointmentCardProps) => {
  const status = statusConfig[appointment.status];

  return (
    <div className="card p-6 hover:shadow-card-hover transition-all">
      {/* Header: Dept + Doctor + Status */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-2xl">
            🏥
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

      {/* Pet Info Section */}
      <div className="bg-gradient-to-r from-primary-50/80 to-white rounded-xl p-4 mb-4 border border-primary-100/50">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-3xl shadow-sm flex-shrink-0">
            {petEmoji[appointment.petType]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h4 className="font-bold text-gray-800 text-lg">
                {appointment.petName}
              </h4>
              <span className="text-xs bg-white px-2 py-0.5 rounded-full text-primary-600 font-medium border border-primary-100">
                {appointment.petGender}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs bg-white px-2 py-0.5 rounded-full text-gray-600 border border-gray-100">
                {appointment.petType}
              </span>
              {appointment.petBreed && (
                <span className="text-xs bg-white px-2 py-0.5 rounded-full text-gray-600 border border-gray-100">
                  {appointment.petBreed}
                </span>
              )}
              {appointment.petAge && (
                <span className="text-xs bg-white px-2 py-0.5 rounded-full text-gray-600 border border-gray-100 flex items-center gap-1">
                  <Baby size={10} />
                  {appointment.petAge}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="space-y-2.5 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={16} className="text-primary-500 flex-shrink-0" />
          <span>{appointment.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock size={16} className="text-primary-500 flex-shrink-0" />
          <span>{appointment.timeSlot}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User size={16} className="text-primary-500 flex-shrink-0" />
          <span>{appointment.ownerName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone size={16} className="text-primary-500 flex-shrink-0" />
          <span>{appointment.phone}</span>
        </div>
      </div>

      {/* Description */}
      {appointment.description && (
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-2">
            <UserRound size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="font-medium text-gray-700">症状描述：</span>
              {appointment.description}
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-400">
          创建时间：{new Date(appointment.createdAt).toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>

        {appointment.status === 'pending' && onCancel && (
          <button
            onClick={onCancel}
            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors font-medium"
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
