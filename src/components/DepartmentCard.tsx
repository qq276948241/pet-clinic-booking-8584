import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import type { Department } from '@/types';
import { useBookingStore } from '@/store/useBookingStore';

interface DepartmentCardProps {
  department: Department;
  showAction?: boolean;
}

const DepartmentCard = ({ department, showAction = true }: DepartmentCardProps) => {
  const navigate = useNavigate();
  const { selectedDepartment, setSelectedDepartment } = useBookingStore();
  const isSelected = selectedDepartment?.id === department.id;

  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[department.icon] || Icons.HelpCircle;

  const handleClick = () => {
    if (showAction) {
      setSelectedDepartment(department);
      navigate('/booking');
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-2xl p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 cursor-pointer border-2 ${
        isSelected ? 'border-primary-400 bg-primary-50' : 'border-transparent'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${department.color}20`, color: department.color }}
        >
          <IconComponent className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{department.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{department.description}</p>
        </div>
      </div>
      {showAction && (
        <div className="mt-4 flex justify-end">
          <span className="text-sm text-primary-500 font-medium flex items-center gap-1">
            立即预约
            <Icons.ChevronRight className="w-4 h-4" />
          </span>
        </div>
      )}
    </div>
  );
};

export default DepartmentCard;
