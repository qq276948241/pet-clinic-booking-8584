import { Heart, Stethoscope, Sparkles, Eye, Smile, X } from 'lucide-react';
import type { Department } from '../types';

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Stethoscope,
  Sparkles,
  Eye,
  Smile,
  X,
};

interface DepartmentCardProps {
  department: Department;
  selected?: boolean;
  onClick?: () => void;
}

export function DepartmentCard({ department, selected, onClick }: DepartmentCardProps) {
  const IconComponent = iconMap[department.icon] || Heart;

  return (
    <div
      onClick={onClick}
      className={`card card-hover p-6 cursor-pointer animate-slide-up ${
        selected
          ? 'border-primary-500 ring-2 ring-primary-200 shadow-xl'
          : 'border-primary-100'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${department.color} to-primary-600 flex items-center justify-center shadow-md flex-shrink-0`}
        >
          <IconComponent className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{department.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{department.description}</p>
        </div>
      </div>
    </div>
  );
}
