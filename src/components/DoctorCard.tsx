import { Doctor } from '@/types';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
  selected?: boolean;
  onClick?: () => void;
}

export default function DoctorCard({ doctor, selected = false, onClick }: DoctorCardProps) {
  return (
    <div
      className={cn(
        'card cursor-pointer flex items-start gap-4',
        selected && 'border-2 border-primary-500 bg-primary-50'
      )}
      onClick={onClick}
    >
      <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden flex-shrink-0">
        {doctor.avatar ? (
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <User className="w-8 h-8 text-primary-500 hidden" />
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
          <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full">
            {doctor.title}
          </span>
        </div>
        <p className="text-sm text-gray-500">{doctor.description}</p>
      </div>
      {selected && (
        <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
  );
}
