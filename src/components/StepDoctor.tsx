import { useMemo } from 'react';
import { getDoctorsByDepartment } from '@/data/mockData';
import { useBookingStore } from '@/store/useBookingStore';
import DoctorCard from '@/components/DoctorCard';

interface StepDoctorProps {
  onNext?: () => void;
}

const StepDoctor = ({ onNext }: StepDoctorProps) => {
  const { selectedDepartment, selectedDoctor, setSelectedDoctor } = useBookingStore();

  const filteredDoctors = useMemo(() => {
    if (!selectedDepartment) return [];
    return getDoctorsByDepartment(selectedDepartment.id);
  }, [selectedDepartment]);

  const handleSelect = (doctor: typeof filteredDoctors[0]) => {
    const isAlreadySelected = selectedDoctor?.id === doctor.id;
    setSelectedDoctor(doctor);
    if (onNext && !isAlreadySelected) {
      setTimeout(onNext, 200);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">选择主治医生</h2>
      <p className="text-gray-500 mb-6">
        当前科室：<span className="text-primary-600 font-medium">{selectedDepartment?.name}</span>
      </p>
      <div className="space-y-4">
        {filteredDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            isSelected={selectedDoctor?.id === doctor.id}
            onClick={() => handleSelect(doctor)}
          />
        ))}
      </div>
    </div>
  );
};

export default StepDoctor;
