import DepartmentCard from '@/components/DepartmentCard';
import DoctorCard from '@/components/DoctorCard';
import StepIndicator from '@/components/StepIndicator';
import TimeSlotPicker from '@/components/TimeSlotPicker';
import PetInfoForm from '@/components/PetInfoForm';
import { useBookingForm } from '@/hooks/useBookingForm';
import { departments } from '@/data/departments';
import { CalendarCheck, ArrowLeft, ArrowRight, CheckCircle, PawPrint, User, Phone } from 'lucide-react';

export default function Booking() {
  const {
    steps,
    currentStep,
    isFirstStep,
    isLastStep,
    canProceed,
    goNext,
    goPrev,
    submit,

    selectedDepartment,
    selectedDoctor,
    selectedDate,
    selectedTime,
    setSelectedDepartment,
    setSelectedDoctor,
    setSelectedDate,
    setSelectedTime,
    filteredDoctors,

    petInfo,
    setPetInfo,
    contactInfo,
    setContactInfo,

    showSuccess,
    summaryText,
    timeText,
  } = useBookingForm();

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
              <span className="font-medium">{timeText}</span>
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">宠物：</span>{petInfo.petName} ({petInfo.petType} · {petInfo.petBreed})
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
                  <span className="font-medium">{summaryText}</span>
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
              <div className="bg-primary-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{summaryText}</span>
                </p>
                {timeText && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">{timeText}</span>
                  </p>
                )}
              </div>
              <PetInfoForm data={petInfo} onChange={setPetInfo} />
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                填写联系信息
              </h2>
              <div className="bg-primary-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{summaryText}</span>
                </p>
                {timeText && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">{timeText}</span>
                  </p>
                )}
              </div>
              <div className="bg-white border border-primary-100 rounded-xl p-4 mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <PawPrint className="w-4 h-4 text-primary-500" />
                  宠物信息确认
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">名称：</span>
                    <span className="text-gray-800 font-medium">{petInfo.petName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">类型：</span>
                    <span className="text-gray-800 font-medium">{petInfo.petType}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">品种：</span>
                    <span className="text-gray-800 font-medium">{petInfo.petBreed}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">年龄：</span>
                    <span className="text-gray-800 font-medium">{petInfo.petAge}</span>
                  </div>
                </div>
                {petInfo.symptoms && (
                  <div className="mt-2 text-sm">
                    <span className="text-gray-500">症状：</span>
                    <span className="text-gray-800">{petInfo.symptoms}</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    主人姓名 *
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="请输入您的姓名"
                    value={contactInfo.ownerName}
                    onChange={(e) =>
                      setContactInfo((prev) => ({ ...prev, ownerName: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    联系电话 *
                  </label>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="请输入联系电话"
                    value={contactInfo.phone}
                    onChange={(e) =>
                      setContactInfo((prev) => ({ ...prev, phone: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={goPrev}
              disabled={isFirstStep}
              className="btn btn-outline gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              上一步
            </button>
            {isLastStep ? (
              <button
                type="button"
                onClick={submit}
                disabled={!canProceed}
                className="btn btn-primary gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle className="w-4 h-4" />
                提交预约
              </button>
            ) : (
              <button
                type="button"
                onClick={goNext}
                disabled={!canProceed}
                className="btn btn-primary gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一步
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
