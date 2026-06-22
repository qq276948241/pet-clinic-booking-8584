import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle, User, Phone, Cat, Dog, Bird, Fish, Rabbit, PawPrint, FileText } from 'lucide-react';
import { departments, getDoctorsByDepartment } from '@/data/mockData';
import { useBookingStore } from '@/store/useBookingStore';
import StepIndicator from '@/components/StepIndicator';
import DepartmentCard from '@/components/DepartmentCard';
import DoctorCard from '@/components/DoctorCard';
import TimeSlotPicker from '@/components/TimeSlotPicker';

const steps = ['选择科室', '选择医生', '选择时间', '宠物信息', '填写信息'];

const petTypes = [
  { value: '狗狗', icon: Dog },
  { value: '猫咪', icon: Cat },
  { value: '兔子', icon: Rabbit },
  { value: '鸟类', icon: Bird },
  { value: '鱼类', icon: Fish },
  { value: '其他', icon: User },
];

const Booking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [contactInfo, setContactInfo] = useState({
    ownerName: '',
    phone: '',
    notes: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const {
    selectedDepartment,
    selectedDoctor,
    selectedTimeSlot,
    petInfo,
    setSelectedDepartment,
    setPetInfo,
    addAppointment,
    resetSelection,
  } = useBookingStore();

  const filteredDoctors = useMemo(() => {
    if (!selectedDepartment) return [];
    return getDoctorsByDepartment(selectedDepartment.id);
  }, [selectedDepartment]);

  const canProceedStep3 = () => {
    return (
      petInfo.petName.trim() &&
      petInfo.petType &&
      petInfo.petBreed.trim() &&
      petInfo.petAge > 0
    );
  };

  const canProceedStep4 = () => {
    return (
      contactInfo.ownerName.trim() &&
      contactInfo.phone.trim() &&
      /^1[3-9]\d{9}$/.test(contactInfo.phone)
    );
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return !!selectedDepartment;
      case 1: return !!selectedDoctor;
      case 2: return !!selectedTimeSlot;
      case 3: return canProceedStep3();
      case 4: return canProceedStep4();
      default: return false;
    }
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!petInfo.petName.trim()) newErrors.petName = '请输入宠物名字';
    if (!petInfo.petType) newErrors.petType = '请选择宠物类型';
    if (!petInfo.petBreed.trim()) newErrors.petBreed = '请输入宠物品种';
    if (!petInfo.petAge || petInfo.petAge <= 0) newErrors.petAge = '请输入宠物年龄';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors: Record<string, string> = {};
    if (!contactInfo.ownerName.trim()) newErrors.ownerName = '请输入联系人姓名';
    if (!contactInfo.phone.trim()) {
      newErrors.phone = '请输入手机号';
    } else if (!/^1[3-9]\d{9}$/.test(contactInfo.phone)) {
      newErrors.phone = '请输入正确的手机号';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 3) {
      if (!validateStep3()) return;
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 4) {
      if (!validateStep4()) return;
      if (selectedDepartment && selectedDoctor && selectedTimeSlot) {
        addAppointment({
          departmentId: selectedDepartment.id,
          doctorId: selectedDoctor.id,
          date: selectedTimeSlot.date,
          time: selectedTimeSlot.time,
          petName: petInfo.petName,
          petType: petInfo.petType,
          petBreed: petInfo.petBreed,
          petAge: petInfo.petAge,
          petSymptoms: petInfo.petSymptoms,
          ownerName: contactInfo.ownerName,
          phone: contactInfo.phone,
          notes: contactInfo.notes,
        });
        setShowSuccess(true);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    resetSelection();
    setContactInfo({ ownerName: '', phone: '', notes: '' });
    navigate('/my-appointments');
  };

  const renderSummary = () => (
    <div className="bg-primary-50 rounded-2xl p-4 mb-6">
      <div className="text-sm text-gray-600 space-y-1">
        <div>
          <span className="text-gray-400">科室：</span>
          <span className="font-medium">{selectedDepartment?.name}</span>
        </div>
        <div>
          <span className="text-gray-400">医生：</span>
          <span className="font-medium">{selectedDoctor?.name} · {selectedDoctor?.title}</span>
        </div>
        <div>
          <span className="text-gray-400">时间：</span>
          <span className="font-medium">{selectedTimeSlot?.date} {selectedTimeSlot?.time}</span>
        </div>
        {currentStep >= 4 && (
          <div>
            <span className="text-gray-400">宠物：</span>
            <span className="font-medium">{petInfo.petName} · {petInfo.petType} · {petInfo.petBreed}</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">选择就诊科室</h2>
            <p className="text-gray-500 mb-6">请选择您需要就诊的科室</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept)}
                >
                  <DepartmentCard department={dept} showAction={false} />
                </div>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">选择主治医生</h2>
            <p className="text-gray-500 mb-6">
              当前科室：<span className="text-primary-600 font-medium">{selectedDepartment?.name}</span>
            </p>
            <div className="space-y-4">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">选择就诊时间</h2>
            <p className="text-gray-500 mb-6">请选择方便的就诊日期和时间段</p>
            <TimeSlotPicker />
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <PawPrint className="w-6 h-6 text-primary-500" />
              填写宠物信息
            </h2>
            <p className="text-gray-500 mb-6">请填写爱宠的详细信息，帮助医生更好地诊断</p>
            {currentStep > 3 && renderSummary()}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  宠物名字 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={petInfo.petName}
                  onChange={(e) => {
                    setPetInfo({ petName: e.target.value });
                    if (errors.petName) setErrors({ ...errors, petName: '' });
                  }}
                  placeholder="请输入宠物名字"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none ${
                    errors.petName
                      ? 'border-red-300 focus:border-red-400'
                      : 'border-gray-200 focus:border-primary-400'
                  }`}
                />
                {errors.petName && <p className="mt-1 text-sm text-red-500">{errors.petName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  宠物类型 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {petTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.value}
                        onClick={() => {
                          setPetInfo({ petType: type.value });
                          if (errors.petType) setErrors({ ...errors, petType: '' });
                        }}
                        className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 transition-all ${
                          petInfo.petType === type.value
                            ? 'border-primary-400 bg-primary-50 text-primary-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs">{type.value}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.petType && <p className="mt-1 text-sm text-red-500">{errors.petType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  宠物品种 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={petInfo.petBreed}
                  onChange={(e) => {
                    setPetInfo({ petBreed: e.target.value });
                    if (errors.petBreed) setErrors({ ...errors, petBreed: '' });
                  }}
                  placeholder="如：金毛、布偶猫、中华田园犬等"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none ${
                    errors.petBreed
                      ? 'border-red-300 focus:border-red-400'
                      : 'border-gray-200 focus:border-primary-400'
                  }`}
                />
                {errors.petBreed && <p className="mt-1 text-sm text-red-500">{errors.petBreed}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  宠物年龄（岁） <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  step="0.1"
                  value={petInfo.petAge || ''}
                  onChange={(e) => {
                    setPetInfo({ petAge: parseFloat(e.target.value) || 0 });
                    if (errors.petAge) setErrors({ ...errors, petAge: '' });
                  }}
                  placeholder="请输入宠物年龄"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none ${
                    errors.petAge
                      ? 'border-red-300 focus:border-red-400'
                      : 'border-gray-200 focus:border-primary-400'
                  }`}
                />
                {errors.petAge && <p className="mt-1 text-sm text-red-500">{errors.petAge}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary-500" />
                  症状描述
                </label>
                <textarea
                  value={petInfo.petSymptoms}
                  onChange={(e) => setPetInfo({ petSymptoms: e.target.value })}
                  placeholder="请详细描述宠物的症状，如：食欲不振、呕吐、精神萎靡、皮肤瘙痒等（选填）"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 transition-colors focus:outline-none resize-none"
                />
                <p className="mt-1 text-xs text-gray-400">详细的症状描述有助于医生提前了解病情</p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">填写联系人信息</h2>
            <p className="text-gray-500 mb-6">请填写您的联系方式，方便我们与您沟通</p>
            {renderSummary()}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  联系人姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={contactInfo.ownerName}
                  onChange={(e) => {
                    setContactInfo({ ...contactInfo, ownerName: e.target.value });
                    if (errors.ownerName) setErrors({ ...errors, ownerName: '' });
                  }}
                  placeholder="请输入您的姓名"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none ${
                    errors.ownerName
                      ? 'border-red-300 focus:border-red-400'
                      : 'border-gray-200 focus:border-primary-400'
                  }`}
                />
                {errors.ownerName && <p className="mt-1 text-sm text-red-500">{errors.ownerName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  联系电话 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => {
                    setContactInfo({ ...contactInfo, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  placeholder="请输入您的手机号"
                  maxLength={11}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none ${
                    errors.phone
                      ? 'border-red-300 focus:border-red-400'
                      : 'border-gray-200 focus:border-primary-400'
                  }`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  备注信息
                </label>
                <textarea
                  value={contactInfo.notes}
                  onChange={(e) => setContactInfo({ ...contactInfo, notes: e.target.value })}
                  placeholder="其他需要说明的信息（选填）"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 transition-colors focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/50 to-white py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-3xl shadow-card p-6 md:p-8">
          <StepIndicator currentStep={currentStep} steps={steps} />
          
          <div className="min-h-[400px]">
            {renderStepContent()}
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                currentStep === 0
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              上一步
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all ${
                canProceed()
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentStep === 4 ? '提交预约' : '下一步'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">预约成功！</h3>
            <p className="text-gray-500 mb-6">
              您的预约已成功提交，请按时就诊。<br />
              就诊前我们会发送短信提醒您。
            </p>
            <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left text-sm">
              <div className="text-gray-600 space-y-1">
                <div>
                  <span className="text-gray-400">科室：</span>
                  <span className="font-medium">{selectedDepartment?.name}</span>
                </div>
                <div>
                  <span className="text-gray-400">医生：</span>
                  <span className="font-medium">{selectedDoctor?.name}</span>
                </div>
                <div>
                  <span className="text-gray-400">时间：</span>
                  <span className="font-medium">{selectedTimeSlot?.date} {selectedTimeSlot?.time}</span>
                </div>
                <div>
                  <span className="text-gray-400">宠物：</span>
                  <span className="font-medium">{petInfo.petName} · {petInfo.petBreed}</span>
                </div>
                <div>
                  <span className="text-gray-400">联系人：</span>
                  <span className="font-medium">{contactInfo.ownerName} · {contactInfo.phone}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleSuccessClose}
              className="w-full py-3 px-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 transition-all"
            >
              查看我的预约
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
