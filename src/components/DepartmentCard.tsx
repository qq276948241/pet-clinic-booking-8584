import * as Icons from 'lucide-react';
import type { Department } from '@/types';
import type { LucideIcon } from 'lucide-react';

interface DepartmentCardProps {
  department: Department;
  selected?: boolean;
  onClick?: () => void;
  showHotBadge?: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  Stethoscope: Icons.Stethoscope,
  Scissors: Icons.Scissors,
  Sparkles: Icons.Sparkles,
  Eye: Icons.Eye,
  Tooth: Icons.Smile,
  XRay: Icons.Scan,
  FlaskConical: Icons.FlaskConical,
  Leaf: Icons.Leaf,
};

export default function DepartmentCard({
  department,
  selected = false,
  onClick,
  showHotBadge = true,
}: DepartmentCardProps) {
  const IconComponent = iconMap[department.icon] || Icons.Stethoscope;

  return (
    <div
      onClick={onClick}
      className={`card p-5 cursor-pointer relative overflow-hidden ${
        selected
          ? 'border-primary-500 ring-2 ring-primary-200 bg-primary-50/50'
          : 'hover:border-primary-300'
      }`}
    >
      {showHotBadge && department.isHot && (
        <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          热门
        </div>
      )}
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors ${
          selected ? 'bg-primary-500' : 'bg-primary-100'
        }`}
      >
        <IconComponent className={`w-7 h-7 ${selected ? 'text-white' : 'text-primary-600'}`} />
      </div>
      <h3 className={`font-bold text-lg mb-2 ${selected ? 'text-primary-700' : 'text-gray-800'}`}>
        {department.name}
      </h3>
      <p className="text-sm text-gray-500 line-clamp-2">{department.description}</p>
    </div>
  );
}
