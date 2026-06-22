import { Award, Clock } from 'lucide-react';
import type { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  selected?: boolean;
  onClick?: () => void;
}

export function DoctorCard({ doctor, selected, onClick }: DoctorCardProps) {
  return (
    <div
      onClick={onClick}
      className={`card card-hover p-5 cursor-pointer animate-slide-up ${
        selected
          ? 'border-primary-500 ring-2 ring-primary-200 shadow-xl'
          : 'border-primary-100'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-16 h-16 rounded-2xl object-cover shadow-md"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
            <span className="px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
              {doctor.title}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
            <span className="flex items-center gap-1">
              <Award className="w-4 h-4 text-amber-500" />
              {doctor.experience} 年经验
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-primary-500" />
              约诊中
            </span>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2">{doctor.description}</p>
        </div>
      </div>
    </div>
  );
}
