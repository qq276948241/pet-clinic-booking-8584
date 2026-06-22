import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Calendar,
  Clock,
  User,
  Phone,
  PawPrint,
  FileText,
} from 'lucide-react';
import { departments, doctors, generateTimeSlots, generateNextDays } from '@/data/mockData';
import { useAppointmentStore } from '@/store/useAppointmentStore';
import type { AppointmentForm } from '@/types';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, name: '选择科室' },
  { id: 2, name: '选择医生' },
  { id: 3, name: '选择时间' },
  { id: 4, name: '填写信息' },
  { id: 5, name: '预约完成' },
];

const petTypes = ['狗狗', '猫咪', '兔子', '仓鼠', '其他'];

const Appointment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const addAppointment = useAppointmentStore((state) => state.addAppointment);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AppointmentForm>({
    departmentId: '',
    departmentName: '',
    doctorId: '',
    doctorName: '',
    doctorTitle: '',
    date: '',
    timeSlot: '',
    petName: '',
    petType: '狗狗',
    ownerName: '',
    phone: '',
    description: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const timeSlots = generateTimeSlots();
  const nextDays = generateNextDays(7);

  const selectedDepartment = departments.find(
    (d) => d.id === formData.departmentId
  );
  const selectedDoctor = doctors.find((d) => d.id === formData.doctorId);
  const filteredDoctors = doctors.filter(
    (d) => d.departmentId === formData.departmentId
  );
  const selectedDateInfo = nextDays.find((d) => d.date === formData.date);

  useEffect(() => {
    const deptId = searchParams.get('department');
    if (deptId) {
      const dept = departments.find((d) => d.id === deptId);
      if (dept) {
        setFormData((prev) => ({
          ...prev,
          departmentId: deptId,
          departmentName: dept.name,
        }));
        setCurrentStep(2);
      }
    }
  }, [searchParams]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.departmentId;
      case 2:
        return formData.doctorId;
      case 3:
        return formData.date && formData.timeSlot;
      case 4:
        return (
          formData.petName &&
          formData.petType &&
          formData.ownerName &&
          formData.phone
        );
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    if (!selectedDepartment || !selectedDoctor) return;

    addAppointment({
      ...formData,
      departmentName: selectedDepartment.name,
      doctorName: selectedDoctor.name,
      doctorTitle: selectedDoctor.title,
    });

    setCurrentStep(5);
    setShowSuccess(true);
  };

  const handleViewAppointments = () => {
    navigate('/my-appointments');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">预约挂号</h1>
        <p className="text-gray-500">简单几步，轻松完成预约</p>
      </div>

      {/* Step Indicator */}
      <div className="card p-6 mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all',
                    currentStep > step.id
                      ? 'bg-primary-500 text-white'
                      : currentStep === step.id
                      ? 'bg-primary-500 text-white ring-4 ring-primary-100'
                      : 'bg-gray-100 text-gray-400'
                  )}
                >
                  {currentStep > step.id ? <Check size={18} /> : step.id}
                </div>
                <span
                  className={cn(
                    'text-xs mt-2 font-medium',
                    currentStep >= step.id ? 'text-primary-600' : 'text-gray-400'
                  )}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'w-16 md:w-24 h-0.5 mx-2 -mt-6 transition-all',
                    currentStep > step.id ? 'bg-primary-500' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      {!showSuccess ? (
        <div className="card p-8">
          {/* Step 1: Department */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                请选择就诊科室
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {departments.map((dept) => (
                  <div
                    key={dept.id}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        departmentId: dept.id,
                        departmentName: dept.name,
                      }))
                    }
                    className={cn(
                      'p-4 rounded-xl border-2 cursor-pointer transition-all text-center',
                      formData.departmentId === dept.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-100 hover:border-primary-200 hover:bg-primary-50/50'
                    )}
                  >
                    <div className="text-3xl mb-2">
                      {dept.id === '1' && '🩺'}
                      {dept.id === '2' && '✂️'}
                      {dept.id === '3' && '✨'}
                      {dept.id === '4' && '🦷'}
                      {dept.id === '5' && '👁️'}
                      {dept.id === '6' && '🦴'}
                      {dept.id === '7' && '❤️'}
                      {dept.id === '8' && '🔬'}
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {dept.name}
                    </h3>
                    {dept.isHot && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-red-100 text-red-600 rounded-full">
                        热门
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Doctor */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                请选择医生
              </h2>
              <p className="text-gray-500 mb-6">
                当前科室：
                <span className="text-primary-600 font-medium">
                  {selectedDepartment?.name}
                </span>
              </p>
              <div className="space-y-4">
                {filteredDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        doctorId: doctor.id,
                        doctorName: doctor.name,
                        doctorTitle: doctor.title,
                      }))
                    }
                    className={cn(
                      'p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4',
                      formData.doctorId === doctor.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-100 hover:border-primary-200'
                    )}
                  >
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-3xl flex-shrink-0">
                      {doctor.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-800">
                          {doctor.name}
                        </h3>
                        <span className="text-sm text-primary-600 bg-primary-100 px-2 py-0.5 rounded-full">
                          {doctor.title}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {doctor.experience}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {doctor.specialties.map((spec, idx) => (
                          <span
                            key={idx}
                            className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div
                      className={cn(
                        'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                        formData.doctorId === doctor.id
                          ? 'border-primary-500 bg-primary-500 text-white'
                          : 'border-gray-300'
                      )}
                    >
                      {formData.doctorId === doctor.id && <Check size={14} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Date & Time */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                请选择预约时间
              </h2>

              {/* Date Selection */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center gap-2">
                  <Calendar size={16} />
                  选择日期
                </h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {nextDays.map((day) => (
                    <button
                      key={day.id}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, date: day.date }))
                      }
                      className={cn(
                        'flex-shrink-0 w-20 py-3 rounded-xl text-center transition-all',
                        formData.date === day.date
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-50 text-gray-600 hover:bg-primary-50'
                      )}
                    >
                      <div className="text-sm font-medium">
                        {day.isToday ? '今天' : day.weekDay}
                      </div>
                      <div className="text-lg font-bold">{day.displayDate}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center gap-2">
                  <Clock size={16} />
                  选择时段
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      disabled={!slot.available || !formData.date}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          timeSlot: slot.time,
                        }))
                      }
                      className={cn(
                        'py-3 rounded-xl font-medium transition-all',
                        !slot.available || !formData.date
                          ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                          : formData.timeSlot === slot.time
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                      )}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Form */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                请填写预约信息
              </h2>

              {/* Summary */}
              <div className="bg-primary-50 rounded-xl p-4 mb-6">
                <h3 className="text-sm font-medium text-primary-700 mb-2">
                  预约信息
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    科室：<span className="font-medium">{selectedDepartment?.name}</span>
                  </p>
                  <p>
                    医生：<span className="font-medium">{selectedDoctor?.name}</span>（{selectedDoctor?.title}）
                  </p>
                  <p>
                    时间：
                    <span className="font-medium">
                      {selectedDateInfo?.displayDate} {selectedDateInfo?.weekDay} {formData.timeSlot}
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <PawPrint size={16} />
                    宠物名字
                  </label>
                  <input
                    type="text"
                    value={formData.petName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        petName: e.target.value,
                      }))
                    }
                    className="input-field"
                    placeholder="请输入宠物名字"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <PawPrint size={16} />
                    宠物类型
                  </label>
                  <select
                    value={formData.petType}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        petType: e.target.value,
                      }))
                    }
                    className="input-field"
                  >
                    {petTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <User size={16} />
                    主人姓名
                  </label>
                  <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        ownerName: e.target.value,
                      }))
                    }
                    className="input-field"
                    placeholder="请输入您的姓名"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Phone size={16} />
                    联系电话
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="input-field"
                    placeholder="请输入联系电话"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FileText size={16} />
                    症状描述（选填）
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="input-field min-h-[100px] resize-none"
                    placeholder="请简要描述宠物的症状或就诊原因"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 5 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={cn(
                  'btn-secondary flex items-center gap-2',
                  currentStep === 1 && 'opacity-50 cursor-not-allowed'
                )}
              >
                <ChevronLeft size={18} />
                上一步
              </button>

              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={cn(
                    'btn-primary flex items-center gap-2',
                    !canProceed() && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  下一步
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  className={cn(
                    'btn-primary flex items-center gap-2',
                    !canProceed() && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  提交预约
                  <Check size={18} />
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        // Success Screen
        <div className="card p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <Check size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            预约成功！
          </h2>
          <p className="text-gray-500 mb-8">
            我们已收到您的预约，请按时到院就诊
          </p>

          <div className="bg-gray-50 rounded-xl p-6 text-left max-w-sm mx-auto mb-8">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">科室</span>
                <span className="font-medium text-gray-800">
                  {selectedDepartment?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">医生</span>
                <span className="font-medium text-gray-800">
                  {selectedDoctor?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">时间</span>
                <span className="font-medium text-gray-800">
                  {selectedDateInfo?.displayDate} {formData.timeSlot}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">宠物</span>
                <span className="font-medium text-gray-800">
                  {formData.petName}（{formData.petType}）
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button onClick={handleViewAppointments} className="btn-primary">
              查看我的预约
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn-secondary"
            >
              返回首页
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
