import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { useBookingStore } from '@/store/useBookingStore';
import StepIndicator from '@/components/StepIndicator';
import StepDepartment from '@/components/StepDepartment';
import StepDoctor from '@/components/StepDoctor';
import StepTime from '@/components/StepTime';
import StepPetInfo from '@/components/StepPetInfo';
import StepContact from '@/components/StepContact';

const steps = ['选择科室', '选择医生', '选择时间', '宠物信息', '填写信息'];

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
    addAppointment,
    resetSelection,
  } = useBookingStore();

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

  const handleQuickNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleContactChange = (info: Partial<typeof contactInfo>) => {
    setContactInfo((prev) => ({ ...prev, ...info }));
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
        return <StepDepartment onNext={handleQuickNext} />;
      case 1:
        return <StepDoctor />;
      case 2:
        return <StepTime onNext={handleQuickNext} />;
      case 3:
        return (
          <>
            {currentStep > 3 && renderSummary()}
            <StepPetInfo errors={errors} onErrorsChange={setErrors} />
          </>
        );
      case 4:
        return (
          <StepContact
            contactInfo={contactInfo}
            onContactChange={handleContactChange}
            errors={errors}
            onErrorsChange={setErrors}
            showSummary={true}
            summary={renderSummary()}
          />
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
