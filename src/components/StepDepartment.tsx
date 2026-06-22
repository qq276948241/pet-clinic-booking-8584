import { departments } from '@/data/mockData';
import { useBookingStore } from '@/store/useBookingStore';
import DepartmentCard from '@/components/DepartmentCard';

interface StepDepartmentProps {
  onNext?: () => void;
}

const StepDepartment = ({ onNext }: StepDepartmentProps) => {
  const { selectedDepartment, setSelectedDepartment } = useBookingStore();

  const handleSelect = (dept: typeof departments[0]) => {
    setSelectedDepartment(dept);
    if (onNext) {
      setTimeout(onNext, 200);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">选择就诊科室</h2>
      <p className="text-gray-500 mb-6">请选择您需要就诊的科室</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dept) => (
          <div
            key={dept.id}
            onClick={() => handleSelect(dept)}
            className="cursor-pointer"
          >
            <DepartmentCard department={dept} showAction={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepDepartment;
