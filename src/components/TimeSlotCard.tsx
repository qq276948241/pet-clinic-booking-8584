import { Clock, Check } from 'lucide-react';
import type { TimeSlot } from '@/types';

interface TimeSlotCardProps {
  slot: TimeSlot;
  selected?: boolean;
  onClick?: () => void;
}

export default function TimeSlotCard({ slot, selected = false, onClick }: TimeSlotCardProps) {
  if (!slot.available && !selected) {
    return (
      <div className="bg-gray-50 border-2 border-gray-100 border-dashed rounded-btn p-4 opacity-50 cursor-not-allowed">
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">{slot.time}</span>
          <span className="text-xs">已约满</span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-btn p-4 border-2 transition-all duration-200 ${
        selected
          ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
          : 'border-primary-100 bg-white hover:border-primary-300 hover:bg-primary-50/50'
      }`}
    >
      <div className="flex items-center justify-center gap-2">
        <Clock className={`w-4 h-4 ${selected ? 'text-primary-600' : 'text-gray-500'}`} />
        <span className={`font-semibold ${selected ? 'text-primary-700' : 'text-gray-800'}`}>
          {slot.time}
        </span>
        {selected && <Check className="w-4 h-4 text-primary-600" />}
      </div>
    </div>
  );
}
