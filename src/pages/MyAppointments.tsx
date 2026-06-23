import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  X,
  Clock,
  UserRound,
  Stethoscope,
  PawPrint,
  AlertCircle,
  Inbox,
  Plus,
} from 'lucide-react';
import { useAppointmentStore } from '@/store/appointmentStore';
import { getDepartmentById, getDoctorById } from '@/data/mockData';

export default function MyAppointments() {
  const { appointments, cancelAppointment } = useAppointmentStore();
  const [cancelId, setCancelId] = useState<string | null>(null);

  const handleCancel = (id: string) => {
    cancelAppointment(id);
    setCancelId(null);
  };

  const statusConfig: Record<string, { label: string; color: string; bg: string; dot: string }> = {
    confirmed: { label: '待就诊', color: 'text-primary-600', bg: 'bg-primary-50', dot: 'bg-primary-400' },
    cancelled: { label: '已取消', color: 'text-gray-400', bg: 'bg-gray-100', dot: 'bg-gray-300' },
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return `${d.getMonth() + 1}月${d.getDate()}日 ${weekDays[d.getDay()]}`;
  };

  return (
    <div className="min-h-screen py-6">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-800">我的预约</h1>
            <p className="text-sm text-gray-400 mt-1">
              共 {appointments.length} 条预约记录
            </p>
          </div>
        </div>

        {appointments.length === 0 ? (
          <div className="card-base p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
              <Inbox className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="font-semibold text-gray-600 mb-1">暂无预约记录</h3>
            <p className="text-sm text-gray-400 mb-6">快去为您的爱宠预约一次健康检查吧</p>
            <Link
              to="/appointment"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-primary-500 text-white rounded-xl font-medium no-underline hover:bg-primary-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              去预约
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.map((apt) => {
              const dept = getDepartmentById(apt.departmentId);
              const doc = getDoctorById(apt.doctorId);
              const status = statusConfig[apt.status];
              return (
                <div key={apt.id} className="card-base overflow-hidden card-hover">
                  <div className="flex">
                    <div className={`w-1.5 shrink-0 ${apt.status === 'confirmed' ? 'bg-primary-400' : 'bg-gray-300'}`} />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${status.bg} ${status.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                            {status.label}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(apt.createdAt).toLocaleDateString('zh-CN')}
                          </span>
                        </div>
                        {apt.status === 'confirmed' && (
                          <button
                            onClick={() => setCancelId(apt.id)}
                            className="text-xs text-red-400 hover:text-red-500 font-medium flex items-center gap-1 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                            取消
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Stethoscope className="w-4 h-4 text-primary-400" />
                          <span className="text-gray-400">科室</span>
                          <span className="font-medium text-gray-700">{dept?.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <UserRound className="w-4 h-4 text-primary-400" />
                          <span className="text-gray-400">医生</span>
                          <span className="font-medium text-gray-700">{doc?.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarCheck className="w-4 h-4 text-primary-400" />
                          <span className="text-gray-400">日期</span>
                          <span className="font-medium text-gray-700">{formatDate(apt.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-primary-400" />
                          <span className="text-gray-400">时段</span>
                          <span className="font-medium text-gray-700">{apt.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <PawPrint className="w-4 h-4 text-primary-400" />
                          <span className="text-gray-400">宠物</span>
                          <span className="font-medium text-gray-700">{apt.petName}（{apt.petType}）</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {cancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div className="card-base p-6 max-w-sm w-full shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">确认取消预约</h3>
                <p className="text-xs text-gray-400 mt-0.5">取消后将无法恢复，请确认操作</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setCancelId(null)}
                className="flex-1 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                再想想
              </button>
              <button
                onClick={() => handleCancel(cancelId)}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
              >
                确认取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
