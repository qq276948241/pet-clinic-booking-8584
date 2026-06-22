import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBookingStore } from '@/store/useBookingStore';
import { departments } from '@/data/departments';
import { getDoctorsByDepartment } from '@/data/doctors';
import DepartmentCard from '@/components/DepartmentCard';
import DoctorCard from '@/components/DoctorCard';
import StepIndicator from '@/components/StepIndicator';
import TimeSlotPicker from '@/components/TimeSlotPicker';
import { CalendarCheck, ArrowLeft, ArrowRight, CheckCircle, PawPrint } from 'lucide-react';
import { getWeekday } from '@/utils/dateUtils';

const steps = ['选择科室', '选择医生', '选择时间', '填写信息'];
const petTypes = ['狗狗', '猫咪', '兔子', '仓鼠', '其他'];

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    petName: '',
    petType: '狗狗',
    ownerName: '',
    phone: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    selectedDepartment,
    selectedDoctor,
    selectedDate,
    selectedTime,
    setSelectedDepartment,
    setSelectedDoctor,
    setSelectedDate,
    setSelectedTime,
    addAppointment,
    clearSelection,
  } = useBookingStore();

  useEffect(() => {
    const state = location.state as { departmentId?: string } | null;
    if (state?.departmentId) {
      const dept = departments.find((d) => d.id === state.departmentId);
      if (dept) {
        setSelectedDepartment(dept);
        setCurrentStep(1);
      }
    }
    return () => {
      clearSelection();
    };
  }, []);

  const filteredDoctors = selectedDepartment
    ? getDoctorsByDepartment(selectedDepartment.id)
    : [];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return selectedDepartment !== null;
      case 1:
        return selectedDoctor !== null;
      case 2:
        return selectedDate !== null && selectedTime !== null;
      case 3:
        return (
          formData.petName.trim() !== '' &&
          formData.ownerName.trim() !== '' &&
          formData.phone.trim() !== ''
        );
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    if (!selectedDepartment || !selectedDoctor || !selectedDate || !selectedTime) {
      return;
    }

    addAppointment({
      departmentId: selectedDepartment.id,
      doctorId: selectedDoctor.id,
      date: selectedDate,
      time: selectedTime,
      petName: formData.petName,
      petType: formData.petType,
      ownerName: formData.ownerName,
      phone: formData.phone,
    });

    setShowSuccess(true);
    setTimeout(() => {
      navigate('/my-appointments');
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="container py-16">
        <div className="card max-w-lg mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">预约成功！</h2>
          <p className="text-gray-500 mb-6">
            我们已收到您的预约请求，即将跳转到"我的预约"页面...
          </p>
          <div className="bg-primary-50 rounded-xl p-4 text-left">
            <p className="text-sm text-gray-600">
              <span className="font-medium">科室：</span>{selectedDepartment?.name}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">医生：</span>{selectedDoctor?.name}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">时间：</span>{selectedDate} {getWeekday(selectedDate)} {selectedTime}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <CalendarCheck className="w-8 h-8 text-primary-500" />
            预约挂号
          </h1>
          <p className="text-gray-500">请按照步骤完成预约</p>
        </div>

        <StepIndicator steps={steps} currentStep={currentStep} />

        <div className="card">
          {currentStep === 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">选择科室</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {departments.map((dept) => (
                  <DepartmentCard
                    key={dept.id}
                    department={dept}
                    selected={selectedDepartment?.id === dept.id}
                    onClick={() => setSelectedDepartment(dept)}
                  />
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                选择医生 - {selectedDepartment?.name}
              </h2>
              {filteredDoctors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredDoctors.map((doctor) => (
                    <DoctorCard
                      key={doctor.id}
                      doctor={doctor}
                      selected={selectedDoctor?.id === doctor.id}
                      onClick={() => setSelectedDoctor(doctor)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  该科室暂无医生信息
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                选择就诊时间
              </h2>
              <div className="bg-primary-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">科室：</span>{selectedDepartment?.name}
                  <span className="mx-3">|</span>
                  <span className="font-medium">医生：</span>{selectedDoctor?.name} {selectedDoctor?.title}
                </p>
              </div>
              <TimeSlotPicker
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onDateChange={setSelectedDate}
                onTimeChange={setSelectedTime}
              />
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                填写预约信息
              </h2>
              <div className="bg-primary-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">科室：</span>{selectedDepartment?.name}
                  <span className="mx-3">|</span>
                  <span className="font-medium">医生：</span>{selectedDoctor?.name}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">时间：</span>{selectedDate} {getWeekday(selectedDate!)} {selectedTime}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <PawPrint className="w-4 h-4 inline mr-1" />
                    宠物名称 *
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="请输入宠物名称"
                    value={formData.petName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, petName: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    宠物类型 *
                  </label>
                  <select
                    className="input-field"
                    value={formData.petType}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, petType: e.target.value }))
                    }
                  >
                    {petTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    主人姓名 *
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="请输入您的姓名"
                    value={formData.ownerName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, ownerName: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    联系电话 *
                  </label>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="请输入联系电话"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="btn btn-outline gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              上一步
            </button>
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className="btn btn-primary gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一步
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="btn btn-primary gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle className="w-4 h-4" />
                提交预约
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
