import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, ChevronRight, ChevronLeft, CheckCircle2, AlertCircle, PawPrint } from 'lucide-react';
import { StepIndicator } from '../components/StepIndicator';
import { DepartmentCard } from '../components/DepartmentCard';
import { DoctorCard } from '../components/DoctorCard';
import { TimeSlotPicker } from '../components/TimeSlotPicker';
import { departments } from '../data/departments';
import { getDoctorsByDepartment, timeSlots } from '../data/doctors';
import { useAppointmentStore } from '../store/useAppointmentStore';
import type { Department, Doctor } from '../types';

const steps = ['选择科室', '选择医生', '选择时间', '填写信息'];
const petTypes = ['狗狗', '猫咪', '兔子', '仓鼠', '鸟类', '其他'];

export default function Booking() {
  const navigate = useNavigate();
  const { booking, setDepartment, setDoctor, setDate, setTimeSlot, addAppointment } =
    useAppointmentStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    petName: '',
    petType: '',
    ownerName: '',
    phone: '',
    description: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  useEffect(() => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    setAvailableDates(dates);
  }, []);

  useEffect(() => {
    if (booking.selectedDepartment) {
      setCurrentStep(Math.max(currentStep, 1));
    }
  }, [booking.selectedDepartment]);

  useEffect(() => {
    if (booking.selectedDoctor) {
      setCurrentStep(Math.max(currentStep, 2));
    }
  }, [booking.selectedDoctor]);

  useEffect(() => {
    if (booking.selectedDate && booking.selectedTimeSlot) {
      setCurrentStep(3);
    }
  }, [booking.selectedDate, booking.selectedTimeSlot]);

  const handleDepartmentSelect = (dept: Department) => {
    setDepartment(dept);
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setDoctor(doctor);
  };

  const handleDateSelect = (date: string) => {
    setDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setTimeSlot(time);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.petName.trim()) errors.petName = '请输入宠物姓名';
    if (!formData.petType) errors.petType = '请选择宠物类型';
    if (!formData.ownerName.trim()) errors.ownerName = '请输入您的姓名';
    if (!formData.phone.trim()) errors.phone = '请输入联系电话';
    else if (!/^1[3-9]\d{9}$/.test(formData.phone)) errors.phone = '请输入正确的手机号';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    addAppointment({
      departmentId: booking.selectedDepartment!.id,
      doctorId: booking.selectedDoctor!.id,
      date: booking.selectedDate!,
      timeSlot: booking.selectedTimeSlot!,
      ...formData,
    });

    setShowSuccess(true);
    setTimeout(() => {
      navigate('/my-appointments');
    }, 2000);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return {
      month: date.getMonth() + 1,
      day: date.getDate(),
      weekDay: weekDays[date.getDay()],
    };
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">选择就诊科室</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departments.map((dept) => (
                <DepartmentCard
                  key={dept.id}
                  department={dept}
                  selected={booking.selectedDepartment?.id === dept.id}
                  onClick={() => handleDepartmentSelect(dept)}
                />
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">选择主治医生</h2>
            <p className="text-gray-500 mb-6">
              当前科室：<span className="text-primary-600 font-medium">{booking.selectedDepartment?.name}</span>
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {getDoctorsByDepartment(booking.selectedDepartment!.id).map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  selected={booking.selectedDoctor?.id === doctor.id}
                  onClick={() => handleDoctorSelect(doctor)}
                />
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="animate-fade-in space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">选择就诊时间</h2>
              <p className="text-gray-500 mb-6">
                已选择：<span className="text-primary-600 font-medium">{booking.selectedDoctor?.name} 医生</span>
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-700 mb-4">
                <CalendarDays className="w-5 h-5 text-primary-500" />
                <h3 className="font-semibold">选择日期</h3>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {availableDates.map((date, index) => {
                  const { month, day, weekDay } = formatDate(date);
                  return (
                    <button
                      key={date}
                      onClick={() => handleDateSelect(date)}
                      style={{ animationDelay: `${index * 30}ms` }}
                      className={`p-3 rounded-xl text-center transition-all duration-300 animate-slide-up ${
                        booking.selectedDate === date
                          ? 'bg-primary-500 text-white shadow-lg ring-2 ring-primary-300'
                          : 'bg-white text-gray-700 border-2 border-primary-100 hover:border-primary-400 hover:bg-primary-50'
                      }`}
                    >
                      <p className="text-xs opacity-80">{month}月</p>
                      <p className="text-lg font-bold">{day}</p>
                      <p className="text-xs opacity-80">{weekDay}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {booking.selectedDate && (
              <TimeSlotPicker
                slots={timeSlots}
                selectedSlot={booking.selectedTimeSlot}
                onSelect={handleTimeSelect}
              />
            )}
          </div>
        );

      case 3:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">填写预约信息</h2>
            <p className="text-gray-500 mb-6">
              已选择：{booking.selectedDepartment?.name} · {booking.selectedDoctor?.name} ·{' '}
              {booking.selectedDate} {booking.selectedTimeSlot}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">宠物姓名 *</label>
                  <input
                    type="text"
                    value={formData.petName}
                    onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                    placeholder="请输入宠物姓名"
                    className={`input-field ${formErrors.petName ? 'border-red-400' : ''}`}
                  />
                  {formErrors.petName && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.petName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">宠物类型 *</label>
                  <select
                    value={formData.petType}
                    onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                    className={`input-field ${formErrors.petType ? 'border-red-400' : ''}`}
                  >
                    <option value="">请选择</option>
                    {petTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {formErrors.petType && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.petType}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">您的姓名 *</label>
                  <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    placeholder="请输入您的姓名"
                    className={`input-field ${formErrors.ownerName ? 'border-red-400' : ''}`}
                  />
                  {formErrors.ownerName && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.ownerName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">联系电话 *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="请输入手机号"
                    className={`input-field ${formErrors.phone ? 'border-red-400' : ''}`}
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">症状描述（选填）</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="请简要描述宠物的症状或就诊需求..."
                  rows={4}
                  className="input-field resize-none"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium">温馨提示</p>
                    <ul className="mt-1 space-y-1 text-amber-700">
                      <li>· 请提前15分钟到达医院，带好宠物相关病历资料</li>
                      <li>· 如需取消预约，请提前2小时操作</li>
                      <li>· 首次就诊请携带宠物疫苗本</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full text-lg">
                确认预约
              </button>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center animate-fade-in">
        <div className="card p-12 text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-500 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">预约成功！</h2>
          <p className="text-gray-600 mb-6">
            您的预约已提交成功，我们会在就诊前发送提醒短信。
          </p>
          <div className="flex items-center justify-center gap-2 text-primary-600">
            <PawPrint className="w-5 h-5" />
            <span>正在跳转到我的预约...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      <StepIndicator steps={steps} currentStep={currentStep} />

      <div className="card p-6 sm:p-8 mb-6">{renderStepContent()}</div>

      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            currentStep === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'btn-secondary'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          上一步
        </button>

        {currentStep < 3 && (
          <button
            onClick={handleNext}
            disabled={
              (currentStep === 0 && !booking.selectedDepartment) ||
              (currentStep === 1 && !booking.selectedDoctor) ||
              (currentStep === 2 && (!booking.selectedDate || !booking.selectedTimeSlot))
            }
            className={`flex items-center gap-2 ${
              (currentStep === 0 && !booking.selectedDepartment) ||
              (currentStep === 1 && !booking.selectedDoctor) ||
              (currentStep === 2 && (!booking.selectedDate || !booking.selectedTimeSlot))
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed px-6 py-3 rounded-xl font-medium'
                : 'btn-primary'
            }`}
          >
            下一步
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
