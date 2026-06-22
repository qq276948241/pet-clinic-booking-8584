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
  Baby,
  UserRound,
} from 'lucide-react';
import { departments, doctors, generateTimeSlots, generateNextDays } from '@/data/mockData';
import { useAppointmentStore } from '@/store/useAppointmentStore';
import type { AppointmentForm, PetType } from '@/types';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, name: '选择科室' },
  { id: 2, name: '选择医生' },
  { id: 3, name: '选择时间' },
  { id: 4, name: '宠物信息' },
  { id: 5, name: '确认提交' },
  { id: 6, name: '预约完成' },
];

const petTypeOptions: { value: PetType; icon: string }[] = [
  { value: '狗狗', icon: '🐕' },
  { value: '猫咪', icon: '🐈' },
  { value: '兔子', icon: '🐰' },
  { value: '仓鼠', icon: '🐹' },
  { value: '鸟类', icon: '🐦' },
  { value: '其他', icon: '🐾' },
];

const dogBreeds = ['金毛', '拉布拉多', '泰迪', '比熊', '柯基', '哈士奇', '萨摩耶', '边牧', '柴犬', '中华田园犬', '其他'];
const catBreeds = ['英短', '美短', '布偶', '暹罗', '橘猫', '狸花猫', '加菲', '波斯猫', '缅因猫', '其他'];
const rabbitBreeds = ['垂耳兔', '侏儒兔', '安哥拉兔', '道奇兔', '其他'];
const otherBreeds = ['其他'];

const petEmoji: Record<PetType, string> = {
  '狗狗': '🐕',
  '猫咪': '🐈',
  '兔子': '🐰',
  '仓鼠': '🐹',
  '鸟类': '🐦',
  '其他': '🐾',
};

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
    petBreed: '',
    petAge: '',
    petGender: '公',
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

  const getBreedOptions = () => {
    switch (formData.petType) {
      case '狗狗':
        return dogBreeds;
      case '猫咪':
        return catBreeds;
      case '兔子':
        return rabbitBreeds;
      default:
        return otherBreeds;
    }
  };

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
    if (currentStep < 5) {
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
      case 5:
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    addAppointment(formData);
    setCurrentStep(6);
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
        <div className="flex items-center justify-between overflow-x-auto pb-2">
          {steps.slice(0, 5).map((step, index) => (
            <div key={step.id} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center min-w-[70px]">
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
                    'text-xs mt-2 font-medium whitespace-nowrap',
                    currentStep >= step.id ? 'text-primary-600' : 'text-gray-400'
                  )}
                >
                  {step.name}
                </span>
              </div>
              {index < 4 && (
                <div
                  className={cn(
                    'w-8 md:w-16 h-0.5 mx-1 -mt-6 transition-all',
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

          {/* Step 4: Pet Info */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                请填写宠物信息
              </h2>

              {/* Pet Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <PawPrint size={16} />
                  宠物类型
                </label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {petTypeOptions.map((type) => (
                    <button
                      key={type.value}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          petType: type.value,
                          petBreed: '',
                        }))
                      }
                      className={cn(
                        'p-3 rounded-xl border-2 transition-all text-center',
                        formData.petType === type.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-100 hover:border-primary-200'
                      )}
                    >
                      <div className="text-2xl mb-1">{type.icon}</div>
                      <span className="text-sm font-medium text-gray-700">
                        {type.value}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                    品种
                  </label>
                  <select
                    value={formData.petBreed}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        petBreed: e.target.value,
                      }))
                    }
                    className="input-field"
                  >
                    <option value="">请选择品种</option>
                    {getBreedOptions().map((breed) => (
                      <option key={breed} value={breed}>
                        {breed}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Baby size={16} />
                    年龄
                  </label>
                  <input
                    type="text"
                    value={formData.petAge}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        petAge: e.target.value,
                      }))
                    }
                    className="input-field"
                    placeholder="如：2岁"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <UserRound size={16} />
                    性别
                  </label>
                  <div className="flex gap-3">
                    {(['公', '母'] as const).map((gender) => (
                      <button
                        key={gender}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            petGender: gender,
                          }))
                        }
                        className={cn(
                          'flex-1 py-3 rounded-xl border-2 font-medium transition-all',
                          formData.petGender === gender
                            ? 'border-primary-500 bg-primary-500 text-white'
                            : 'border-gray-200 text-gray-600 hover:border-primary-200'
                        )}
                      >
                        {gender === '公' ? '♂ 公' : '♀ 母'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  主人信息
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FileText size={16} />
                  症状描述
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="input-field min-h-[120px] resize-none"
                  placeholder="请详细描述宠物的症状或就诊原因，便于医生提前了解情况..."
                />
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                确认预约信息
              </h2>

              <div className="space-y-6">
                {/* Appointment Info */}
                <div className="bg-primary-50 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-primary-700 mb-4 flex items-center gap-2">
                    <Calendar size={18} />
                    就诊信息
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 w-16 flex-shrink-0">科室</span>
                      <span className="font-medium text-gray-800">
                        {selectedDepartment?.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 w-16 flex-shrink-0">医生</span>
                      <span className="font-medium text-gray-800">
                        {selectedDoctor?.name}
                        <span className="text-primary-600 text-xs ml-1">
                          ({selectedDoctor?.title})
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 w-16 flex-shrink-0">日期</span>
                      <span className="font-medium text-gray-800">
                        {selectedDateInfo?.displayDate} {selectedDateInfo?.weekDay}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 w-16 flex-shrink-0">时段</span>
                      <span className="font-medium text-gray-800">
                        {formData.timeSlot}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pet Info */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <PawPrint size={18} />
                    宠物信息
                  </h3>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-primary-100 flex items-center justify-center text-3xl flex-shrink-0">
                      {petEmoji[formData.petType]}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg mb-1">
                        {formData.petName || '未填写'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                          {formData.petType}
                        </span>
                        {formData.petBreed && (
                          <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                            {formData.petBreed}
                          </span>
                        )}
                        {formData.petAge && (
                          <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                            {formData.petAge}
                          </span>
                        )}
                        <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                          {formData.petGender}
                        </span>
                      </div>
                    </div>
                  </div>
                  {formData.description && (
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-700">症状描述：</span>
                        {formData.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Owner Info */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <User size={18} />
                    联系信息
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 w-16 flex-shrink-0">姓名</span>
                      <span className="font-medium text-gray-800">
                        {formData.ownerName}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 w-16 flex-shrink-0">电话</span>
                      <span className="font-medium text-gray-800">
                        {formData.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 6 && (
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

              {currentStep < 5 ? (
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
                  className="btn-primary flex items-center gap-2"
                >
                  确认预约
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
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
              <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center text-3xl">
                {petEmoji[formData.petType]}
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{formData.petName}</h4>
                <p className="text-sm text-gray-500">
                  {formData.petBreed || formData.petType} · {formData.petGender}
                </p>
              </div>
            </div>
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
                <span className="text-gray-500">主人</span>
                <span className="font-medium text-gray-800">
                  {formData.ownerName}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button onClick={handleViewAppointments} className="btn-primary">
              查看我的预约
            </button>
            <button onClick={() => navigate('/')} className="btn-secondary">
              返回首页
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
