import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Calendar as CalendarIcon, PawPrint, User, Phone } from 'lucide-react';
import StepIndicator from '@/components/StepIndicator';
import DepartmentCard from '@/components/DepartmentCard';
import DoctorCard from '@/components/DoctorCard';
import TimeSlotCard from '@/components/TimeSlotCard';
import { useBookingStore } from '@/store/useBookingStore';
import { departments } from '@/data/departments';
import { doctors } from '@/data/doctors';
import { generateTimeSlots, formatDateDisplay, getUpcomingDates } from '@/utils/timeSlots';
import type { TimeSlot, BookingFormData } from '@/types';

export default function Booking() {
  const navigate = useNavigate();
  const {
    currentStep,
    selectedDepartment,
    selectedDoctor,
    selectedTimeSlot,
    formData,
    lastAppointment,
    selectDepartment,
    selectDoctor,
    selectTimeSlot,
    setFormData,
    submitAppointment,
    resetBooking,
    setCurrentStep,
  } = useBookingStore();

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [formErrors, setFormErrors] = useState<Partial<BookingFormData>>({});

  useEffect(() => {
    const slots = generateTimeSlots(7);
    setTimeSlots(slots);
    const dates = getUpcomingDates(7);
    if (dates.length > 0 && !selectedDate) {
      setSelectedDate(dates[0]);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (currentStep === 'success') {
        resetBooking();
      }
    };
  }, []);

  const filteredDoctors = useMemo(() => {
    if (!selectedDepartment) return [];
    return doctors.filter((d) => d.departmentId === selectedDepartment.id);
  }, [selectedDepartment]);

  const filteredTimeSlots = useMemo(() => {
    return timeSlots.filter((slot) => slot.date === selectedDate);
  }, [timeSlots, selectedDate]);

  const upcomingDates = getUpcomingDates(7);

  const validateForm = (): boolean => {
    const errors: Partial<BookingFormData> = {};
    if (!formData.petName.trim()) errors.petName = '请输入宠物名称';
    if (!formData.petType.trim()) errors.petType = '请输入宠物品类';
    if (!formData.ownerName.trim()) errors.ownerName = '请输入您的姓名';
    if (!formData.ownerPhone.trim()) {
      errors.ownerPhone = '请输入联系电话';
    } else if (!/^1[3-9]\d{9}$/.test(formData.ownerPhone)) {
      errors.ownerPhone = '请输入正确的手机号码';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      submitAppointment();
    }
  };

  const handleGoBack = () => {
    if (currentStep === 'doctor') {
      setCurrentStep('department');
    } else if (currentStep === 'time') {
      setCurrentStep('doctor');
    } else if (currentStep === 'info') {
      setCurrentStep('time');
    } else {
      navigate('/');
    }
  };

  if (currentStep === 'success' && lastAppointment) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center animate-fade-in">
          <div className="card p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">预约成功！</h2>
            <p className="text-gray-500 mb-6">我们已收到您的预约信息，请按时就诊</p>

            <div className="bg-primary-50 rounded-xl p-4 mb-6 text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">预约编号</span>
                <span className="font-medium text-gray-800">{lastAppointment.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">就诊科室</span>
                <span className="font-medium text-gray-800">{lastAppointment.departmentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">主治医生</span>
                <span className="font-medium text-gray-800">{lastAppointment.doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">就诊时间</span>
                <span className="font-medium text-gray-800">
                  {lastAppointment.date} {lastAppointment.time}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => navigate('/')} className="btn-secondary flex-1">
                返回首页
              </button>
              <button
                onClick={() => {
                  resetBooking();
                  navigate('/my-appointments');
                }}
                className="btn-primary flex-1"
              >
                查看预约
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 animate-fade-in">
      <div className="container max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          {currentStep !== 'department' && (
            <button
              onClick={handleGoBack}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">预约挂号</h1>
            <p className="text-gray-500 text-sm">请按步骤完成预约</p>
          </div>
        </div>

        <StepIndicator currentStep={currentStep} />

        <div className="animate-slide-up">
          {currentStep === 'department' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">选择就诊科室</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {departments.map((dept) => (
                  <DepartmentCard
                    key={dept.id}
                    department={dept}
                    selected={selectedDepartment?.id === dept.id}
                    onClick={() => selectDepartment(dept)}
                  />
                ))}
              </div>
            </div>
          )}

          {currentStep === 'doctor' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedDepartment?.name}
                </span>
                <h2 className="text-lg font-semibold text-gray-800">选择医生</h2>
              </div>
              <div className="space-y-4">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    selected={selectedDoctor?.id === doctor.id}
                    onClick={() => selectDoctor(doctor)}
                  />
                ))}
              </div>
            </div>
          )}

          {currentStep === 'time' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">选择就诊时间</h2>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-3">选择日期</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {upcomingDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`flex-shrink-0 px-4 py-3 rounded-xl border-2 transition-all ${
                        selectedDate === date
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-100 bg-white hover:border-primary-200'
                      }`}
                    >
                      <div className="text-xs font-medium">{formatDateDisplay(date)}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-3">选择时间段</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {filteredTimeSlots.map((slot) => (
                    <TimeSlotCard
                      key={slot.id}
                      slot={slot}
                      selected={selectedTimeSlot?.id === slot.id}
                      onClick={() => slot.available && selectTimeSlot(slot)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 'info' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-6">填写预约信息</h2>

              <div className="bg-primary-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-primary-700 font-medium mb-1">预约信息确认</p>
                <p className="text-gray-600">
                  {selectedDepartment?.name} · {selectedDoctor?.name} · {selectedTimeSlot?.date}{' '}
                  {selectedTimeSlot?.time}
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <PawPrint className="w-4 h-4 text-primary-500" />
                    宠物名称
                  </label>
                  <input
                    type="text"
                    value={formData.petName}
                    onChange={(e) => setFormData({ petName: e.target.value })}
                    placeholder="请输入宠物名称"
                    className={`input-field ${formErrors.petName ? 'border-red-300' : ''}`}
                  />
                  {formErrors.petName && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.petName}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <PawPrint className="w-4 h-4 text-primary-500" />
                    宠物品类
                  </label>
                  <input
                    type="text"
                    value={formData.petType}
                    onChange={(e) => setFormData({ petType: e.target.value })}
                    placeholder="如：金毛犬、英短猫等"
                    className={`input-field ${formErrors.petType ? 'border-red-300' : ''}`}
                  />
                  {formErrors.petType && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.petType}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 text-primary-500" />
                    主人姓名
                  </label>
                  <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ownerName: e.target.value })}
                    placeholder="请输入您的姓名"
                    className={`input-field ${formErrors.ownerName ? 'border-red-300' : ''}`}
                  />
                  {formErrors.ownerName && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.ownerName}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 text-primary-500" />
                    联系电话
                  </label>
                  <input
                    type="tel"
                    value={formData.ownerPhone}
                    onChange={(e) => setFormData({ ownerPhone: e.target.value })}
                    placeholder="请输入手机号码"
                    className={`input-field ${formErrors.ownerPhone ? 'border-red-300' : ''}`}
                  />
                  {formErrors.ownerPhone && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.ownerPhone}</p>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleSubmit}
                  disabled={!formData.petName || !formData.petType || !formData.ownerName || !formData.ownerPhone}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <CalendarIcon className="w-5 h-5" />
                  确认预约
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
