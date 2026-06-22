import { User, Award, Calendar } from 'lucide-react';
import type { Doctor } from '@/types';
import { useBookingStore } from '@/store/useBookingStore';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const { selectedDoctor, setSelectedDoctor } = useBookingStore();
  const isSelected = selectedDoctor?.id === doctor.id;

  return (
    <div
      onClick={() => setSelectedDoctor(isSelected ? null : doctor)}
      className={`bg-white rounded-2xl p-5 shadow-card transition-all duration-300 hover:shadow-card-hover cursor-pointer border-2 ${
        isSelected ? 'border-primary-400 bg-primary-50' : 'border-transparent'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center flex-shrink-0">
          <User className="w-8 h-8 text-primary-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
            <span className="px-2 py-0.5 bg-primary-100 text-primary-600 text-xs font-medium rounded-full">
              {doctor.title}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
            <span className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              {doctor.experience}年经验
            </span>
          </div>
          <p className="text-sm text-gray-600">
            <span className="text-gray-400">擅长：</span>{doctor.specialty}
          </p>
        </div>
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
            isSelected
              ? 'bg-primary-500 border-primary-500'
              : 'border-gray-300'
          }`}
        >
          {isSelected && (
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
