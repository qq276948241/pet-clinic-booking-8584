import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBookingStore } from '@/store/useBookingStore';
import { departments } from '@/data/departments';
import { getDoctorsByDepartment } from '@/data/doctors';
import { PetInfoFormData } from '@/components/PetInfoForm';
import { getWeekday } from '@/utils/dateUtils';

const STEPS = ['选择科室', '选择医生', '选择时间', '宠物信息', '联系信息'];

interface ContactInfo {
  ownerName: string;
  phone: string;
}

export function useBookingForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [petInfo, setPetInfo] = useState<PetInfoFormData>({
    petName: '',
    petType: '狗狗',
    petBreed: '',
    petAge: '',
    symptoms: '',
  });
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
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

  const filteredDoctors = useMemo(
    () => (selectedDepartment ? getDoctorsByDepartment(selectedDepartment.id) : []),
    [selectedDepartment]
  );

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === STEPS.length - 1;

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 0:
        return selectedDepartment !== null;
      case 1:
        return selectedDoctor !== null;
      case 2:
        return selectedDate !== null && selectedTime !== null;
      case 3:
        return (
          petInfo.petName.trim() !== '' &&
          petInfo.petBreed.trim() !== '' &&
          petInfo.petAge.trim() !== '' &&
          petInfo.symptoms.trim() !== ''
        );
      case 4:
        return (
          contactInfo.ownerName.trim() !== '' &&
          contactInfo.phone.trim() !== ''
        );
      default:
        return false;
    }
  };

  const goNext = () => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const submit = () => {
    if (!selectedDepartment || !selectedDoctor || !selectedDate || !selectedTime) {
      return;
    }

    addAppointment({
      departmentId: selectedDepartment.id,
      doctorId: selectedDoctor.id,
      date: selectedDate,
      time: selectedTime,
      petName: petInfo.petName,
      petType: petInfo.petType,
      petBreed: petInfo.petBreed,
      petAge: petInfo.petAge,
      symptoms: petInfo.symptoms,
      ownerName: contactInfo.ownerName,
      phone: contactInfo.phone,
    });

    setShowSuccess(true);
    setTimeout(() => {
      navigate('/my-appointments');
    }, 2000);
  };

  const summaryText = useMemo(() => {
    const parts: string[] = [];
    if (selectedDepartment) parts.push(`科室：${selectedDepartment.name}`);
    if (selectedDoctor) parts.push(`医生：${selectedDoctor.name} ${selectedDoctor.title}`);
    return parts.join(' | ');
  }, [selectedDepartment, selectedDoctor]);

  const timeText = useMemo(() => {
    if (!selectedDate || !selectedTime) return '';
    return `时间：${selectedDate} ${getWeekday(selectedDate)} ${selectedTime}`;
  }, [selectedDate, selectedTime]);

  return {
    steps: STEPS,
    currentStep,
    isFirstStep,
    isLastStep,
    canProceed: canProceed(),
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
  };
}
