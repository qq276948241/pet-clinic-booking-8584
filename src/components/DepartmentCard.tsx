import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Department } from '@/types';
import { cn } from '@/lib/utils';

interface DepartmentCardProps {
  department: Department;
  selected?: boolean;
  onClick?: () => void;
  showLink?: boolean;
}

export default function DepartmentCard({
  department,
  selected = false,
  onClick,
  showLink = false,
}: DepartmentCardProps) {
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
    department.icon
  ] || Icons.Heart;

  const content = (
    <div
      className={cn(
        'card cursor-pointer h-full flex flex-col items-center text-center',
        selected && 'border-2 border-primary-500 bg-primary-50'
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          'w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors',
          selected ? 'bg-primary-500 text-white' : 'bg-primary-100 text-primary-600'
        )}
      >
        <IconComponent className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{department.name}</h3>
      <p className="text-sm text-gray-500 flex-grow">{department.description}</p>
      {showLink && (
        <span className="mt-4 text-primary-500 font-medium text-sm flex items-center gap-1">
          立即预约
          <Icons.ArrowRight className="w-4 h-4" />
        </span>
      )}
    </div>
  );

  if (showLink) {
    return (
      <Link to="/booking" state={{ departmentId: department.id }}>
        {content}
      </Link>
    );
  }

  return content;
}
