import type { Doctor } from '@/types';

interface DoctorCardProps {
  doctor: Doctor;
  selected?: boolean;
  onClick?: () => void;
}

export default function DoctorCard({ doctor, selected = false, onClick }: DoctorCardProps) {
  return (
    <div
      onClick={onClick}
      className={`card p-5 cursor-pointer ${
        selected
          ? 'border-primary-500 ring-2 ring-primary-200 bg-primary-50/50'
          : 'hover:border-primary-300'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className={`w-16 h-16 rounded-full border-2 ${
              selected ? 'border-primary-500' : 'border-primary-200'
            }`}
          />
          {selected && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-bold text-lg ${selected ? 'text-primary-700' : 'text-gray-800'}`}>
              {doctor.name}
            </h3>
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
              {doctor.title}
            </span>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2">{doctor.description}</p>
        </div>
      </div>
    </div>
  );
}
