import {
  Stethoscope,
  Scissors,
  Sparkles,
  Smile,
  Eye,
  Bone,
  Heart,
  Microscope,
  ChevronRight,
} from 'lucide-react';
import type { Department } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  stethoscope: Stethoscope,
  scissors: Scissors,
  sparkles: Sparkles,
  tooth: Smile,
  eye: Eye,
  bone: Bone,
  heart: Heart,
  microscope: Microscope,
};

interface DepartmentCardProps {
  department: Department;
  onClick?: () => void;
}

const DepartmentCard = ({ department, onClick }: DepartmentCardProps) => {
  const IconComponent = iconMap[department.icon] || Stethoscope;

  return (
    <div
      onClick={onClick}
      className="card p-6 cursor-pointer group hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
          <IconComponent size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-800">
              {department.name}
            </h3>
            {department.isHot && (
              <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                热门
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 line-clamp-2">
            {department.description}
          </p>
        </div>
        <ChevronRight
          size={20}
          className="text-gray-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all"
        />
      </div>
    </div>
  );
};

export default DepartmentCard;
