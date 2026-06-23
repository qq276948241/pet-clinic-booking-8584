import { useState, useMemo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Stethoscope,
  Scissors,
  Bone,
  Eye,
  Smile,
  ShieldCheck,
  Check,
  ChevronRight,
  CalendarDays,
  UserRound,
  PawPrint,
} from 'lucide-react';
import {
  departments,
  getDoctorsByDepartment,
  generateTimeSlots,
} from '@/data/mockData';
import type { Doctor, TimeSlot } from '@/data/mockData';
import { useAppointmentStore } from '@/store/appointmentStore';

const iconMap: Record<string, React.ElementType> = {
  Stethoscope, Scissors, Bone, Eye, Smile, ShieldCheck,
};

const steps = ['选择科室', '选择医生', '选择时间', '确认预约'];

const petTypes = ['犬类', '猫类', '兔类', '仓鼠', '鸟类', '其他'];

export default function Appointment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const addAppointment = useAppointmentStore((s) => s.addAppointment);

  const preselectedDept = searchParams.get('dept') || '';

  const [step, setStep] = useState(preselectedDept ? 1 : 0);
  const [selectedDept, setSelectedDept] = useState(preselectedDept);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const doctors = useMemo(
    () => (selectedDept ? getDoctorsByDepartment(selectedDept) : []),
    [selectedDept]
  );

  const timeSlots = useMemo(
    () => (selectedDoctor ? generateTimeSlots(selectedDoctor.id) : []),
    [selectedDoctor]
  );

  const dates = useMemo(() => {
    const seen = new Set<string>();
    return timeSlots.filter((s) => {
      if (seen.has(s.date)) return false;
      seen.add(s.date);
      return true;
    }).map((s) => s.date);
  }, [timeSlots]);

  const filteredSlots = useMemo(
    () => timeSlots.filter((s) => s.date === selectedDate && s.available),
    [timeSlots, selectedDate]
  );

  const handleSelectDept = useCallback((id: string) => {
    setSelectedDept(id);
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime('');
    setStep(1);
  }, []);

  const handleSelectDoctor = useCallback((doc: Doctor) => {
    setSelectedDoctor(doc);
    setSelectedDate('');
    setSelectedTime('');
    setStep(2);
  }, []);

  const handleSelectDate = useCallback((date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
  }, []);

  const handleSubmit = useCallback(() => {
    if (!selectedDept || !selectedDoctor || !selectedDate || !selectedTime || !petName || !petType) return;
    const appointment = {
      id: `apt-${Date.now()}`,
      departmentId: selectedDept,
      doctorId: selectedDoctor.id,
      date: selectedDate,
      time: selectedTime,
      petName,
      petType,
      status: 'confirmed' as const,
      createdAt: new Date().toISOString(),
    };
    addAppointment(appointment);
    setSubmitted(true);
  }, [selectedDept, selectedDoctor, selectedDate, selectedTime, petName, petType, addAppointment]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return `${d.getMonth() + 1}月${d.getDate()}日 ${weekDays[d.getDay()]}`;
  };

  const selectedDeptObj = departments.find((d) => d.id === selectedDept);
  const canSubmit = selectedDept && selectedDoctor && selectedDate && selectedTime && petName && petType;

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card-base p-10 text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">预约成功！</h2>
          <p className="text-sm text-gray-400 mb-6">
            您已成功预约{selectedDeptObj?.name} {selectedDoctor?.name} 医生
            <br />
            {formatDate(selectedDate)} {selectedTime}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate('/my-appointments')}
              className="px-6 py-2.5 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
            >
              查看预约
            </button>
            <button
              onClick={() => {
                setStep(0);
                setSelectedDept('');
                setSelectedDoctor(null);
                setSelectedDate('');
                setSelectedTime('');
                setPetName('');
                setPetType('');
                setSubmitted(false);
              }}
              className="px-6 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              继续预约
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
                    i < step
                      ? 'bg-primary-500 text-white'
                      : i === step
                      ? 'bg-primary-500 text-white ring-4 ring-primary-100'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span
                  className={`text-xs mt-1.5 font-medium ${
                    i <= step ? 'text-primary-600' : 'text-gray-400'
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-12 md:w-20 h-0.5 mx-2 mb-5 transition-colors duration-300 ${
                    i < step ? 'bg-primary-300' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {step === 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">选择科室</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {departments.map((dept) => {
                const Icon = iconMap[dept.icon] || Stethoscope;
                return (
                  <button
                    key={dept.id}
                    onClick={() => handleSelectDept(dept.id)}
                    className={`card-base p-4 text-left card-hover ${
                      selectedDept === dept.id
                        ? 'ring-2 ring-primary-400 bg-primary-50/50'
                        : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mb-2">
                      <Icon className="w-5 h-5 text-primary-500" />
                    </div>
                    <p className="font-semibold text-gray-800 text-sm">{dept.name}</p>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      {dept.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <button
              onClick={() => setStep(0)}
              className="text-sm text-primary-500 font-medium mb-4 hover:text-primary-700 transition-colors"
            >
              ← 返回选择科室
            </button>
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {selectedDeptObj?.name} · 选择医生
            </h2>
            <div className="space-y-3">
              {doctors.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => handleSelectDoctor(doc)}
                  className={`w-full card-base p-4 text-left card-hover flex items-center gap-4 ${
                    selectedDoctor?.id === doc.id
                      ? 'ring-2 ring-primary-400 bg-primary-50/50'
                      : ''
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center shrink-0">
                    <UserRound className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">{doc.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary-50 text-primary-600 font-medium">
                        {doc.title}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 truncate">{doc.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <button
              onClick={() => setStep(1)}
              className="text-sm text-primary-500 font-medium mb-4 hover:text-primary-700 transition-colors"
            >
              ← 返回选择医生
            </button>
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {selectedDoctor?.name} 医生 · 选择时间
            </h2>

            <div className="card-base p-4 mb-4">
              <h3 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" />
                选择日期
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {dates.map((date) => (
                  <button
                    key={date}
                    onClick={() => handleSelectDate(date)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                      selectedDate === date
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-gray-50 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                    }`}
                  >
                    {formatDate(date)}
                  </button>
                ))}
              </div>
            </div>

            {selectedDate && (
              <div className="card-base p-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">选择时段</h3>
                {filteredSlots.length > 0 ? (
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {filteredSlots.map((slot: TimeSlot) => (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                          selectedTime === slot.time
                            ? 'bg-primary-500 text-white shadow-md'
                            : 'bg-gray-50 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 text-center py-4">该日期暂无可约时段</p>
                )}
              </div>
            )}

            {selectedTime && (
              <div className="mt-4">
                <button
                  onClick={() => setStep(3)}
                  className="w-full py-3 bg-primary-500 text-white rounded-2xl font-semibold hover:bg-primary-600 transition-colors shadow-md shadow-primary-200"
                >
                  下一步：确认预约
                </button>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <button
              onClick={() => setStep(2)}
              className="text-sm text-primary-500 font-medium mb-4 hover:text-primary-700 transition-colors"
            >
              ← 返回选择时间
            </button>
            <h2 className="text-lg font-bold text-gray-800 mb-4">确认预约信息</h2>

            <div className="card-base p-5 mb-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">科室</span>
                <span className="font-medium text-gray-700">{selectedDeptObj?.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">医生</span>
                <span className="font-medium text-gray-700">{selectedDoctor?.name} · {selectedDoctor?.title}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">日期</span>
                <span className="font-medium text-gray-700">{formatDate(selectedDate)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">时段</span>
                <span className="font-medium text-gray-700">{selectedTime}</span>
              </div>
            </div>

            <div className="card-base p-5 space-y-4">
              <h3 className="text-sm font-semibold text-gray-600 flex items-center gap-1.5">
                <PawPrint className="w-4 h-4" />
                宠物信息
              </h3>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1.5 block">宠物名字</label>
                <input
                  type="text"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="请输入宠物名字"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1.5 block">宠物种类</label>
                <div className="flex flex-wrap gap-2">
                  {petTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setPetType(type)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        petType === type
                          ? 'bg-primary-500 text-white shadow-md'
                          : 'bg-gray-50 text-gray-600 hover:bg-primary-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`w-full mt-4 py-3.5 rounded-2xl font-semibold text-base transition-all shadow-md ${
                canSubmit
                  ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-primary-200'
                  : 'bg-gray-200 text-gray-400 shadow-none cursor-not-allowed'
              }`}
            >
              提交预约
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
